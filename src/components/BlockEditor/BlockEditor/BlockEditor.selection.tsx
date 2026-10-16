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
    const box = ref.current?.getBoundingClientRect();
    if (!box) return;
    setPosition({
      left: Math.max(8, Math.min(rect.left, window.innerWidth - box.width - 8)),
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
  }, [rect, state.linkOpen, state.message]);
  useEffect(() => {
    if (!state.linkOpen) return;
    const outside = (event: Event) => {
      if (event.target instanceof Node && !ref.current?.contains(event.target))
        state.closeLink(false);
    };
    document.addEventListener('pointerdown', outside, true);
    return () => document.removeEventListener('pointerdown', outside, true);
  }, [state.linkOpen]);
  return (
    <View
      ref={ref}
      data-editor-selection-toolbar="true"
      data-editor-link-popover={state.linkOpen ? 'true' : undefined}
      role={state.linkOpen ? 'dialog' : undefined}
      aria-label={state.linkOpen ? state.labels.link : undefined}
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
      {state.linkOpen ? (
        <BlockEditorPanels state={state} views={props.views} floating />
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
