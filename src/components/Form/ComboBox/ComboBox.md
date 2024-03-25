# ComboBox

A customizable dropdown list with optional search functionality.

### **Import**

```tsx static
import { ComboBox } from '@app-studio/web';
```

### **Default**

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const DefaultDemo = () => {
  const items = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
  ];
  return <ComboBox id="default" name="default" items={items} />;
};
```

### **onSelect**

"Optional callback function triggered when an item is selected."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';
import { Vertical } from '../../../Layout';
import { MessageLayout, showMessage } from '../../..';

export const OnSelectDemo = () => {
  const items = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];
  return (
    <Vertical gap={15}>
      <ComboBox
        id="onSelect"
        items={items}
        onSelect={(item) => {
          showMessage('success', `Item selected: ${item.label}`);
        }}
      />
      <MessageLayout position="bottomRight" />
    </Vertical>
  );
};
```

### **searchEnabled**

"Flag to enable search functionality within the ComboBox."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const SearchEnabledDemo = () => {
  const items = [
    {
      value: 'next.js',
      label: 'Next.js',
    },
    {
      value: 'sveltekit',
      label: 'SvelteKit',
    },
    {
      value: 'nuxt.js',
      label: 'Nuxt.js',
    },
    {
      value: 'remix',
      label: 'Remix',
    },
    {
      value: 'astro',
      label: 'Astro',
    },
  ];
  return <ComboBox id="searchEnabled" items={items} searchEnabled={false} />;
};
```

### **left**

"Optional element to display on the left side of the ComboBox."

```tsx
import React from 'react';
import { Badge } from '../../..';
import { ComboBox } from '../ComboBox';

export const LeftDemo = () => {
  const items = [
    {
      value: 'enhancement',
      label: 'Enhancement',
    },
    {
      value: 'bug',
      label: 'Bugs',
    },
  ];

  return (
    <ComboBox
      id="left"
      name="left"
      items={items}
      left={<Badge content="Status" />}
    />
  );
};
```

### **right**

"Optional element to display on the right side of the ComboBox."

```tsx
import React from 'react';
import { Badge } from '../../..';
import { ComboBox } from '../ComboBox';

export const RightDemo = () => {
  const items = [
    {
      value: 'enhancement',
      label: 'Enhancement',
    },
    {
      value: 'bug',
      label: 'Bugs',
    },
  ];

  return (
    <ComboBox id="right" items={items} right={<Badge content="Status" />} />
  );
};
```

### **label**

"Optional label to describe the purpose of the ComboBox."

```tsx
import React from 'react';
import PlusSvg from 'src/components/Svg/Plus';
import { ComboBox } from '../ComboBox';

export const LabelDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox
      id="label"
      name="label"
      label="Status"
      items={items}
      left={<PlusSvg size={12} />}
    />
  );
};
```

### **showTick**

"Flag to show a tick mark next to selected items."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const ShowTickDemo = () => {
  const statuses = [
    {
      value: 'backlog',
      label: 'Backlog',
    },
    {
      value: 'todo',
      label: 'Todo',
    },
    {
      value: 'in progress',
      label: 'In Progress',
    },
    {
      value: 'done',
      label: 'Done',
    },
    {
      value: 'canceled',
      label: 'Canceled',
    },
  ];
  return <ComboBox id="showTick" items={statuses} showTick={false} />;
};
```

### **placeholder**

"Text to display when nothing has been selected in the ComboBox."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const PlaceholderDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox
      id="placeholder"
      name="placeholder"
      placeholder="Select..."
      searchEnabled={false}
      items={items}
    />
  );
};
```

### **styles**

"Optional custom styles to apply to the ComboBox."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const StylesDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox
      id="styles"
      items={items}
      searchEnabled={false}
      styles={{
        container: {
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        },
        item: {
          margin: '10px',
        },
        dropdown: {
          boxShadow:
            'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset',
        },
        text: {
          borderBottom: '1px solid transparent',
        },
      }}
    />
  );
};
```

### **searchPlaceholder**

"Placeholder text for the search input when search is enabled."

```tsx
import React from 'react';
import { ComboBox } from '../ComboBox';

export const SearchPlaceholderDemo = () => {
  const items = [
    {
      value: 'todo',
      label: 'To Do',
    },
    {
      value: 'inprogress',
      label: 'In Progress',
    },
  ];
  return (
    <ComboBox
      id="searchPlaceholder"
      placeholder="Select..."
      searchPlaceholder="FilterStatus.."
      items={items}
    />
  );
};
```
