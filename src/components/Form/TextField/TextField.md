### Import

```tsx static
import { TextField } from "app-studio";
```

### Default

It has the attribute “name” as required, with type equals to “text” and isClearable set to true.

```tsx
<TextField name="default" placeholder="Enter your name..." />
```

### Disabled

“**_isDisabled_**” makes the text field unusable.

```tsx
<TextField name="disabled" value="Disabled" isDisabled />
```

### Read Only

“**_isReadOnly_**” makes the input field readable but not writable. Can only read the element.

```tsx
<TextField name="readOnly" value="Sarah" isReadOnly />
```

### Clear

“**_isClearable_**” adds a clear button in the input field. The button will erase the existing data in the input field. By default, it is set to true.

```tsx
<TextField name="clear" isClearable />
```

### Sizes

“**_size_**” changes the text size of the input field. It has a default value of “md”.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={10} width="300px">
  <TextField name="xs" placeholder="xs" size="xs" />
  <TextField name="sm" placeholder="sm" size="xs" />
  <TextField name="md" placeholder="md" size="md" />
  <TextField name="lg" placeholder="lg" size="lg" />
  <TextField name="xl" placeholder="xl" size="md" />
</Vertical>;
```

### Variants

“**_variant_**” changed the input styles. It has a default value of “outline”.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={10} width="300px">
  {["default", "outline", "none"].map((variant, index) => (
    <TextField
      key={index}
      name={variant}
      placeholder={variant}
      variant={variant}
    />
  ))}
</Vertical>;
```

### Label

“**_label_**” adds a label above the input field.

```tsx
<TextField name="label" label="Label" />
```

### Shadow

“**_shadow_**” adds a shadow effect to the text field.

```tsx
<TextField
  name="surname"
  label="Surname"
  shadow={{ boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px" }}
/>
```

### Child

“**_child_**” property allows you to place an element to the left or right of the text field.

```tsx
import { ProfileSvg } from "../../Svg/Profile";
import { EditSvg } from "../../Svg/Edit";

<TextField
  name="name"
  placeholder="Name"
  leftchild={<ProfileSvg size={12} />}
  rightChild={<EditSvg size={12} />}
/>;
```

### ColorScheme

“**_colorScheme_**” changes the label and border color .

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";

<Vertical gap={10} width="300px">
  <TextField name="surname" label="Surname" colorScheme="theme.secondary" />
  <TextField name="name" label="Name" colorScheme="theme.primary" variant="outline" />
</Vertical>;
```

### Styles

“**_styles_**” changes the style of the input field.

```tsx
<TextField
  name="surname"
  label="Surname"
  variant="none"
  isClearable="false"
  shadow={{ boxShadow: "rgba(0, 0, 0, 0.20) 0px 3px 8px" }}
  styles={{
    box: { borderRadius: 8, borderColor: 'theme.primary',
        borderStyle: 'solid',
        borderWidth: 1, },
    field: { color: "theme.primary"  },
    label: { color: "theme.primary"  },
  }}
/>
```

### Error

“**_error_**” if true, indicates that the text field value failed the validation criteria.

```tsx
<TextField placeholder="Enter your address..." error />
```

### Helper Text

“**_helperText_**” provides information about the field.

```tsx
<TextField error helperText="Enter your address!" />
```

### **Types**

```tsx static
type Variant = "outline" | "default" | "none";
```

```tsx static
type Shape = "default" | "sharp" | "rounded" | "pillShaped";
```

```tsx static
type Size = "xs" | "sm" | "md" | "lg" | "xl";
```

```tsx static
type TextFieldStyles = {
  box?: CSSProperties;
  text?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  field?: CSSProperties;
};
```

## _Default Values_

```tsx static
const Shapes: Record<Shape, number | string> = {
  default: "6px 6px 0 0",
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};
```
