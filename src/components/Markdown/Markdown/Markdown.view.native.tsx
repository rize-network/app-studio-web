import React from 'react';
import { Linking, Platform } from 'react-native';
import { MarkdownContent } from './Markdown.content';
import { MarkdownProps } from './Markdown.props';

export function MarkdownView(props: MarkdownProps) {
  return (
    <MarkdownContent
      {...props}
      native
      codeFontFamily={Platform.OS === 'ios' ? 'Menlo' : 'monospace'}
      onLinkPress={
        props.onLinkPress ??
        ((url) => void Linking.openURL(url).catch(() => {}))
      }
    />
  );
}
