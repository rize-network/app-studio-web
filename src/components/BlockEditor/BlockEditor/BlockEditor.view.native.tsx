import React, { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { Button } from '../../Button/Button';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
import { TextArea } from '../../Form/TextArea/TextArea';
import { BlockContent } from './BlockEditor.content';
import { BlockEditorControls, BlockEditorPanels } from './BlockEditor.controls';
import { blockKinds } from './BlockEditor.model';
import { BlockEditorProps } from './BlockEditor.props';
import { BlockEditorState } from './BlockEditor.state';

type NativeInput = {
  focus: () => void;
  setNativeProps?: (props: {
    selection: { start: number; end: number };
  }) => void;
};

const codeFontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export function BlockEditorView({
  state: s,
  ...props
}: BlockEditorProps & { state: BlockEditorState }) {
  const {
    value: _value,
    defaultValue: _default,
    onChange: _change,
    generate: _generate,
    onSave: _save,
    label = s.labels.document,
    isDisabled,
    isReadOnly,
    labels: _labels,
    views = {},
    status,
    ...containerProps
  } = props;
  const inputs = useRef<Record<string, NativeInput | null>>({});
  const localSelection = useRef({ start: 0, end: 0 });
  useEffect(() => {
    if (!s.restoreRequested.current) return;
    const block = s.document.blocks.find(
      (item) => s.selection.start >= item.start && s.selection.start <= item.end
    );
    if (!s.source && block && s.activeId !== block.id) {
      s.setActiveId(block.id);
      return;
    }
    const key = s.source ? 'source' : block?.id;
    const input = key ? inputs.current[key] : null;
    const offset = s.source ? 0 : block?.start || 0;
    if (input) {
      s.restoreRequested.current = false;
      input.focus();
      input.setNativeProps?.({
        selection: {
          start: s.selection.start - offset,
          end: s.selection.end - offset,
        },
      });
    }
  }, [s.restoreVersion, s.activeId]);
  const selectionProps = (offset: number, key: string) => ({
    inputRef: (node: NativeInput | null) => {
      inputs.current[key] = node;
    },
    onSelectionChange: (event: {
      nativeEvent: { selection: { start: number; end: number } };
    }) => {
      localSelection.current = event.nativeEvent.selection;
      s.capture({
        start: offset + event.nativeEvent.selection.start,
        end: offset + event.nativeEvent.selection.end,
      });
    },
  });
  return (
    <Vertical
      gap={12}
      accessibilityLabel={label}
      {...containerProps}
      {...views.container}
    >
      {!isReadOnly && <BlockEditorControls state={s} props={props} />}
      {s.document.sourceMode && (
        <Text accessibilityLiveRegion="polite" {...views.notice}>
          {s.labels.sourceFallback}
        </Text>
      )}
      {s.message && (
        <Text accessibilityLiveRegion="polite" {...views.notice}>
          {s.message}
        </Text>
      )}
      {s.source ? (
        <TextArea
          value={s.value}
          label={label}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          {...selectionProps(0, 'source')}
          onChange={(next) =>
            s.commit(next, localSelection.current, true, false)
          }
          views={{
            field: {
              fontFamily: codeFontFamily,
              minHeight: 240,
              ...views.source,
            },
          }}
        />
      ) : (
        s.document.blocks.map((block, index) => (
          <Vertical key={block.id} gap={8} {...views.block}>
            {s.activeId === block.id && !isReadOnly ? (
              <TextArea
                label={s.labels[block.kind]}
                value={block.raw}
                variant="none"
                isAutoFocus
                isDisabled={isDisabled}
                {...selectionProps(block.start, block.id)}
                onChange={(text) => {
                  if (text === '/' && !block.raw.trim()) {
                    s.setCommandId(block.id);
                    return;
                  }
                  s.editBlock(block, text, localSelection.current);
                }}
                views={{
                  container: { borderWidth: 0 },
                  field: {
                    fontSize: 16,
                    minHeight: 44,
                    fontFamily:
                      block.kind === 'codeBlock' ? codeFontFamily : undefined,
                    ...views.content,
                  },
                }}
              />
            ) : (
              <View
                accessibilityRole={isReadOnly ? undefined : 'button'}
                accessibilityLabel={s.labels[block.kind]}
                onPress={
                  s.locked
                    ? undefined
                    : () => {
                        s.setActiveId(block.id);
                        s.capture({
                          start: block.bodyStart,
                          end: block.bodyStart,
                        });
                      }
                }
                minHeight={44}
                padding={8}
                {...views.content}
              >
                <BlockContent
                  block={block}
                  native
                  codeFontFamily={codeFontFamily}
                />
              </View>
            )}
            {!isReadOnly && (
              <Horizontal gap={4} flexWrap="wrap">
                <Button
                  size="sm"
                  isDisabled={s.locked}
                  onClick={() => s.setCommandId(block.id)}
                >
                  {s.labels.blocks}
                </Button>
                {(['below', 'duplicate', 'up', 'down', 'delete'] as const).map(
                  (action) => (
                    <Button
                      key={action}
                      size="sm"
                      variant="ghost"
                      aria-label={s.labels[action]}
                      isDisabled={
                        s.locked ||
                        (action === 'up' && index === 0) ||
                        (action === 'down' &&
                          index === s.document.blocks.length - 1)
                      }
                      onClick={() => s.action(block.id, action)}
                    >
                      {s.labels[action]}
                    </Button>
                  )
                )}
              </Horizontal>
            )}
          </Vertical>
        ))
      )}
      {!isReadOnly && (
        <BlockEditorControls state={s} props={props} formatting />
      )}
      <ActionSheet
        isOpen={!!s.commandId && !s.locked}
        onClose={s.closeCommand}
        title={s.labels.blocks}
        items={blockKinds.map((kind) => ({
          id: kind,
          value: kind,
          label: s.labels[kind],
        }))}
        onSelect={(kind) => {
          if (s.commandId)
            s.transform(s.commandId, kind as (typeof blockKinds)[number]);
        }}
      />
      <ActionSheet
        isOpen={!!s.ai || s.linkOpen}
        title={s.ai ? s.labels.aiPanel : s.labels.link}
        onClose={() => {
          s.setLinkOpen(false);
          s.closeAi();
        }}
        maxHeight="85%"
      >
        <BlockEditorPanels state={s} views={views} />
      </ActionSheet>
      {status}
    </Vertical>
  );
}
