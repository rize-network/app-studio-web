import React, { useState } from 'react';
import { AttachmentGroup } from 'src/components/AttachmentGroup/AttachmentGroup';
import { Button } from 'src/components/Button/Button';
import { Vertical } from 'app-studio';

export function AttachmentGroupExample() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Vertical gap={16}>
      <Button
        variant="outline"
        onClick={() =>
          setFiles([
            new File(['Sample report'], 'report.txt', { type: 'text/plain' }),
          ])
        }
      >
        Add sample attachment
      </Button>
      <AttachmentGroup
        files={files}
        onRemove={(index) => setFiles(files.filter((_, i) => i !== index))}
      />
    </Vertical>
  );
}
