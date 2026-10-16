import React, { useMemo, useRef } from 'react';
import { Animation, Text, Vertical, View } from 'app-studio';
import { BlockContent } from '../../BlockEditor/BlockEditor/BlockEditor.content';
import {
  DisplayBlock,
  parseDocument,
} from '../../BlockEditor/BlockEditor/BlockEditor.model';
import { MarkdownProps } from './Markdown.props';
import { useMarkdownTyping } from './useMarkdownTyping';

export function MarkdownContent({
  value,
  label,
  onLinkPress,
  renderLink,
  allowImages = true,
  allowVideos = true,
  renderVideo,
  typing,
  isStreaming,
  onTypingComplete,
  labels,
  views = {},
  native = false,
  codeFontFamily = 'monospace',
  ...props
}: MarkdownProps & { native?: boolean; codeFontFamily?: string }) {
  const { displayedText, isTyping } = useMarkdownTyping(value, {
    typing,
    isStreaming,
    onTypingComplete,
  });
  const previous = useRef<DisplayBlock[]>([]);
  const document = useMemo(() => {
    const parsed = parseDocument(displayedText, previous.current, undefined, {
      display: true,
    });
    previous.current = parsed.blocks;
    return parsed;
  }, [displayedText]);
  return (
    <Vertical
      gap={12}
      minWidth={0}
      {...(native
        ? { accessibilityLabel: label }
        : { role: label ? 'region' : undefined, 'aria-label': label })}
      {...props}
      {...views.container}
    >
      {document.sourceMode ? (
        <>
          <Text {...views.notice}>
            {labels?.sourceFallback ??
              'This Markdown contains unsupported syntax. Its source is shown as plain text.'}
          </Text>
          <Text
            fontFamily={codeFontFamily}
            {...(native
              ? { selectable: true }
              : {
                  style: { whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' },
                })}
            {...views.source}
          >
            {displayedText}
          </Text>
        </>
      ) : (
        document.blocks
          .filter((block) => block.raw)
          .map((block) => (
            <View key={block.id} minWidth={0} {...views.block}>
              <BlockContent
                block={block}
                native={native}
                codeFontFamily={codeFontFamily}
                isDisplay
                onLinkPress={onLinkPress}
                renderLink={renderLink}
                allowImages={allowImages}
                allowVideos={allowVideos}
                renderVideo={renderVideo}
              />
            </View>
          ))
      )}
      {isTyping && (
        <View
          as="span"
          width={2}
          height={16}
          backgroundColor="color-gray-700"
          {...(native
            ? { accessibilityElementsHidden: true }
            : { 'aria-hidden': true })}
          animate={Animation.flash({
            duration: '0.8s',
            iterationCount: 'infinite',
          })}
        />
      )}
    </Vertical>
  );
}
