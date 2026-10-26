import React, { useState } from 'react';
import { BlockEditor } from 'src/components/BlockEditor/BlockEditor';
import { Text, Vertical } from 'app-studio';

export function BlockEditorExample() {
  const [value, setValue] = useState(
    '# Project notes\n\nSelect a block to edit its content.'
  );
  const [saved, setSaved] = useState('');
  return (
    <Vertical gap={16} width="100%">
      <BlockEditor
        label="Project notes"
        value={value}
        onChange={setValue}
        onSave={() => setSaved(value)}
      />
      <Text role="status">
        {saved ? 'Document saved in this example.' : 'Changes stay local.'}
      </Text>
    </Vertical>
  );
}
