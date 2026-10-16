import React, { useEffect, useRef, useState } from 'react';
import { readEditorSelection } from './BlockEditor.dom';
import { deletionRange, EditorSelection } from './BlockEditor.model';
import { BlockEditorState } from './BlockEditor.state';

/** Browser editing commands stay inside document fields, outside prompt/link inputs. */
export function useBlockEditorKeyboard(
  s: BlockEditorState,
  host: React.RefObject<HTMLDivElement | null>,
  blockList: React.RefObject<HTMLDivElement | null>,
  onSave?: () => void,
  hasAI = false
) {
  const all = useRef(false);
  const [selectedDocument, setSelectedDocument] = useState(false);
  const composition = useRef<EditorSelection | null>(null);
  const pendingInput = useRef<{ target: EditorSelection; text: string } | null>(
    null
  );
  const clearAll = () => {
    all.current = false;
    setSelectedDocument(false);
  };
  useEffect(() => {
    const restored = s.current.current.selection;
    if (
      !s.source &&
      !s.locked &&
      restored.start === 0 &&
      restored.end === s.value.length &&
      s.value.length > 0
    ) {
      all.current = true;
      setSelectedDocument(true);
    }
    if (
      s.source ||
      s.locked ||
      s.current.current.selection.start === s.current.current.selection.end
    )
      clearAll();
    composition.current = null;
    pendingInput.current = null;
  }, [s.value, s.source, s.locked]);
  const inputFor = (target: EventTarget | null) => {
    const input =
      target instanceof Element
        ? target.closest<HTMLElement>('[data-editor-input]')
        : null;
    return input && host.current?.contains(input) ? input : null;
  };
  const selection = (input?: HTMLElement | null) => {
    if (all.current) return { start: 0, end: s.current.current.value.length };
    if (input?.tagName === 'TEXTAREA') {
      const field = input as HTMLTextAreaElement;
      const offset = Number(field.dataset.editorOffset || 0);
      return {
        start: offset + field.selectionStart,
        end: offset + field.selectionEnd,
      };
    }
    return host.current ? readEditorSelection(host.current) : null;
  };
  const acrossBlocks = (target: EditorSelection) =>
    all.current ||
    s.document.blocks.filter(
      (block) => target.start < block.end && target.end > block.start
    ).length > 1;
  const capture = () => {
    const active = host.current?.ownerDocument.activeElement;
    if (active?.tagName === 'INPUT' || active?.tagName === 'TEXTAREA') {
      const input = inputFor(active);
      if (input) {
        const next = selection(input);
        if (next) s.capture(next);
      }
      return null;
    }
    const next = selection();
    if (next) s.capture(next);
    return next;
  };
  const copy = (event: React.ClipboardEvent, cut = false) => {
    const input = inputFor(event.target);
    if (!input || input.tagName === 'TEXTAREA') return;
    const target = selection(input);
    if (!target || target.start === target.end) return;
    // Use Markdown in the clipboard so whole blocks survive a copy/paste round trip.
    event.clipboardData.setData(
      'text/plain',
      s.current.current.value.slice(target.start, target.end)
    );
    event.preventDefault();
    if (cut && !s.locked) {
      s.capture(target);
      s.replace('', deletionRange(s.document.blocks, target));
      clearAll();
    }
  };
  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.defaultPrevented || event.nativeEvent.isComposing) return;
    const input = inputFor(event.target);
    if (!input) return;
    const target = selection(input);
    if (target) s.capture(target);
    const key = event.key.toLowerCase();
    if (key === 'tab') clearAll();
    const modifier = (event.ctrlKey || event.metaKey) && !event.altKey;
    if (
      modifier &&
      key === 'a' &&
      !event.shiftKey &&
      input.tagName !== 'TEXTAREA'
    ) {
      event.preventDefault();
      const range = input.ownerDocument.createRange();
      range.selectNodeContents(blockList.current!);
      const selected = input.ownerDocument.getSelection();
      selected?.removeAllRanges();
      selected?.addRange(range);
      all.current = true;
      setSelectedDocument(true);
      s.capture({ start: 0, end: s.current.current.value.length });
      return;
    }
    if (
      all.current &&
      [
        'arrowleft',
        'arrowright',
        'arrowup',
        'arrowdown',
        'home',
        'end',
        'escape',
      ].includes(key)
    ) {
      clearAll();
      if (!event.shiftKey) {
        event.preventDefault();
        const first = s.document.blocks[0];
        const last = s.document.blocks[s.document.blocks.length - 1];
        const position = ['arrowleft', 'arrowup', 'home'].includes(key)
          ? first.bodyStart
          : last.kind === 'codeBlock'
          ? last.bodyStart + last.body.length
          : last.end;
        s.restoreSelection({ start: position, end: position });
      }
      return;
    }
    if (s.locked) return;
    if (modifier) {
      if (key === 'z' || key === 'y') {
        event.preventDefault();
        clearAll();
        s.undo(key === 'y' || event.shiftKey);
      } else if (key === 's' && onSave) {
        event.preventDefault();
        onSave();
      } else if (key === 'a' && event.shiftKey && hasAI) {
        event.preventDefault();
        s.openAi('selection');
      } else if (['b', 'i', 'u'].includes(key)) {
        event.preventDefault();
        s.format(
          ({ b: 'bold', i: 'italic', u: 'underline' } as const)[
            key as 'b' | 'i' | 'u'
          ]
        );
      } else if (key === 'k') {
        event.preventDefault();
        s.setLink('');
        s.setLinkOpen(true);
      }
      // C/X/V use the browser's clipboard events, including context-menu actions.
      return;
    }
    if (
      input.tagName !== 'TEXTAREA' &&
      target &&
      target.start !== target.end &&
      ['backspace', 'delete'].includes(key)
    ) {
      event.preventDefault();
      s.replace('', deletionRange(s.document.blocks, target));
      clearAll();
      return;
    }
    if (target && acrossBlocks(target)) {
      const text =
        key === 'backspace' || key === 'delete'
          ? ''
          : key === 'enter'
          ? '\n\n'
          : event.key.length === 1 && !event.altKey
          ? event.key
          : null;
      if (text !== null) {
        event.preventDefault();
        s.replace(text, target, event.key.length === 1);
        clearAll();
        return;
      }
    }
  };
  const onBeforeInput = (native: InputEvent) => {
    const input = inputFor(native.target);
    if (!input || s.locked || native.isComposing || composition.current) return;
    if (
      native.inputType === 'historyUndo' ||
      native.inputType === 'historyRedo'
    ) {
      if (native.cancelable) {
        native.preventDefault();
        s.undo(native.inputType === 'historyRedo');
      }
      return;
    }
    const target = selection(input);
    if (!target || !acrossBlocks(target)) return;
    const text = native.inputType?.startsWith('delete')
      ? ''
      : ['insertParagraph', 'insertLineBreak'].includes(native.inputType)
      ? '\n\n'
      : native.data;
    if (text == null) return;
    if (native.cancelable) {
      native.preventDefault();
      s.replace(text, target);
      clearAll();
    } else pendingInput.current = { target, text };
  };
  const beforeInput = useRef(onBeforeInput);
  beforeInput.current = onBeforeInput;
  useEffect(() => {
    const owner = host.current;
    const handler = (event: Event) => beforeInput.current(event as InputEvent);
    owner?.addEventListener('beforeinput', handler, true);
    return () => owner?.removeEventListener('beforeinput', handler, true);
  }, [host]);
  const onInputCapture = (event: React.FormEvent) => {
    const input = inputFor(event.target);
    const native = event.nativeEvent as InputEvent;
    if (!input || s.locked || native.isComposing || composition.current) return;
    if (
      native.inputType === 'historyUndo' ||
      native.inputType === 'historyRedo'
    ) {
      event.stopPropagation();
      s.undo(native.inputType === 'historyRedo');
    } else if (
      pendingInput.current ||
      (input.tagName !== 'TEXTAREA' &&
        acrossBlocks(s.current.current.selection) &&
        (native.data != null || native.inputType?.startsWith('delete')))
    ) {
      event.stopPropagation();
      const { target, text } = pendingInput.current ?? {
        target: s.current.current.selection,
        text: native.inputType?.startsWith('delete') ? '' : native.data!,
      };
      pendingInput.current = null;
      s.replace(text, target);
      clearAll();
    }
  };
  return {
    capture,
    selectedDocument,
    onKeyDown,
    onInputCapture,
    onCopy: (event: React.ClipboardEvent) => copy(event),
    onCut: (event: React.ClipboardEvent) => copy(event, true),
    onPaste: (event: React.ClipboardEvent) => {
      const input = inputFor(event.target);
      if (!input || input.tagName === 'TEXTAREA' || s.locked) return;
      const target = selection(input);
      if (!target) return;
      event.preventDefault();
      const text = event.clipboardData.getData('text/plain');
      if (
        !text &&
        !Array.from(event.clipboardData.types || []).includes('text/plain')
      )
        return;
      s.capture(target);
      s.replace(text, target);
      clearAll();
    },
    onPointerDownCapture: (event: React.PointerEvent) => {
      if (inputFor(event.target)) clearAll();
    },
    onCompositionStartCapture: (event: React.CompositionEvent) => {
      const input = inputFor(event.target);
      const target = input && selection(input);
      if (target && acrossBlocks(target) && !s.locked)
        composition.current = target;
    },
    onCompositionEndCapture: (event: React.CompositionEvent) => {
      const target = composition.current;
      if (!target) return;
      event.stopPropagation();
      composition.current = null;
      if (event.data) s.replace(event.data, target);
      else s.restoreSelection(target);
      clearAll();
    },
  };
}
