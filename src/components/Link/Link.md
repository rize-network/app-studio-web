### **Import**

```tsx static
import { Link } from "@app-studio/web";
```

### **Default**

```tsx
<Link>Click Me</Link>
```

### **Underline**

“**_underline_**” modifies the text decoration of the link. It has a type TextDecorationStyle.

```tsx
import { Vertical } from "../Layout/Vertical/Vertical";
import { Text } from "../Text/Text";

<Vertical gap={10}>
  <Link href="https://www.npmjs.com/package/app-studio" underline="default">
    Default
  </Link>
  <Link
    href="https://www.npmjs.com/package/app-studio"
    underline="hover"
    color="black"
  >
    Hover
  </Link>
  <Link
    href="https://www.npmjs.com/package/app-studio"
    underline="underline"
    color="theme.primary"
  >
    <Text>Underline</Text>
  </Link>
</Vertical>;
```

### **IsExternal**

“**_isExternal_**” enables the opening of URL links in a new tab. When set to true, it adds an icon on the right side of the link content, visually indicating that it is an external link.

```tsx
import { Text } from "../Text/Text";
<Link
  href={"https://www.npmjs.com/package/app-studio"}
  iconSize="md"
  isExternal
>
  <Text size="2xl">External</Text>
</Link>;
```

### Types

```tsx static
type TextDecorationStyle = "default" | "hover" | "underline";
```
