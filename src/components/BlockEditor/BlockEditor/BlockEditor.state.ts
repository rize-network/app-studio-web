import { useEffect, useId, useRef, useState } from 'react';
import {
  BlockEditorProps,
  defaultBlockEditorLabels,
} from './BlockEditor.props';
import {
  Block,
  BlockKind,
  EditorSelection,
  formatRange,
  formatBlocks,
  Inline,
  parseDocument,
  replaceRange,
  safeEditorUrl,
  transformBlock,
} from './BlockEditor.model';

type Snapshot = { value: string; selection: EditorSelection };
type Proposal = {
  scope: 'selection' | 'section';
  target: Snapshot;
  revision: number;
  fragment: string;
  prompt: string;
  state: 'prompt' | 'loading' | 'proposal' | 'error';
  result?: string;
};

export function useBlockEditorState(props: BlockEditorProps) {
  const initial = props.value ?? props.defaultValue ?? '';
  const instanceId = useId();
  const [value, setValue] = useState(initial);
  const [document, setDocument] = useState(() => {
    const parsed = parseDocument(initial);
    parsed.blocks.forEach((block, index) => {
      block.id = `${instanceId}-block-${index}`;
    });
    return parsed;
  });
  const [selection, setSelection] = useState<EditorSelection>({
    start: 0,
    end: 0,
  });
  const [restoreVersion, setRestoreVersion] = useState(0);
  const [manualSource, setManualSource] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [commandId, setCommandId] = useState<string | null>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');
  const [ai, setAi] = useState<Proposal | null>(null);
  const [historyVersion, setHistoryVersion] = useState(0);
  const labels = { ...defaultBlockEditorLabels, ...props.labels };
  const locked = !!(props.isDisabled || props.isReadOnly);
  const current = useRef<Snapshot>({ value: initial, selection });
  const parsed = useRef(document);
  const history = useRef<{
    undo: Snapshot[];
    redo: Snapshot[];
    lastInput: number;
  }>({ undo: [], redo: [], lastInput: 0 });
  const revision = useRef(0);
  const restoreRequested = useRef(false);
  const holdSelection = useRef(false);
  const request = useRef(0);
  const callbacks = useRef(props);
  callbacks.current = props;
  const generation = useRef(ai);
  generation.current = ai;
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      request.current++;
    };
  }, []);

  const capture = (next: EditorSelection) => {
    const bounded = {
      start: Math.max(0, Math.min(next.start, current.current.value.length)),
      end: Math.max(0, Math.min(next.end, current.current.value.length)),
    };
    if (bounded.end < bounded.start)
      [bounded.start, bounded.end] = [bounded.end, bounded.start];
    if (
      bounded.start === current.current.selection.start &&
      bounded.end === current.current.selection.end
    )
      return;
    history.current.lastInput = 0;
    current.current.selection = bounded;
    setSelection(bounded);
  };
  const restoreSelection = (next = current.current.selection) => {
    capture(next);
    restoreRequested.current = true;
    setRestoreVersion((version) => version + 1);
  };
  const install = (next: Snapshot, restore = true, editedId?: string) => {
    const nextDocument = parseDocument(
      next.value,
      parsed.current.blocks,
      editedId
    );
    parsed.current = nextDocument;
    current.current = next;
    revision.current++;
    setDocument(nextDocument);
    setValue(next.value);
    setSelection(next.selection);
    if (restore) {
      restoreRequested.current = true;
      setRestoreVersion((version) => version + 1);
    }
  };
  useEffect(() => {
    if (props.value === undefined || props.value === current.current.value)
      return;
    install({ value: props.value, selection: { start: 0, end: 0 } }, false);
    holdSelection.current = false;
    restoreRequested.current = false;
    setRestoreVersion((version) => version + 1);
    history.current = { undo: [], redo: [], lastInput: 0 };
    request.current++;
    setAi(null);
    setCommandId(null);
    setLinkOpen(false);
    setActiveId(null);
    setHistoryVersion((v) => v + 1);
  }, [props.value]);
  useEffect(() => {
    if (!locked) return;
    holdSelection.current = false;
    request.current++;
    setAi(null);
    setCommandId(null);
    setLinkOpen(false);
  }, [locked]);

  const commit = (
    next: string,
    nextSelection = current.current.selection,
    typing = false,
    restore = true,
    editedId?: string
  ) => {
    if (locked || next === current.current.value) return;
    const now = Date.now();
    const h = history.current;
    if (!typing || now - h.lastInput > 750 || !h.undo.length) {
      h.undo.push({
        value: current.current.value,
        selection: { ...current.current.selection },
      });
      if (h.undo.length > 100) h.undo.shift();
    }
    h.lastInput = typing ? now : 0;
    h.redo = [];
    install({ value: next, selection: nextSelection }, restore, editedId);
    setHistoryVersion((v) => v + 1);
    callbacks.current.onChange?.(next);
  };
  const replace = (
    text: string,
    target = current.current.selection,
    typing = false
  ) => {
    const next = replaceRange(current.current.value, target, text);
    commit(
      next,
      { start: target.start + text.length, end: target.start + text.length },
      typing
    );
  };
  const editBlock = (
    block: Block,
    text: string,
    localSelection: EditorSelection,
    typing = true,
    restore = false
  ) => {
    commit(
      replaceRange(
        current.current.value,
        { start: block.start, end: block.end },
        text
      ),
      {
        start: block.start + localSelection.start,
        end: block.start + localSelection.end,
      },
      typing,
      restore,
      block.id
    );
  };
  const undo = (redo = false) => {
    if (locked) return;
    const h = history.current;
    const from = redo ? h.redo : h.undo;
    const to = redo ? h.undo : h.redo;
    const next = from.pop();
    if (!next) {
      restoreSelection();
      return;
    }
    to.push({
      value: current.current.value,
      selection: { ...current.current.selection },
    });
    h.lastInput = 0;
    install(next);
    setHistoryVersion((v) => v + 1);
    callbacks.current.onChange?.(next.value);
  };
  const move = (id: string, to: number) => {
    if (locked) return;
    const blocks = parsed.current.blocks;
    const from = blocks.findIndex((b) => b.id === id);
    if (from < 0 || to < 0 || to >= blocks.length || from === to) return;
    const ordered = [...blocks];
    const [block] = ordered.splice(from, 1);
    ordered.splice(to, 0, block);
    let next = current.current.value.slice(0, blocks[0].start);
    let position = 0;
    ordered.forEach((item, index) => {
      if (item.id === id)
        position = next.length + block.bodyStart - block.start;
      next +=
        item.raw +
        (index + 1 < blocks.length
          ? current.current.value.slice(
              blocks[index].end,
              blocks[index + 1].start
            )
          : current.current.value.slice(blocks[index].end));
    });
    // Reordering the previous model also keeps duplicate blocks' IDs in the right order.
    parsed.current = { ...parsed.current, blocks: ordered };
    commit(next, { start: position, end: position });
  };
  const action = (
    id: string,
    name: 'below' | 'duplicate' | 'delete' | 'up' | 'down'
  ) => {
    if (locked) return;
    const blocks = parsed.current.blocks;
    const index = blocks.findIndex((b) => b.id === id);
    const block = blocks[index];
    if (!block) return;
    if (name === 'up' || name === 'down') {
      move(id, index + (name === 'up' ? -1 : 1));
      return;
    }
    if (name === 'delete') {
      const target = {
        start:
          index === blocks.length - 1 && index > 0
            ? blocks[index - 1].end
            : block.start,
        end: blocks[index + 1]?.start ?? block.end,
      };
      replace('', target);
      return;
    }
    const text = '\n\n' + (name === 'duplicate' ? block.raw : '');
    replace(text, { start: block.end, end: block.end });
    if (name === 'below')
      setCommandId(
        parsed.current.blocks.find(
          (item) => !item.raw && item.start >= block.end
        )?.id || null
      );
  };
  const transform = (id: string, kind: BlockKind) => {
    const block = parsed.current.blocks.find((b) => b.id === id);
    if (!block) return;
    const text = transformBlock(block, kind);
    commit(
      replaceRange(
        current.current.value,
        { start: block.start, end: block.end },
        text
      ),
      { start: block.start + text.length, end: block.start + text.length }
    );
    setCommandId(null);
  };
  const format = (kind: Inline['kind'], url?: string) => {
    if (locked) return;
    if (
      kind !== 'link' &&
      current.current.selection.start === current.current.selection.end
    )
      return;
    if (kind === 'link' && !safeEditorUrl(url || '')) {
      setMessage(labels.invalidLink);
      return;
    }
    const result =
      manualSource ||
      parsed.current.sourceMode ||
      current.current.selection.start === current.current.selection.end
        ? formatRange(
            current.current.value,
            current.current.selection,
            kind,
            url
          )
        : formatBlocks(
            current.current.value,
            parsed.current.blocks,
            current.current.selection,
            kind,
            url
          );
    commit(result.value, result.selection);
    setLinkOpen(false);
    setMessage('');
  };
  const openAi = (scope: 'selection' | 'section') => {
    if (locked || !callbacks.current.generate) return;
    const selected =
      scope === 'section'
        ? { start: 0, end: current.current.value.length }
        : current.current.selection;
    if (scope === 'selection' && selected.start === selected.end) {
      setMessage(labels.selectionRequired);
      return;
    }
    request.current++;
    setAi({
      scope,
      target: { value: current.current.value, selection: { ...selected } },
      revision: revision.current,
      fragment: current.current.value.slice(selected.start, selected.end),
      prompt: '',
      state: 'prompt',
    });
  };
  const closeAi = () => {
    request.current++;
    setAi(null);
    restoreRequested.current = true;
    setRestoreVersion((v) => v + 1);
  };
  const runAi = async () => {
    const proposal = generation.current;
    if (
      locked ||
      !proposal?.prompt.trim() ||
      proposal.state === 'loading' ||
      proposal.revision !== revision.current ||
      !callbacks.current.generate
    )
      return;
    const id = ++request.current;
    generation.current = { ...proposal, state: 'loading' };
    setAi(generation.current);
    try {
      const result = await callbacks.current.generate(
        proposal.prompt.trim(),
        proposal.fragment,
        proposal.scope
      );
      if (!mounted.current || id !== request.current) return;
      if (!result.trim()) throw new Error('empty-proposal');
      setAi({ ...proposal, result, state: 'proposal' });
    } catch {
      if (mounted.current && id === request.current)
        setAi({ ...proposal, state: 'error' });
    }
  };
  const applyAi = () => {
    const proposal = generation.current;
    if (
      locked ||
      !proposal?.result ||
      proposal.revision !== revision.current ||
      proposal.target.value !== current.current.value
    )
      return;
    replace(proposal.result, proposal.target.selection);
    closeAi();
  };
  const toggleSource = () => {
    setManualSource((previous) => !previous);
    restoreRequested.current = true;
    setRestoreVersion((v) => v + 1);
  };
  const closeCommand = () => {
    setCommandId(null);
    restoreRequested.current = true;
    setRestoreVersion((version) => version + 1);
  };
  return {
    value,
    document,
    selection,
    restoreVersion,
    restoreRequested,
    manualSource,
    toggleSource,
    source: manualSource || document.sourceMode,
    activeId,
    setActiveId,
    commandId,
    setCommandId,
    closeCommand,
    linkOpen,
    setLinkOpen,
    link,
    setLink,
    message,
    setMessage,
    labels,
    locked,
    capture,
    restoreSelection,
    holdSelection,
    current,
    commit,
    replace,
    editBlock,
    undo,
    move,
    action,
    transform,
    format,
    ai,
    setAi,
    openAi,
    closeAi,
    runAi,
    applyAi,
    stale: !!ai && ai.revision !== revision.current,
    canUndo: !!history.current.undo.length,
    canRedo: !!history.current.redo.length,
    historyVersion,
  };
}
export type BlockEditorState = ReturnType<typeof useBlockEditorState>;
