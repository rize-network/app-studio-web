# ToggleGroup

Allows users to manage a group of toggle buttons.

### **Import**
  ```tsx static
  import { ToggleGroup } from '@app-studio/web';
  ```

### **Default**
```tsx
import React from 'react';
import { ToggleGroup } from '../ToggleGroup';

export const DefaultDemo = () => {
  const items = [
    { id: 'B', value: 'B' },
    { id: 'C', value: 'C' },
    { id: 'D', value: 'D' },
  ];
  return <ToggleGroup items={items} />;
};

```

### **shape**
"Defines the shape of the toggle buttons."

```tsx
import React from 'react';
import { DustBinSvg } from 'src/components/Svg';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';
import { Horizontal } from 'src/components/Layout/Horizontal/Horizontal';
import { View } from 'src/components/Layout/View/View';

export const ShapeDemo = () => {
  const items = [
    {
      id: 'item',
      value: <DustBinSvg color="black" size={18} />,
      isActive: true,
    },
  ];
  return (
    <Horizontal gap={15}>
      {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
        <View position="relative" key={index}>
          <ToggleGroup items={items} shape={border as Shape} />
        </View>
      ))}
    </Horizontal>
  );
};

```

### **items**
"An array of toggle items to display and manage."

```tsx
import React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from 'src/components/Text/Text';

export const ItemsDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return <ToggleGroup items={items} />;
};

```

### **variant**
"The visual style variant of the toggle group."

```tsx
import React from 'react';
import { Text } from 'src/components/Text/Text';
import { ToggleGroup } from '../ToggleGroup';
import { Variant } from '../ToggleGroup/ToggleGroup.type';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

export const VariantDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return (
    <Vertical gap={15}>
      {['outline', 'link', 'ghost'].map((variant, index) => (
        <ToggleGroup key={index} items={items} variant={variant as Variant} />
      ))}
    </Vertical>
  );
};

```

### **colorScheme**
"The color scheme of the toggle component."

```tsx
import React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';
import { Text } from 'src/components/Text/Text';

export const ColorSchemeDemo = () => {
  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text>, isActive: true },
    { id: 'D', value: <Text>D</Text>, isDisabled: true },
  ];
  return (
    <Vertical gap={10}>
      {[
        'theme.primary',
        'theme.secondary',
        'theme.warning',
        'theme.success',
        'theme.error',
      ].map((color, index) => (
        <ToggleGroup key={index} items={items} colorScheme={color} />
      ))}
    </Vertical>
  );
};

```

### **onToggleChange**
"Callback function that is called when the active state of any toggle changes."

```tsx
import React, { useState } from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from 'src/components/Text/Text';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';

export const OnToggleChangeDemo = () => {
  const [newItems, setNewItems] = useState<any>([]);

  const items = [
    { id: 'B', value: <Text>B</Text> },
    { id: 'C', value: <Text>C</Text> },
    { id: 'D', value: <Text>D</Text> },
  ];
  return (
    <Vertical gap={10}>
      <ToggleGroup
        items={items}
        onToggleChange={(items) => setNewItems(items)}
      />
      Selected: {newItems}
    </Vertical>
  );
};

```

