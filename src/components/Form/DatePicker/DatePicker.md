### **Default**

```jsx
<DatePicker />
```

### **Disabled**

“**_isDisabled_**” makes the field unusable and unwritable.

```tsx
<DatePicker name="disabled" isDisabled />
```

### **Read Only**

“**_isReadOnly_**” makes the field readable but not writable. Can only read the the date.

```tsx
<DatePicker name="readOnly" isReadOnly />
```

### **Size**

“**_size_**” modifies the date picker's font size and label. The default value is "md.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={10}>
  <DatePicker name="xs" size="xs" />
  <DatePicker name="sm" size="sm" />
  <DatePicker name="md" size="md" />
  <DatePicker name="lg" size="lg" />
  <DatePicker name="xl" size="xl" />
</Vertical>;
```

### **Color Scheme**

“**_colorScheme_**” property modifies the background color of the datePicker.

```jsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={15}>
  {["theme.primary", "theme.secondary", "theme.error", "theme.success", "warning"].map((color) => (
    <DatePicker key={color} name={color} colorScheme={color} />
  ))}
</Vertical>;
```

### **Error**

“**_error_**” indicate the presence of an issue or problem with the field

```tsx
<DatePicker id="error" name="error" error />
```

### **Helper Text**

“**_helperTex_**t” a text to provides additional information about the field.

```jsx
<DatePicker
  id="helper"
  name="helper"
  helperText="Please select another date"
  error
/>
```

### **Shadow**

“**_shadow_**” applies a shadow effects to the date picker.

```tsx
<DatePicker
  name="shadow"
  shadow={{
    boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px",
  }}
/>
```

### **Styles**

“**_styles”_** is used to customize the appearance of both the DatePicker and its associated label.

```tsx
<DatePicker
  colorScheme="theme.primary"
  styles={{
    datePicker: { borderRadius: 10, borderColor: "color.purple" },
    label: { color: "color.purple" },
  }}
/>
```

## Types

```tsx static
type Size = "sm" | "md" | "lg" | "xl";
```

```jsx static
type Styles = {
  box?: CSSProperties,
  text?: CSSProperties,
  label?: CSSProperties,
  helperText?: CSSProperties,
  field?: CSSProperties,ssss
};
```
