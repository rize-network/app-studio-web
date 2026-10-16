import React from 'react';
import { Horizontal, Text, Vertical } from 'app-studio';
import { Button } from '../../Button/Button';
import { EmojiPicker } from '../../EmojiPicker/EmojiPicker';
import { Icon } from '../../Icon/Icon';
import { TextField } from '../../Form/TextField/TextField';
import { TextArea } from '../../Form/TextArea/TextArea';
import { BlockEditorProps } from './BlockEditor.props';
import { BlockEditorState } from './BlockEditor.state';
import { Inline } from './BlockEditor.model';

export function BlockEditorControls({
  state: s,
  props,
  preserve,
  formatting = false,
}: {
  state: BlockEditorState;
  props: BlockEditorProps;
  preserve?: React.PointerEventHandler;
  formatting?: boolean;
}) {
  const selected = s.selection.start !== s.selection.end;
  const controlSize = preserve ? 36 : 44;
  const button = (
    key: keyof typeof s.labels,
    action: () => void,
    disabled = false,
    content?: string
  ) => (
    <Button
      key={key}
      type="button"
      size="sm"
      variant="outline"
      minWidth={controlSize}
      minHeight={controlSize}
      paddingHorizontal={10}
      views={{
        content: {
          fontSize: 14,
          fontWeight: key === 'bold' ? '700' : '600',
          fontStyle: key === 'italic' ? 'italic' : 'normal',
          textDecoration:
            key === 'underline'
              ? 'underline'
              : key === 'strikethrough'
              ? 'line-through'
              : undefined,
        },
      }}
      aria-label={
        key === 'source' && s.source ? s.labels.visual : s.labels[key]
      }
      title={s.labels[key]}
      isDisabled={s.locked || disabled}
      onPointerDown={preserve}
      onMouseDown={preserve ? (event) => event.preventDefault() : undefined}
      onClick={action}
    >
      {content || s.labels[key]}
    </Button>
  );
  return (
    <Horizontal
      role="toolbar"
      aria-label={s.labels.selectionToolbar}
      gap={4}
      flexWrap="wrap"
      alignItems="center"
      {...props.views?.toolbar}
    >
      {formatting ? (
        <>
          {(
            [
              ['bold', 'B'],
              ['italic', 'I'],
              ['underline', 'U'],
              ['strikethrough', 'S'],
              ['code', '</>'],
            ] as Array<[Inline['kind'], string]>
          ).map(([kind, text]) =>
            button(
              kind as keyof typeof s.labels,
              () => s.format(kind),
              !selected,
              text
            )
          )}
          {button('link', () => {
            s.setLink('');
            s.setLinkOpen(true);
          })}
          {props.generate &&
            button('askSelection', () => s.openAi('selection'), !selected)}
        </>
      ) : (
        <>
          {button('undo', () => s.undo(), !s.canUndo)}
          {button('redo', () => s.undo(true), !s.canRedo)}
          {button(
            'source',
            s.toggleSource,
            s.document.sourceMode,
            s.source ? s.labels.visual : s.labels.source
          )}
          {props.generate && button('askSection', () => s.openAi('section'))}
          {props.onSave && button('save', () => props.onSave?.())}
        </>
      )}
      <EmojiPicker
        trigger={<Icon name="smile" widthHeight={18} strokeWidth={2} />}
        aria-label={s.labels.emoji}
        isDisabled={s.locked}
        onPointerDown={preserve}
        onMouseDown={preserve ? (event) => event.preventDefault() : undefined}
        onOpen={() => {
          s.holdSelection.current = true;
        }}
        onClose={() => {
          s.holdSelection.current = false;
        }}
        showRecentEmojis={false}
        onChange={(emoji) => s.replace(emoji)}
        views={{
          container: { width: 'auto' },
          trigger: {
            width: controlSize,
            height: controlSize,
            minHeight: controlSize,
            boxSizing: 'border-box',
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}
      />
    </Horizontal>
  );
}

export function BlockEditorPanels({
  state: s,
  views,
}: {
  state: BlockEditorState;
  views?: BlockEditorProps['views'];
}) {
  if (!s.ai && !s.linkOpen) return null;
  return (
    <Vertical
      padding={16}
      gap={12}
      borderWidth={1}
      borderColor="color-gray-200"
      borderRadius={12}
      {...views?.panel}
    >
      {s.linkOpen && (
        <Vertical role="group" aria-label={s.labels.link} gap={8}>
          <TextField
            label={s.labels.linkUrl}
            value={s.link}
            isAutoFocus
            onChange={s.setLink}
          />
          <Horizontal gap={8}>
            <Button
              type="button"
              isDisabled={s.locked}
              onClick={() => s.format('link', s.link.trim())}
            >
              {s.labels.apply}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                s.setLinkOpen(false);
                s.restoreSelection();
              }}
            >
              {s.labels.cancel}
            </Button>
          </Horizontal>
        </Vertical>
      )}
      {s.ai && (
        <Vertical role="region" aria-label={s.labels.aiPanel} gap={8}>
          <Text>
            {s.ai.scope === 'section'
              ? s.labels.askSection
              : s.labels.askSelection}
          </Text>
          <Text>{s.ai.fragment}</Text>
          <TextArea
            label={s.labels.instruction}
            value={s.ai.prompt}
            isAutoFocus
            isDisabled={s.locked || s.ai.state === 'loading'}
            onChange={(prompt) =>
              s.setAi((previous) => previous && { ...previous, prompt })
            }
          />
          {s.ai.state === 'loading' && (
            <Text role="status">{s.labels.generating}</Text>
          )}
          {s.ai.state === 'error' && (
            <Text role="alert">{s.labels.aiError}</Text>
          )}
          {s.ai.state === 'proposal' && (
            <Vertical gap={8}>
              <Text fontWeight="700">{s.labels.proposal}</Text>
              <Text>{s.ai.result}</Text>
            </Vertical>
          )}
          {s.stale && <Text role="status">{s.labels.stale}</Text>}
          <Horizontal gap={8} flexWrap="wrap">
            {s.ai.state === 'proposal' && (
              <Button
                type="button"
                isDisabled={s.locked || s.stale}
                onClick={s.applyAi}
              >
                {s.labels.apply}
              </Button>
            )}
            <Button
              type="button"
              isDisabled={
                s.locked ||
                s.stale ||
                s.ai.state === 'loading' ||
                !s.ai.prompt.trim()
              }
              onClick={() => void s.runAi()}
            >
              {s.ai.state === 'proposal' || s.ai.state === 'error'
                ? s.labels.retry
                : s.labels.generate}
            </Button>
            <Button type="button" variant="ghost" onClick={s.closeAi}>
              {s.labels.discard}
            </Button>
          </Horizontal>
        </Vertical>
      )}
    </Vertical>
  );
}
