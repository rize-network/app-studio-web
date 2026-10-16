import React, { useRef } from 'react';
import { Button } from '../../Button/Button';
import { BlockEditorState } from './BlockEditor.state';

export function BlockEditorUpload({
  state: s,
  disabled,
}: {
  state: BlockEditorState;
  disabled: boolean;
}) {
  const input = useRef<HTMLInputElement>(null);
  return (
    <>
      <Button
        type="button"
        isDisabled={disabled}
        onClick={() => input.current?.click()}
      >
        {s.labels.upload}
      </Button>
      <input
        ref={input}
        type="file"
        accept="image/*,video/*"
        hidden
        disabled={disabled}
        onChange={(event) => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.value = '';
          if (file) void s.uploadFile(file);
        }}
      />
    </>
  );
}
