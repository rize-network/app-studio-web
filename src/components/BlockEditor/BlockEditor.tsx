import React from 'react';
import { BlockEditorProps } from './BlockEditor/BlockEditor.props';
import { useBlockEditorState } from './BlockEditor/BlockEditor.state';
import { BlockEditorView } from './BlockEditor/BlockEditor.view';

export const BlockEditor: React.FC<BlockEditorProps> = (props) => {
  const state = useBlockEditorState(props);
  return <BlockEditorView {...props} state={state} />;
};
