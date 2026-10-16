
# DropZone

The `DropZone` component provides a drag-and-drop area for file uploads. It extends the functionality of the `Uploader` component but offers a specific UI optimized for dropping files. It supports single and multiple file selection, custom content, and image previews.

## Import

```tsx
import { DropZone } from 'src/components/DropZone/DropZone';
```

## Usage

### Basic Usage

```tsx
import { DropZone } from 'src/components/DropZone/DropZone';

const MyComponent = () => {
  const handleFileSelect = (file: File) => {
    console.log('Selected:', file);
  };

  return (
    <DropZone onFileSelect={handleFileSelect} />
  );
};
```

### Multiple Files with Preview

```tsx
import { DropZone } from 'src/components/DropZone/DropZone';

const MyComponent = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleMultipleFileSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemove = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <DropZone 
      multiple
      selectedFiles={files}
      onMultipleFileSelect={handleMultipleFileSelect}
      onRemove={handleRemove}
      text="Drop files here"
    />
  );
};
```

## Props

The `DropZone` component accepts all props from `UseUploadProps` (shared with `Uploader`) plus the following specific props:

| Prop | Type | Default | Description |
|Data | | | |
| `children` | `React.ReactNode` | - | Custom content to render inside the drop zone when no preview is active. |
| `text` | `string` | `'Drop files...'` | Text to display when no children are provided. |
| `textProps` | `TextProps` | - | Props for the text element. |
| `containerProps` | `ViewProps` | - | Props for the main container (e.g., height, background). |
| `disabled` | `boolean` | `false` | Disables drag-and-drop and click interactions. |
| `previewUrl` | `string` | - | External URL to display as a preview image (overrides internal logic). |
| `imageProps` | `ImageProps` | - | Props for the preview image element. |
| `selectedFiles` | `File[]` | - | Array of files to display (using `AttachmentGroup`) in multi-file mode. |
| `onRemove` | `(index: number) => void` | - | Callback when a file is removed from the selected list in multi-file mode. |

### Inherited Props (UseUploadProps)

| Prop | Type | Description |
|Data | | |
| `accept` | `string` | Accepted file types (e.g., `'image/*'`). |
| `multiple` | `boolean` | Whether multiple files can be selected. |
| `onFileSelect` | `(file: File) => void` | Callback for single file selection. |
| `onMultipleFileSelect` | `(files: File[]) => void` | Callback for multiple file selection. |
| `validateFile` | `(file: File) => string \| null` | Function to validate files before acceptance. |
