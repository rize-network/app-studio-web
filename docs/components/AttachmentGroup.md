
# AttachmentGroup

The `AttachmentGroup` component displays a list of file attachments, typically used in chat interfaces or upload previews. It supports displaying thumbnails for images and videos, and generic icons for other file types. It also provides a mechanism to remove attachments.

## Import

```tsx
import { AttachmentGroup } from 'src/components/AttachmentGroup/AttachmentGroup';
```

## Usage

```tsx
import React, { useState } from 'react';
import { AttachmentGroup } from 'src/components/AttachmentGroup/AttachmentGroup';

const MyComponent = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AttachmentGroup 
      files={files} 
      onRemove={handleRemove} 
      showPreviews={true} 
    />
  );
};
```

## Props

| Prop | Type | Default | Description |
|Data | | | |
| `files` | `File[]` | (required) | Array of File objects to display. |
| `onRemove` | `(index: number) => void` | (required) | Callback function fired when the remove button is clicked. |
| `showPreviews` | `boolean` | `false` | Whether to show hover previews for supported file types. |
| `layout` | `'inline' \| 'grid'` | `'inline'` | Layout mode for the attachments. |
| `maxHeight` | `string` | `'120px'` | Maximum height of the container container before scrolling. |
| `sandboxId` | `string` | - | Optional ID for sandbox context (if applicable). |
| `views` | `object` | `{}` | Custom styles for internal sub-components (`container`, `item`, `name`, etc.). |
