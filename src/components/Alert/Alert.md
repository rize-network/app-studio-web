# Alert

Displays an alert message with optional custom icon and styles

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
"Optional property for providing a custom icon."

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
"Style or behavior variant for the Alert component."

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
"Custom styles object for the Alert component."

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

