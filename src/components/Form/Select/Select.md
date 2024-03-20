### **Import**

```tsx static
import { Select } from "app-studio";
```

### **Default**

```tsx
<Select label="Select an item" options={["Item1", "Item2", "Item3"]} />
```

### **Disabled**

“**_isDisabled_**” makes the select field unclickable.

```tsx
<Select isDisabled options={["Item1", "Item2", "Item3"]} />
```

### **IsReadOnly**

“**_isReadOnly_**” makes the field readable but not writable. Can only read the element.

```tsx
<Select options={["Item1", "Item2", "Item3"]} isReadOnly />
```

### **Sizes**

“**_size_**” changes the text and icon size . It has a default value of “md”.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

const options = ["Item1", "Item2", "Item3"];

<Vertical gap={10}>
  <Select name="xs" size="xs" placeholder="xs" options={options} />
  <Select name="sm" size="sm" placeholder="sm" options={options} />
  <Select name="md" size="md" placeholder="md" options={options} />
  <Select name="lg" size="lg" placeholder="lg" options={options} />
  <Select name="xl" size="xl" placeholder="xl" options={options} />
</Vertical>;
```

### **ColorScheme**

“**_colorScheme_**” modifies the border color of the select field.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={15}>
  {["theme.primary", "theme.secondary", "error", "success", "warning"].map((color) => (
    <Select
      key={color}
      options={["Item1", "Item2", "Item3"]}
      colorScheme={color}
    />
  ))}
</Vertical>;
```

### **Shadow**

“**_shadow_**” adds a shadow effect to the field.

```tsx
<Select
  shadow={{
    boxShadow:
      "rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset",
  }}
  options={["Item1", "Item2", "Item3"]}
/>
```

### **Multiple**

“**_isMulti_**” indicates whether the select component allows the selection of multiple options.

```tsx
<Select
  options={["Item1", "Item2", "Item3"]}
  placeholder="Select an item.."
  isMulti
/>
```

### **Error**

“**error**” indicates whether the field has an error.

```tsx
<Select options={["Item1", "Item2", "Item3"]} error />
```

### **HelperText**

“**_helperText_**” provides additional information about the field.

```tsx
<Select
  options={["Item1", "Item2", "Item3"]}
  helperText="select one item!"
  error
/>
```

### **Styles**

“**_styles_**” changes the style of the select field.

```tsx
<Select
  colorScheme="theme.primary"
  options={["Item1", "Item2", "Item3"]}
  styles={{
    selectBox: { borderRadius: 10,  borderColor: 'theme.primary',
        borderStyle: 'solid',
        borderWidth: 1, },
    text: { color: "theme.primary"  },
    label: { fontWeight: "bold", color: "theme.primary"  },
  }}
/>
```

### **Default Value**

```tsx static
const Sizes: Record<Size, CSSProperties> = {
  xs: { height: 6, width: 6 },
  sm: { height: 12, width: 12 },
  md: { height: 18, width: 18 },
  lg: { height: 24, width: 24 },
  xl: { height: 30, width: 30 },
};
```

```tsx static
const IconSizes: Record<Size, string> = {
  xs: "8px",
  sm: "10px",
  md: "12px",
  lg: "14px",
  xl: "16px",
};
```

### Types

```tsx static
type Size = "xs" | "sm" | "md" | "lg" | "xl";
```

```tsx static
type SelectStyles = {
  box?: CSSProperties;
  text?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};
```
