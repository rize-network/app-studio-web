# KeywordsInput Component

A powerful and flexible keywords/tags input component for React applications. This component allows users to add, remove, and manage a list of keywords with various customization options.

## Features

- ✅ **Multiple Input Methods**: Add keywords using Enter, comma, space, or tab
- ✅ **Validation**: Configurable min/max length, duplicate prevention, and maximum count limits
- ✅ **Customizable Styling**: Full control over appearance with the `views` prop
- ✅ **Accessibility**: Keyboard navigation and screen reader support
- ✅ **Form Integration**: Works seamlessly with Formik and other form libraries
- ✅ **TypeScript Support**: Fully typed with comprehensive interfaces
- ✅ **Responsive Design**: Adapts to different screen sizes and containers

## Quick Start

```tsx
import React, { useState } from 'react';
import { KeywordsInput } from '@app-studio/web';

function MyComponent() {
  const [keywords, setKeywords] = useState(['react', 'typescript']);

  return (
    <KeywordsInput
      label="Skills"
      value={keywords}
      onChange={setKeywords}
      placeholder="Type and press Enter to add skills..."
      helperText="Add your technical skills"
      maxKeywords={10}
      allowDuplicates={false}
    />
  );
}
```

## Advanced Usage

### With Validation and Custom Separators

```tsx
<KeywordsInput
  label="Project Tags"
  value={tags}
  onChange={setTags}
  separators={['enter', 'comma', 'space']}
  minKeywordLength={3}
  maxKeywordLength={20}
  maxKeywords={8}
  allowDuplicates={false}
  placeholder="Add project tags..."
  helperText="3-20 characters, no duplicates, max 8 tags"
/>
```

### Custom Styling

```tsx
<KeywordsInput
  label="Custom Styled Tags"
  value={tags}
  onChange={setTags}
  views={{
    keyword: {
      backgroundColor: 'theme.primary',
      borderColor: 'theme.primary',
    },
    keywordText: {
      color: 'color.white',
    },
    inputContainer: {
      borderColor: 'theme.primary',
      borderWidth: '2px',
    },
  }}
/>
```

### Formik Integration

```tsx
import { Formik, Form } from 'formik';
import { FormikKeywordsInput } from '@app-studio/web';

<Formik
  initialValues={{ skills: [] }}
  onSubmit={(values) => console.log(values)}
>
  <Form>
    <FormikKeywordsInput
      name="skills"
      label="Technical Skills"
      maxKeywords={10}
      helperText="Add your technical skills"
    />
  </Form>
</Formik>
```

## Component Architecture

The KeywordsInput component follows the established patterns in the codebase:

```
KeywordsInput/
├── KeywordsInput.tsx              # Main component
├── KeywordsInput/
│   ├── KeywordsInput.props.ts     # Props and interfaces
│   ├── KeywordsInput.state.ts     # State management hook
│   ├── KeywordsInput.view.tsx     # View component
│   └── KeywordsInput.type.ts      # Type definitions
├── examples/                      # Example components
│   ├── Default.tsx               # Various usage examples
│   └── index.ts                  # Exports
└── README.md                     # This file
```

## Key Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string[]` | - | Controlled keywords array |
| `onChange` | `(keywords: string[]) => void` | - | Change handler |
| `maxKeywords` | `number` | - | Maximum number of keywords |
| `separators` | `KeywordSeparator[]` | `['enter', 'comma']` | Input triggers |
| `allowDuplicates` | `boolean` | `false` | Allow duplicate keywords |
| `minKeywordLength` | `number` | `1` | Minimum keyword length |
| `maxKeywordLength` | `number` | `50` | Maximum keyword length |
| `isRemovable` | `boolean` | `true` | Can remove keywords |

## Keyboard Shortcuts

- **Enter**: Add current input as keyword
- **Comma**: Add current input as keyword (if enabled)
- **Space**: Add current input as keyword (if enabled)
- **Tab**: Add current input as keyword (if enabled)
- **Backspace**: Remove last keyword when input is empty

## Accessibility

The component includes:
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader announcements
- Focus management
- High contrast support

## Testing

The component includes comprehensive tests covering:
- Basic functionality (add/remove keywords)
- Validation (length, duplicates, max count)
- Keyboard interactions
- Accessibility features
- Error states
- Custom configurations

Run tests with:
```bash
npm test KeywordsInput.test.tsx
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

When contributing to this component:

1. Follow the existing code patterns
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test across different browsers
