import React, { useMemo } from 'react';
import { Text, Vertical, View } from 'app-studio';
import { BlockContent } from '../../BlockEditor/BlockEditor/BlockEditor.content';
import { parseDocument } from '../../BlockEditor/BlockEditor/BlockEditor.model';
import { MarkdownProps } from './Markdown.props';

export function MarkdownContent({
  value,
  label,
  onLinkPress,
  labels,
  views = {},
  native = false,
  codeFontFamily = 'monospace',
  ...props
}: MarkdownProps & { native?: boolean; codeFontFamily?: string }) {
  const document = useMemo(() => parseDocument(value), [value]);
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
            {value}
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
              />
            </View>
          ))
      )}
    </Vertical>
  );
}
