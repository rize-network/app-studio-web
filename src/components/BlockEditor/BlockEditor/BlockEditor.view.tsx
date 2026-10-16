import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Horizontal, Text, Vertical, View, useTheme } from 'app-studio';
import { Button } from '../../Button/Button';
import { Command } from '../../Command/Command';
import { DropdownMenu } from '../../DropdownMenu/DropdownMenu';
import { TextArea } from '../../Form/TextArea/TextArea';
import { Portal } from '../../Portal/Portal';
import { DragHandleIcon } from '../../Icon/Icon';
import { BlockContent } from './BlockEditor.content';
import { BlockEditorControls } from './BlockEditor.controls';
import {
  readEditorSelection,
  restoreEditorSelection,
  serializeEditorDom,
} from './BlockEditor.dom';
import {
  Block,
  blockKinds,
  parseDocument,
  replaceRange,
} from './BlockEditor.model';
import { BlockEditorProps } from './BlockEditor.props';
import { BlockEditorState } from './BlockEditor.state';
import { useBlockEditorKeyboard } from './BlockEditor.keyboard';
import { BlockEditorSelection } from './BlockEditor.selection';

function RichBlock({
  block,
  state: s,
  label,
  views,
}: {
  block: Block;
  state: BlockEditorState;
  label: string;
  views?: BlockEditorProps['views'];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const composing = useRef(false);
  // The browser owns ordinary typing. Reconcile React children only for explicit transactions.
  const children = useMemo(
    () => <BlockContent block={block} />,
    [block.id, block.start, s.restoreVersion]
  );
  const synchronize = () => {
    if (!ref.current || composing.current || s.locked) return;
    const next = serializeEditorDom(ref.current);
    if (block.kind === 'codeBlock') {
      const prefix = block.bodyStart - block.start;
      s.editBlock(
        block,
        replaceRange(
          block.raw,
          { start: prefix, end: prefix + block.body.length },
          next.text
        ),
        {
          start: prefix + next.selection.start,
          end: prefix + next.selection.end,
        },
        true,
        false
      );
      return;
    }
    const parsed = parseDocument(next.text);
    s.editBlock(
      block,
      next.text,
      next.selection,
      true,
      parsed.blocks.length !== 1 || parsed.blocks[0].kind !== block.kind
    );
  };
  return (
    <View
      ref={ref}
      key={s.restoreVersion}
      data-block-id={block.id}
      data-block-start={
        block.kind === 'codeBlock' ? block.bodyStart : block.start
      }
      data-code-block={block.kind === 'codeBlock' ? block.id : undefined}
      data-editor-input="true"
      contentEditable={!s.locked}
      suppressContentEditableWarning
      role="textbox"
      aria-label={label}
      aria-multiline="true"
      aria-readonly={s.locked}
      minHeight={24}
      flex={1}
      outline="none"
      {...views?.content}
      onFocus={() => s.setActiveId(block.id)}
      onBeforeInput={(event: React.FormEvent<HTMLElement>) => {
        if (event.defaultPrevented) return;
        const selected = ref.current && readEditorSelection(ref.current, true);
        if (selected) s.capture(selected);
      }}
      onInput={(event: React.FormEvent<HTMLElement>) => {
        synchronize();
      }}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={() => {
        composing.current = false;
        synchronize();
      }}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.nativeEvent.isComposing || s.locked) return;
        const selected = ref.current && readEditorSelection(ref.current, true);
        if (selected) s.capture(selected);
        if (
          event.key === '/' &&
          !event.metaKey &&
          !event.ctrlKey &&
          !block.body.trim()
        ) {
          event.preventDefault();
          s.setCommandId(block.id);
        }
      }}
    >
      {children}
    </View>
  );
}

