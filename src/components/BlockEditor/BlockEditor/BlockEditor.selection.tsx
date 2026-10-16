import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { View, useTheme } from 'app-studio';
import { BlockEditorControls, BlockEditorPanels } from './BlockEditor.controls';
import { BlockEditorProps } from './BlockEditor.props';
import { BlockEditorState } from './BlockEditor.state';

export function BlockEditorSelection({
  rect,
  state,
  props,
  preserve,
}: {
  rect: { top: number; bottom: number; left: number };
  state: BlockEditorState;
  props: BlockEditorProps;
  preserve: React.PointerEventHandler;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { themeMode } = useTheme();
  const [position, setPosition] = useState({ top: 8, left: 8 });
  useLayoutEffect(() => {
    const update = () => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      setPosition({
        left: Math.max(
          8,
          Math.min(rect.left, window.innerWidth - box.width - 8)
        ),
        top: Math.max(
          8,
          Math.min(
            rect.top - box.height - 8 >= 8
              ? rect.top - box.height - 8
              : rect.bottom + 8,
            window.innerHeight - box.height - 8
          )
        ),
      });
    };
    update();
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update);
    if (ref.current) observer?.observe(ref.current);
    return () => observer?.disconnect();
  }, [
    rect,
    state.linkOpen,
    !!state.media,
    state.media?.phase,
    state.ai?.state,
    state.ai?.result,
    state.ai?.prompt,
    state.stale,
    state.message,
  ]);
  useEffect(() => {
    if (!state.linkOpen && !state.media && !state.ai) return;
    const outside = (event: Event) => {
      if (
        event.target instanceof Node &&
        !ref.current?.contains(event.target)
      ) {
        if (state.media) state.closeMedia(false);
        else if (state.ai) state.closeAi(false);
        else state.closeLink(false);
      }
    };
    document.addEventListener('pointerdown', outside, true);
    return () => document.removeEventListener('pointerdown', outside, true);
  }, [state.linkOpen, !!state.media, !!state.ai]);
  return (
    <View
      ref={ref}
      data-editor-selection-toolbar="true"
      data-editor-link-popover={state.linkOpen ? 'true' : undefined}
      data-editor-ai-popover={state.ai ? 'true' : undefined}
      role={state.linkOpen || state.media || state.ai ? 'dialog' : undefined}
      aria-label={
        state.media
          ? state.labels.media
          : state.ai
          ? state.labels.aiPanel
          : state.linkOpen
          ? state.labels.link
          : undefined
      }
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          event.stopPropagation();
          if (state.media) state.closeMedia();
          else if (state.ai) state.closeAi();
          else if (state.linkOpen) state.closeLink();
        }
      }}
      position="fixed"
      top={position.top}
      left={position.left}
      maxWidth="calc(100vw - 16px)"
      maxHeight="calc(100vh - 16px)"
      overflow="auto"
      backgroundColor={themeMode === 'dark' ? 'color-gray-900' : 'color-white'}
      borderWidth={1}
      borderStyle="solid"
      borderColor={themeMode === 'dark' ? 'color-gray-600' : 'color-gray-300'}
      boxShadow="0 6px 20px rgba(0, 0, 0, 0.18)"
      borderRadius={10}
      padding={6}
      zIndex={1000}
    >
      {state.linkOpen || state.media || state.ai ? (
        <BlockEditorPanels
          state={state}
          views={props.views}
          uploadEnabled={!!props.uploadMedia}
          floating
        />
      ) : (
        <BlockEditorControls
          state={state}
          props={props}
          formatting
          preserve={preserve}
        />
      )}
    </View>
  );
}
