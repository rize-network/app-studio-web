import React, { useState } from 'react';
import { Text, Vertical } from 'app-studio';
import { BlockEditor } from '../BlockEditor';
import type { BlockEditorProps } from '../BlockEditor/BlockEditor.props';
import { EmojiPicker } from '../../EmojiPicker/EmojiPicker';

export const sampleDocument =
  '# Project notes\n\nSelect text to format it, insert an emoji, or ask for a proposal.\n\n## Tasks\n\n- Write the brief\n  - Review it together\n- Ship the first version\n\n1. Explore\n2. Build\n\n> Keep the smallest complete solution.\n\n```ts\nconst ready = true;\n```\n\n| Step | Status | Owner |\n| --- | --- | --- |\n| Design | Done | Team |';

export const simulatedGenerate: NonNullable<
  BlockEditorProps['generate']
> = async (prompt, fragment) => `${fragment}\n\nSuggestion: ${prompt}`;

export const simulatedUpload: NonNullable<
  BlockEditorProps['uploadMedia']
> = async (file, { signal }) => {
  if (signal.aborted) throw new Error('cancelled');
  await new Promise<void>((resolve, reject) => {
    const cancel = () => {
      clearTimeout(timer);
      reject(new Error('cancelled'));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', cancel);
      resolve();
    }, 500);
    signal.addEventListener('abort', cancel, { once: true });
  });
  // Demo only: the selected bytes are never sent or stored. Return a fixed public example.
  return file.type.startsWith('video/')
    ? {
        type: 'video',
        url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
      }
    : { type: 'image', url: '/orange.webp' };
};

export function ControlledBlockEditor() {
  const [value, setValue] = useState(sampleDocument);
  const [saved, setSaved] = useState(value);
  return (
    <Vertical gap={8}>
      <Text>
        Simulated AI and upload callbacks. No LLM/provider is configured;
        selected files are not sent or stored. Upload inserts a fixed example
        URL.
      </Text>
      <BlockEditor
        value={value}
        onChange={setValue}
        generate={simulatedGenerate}
        uploadMedia={simulatedUpload}
        label="Project document"
        onSave={() => setSaved(value)}
        status={
          <Text role="status">
            {saved === value
              ? 'Saved locally in this example'
              : 'Unsaved changes'}
          </Text>
        }
      />
    </Vertical>
  );
}

export function AIBlockEditor() {
  return (
    <Vertical gap={8}>
      <Text>Simulated AI callback; no network requests.</Text>
      <BlockEditor
        defaultValue="Select this sentence to request a change."
        label="AI example"
        generate={simulatedGenerate}
      />
    </Vertical>
  );
}

export function ReactionPickerExample() {
  const [selected, setSelected] = useState<string[]>(['👍']);
  return (
    <EmojiPicker
      mode="reaction"
      selectedEmojis={selected}
      onChange={(emoji) =>
        setSelected((previous) =>
          previous.includes(emoji)
            ? previous.filter((item) => item !== emoji)
            : [...previous, emoji]
        )
      }
      views={{
        container: { width: 'auto' },
        trigger: { minWidth: 44, minHeight: 44 },
      }}
    />
  );
}

export function BlockEditorExamples() {
  return (
    <Vertical gap={32}>
      <ControlledBlockEditor />
      <AIBlockEditor />
      <BlockEditor
        label="Read-only document"
        value={sampleDocument}
        isReadOnly
      />
      <BlockEditor
        label="Source fallback"
        defaultValue={'# Preserved source\n\n<CustomComponent value={42} />'}
      />
      <ReactionPickerExample />
    </Vertical>
  );
}