export function BlockEditorView({
  state: s,
  ...props
}: BlockEditorProps & { state: BlockEditorState }) {
  const {
    value: _value,
    defaultValue: _default,
    onChange: _change,
    generate: _generate,
    uploadMedia: _uploadMedia,
    pickMedia: _pickMedia,
    onSave,
    label = s.labels.document,
    isDisabled,
    isReadOnly,
    labels: _labels,
    views = {},
    status,
    ...containerProps
  } = props;
  const host = useRef<HTMLDivElement>(null);
  const { themeMode } = useTheme();
  const [floating, setFloating] = useState<{
    top: number;
    bottom: number;
    left: number;
  } | null>(null);
  const [linkAnchor, setLinkAnchor] = useState<typeof floating>(null);
  const blockList = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLTextAreaElement | null>(null);
  const keyboard = useBlockEditorKeyboard(
    s,
    host,
    blockList,
    onSave,
    !!props.generate
  );
  useLayoutEffect(() => {
    if ((!s.linkOpen && !s.media && !s.ai) || !host.current) {
      setLinkAnchor(null);
      return;
    }
    const selected = host.current.ownerDocument.getSelection();
    const range =
      selected?.rangeCount &&
      selected.anchorNode &&
      host.current.contains(selected.anchorNode)
        ? selected.getRangeAt(0).cloneRange()
        : null;
    const target =
      sourceRef.current ??
      host.current.querySelector<HTMLElement>(
        `[data-block-id="${s.activeId}"]`
      ) ??
      blockList.current ??
      host.current;
    const update = () => {
      const selectionRect = range?.getBoundingClientRect();
      const rect = selectionRect?.height
        ? selectionRect
        : target.getBoundingClientRect();
      setLinkAnchor({ top: rect.top, bottom: rect.bottom, left: rect.left });
    };
    update();
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [s.linkOpen, !!s.media, !!s.ai]);
  const dragged = useRef<string | null>(null);
  const dragPreview = useRef<HTMLElement | null>(null);
  const dragFrame = useRef<number | null>(null);
  const dropPositions = useRef<Map<string, number> | null>(null);
  const dropAnimations = useRef<Animation[]>([]);
  type DragLayout = {
    id: string;
    from: number;
    to: number;
    height: number;
    extent: number;
    top: number;
    reducedMotion: boolean;
  };
  const dragLayout = useRef<DragLayout | null>(null);
  const [drag, setDrag] = useState<DragLayout | null>(null);
  const preserve = (event: React.PointerEvent) => {
    event.preventDefault();
  };
  const rows = () =>
    Array.from(
      blockList.current?.querySelectorAll<HTMLElement>('[data-editor-row]') ||
        []
    );
  const stopDrag = () => {
    if (dragFrame.current !== null)
      window.cancelAnimationFrame(dragFrame.current);
    dragFrame.current = null;
    dragged.current = null;
    dragPreview.current?.remove();
    dragPreview.current = null;
    dragLayout.current = null;
    setDrag(null);
  };
  const rowShift = (index: number, layout: DragLayout) =>
    index > layout.from && index <= layout.to
      ? -layout.extent
      : index >= layout.to && index < layout.from
      ? layout.extent
      : 0;
  const slotTop = (to: number, layout: DragLayout) => {
    const row = rows()[to];
    return row
      ? row.offsetTop +
          (to > layout.from ? row.offsetHeight - layout.height : 0)
      : layout.top;
  };
  const previewAt = (to: number) => {
    const previous = dragLayout.current;
    if (!previous || previous.to === to) return;
    const next = { ...previous, to, top: slotTop(to, previous) };
    dragLayout.current = next;
    setDrag(next);
  };
  const targetAt = (clientY: number) => {
    const layout = dragLayout.current;
    if (!layout || !blockList.current) return null;
    const y = clientY - blockList.current.getBoundingClientRect().top;
    // Layout offsets stay stable while transforms move the visible rows.
    if (y >= layout.top && y <= layout.top + layout.height) return layout.to;
    const elements = rows();
    let to = 0;
    elements.forEach((row, index) => {
      if (
        index !== layout.from &&
        y >= row.offsetTop + rowShift(index, layout) + row.offsetHeight / 2
      )
        to++;
    });
    return to;
  };
  useEffect(() => {
    stopDrag();
  }, [s.value, s.locked, s.source]);
  useEffect(() => {
    if (!drag?.id) return;
    window.addEventListener('resize', stopDrag);
    return () => window.removeEventListener('resize', stopDrag);
  }, [drag?.id]);
  useEffect(
    () => () => {
      if (dragFrame.current !== null)
        window.cancelAnimationFrame(dragFrame.current);
      dragPreview.current?.remove();
      dropAnimations.current.forEach((animation) => animation.cancel());
    },
    []
  );
  useLayoutEffect(() => {
    const positions = dropPositions.current;
    if (!positions) return;
    dropPositions.current = null;
    dropAnimations.current.forEach((animation) => animation.cancel());
    dropAnimations.current = [];
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    rows().forEach((row) => {
      const before = positions.get(row.dataset.editorRow!);
      const delta =
        before === undefined ? 0 : before - row.getBoundingClientRect().top;
      if (Math.abs(delta) < 1 || !row.animate) return;
      dropAnimations.current.push(
        row.animate(
          [
            { transform: `translateY(${delta}px)` },
            { transform: 'translateY(0)' },
          ],
          { duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' }
        )
      );
    });
  });
  useEffect(() => {
    const capture = () => {
      const owner = host.current;
      if (!owner) return;
      if (s.holdSelection.current || s.linkOpen) return;
      if (dragged.current) {
        setFloating(null);
        return;
      }
      const active = owner.ownerDocument.activeElement;
      const selected = keyboard.capture() ?? readEditorSelection(owner);
      const selection = owner.ownerDocument.getSelection();
      const fieldFocused = active?.matches(
        'input[data-editor-input],textarea[data-editor-input]'
      );
      if (
        selected &&
        selected.start !== selected.end &&
        selection?.rangeCount &&
        !fieldFocused &&
        !s.locked
      ) {
        const rect = selection.getRangeAt(0).getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          setFloating({ top: rect.top, bottom: rect.bottom, left: rect.left });
          return;
        }
      }
      setFloating(null);
      const outside = owner.ownerDocument.getSelection();
      if (
        outside &&
        !outside.isCollapsed &&
        outside.anchorNode &&
        !owner.contains(outside.anchorNode) &&
        !outside.anchorNode.parentElement?.closest('[data-editor-block-list]')
      ) {
        const caret = s.current.current.selection.end;
        s.capture({ start: caret, end: caret });
      }
    };
    document.addEventListener('selectionchange', capture);
    window.addEventListener('scroll', capture, true);
    window.addEventListener('resize', capture);
    return () => {
      document.removeEventListener('selectionchange', capture);
      window.removeEventListener('scroll', capture, true);
      window.removeEventListener('resize', capture);
    };
  }, [s.locked, s.source, s.linkOpen]);
  useLayoutEffect(() => {
    if (!s.restoreVersion || !host.current || !s.restoreRequested.current)
      return;
    s.restoreRequested.current = false;
    if (s.source && sourceRef.current) {
      sourceRef.current.focus({ preventScroll: true });
      sourceRef.current.setSelectionRange(
        s.selection.start,
        s.selection.end,
        s.selection.backward ? 'backward' : 'forward'
      );
    } else restoreEditorSelection(host.current, s.selection);
  }, [s.restoreVersion, s.source]);
  const sourceSelection = () => {
    if (sourceRef.current)
      s.capture({
        start: sourceRef.current.selectionStart,
        end: sourceRef.current.selectionEnd,
        ...(sourceRef.current.selectionDirection === 'backward'
          ? { backward: true }
          : {}),
      });
  };
  return (
    <Vertical
      ref={host}
      gap={12}
      minWidth={0}
      aria-label={label}
      aria-disabled={isDisabled}
      {...containerProps}
      {...views.container}
      onCopy={keyboard.onCopy}
      onCut={keyboard.onCut}
      onPaste={keyboard.onPaste}
      onPointerDownCapture={keyboard.onPointerDownCapture}
      onInputCapture={keyboard.onInputCapture}
      onCompositionStartCapture={keyboard.onCompositionStartCapture}
      onCompositionEndCapture={keyboard.onCompositionEndCapture}
      onDragOver={(event: React.DragEvent) => {
        if (!dragged.current || s.locked) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
        const to = targetAt(event.clientY);
        if (to !== null) previewAt(to);
      }}
      onDragLeave={(event: React.DragEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          if (dragLayout.current) previewAt(dragLayout.current.from);
      }}
      onDrop={(event: React.DragEvent) => {
        if (!dragged.current || s.locked) return;
        event.preventDefault();
        const to = targetAt(event.clientY);
        if (to !== null) {
          if (s.document.blocks[to]?.id !== dragged.current) {
            dropPositions.current = new Map(
              rows().map((row) => [
                row.dataset.editorRow!,
                row.getBoundingClientRect().top,
              ])
            );
            const layout = dragLayout.current;
            if (layout && blockList.current)
              dropPositions.current.set(
                layout.id,
                blockList.current.getBoundingClientRect().top +
                  slotTop(to, layout)
              );
            s.move(dragged.current, to);
          }
        }
        stopDrag();
      }}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.nativeEvent.isComposing) return;
        if (event.key === 'Escape') {
          stopDrag();
          s.setCommandId(null);
          if (s.linkOpen) s.closeLink();
          if (s.ai) s.closeAi();
          if (s.media) s.closeMedia();
          setFloating(null);
        }
        keyboard.onKeyDown(event);
      }}
    >
      {!isReadOnly && (
        <Vertical
          position="sticky"
          top={0}
          zIndex={10}
          backgroundColor={
            themeMode === 'dark' ? 'color-gray-900' : 'color-white'
          }
          borderWidth={1}
          borderColor="color-gray-200"
          borderStyle="solid"
          borderRadius={8}
          padding={8}
          gap={4}
        >
          <BlockEditorControls state={s} props={props} preserve={preserve} />
          {s.source && (
            <BlockEditorControls
              state={s}
              props={props}
              formatting
              preserve={preserve}
            />
          )}
        </Vertical>
      )}
      {s.document.sourceMode && (
        <Text role="status" {...views.notice}>
          {s.labels.sourceFallback}
        </Text>
      )}
      {s.message && !s.linkOpen && (
        <Text role="status" {...views.notice}>
          {s.message}
        </Text>
      )}
      {s.source ? (
        <TextArea
          value={s.value}
          data-editor-input="true"
          data-editor-offset={0}
          label={label}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          inputRef={(node) => {
            sourceRef.current = node as HTMLTextAreaElement | null;
          }}
          onSelect={sourceSelection}
          onFocus={sourceSelection}
          onChange={(next) =>
            s.commit(
              next,
              sourceRef.current
                ? {
                    start: sourceRef.current.selectionStart,
                    end: sourceRef.current.selectionEnd,
                  }
                : s.selection,
              true,
              false
            )
          }
          views={{
            textarea: {
              minHeight: 240,
              fontFamily: 'monospace',
              ...views.source,
            },
          }}
        />
      ) : (
        <Vertical
          ref={blockList}
          position="relative"
          gap={12}
          data-editor-block-list="true"
        >
          {drag && (
            <View
              data-editor-drop-placeholder={drag.to}
              aria-hidden="true"
              position="absolute"
              left={0}
              right={0}
              top={0}
              height={drag.height}
              borderWidth={1}
              borderStyle="dashed"
              boxSizing="border-box"
              borderColor="theme-primary"
              borderRadius={8}
              backgroundColor="theme-primary"
              opacity={0.14}
              pointerEvents="none"
              style={{
                transform: `translateY(${drag.top}px)`,
                transition: drag.reducedMotion
                  ? 'none'
                  : 'transform 180ms cubic-bezier(0.2, 0, 0, 1)',
              }}
            />
          )}
          {s.document.blocks.map((block, index) => (
            <Horizontal
              key={block.id}
              gap={8}
              alignItems="flex-start"
              position="relative"
              borderRadius={6}
              backgroundColor={
                keyboard.selectedDocument
                  ? 'theme-primary-100'
                  : s.activeId === block.id
                  ? 'color-gray-50'
                  : undefined
              }
              _hover={{ backgroundColor: 'color-gray-50' }}
              data-editor-row={block.id}
              {...views.block}
              opacity={drag?.id === block.id ? 0 : views.block?.opacity ?? 1}
              style={{
                ...views.block?.style,
                ...(drag
                  ? {
                      transform: `translateY(${rowShift(index, drag)}px)`,
                      transition: drag.reducedMotion
                        ? 'none'
                        : 'transform 180ms cubic-bezier(0.2, 0, 0, 1)',
                    }
                  : {}),
              }}
            >
              {!isReadOnly && (
                <DropdownMenu
                  key={`${s.restoreVersion}-${s.commandId ?? ''}`}
                  views={{
                    menu: {
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: 'color-gray-300',
                      backgroundColor:
                        themeMode === 'dark' ? 'color-gray-900' : 'color-white',
                      boxShadow: '0 6px 20px rgba(0, 0, 0, 0.18)',
                    },
                    item: {
                      as: 'button',
                      type: 'button',
                      width: '100%',
                      textAlign: 'left',
                      borderWidth: 0,
                      _focusVisible: {
                        outline: '2px solid',
                        outlineColor: 'theme-primary',
                      },
                    },
                  }}
                  trigger={
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      isIcon
                      minWidth={36}
                      width={36}
                      minHeight={36}
                      padding={4}
                      title={`${s.labels.drag} · ${s.labels.blocks}`}
                      style={{ userSelect: 'none' }}
                      draggable={!s.locked}
                      isDisabled={s.locked}
                      cursor={drag ? 'grabbing' : 'grab'}
                      aria-label={s.labels.drag}
                      onDragStart={(event: React.DragEvent) => {
                        if (s.locked) {
                          event.preventDefault();
                          return;
                        }
                        dragged.current = block.id;
                        dropAnimations.current.forEach((animation) =>
                          animation.cancel()
                        );
                        dropAnimations.current = [];
                        const row =
                          event.currentTarget.closest<HTMLElement>(
                            '[data-editor-row]'
                          );
                        if (row) {
                          const rect = row.getBoundingClientRect();
                          const elements = rows();
                          const next = elements[index + 1];
                          const previous = elements[index - 1];
                          const gap = next
                            ? next.offsetTop - row.offsetTop - row.offsetHeight
                            : previous
                            ? row.offsetTop -
                              previous.offsetTop -
                              previous.offsetHeight
                            : 0;
                          const layout = {
                            id: block.id,
                            from: index,
                            to: index,
                            height: row.offsetHeight,
                            extent: row.offsetHeight + Math.max(0, gap),
                            top: row.offsetTop,
                            reducedMotion: !!window.matchMedia?.(
                              '(prefers-reduced-motion: reduce)'
                            ).matches,
                          };
                          dragLayout.current = layout;
                          // Let the browser capture its drag image before hiding the source row.
                          dragFrame.current = window.requestAnimationFrame(
                            () => {
                              dragFrame.current = null;
                              if (dragLayout.current)
                                setDrag(dragLayout.current);
                            }
                          );
                          const preview = row.cloneNode(true) as HTMLElement;
                          let background = 'Canvas';
                          for (
                            let ancestor: HTMLElement | null = row;
                            ancestor;
                            ancestor = ancestor.parentElement
                          ) {
                            const color =
                              window.getComputedStyle(ancestor).backgroundColor;
                            if (
                              color !== 'transparent' &&
                              color !== 'rgba(0, 0, 0, 0)'
                            ) {
                              background = color;
                              break;
                            }
                          }
                          Object.assign(preview.style, {
                            position: 'fixed',
                            left: '-10000px',
                            top: '0',
                            width: `${rect.width}px`,
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: '8px',
                            backgroundColor: background,
                            boxShadow: '0 8px 24px rgba(0,0,0,0.18)',
                            opacity: '1',
                          });
                          preview.dataset.editorDragPreview = 'true';
                          preview.setAttribute('aria-hidden', 'true');
                          preview.inert = true;
                          preview
                            .querySelectorAll<HTMLElement>('[contenteditable]')
                            .forEach((element) => {
                              element.style.outline = 'none';
                            });
                          row.ownerDocument.body.appendChild(preview);
                          dragPreview.current = preview;
                          event.dataTransfer.setDragImage(
                            preview,
                            event.clientX - rect.left + 8,
                            event.clientY - rect.top + 8
                          );
                        }
                        event.dataTransfer.setData(
                          'application/x-app-studio-block',
                          block.id
                        );
                        event.dataTransfer.effectAllowed = 'move';
                      }}
                      onDragEnd={stopDrag}
                    >
                      <DragHandleIcon widthHeight={18} strokeWidth={2} />
                    </Button>
                  }
                  items={[
                    {
                      id: 'transform',
                      label: s.labels.blocks,
                      disabled: s.locked,
                      onClick: () => s.setCommandId(block.id),
                    },
                    ...(
                      ['below', 'duplicate', 'up', 'down', 'delete'] as const
                    ).map((action) => ({
                      id: action,
                      label: s.labels[action],
                      disabled:
                        s.locked ||
                        (action === 'up' && index === 0) ||
                        (action === 'down' &&
                          index === s.document.blocks.length - 1),
                      onClick: () => s.action(block.id, action),
                    })),
                  ]}
                />
              )}
              <RichBlock
                block={block}
                state={s}
                label={block.kind === 'codeBlock' ? s.labels.codeBlock : label}
                views={views}
              />
            </Horizontal>
          ))}
        </Vertical>
      )}
      {(s.linkOpen || s.media || s.ai ? linkAnchor : !s.source && floating) &&
        !s.locked && (
          <Portal>
            <BlockEditorSelection
              rect={(s.linkOpen || s.media || s.ai ? linkAnchor : floating)!}
              state={s}
              props={props}
              preserve={preserve}
            />
          </Portal>
        )}
      <Command
        open={!!s.commandId && !s.locked}
        onOpenChange={(open) => {
          if (!open) s.closeCommand();
        }}
        placeholder={s.labels.blocks}
        commands={blockKinds.map((kind) => ({
          id: kind,
          name: s.labels[kind],
          onSelect: () => {
            if (s.commandId) s.transform(s.commandId, kind);
          },
        }))}
      />
      {status}
    </Vertical>
  );
}
