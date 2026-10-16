import React from 'react';
import { Vertical, Text } from 'app-studio';
import { AttachmentGroup } from '../AttachmentGroup';

// The component reads `name`, `size`, `type` and an optional `url`/`path` for
// previews. We pass lightweight mock file-like objects so the demo renders the
// same UI without needing a real File from a picker.
const files = [
  { name: 'report.pdf', size: 248_000, type: 'application/pdf' },
  { name: 'photo.png', size: 1_240_000, type: 'image/png' },
  { name: 'voice-note.m4a', size: 96_000, type: 'audio/m4a' },
] as any;

export const DefaultAttachmentGroup = () => {
  const [items, setItems] = React.useState(files);
  return (
    <Vertical gap={10} width="100%">
      <Text fontSize={12} color="color-gray-500">
        Chips (no previews)
      </Text>
      <AttachmentGroup
        files={items}
        onRemove={(index) =>
          setItems((prev: any[]) => prev.filter((_, i) => i !== index))
        }
      />
    </Vertical>
  );
};
