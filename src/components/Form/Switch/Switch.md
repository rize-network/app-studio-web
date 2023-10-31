### **Import**

```tsx static
import { Switch } from 'app-studio';
```

### **Default**

```tsx
<Switch />
```

### **Checked**

“**_isChecked_**” is the toggle's initial state. It has a default value of false.

```tsx
<Switch name="checked" isChecked />
```

### **Disabled**

“**_isDisabled_**” makes the toggle unusable.

```tsx
<Switch name="disabled" isDisabled />
```

### **Read Only**

“**_isReadOnly_**” makes the toggle only readable. The user will be unable to change the state of the toggle.

```tsx
<Switch name="readOnly" isReadOnly isChecked />
```

### **Sizes**

“**_size_**” changes the toggle size. It has a default value of “sm”.

```tsx
import { Vertical } from '../../Layout/Vertical/Vertical';

<Vertical gap={10}>
  <Switch name="xs" size="xs" isChecked />
  <Switch name="sm" size="sm" isChecked />
  <Switch name="md" size="md" isChecked />
  <Switch name="lg" size="lg" isChecked />
  <Switch name="xl" size="xl" isChecked />
</Vertical>;
```

### **Shadow**

“**_shadow_**” adds a shadow effect to the toggle.

```tsx
<Switch id="checkbox" name="shadow" shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }} isChecked />
```

### **Child**

“**_activeChild_**” and “**_inActiveChild_**” add a child to the toggle for each state. It includes the "activeChild" when it is active and the "inActiveChild" when it is not.

```tsx
import { Text } from '../../Text/Text';

<Switch
  activeChild={
    <Text color="white" size="sm">
      On
    </Text>
  }
  inActiveChild={
    <Text color="white" size="xs">
      Off
    </Text>
  }
/>;
```

### **ColorScheme**

“**_colorScheme_**” modifies the toggle's background color.

```tsx
<Switch name="name" colorScheme="theme.primary" isChecked />
```

## **Types**

```tsx static
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

```tsx static
type SwitchStyles = {
  slider?: CSSProperties;
  circle?: CSSProperties;
};
```

## **Default Values**

```tsx static
const KnobSizes: Record<Size, CSSProperties> = {
  xs: { height: 6, width: 6 },
  sm: { height: 9, width: 9 },
  md: { height: 12, width: 12 },
  lg: { height: 15, width: 15 },
  xl: { height: 18, width: 18 },
};
```

```tsx static
const SliderPadding: Record<Size, string> = {
  xs: '0 2px',
  sm: '0 3px',
  md: '0 5px',
  lg: '0 6px',
  xl: '0 8px',
};
```

```tsx static
const SliderSizes: Record<Size, CSSProperties> = {
  xs: {
    height: 16,
    width: 28,
  },
  sm: {
    height: 20,
    width: 36,
  },
  md: {
    height: 24,
    width: 44,
  },
  lg: {
    height: 28,
    width: 52,
  },
  xl: {
    height: 32,
    width: 60,
  },
};
```
