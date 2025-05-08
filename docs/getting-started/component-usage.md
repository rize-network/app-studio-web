# Component Usage Guide

This guide provides an overview of how to use components from the App Studio Web Component Library in your application.

## Basic Component Usage

Most components can be imported directly from the library and used with their default props:

```jsx
import React from 'react';
import { Button, Text } from '@app-studio/web';

function MyComponent() {
  return (
    <div>
      <Text>Click the button below</Text>
      <Button onClick={() => alert('Button clicked!')}>Click Me</Button>
    </div>
  );
}
```

## Component Props

Each component accepts a set of props that control its appearance and behavior. Common props include:

- `variant`: Controls the visual style (e.g., 'default', 'primary', 'secondary')
- `size`: Controls the size (e.g., 'xs', 'sm', 'md', 'lg', 'xl')
- `shape`: Controls the shape (e.g., 'sharp', 'rounded', 'pillShaped')
- `isDisabled`: Controls whether the component is disabled
- `views`: Allows for custom styling of specific parts of the component

Example with props:

```jsx
import React from 'react';
import { Button } from '@app-studio/web';

function MyComponent() {
  return (
    <Button 
      variant="primary"
      size="lg"
      shape="pillShaped"
      isDisabled={false}
      views={{ container: { backgroundColor: 'blue' } }}
      onClick={() => alert('Button clicked!')}
    >
      Click Me
    </Button>
  );
}
```

## Layout Components

Layout components help structure your UI. The main layout components are:

- `View`: Base container component
- `Horizontal`: Horizontal flex container
- `Vertical`: Vertical flex container
- `Center`: Centered flex container

Example:

```jsx
import React from 'react';
import { View, Horizontal, Vertical, Center, Text, Button } from '@app-studio/web';

function MyLayout() {
  return (
    <View padding={20}>
      <Vertical gap={16}>
        <Text>Header</Text>
        <Horizontal gap={8} justifyContent="space-between">
          <Button>Left Button</Button>
          <Button>Right Button</Button>
        </Horizontal>
        <Center>
          <Text>Centered Content</Text>
        </Center>
      </Vertical>
    </View>
  );
}
```

## Form Components

Form components can be used standalone or integrated with Formik:

### Standalone Usage

```jsx
import React, { useState } from 'react';
import { TextField, Button } from '@app-studio/web';

function MyForm() {
  const [value, setValue] = useState('');
  
  return (
    <form onSubmit={(e) => { e.preventDefault(); alert(`Submitted: ${value}`); }}>
      <TextField 
        label="Name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

### Formik Integration

```jsx
import React from 'react';
import { Formik, Form } from 'formik';
import { FormikTextField, Button } from '@app-studio/web';

function MyFormikForm() {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(values) => alert(`Submitted: ${values.name}`)}
    >
      <Form>
        <FormikTextField name="name" label="Name" />
        <Button type="submit">Submit</Button>
      </Form>
    </Formik>
  );
}
```

## Compound Components

Some components use the compound component pattern, where a main component has sub-components for different parts:

```jsx
import React from 'react';
import { Card, Text, Button, Horizontal } from '@app-studio/web';

function MyCard() {
  return (
    <Card>
      <Card.Header>
        <Text fontWeight="bold" fontSize={18}>Card Title</Text>
      </Card.Header>
      <Card.Content>
        <Text>This is the card content.</Text>
      </Card.Content>
      <Card.Footer>
        <Horizontal justifyContent="flex-end" gap={10}>
          <Button variant="outline">Cancel</Button>
          <Button>Submit</Button>
        </Horizontal>
      </Card.Footer>
    </Card>
  );
}
```

## Theming

Components automatically use the theme from the ThemeProvider context. You can override the theme mode for specific components:

```jsx
import React from 'react';
import { ThemeProvider, Button } from '@app-studio/web';

function MyThemedApp() {
  return (
    <ThemeProvider theme={{ mode: 'light' }}>
      <Button>Light Theme Button</Button>
      <Button themeMode="dark">Dark Theme Button</Button>
    </ThemeProvider>
  );
}
```

## Custom Styling

You can customize component styling using the `views` prop:

```jsx
import React from 'react';
import { Button } from '@app-studio/web';

function MyCustomButton() {
  return (
    <Button
      views={{
        container: {
          backgroundColor: '#6200ee',
          borderRadius: 8,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      Custom Styled Button
    </Button>
  );
}
```

## Next Steps

- [Theming Guide](../design-system/theming.md)
- [Form Components Guide](../component-usage/form-components.md)
- [Layout Components Guide](../component-usage/layout-components.md)
