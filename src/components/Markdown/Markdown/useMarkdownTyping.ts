import { useEffect, useMemo, useRef, useState } from 'react';
import { MarkdownTypingOptions } from './Markdown.props';
import { useMarkdownReducedMotion } from './Markdown.motion';

export type MarkdownTypingResult = { displayedText: string; isTyping: boolean };

const segmenter =
  typeof Intl.Segmenter === 'function'
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : undefined;

export function useMarkdownTyping(
  value: string,
  {
    typing = false,
    isStreaming = false,
    onTypingComplete,
  }: MarkdownTypingOptions = {}
): MarkdownTypingResult {
  const reducedMotion = useMarkdownReducedMotion();
  // Engines without grapheme segmentation show the full text instead of splitting a composed character.
  const enabled = !!typing && !reducedMotion && !!segmenter;
  const config = typeof typing === 'object' ? typing : undefined;
  const step = Math.max(
    1,
    Math.floor(
      Number.isFinite(config?.charsPerTick) ? config!.charsPerTick! : 3
    )
  );
  const interval = Math.max(
    1,
    Number.isFinite(config?.intervalMs) ? config!.intervalMs! : 16
  );
  const [frame, setFrame] = useState(() => ({
    value,
    length: enabled ? 0 : value.length,
  }));
  const previous = useRef(value);
  const completed = useRef<string | null>(null);
  const callback = useRef(onTypingComplete);
  callback.current = onTypingComplete;
  const ends = useMemo(
    () => [
      0,
      ...Array.from(
        segmenter?.segment(value) ?? [],
        (part) => part.index + part.segment.length
      ),
    ],
    [value]
  );
  // The final streamed grapheme may still receive a combining mark or another emoji joiner.
  const targetIndex = Math.max(0, ends.length - (isStreaming ? 2 : 1));
  const targetLength = ends[targetIndex];
  const limit = value.startsWith(frame.value)
    ? Math.min(frame.length, targetLength)
    : 0;
  let index = 0;
  while (index + 1 < ends.length && ends[index + 1] <= limit) index++;
  const length = enabled ? ends[index] : value.length;
  const displayedText = value.slice(0, length);
  const latest = useRef({ value, ends, index, targetIndex });
  latest.current = { value, ends, index, targetIndex };
  const advancing = enabled && length < targetLength;

  useEffect(() => {
    if (!value.startsWith(previous.current)) completed.current = null;
    previous.current = value;
  }, [value]);
  useEffect(() => {
    if (isStreaming) completed.current = null;
  }, [isStreaming]);
  useEffect(() => {
    if (!enabled)
      setFrame((current) =>
        current.value === value && current.length === value.length
          ? current
          : { value, length: value.length }
      );
  }, [enabled, value]);
  useEffect(() => {
    if (!advancing) return;
    const timer = setInterval(() => {
      const current = latest.current;
      setFrame({
        value: current.value,
        length:
          current.ends[Math.min(current.index + step, current.targetIndex)],
      });
    }, interval);
    return () => clearInterval(timer);
  }, [advancing, step, interval]);
  useEffect(() => {
    if (
      typing &&
      value &&
      !isStreaming &&
      length === value.length &&
      completed.current !== value
    ) {
      completed.current = value;
      callback.current?.();
    }
  }, [value, typing, isStreaming, length]);
  return {
    displayedText,
    isTyping: enabled && (length < value.length || isStreaming),
  };
}
