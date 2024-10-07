# ToggleGroup

Enables selection from a group of toggle switches.

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
"Optional shape prop to define the shape of toggle elements."

```tsx
import React from 'react';
import { DustBinSvg } from '../../Svg';
import { ToggleGroup } from '../ToggleGroup';
import { Shape } from '../ToggleGroup/ToggleGroup.type';
import { Horizontal } from '../../Layout/Horizontal/Horizontal';
import { View } from '../../Layout/View/View';

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
"Mandatory array of items defining each toggle in the group."

```tsx
import React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from '../../Text/Text';

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
"Optional variant prop to specify the visual style of the toggle group."

```tsx
import React from 'react';
import { Text } from '../../Text/Text';
import { ToggleGroup } from '../ToggleGroup';
import { Variant } from '../ToggleGroup/ToggleGroup.type';
import { Vertical } from '../../Layout/Vertical/Vertical';

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
"Optional colorScheme prop for theming the toggle group."

```tsx
import React from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { Text } from '../../Text/Text';

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
"Optional callback function that fires when the active toggle changes, providing the IDs of active toggles."

```tsx
import React, { useState } from 'react';
import { ToggleGroup } from '../ToggleGroup';
import { Text } from '../../Text/Text';
import { Vertical } from '../../Layout/Vertical/Vertical';

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

