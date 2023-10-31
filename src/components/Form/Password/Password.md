### **Import**

```tsx static
import { Password } from "app-studio";
```

### **Default**

It has type equals to “password” and isClearable set to false. It has all the props of the TextField component.

```tsx
<Password label="Password" value="123456" />
```

### **Disabled**

“**_isDisabled_**” makes the field unusable.

```tsx
<Password value="password" isDisabled />
```

### **Icon**

“**_visibleIcon_**” and “**_hiddenIcon_**” are icons indicating whether the password is visible or hidden.

```tsx
import { OpenEyeSvg } from "../../Svg/OpenEye";
import { CloseEyeSvg } from "../../Svg/CloseEye";

<Password
  visibleIcon={<OpenEyeSvg size={14} />}
  hiddenIcon={<CloseEyeSvg size={14} />}
/>;
```

### **Error**

“**_error_**” if true, indicates that the text field value failed the validation criteria.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";
import { Button } from "../../Button/Button";
import { OpenEyeSvg } from "../../Svg/OpenEye";
import { CloseEyeSvg } from "../../Svg/CloseEye";

<Password
  placeholder="Password"
  colorScheme="theme.secondary"
  visibleIcon={<OpenEyeSvg size={14} />}
  hiddenIcon={<CloseEyeSvg size={14} />}
  error
/>;
```

### **HelperText**

“**_helperText_**” is a string text used to inform the user that the content of the field is invalid.

```tsx
import { Vertical } from "../../Layout/Vertical/Vertical";
import { Button } from "../../Button/Button";
import { OpenEyeSvg } from "../../Svg/OpenEye";
import { CloseEyeSvg } from "../../Svg/CloseEye";

<Password
  placeholder="Password"
  helperText="Incorrect password"
  visibleIcon={<OpenEyeSvg size={14} />}
  hiddenIcon={<CloseEyeSvg size={14} />}
  error
/>;
```

## **Default Values**

```tsx static
const Shapes: Record<Shape, number | string> = {
  default: "6px 6px 0 0",
  sharp: 0,
  rounded: 4,
  pillShaped: 24,
};
```

## Types

```tsx static
type Variant = "outline" | "default" | "unStyled";
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
  field?: CSSProperties;
  label?: CSSProperties;
  helperText?: CSSProperties;
  text?: CSSProperties;
};
```
