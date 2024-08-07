# Alert

Displays an alert with optional icon and customizable styles.

### **Import**

```tsx static
import { Alert } from '@app-studio/web';
```

### **Default**

```tsx
import React from 'react';
import { Alert } from '../Alert';

export const DefaultDemo = () => {
  return (
    <Alert
      title="Heads up!"
      description="You can add components to your app using the cli."
    />
  );
};
```

### **icon**

"Optional icon property, expecting a React node element"

```tsx
import React from 'react';
import { EditSvg } from 'src/components/Svg';
import { Alert } from '../Alert';

export const IconDemo = () => {
  return (
    <Alert
      title="Heads up!"
      description="You can add components to your app using the cli."
      icon={<EditSvg size={24} color="black" />}
    />
  );
};
```

### **variant**

"Optional variant property to determine the style of the alert"

```tsx
import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Alert } from '../Alert';
import { Variant } from '../Alert/Alert.type';

export const VariantDemo = () => (
  <Horizontal gap={10}>
    {['default', 'info', 'warning', 'success', 'error'].map((color, index) => (
      <Alert
        key={index}
        variant={color as Variant}
        title={'Heads Up!'}
        description={'You can add components to your app using the cli.'}
      />
    ))}
  </Horizontal>
);
```

### **styles**

"Optional styles property to apply custom styles to the alert component"

```tsx
import React from 'react';
import { Alert } from '../Alert';

export const StylesDemo = () => (
  <Alert
    title={'Heads Up!'}
    description={'You can add components to your app using the cli.'}
    styles={{
      container: { backgroundColor: 'black' },
      title: { color: 'white' },
      description: { color: 'white' },
      icon: { color: 'white' },
    }}
  />
);
```
