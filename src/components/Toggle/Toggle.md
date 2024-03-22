# Toggle

Provides interactive UI for binary user input

### **Import**
  ```tsx static
  import { Toggle } from '@app-studio/web';
  ```

### **Default**
```tsx
import React from 'react';
import { Toggle } from '../Toggle';

export const DefaultDemo = () => {
  return <Toggle>Default</Toggle>;
};

```

### **shape**
"Optional 'shape' prop to determine the shape of the toggle."

```tsx
import React from 'react';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { Toggle } from '../Toggle';
import { Shape } from '../Toggle/Toggle.type';
import { View } from 'src/components/Layout/View/View';
export const ShapeDemo = () => (
  <Horizontal gap={15}>
    {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
      <View position="relative" key={index}>
        <Toggle shape={border as Shape}>{border}</Toggle>
      </View>
    ))}
  </Horizontal>
);

```

### **isToggled**
"Optional boolean indicating the current state of the toggle."

```tsx
import React from 'react';
import { Toggle } from '../Toggle';

export const IsToggledDemo = () => {
  return (
    <Toggle isToggled={true} isDisabled>
      IsActive
    </Toggle>
  );
};

```

### **isDisabled**
"Optional boolean to specify if the toggle should be disabled."

```tsx
import React from 'react';
import { Toggle } from '../Toggle';

export const IsDisabledDemo = () => {
  return <Toggle isDisabled>IsDisabled</Toggle>;
};

```

### **variant**
"Optional prop to apply predefined style variants."

```tsx
import React from 'react';
import { Toggle } from '../Toggle';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Variant } from '../Toggle/Toggle.type';

export const VariantDemo = () => (
  <Vertical gap={15}>
    {['outline', 'link', 'ghost'].map((variant, index) => (
      <Toggle key={index} variant={variant as Variant}>
        {variant}
      </Toggle>
    ))}
  </Vertical>
);

```

### **colorScheme**
"Optional string to customize the color theme of the toggle component."

```tsx
import React from 'react';
import { Toggle } from '../Toggle';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';

export const ColorSchemeDemo = () => (
  <Horizontal gap={10}>
    {[
      'theme.primary',
      'theme.secondary',
      'theme.warning',
      'theme.success',
      'theme.error',
    ].map((color, index) => (
      <Toggle key={index} colorScheme={color}>
        {color}
      </Toggle>
    ))}
  </Horizontal>
);

```

### **onToggle**
"Optional function prop that gets executed when the toggle state changes."

```tsx
import React from 'react';
import { useState } from 'react';
import { Toggle } from '../Toggle';

export const OnToggleDemo = () => {
  const [isToggle, setIsToggled] = useState(false);
  return (
    <Toggle
      onToggle={(state) => {
        setIsToggled(state);
      }}
    >
      {isToggle ? 'On' : 'Off'}
    </Toggle>
  );
};

```

