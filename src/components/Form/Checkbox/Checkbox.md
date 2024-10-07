### **Import**

```tsx static
import { Checkbox } from "@app-studio/web";
```

### **Default**

```tsx
<Checkbox>Agree to Terms and Conditions</Checkbox>
```

### **Disabled**

“isDisabled” makes the Checkbox unusable and un-clickable with a “disabled” look.

```tsx
<Checkbox isDisabled>Disable</Checkbox>
```

### **Read Only**

“isReadOnly” makes the field readable but not writable. Can only read the element.

```tsx
<Checkbox isReadOnly isChecked>
  Read Only
</Checkbox>
```

### **Indeterminate**

“isIndeterminant” indicates that the checkbox is never checked or unchecked.

```tsx
<Checkbox id="indeterminate" name="indeterminate" isIndeterminate>
  Select All
</Checkbox>
```

### **Size**

"size" property allows you to adjust the size of the checkbox. By default, it is set to "md" (medium) size.

```jsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={10}>
  <Checkbox  size="xs" isChecked>
    xs
  </Checkbox>
  <Checkbox size="sm" isChecked>
    sm
  </Checkbox>
  <Checkbox size="md" isChecked>
    md
  </Checkbox>
  <Checkbox size="lg" isChecked>
    lg
  </Checkbox>
  <Checkbox size="xl" isChecked>
    xl
  </Checkbox>
</Vertical>;
```

### **ColorScheme**

“colorScheme” allows you to modify the background color of the Checkbox. It accepts a value from the "ColorThemes" type, with the default color set to "theme.primary".

```tsx
import { Horizontal } from "../../Layout/Horizontal/Horizontal";

<Horizontal justifyContent="space-evenly" gap={10}>
  {["theme.primary", "theme.secondary", "theme.error", "theme.success", "theme.warning"].map(
    (color, index) => (
      <Checkbox key={index} name="name" colorScheme={color} isChecked>
        {color}
      </Checkbox>
    )
  )}
</Horizontal>;
```

### **Shadow**

"shadow" attribute applies a shadow effect to the Checkbox.

```tsx
<Checkbox shadow={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)" }}>
  Accept
</Checkbox>
```

### **Styles**

“styles” enables you to customize the styling of the input field.

```tsx
<Checkbox
  styles={{
    checkbox: { borderRadius: 10,
       borderColor: 'theme.primary',
        borderStyle: 'solid',
        borderWidth: 1 },
    label: { color: "teal" },
  }}
>
  Enable
</Checkbox>
```

### Types

#### Sizes

```tsx static
type Size = "xs" | "sm" | "md" | "lg" | "xl";
```

#### Styles

```tsx static
type CheckboxStyles = {
  checkbox?: CSSProperties;
  label?: CSSProperties;
};
```
