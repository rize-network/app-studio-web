import React from 'react';
import { Button } from '../../Button/Button';
import { BlockEditorState } from './BlockEditor.state';

export function BlockEditorUpload({
  state: s,
  disabled,
}: {
  state: BlockEditorState;
  disabled: boolean;
}) {
  return (
    <Button isDisabled={disabled} onClick={() => void s.chooseMedia()}>
      {s.labels.upload}
    </Button>
  );
}
