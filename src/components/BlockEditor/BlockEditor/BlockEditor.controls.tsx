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
import { BlockEditorUpload } from './BlockEditor.upload';

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
          {button('link', s.openLink)}
          {props.generate &&
            button('askSelection', () => s.openAi('selection'), !selected)}
        </>
      ) : (
        <>
          {button('undo', () => s.undo(), !s.canUndo)}
          {button('redo', () => s.undo(true), !s.canRedo)}
          {button('media', s.openMedia)}
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
  floating = false,
  uploadEnabled = false,
}: {
  state: BlockEditorState;
  views?: BlockEditorProps['views'];
  floating?: boolean;
  uploadEnabled?: boolean;
}) {
  if (!s.ai && !s.linkOpen && !s.media) return null;
  return (
    <Vertical
      padding={16}
      gap={12}
      borderWidth={floating ? 0 : 1}
      borderColor="color-gray-200"
      borderRadius={12}
      {...views?.panel}
    >
      {s.media && (
        <Vertical
          as={floating ? 'form' : undefined}
          role="group"
          aria-label={s.labels.media}
          gap={8}
          minWidth={floating ? 280 : undefined}
          onSubmit={
            floating
              ? (event: React.FormEvent) => {
                  event.preventDefault();
                  if (!['loading', 'picking', 'stale'].includes(s.media!.phase))
                    s.insertMedia();
                }
              : undefined
          }
        >
          <Text>{s.labels.mediaSource}</Text>
          <Horizontal gap={8}>
            {(['image', 'video'] as const).map((type) => (
              <Button
                key={type}
                type="button"
                variant={s.media!.type === type ? 'solid' : 'outline'}
                aria-pressed={s.media!.type === type}
                isDisabled={
                  s.locked ||
                  ['loading', 'picking', 'stale'].includes(s.media!.phase)
                }
                onClick={() => s.changeMedia({ type })}
              >
                {s.labels[type]}
              </Button>
            ))}
          </Horizontal>
          <TextField
            label={s.labels.mediaUrl}
            value={s.media.url}
            isAutoFocus
            isDisabled={
              s.locked ||
              ['loading', 'picking', 'stale'].includes(s.media.phase)
            }
            onChange={(url) => s.changeMedia({ url })}
          />
          <TextField
            label={s.labels.mediaDescription}
            value={s.media.description}
            isDisabled={
              s.locked ||
              ['loading', 'picking', 'stale'].includes(s.media.phase)
            }
            onChange={(description) => s.changeMedia({ description })}
          />
          {s.media.error && <Text role="alert">{s.media.error}</Text>}
          {s.media.phase === 'stale' && (
            <Text role="status">{s.labels.mediaStale}</Text>
          )}
          {['loading', 'picking'].includes(s.media.phase) ? (
            <>
              <Text role="status">
                {s.media.phase === 'picking'
                  ? s.labels.pickingMedia
                  : s.labels.uploading}
              </Text>
              <Button type="button" onClick={s.cancelMediaUpload}>
                {s.labels.cancelUpload}
              </Button>
            </>
          ) : (
            <Horizontal gap={8} flexWrap="wrap">
              <Button
                type={floating ? 'submit' : 'button'}
                isDisabled={
                  s.locked || s.media.phase === 'stale' || !s.media.url.trim()
                }
                onClick={floating ? undefined : () => s.insertMedia()}
              >
                {s.labels.apply}
              </Button>
              {uploadEnabled && (
                <BlockEditorUpload
                  state={s}
                  disabled={s.locked || s.media.phase === 'stale'}
                />
              )}
              {s.media.phase === 'error' && s.media.file && uploadEnabled && (
                <Button
                  type="button"
                  isDisabled={s.locked}
                  onClick={() => void s.uploadFile(s.media!.file!)}
                >
                  {s.labels.retry}
                </Button>
              )}
            </Horizontal>
          )}
          <Button type="button" variant="ghost" onClick={() => s.closeMedia()}>
            {s.labels.cancel}
          </Button>
        </Vertical>
      )}
      {s.linkOpen && (
        <Vertical
          as={floating ? 'form' : undefined}
          role="group"
          aria-label={s.labels.link}
          gap={8}
          minWidth={floating ? 260 : undefined}
          onSubmit={
            floating
              ? (event: React.FormEvent) => {
                  event.preventDefault();
                  s.format('link', s.link.trim());
                }
              : undefined
          }
        >
          <TextField
            label={s.labels.linkUrl}
            value={s.link}
            isAutoFocus
            onChange={s.setLink}
          />
          {s.message && <Text role="alert">{s.message}</Text>}
          <Horizontal gap={8}>
            <Button
              type={floating ? 'submit' : 'button'}
              isDisabled={s.locked}
              onClick={
                floating ? undefined : () => s.format('link', s.link.trim())
              }
            >
              {s.labels.apply}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                s.closeLink();
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
            <Button type="button" variant="ghost" onClick={() => s.closeAi()}>
              {s.labels.discard}
            </Button>
          </Horizontal>
        </Vertical>
      )}
    </Vertical>
  );
}
