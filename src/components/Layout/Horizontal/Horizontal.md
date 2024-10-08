### **Import**

```tsx static
import { Horizontal } from "@app-studio/web";
```

### **Default**

Flex direction is set as value “row”.

```tsx
import { View } from "../View/View";

<Horizontal justifyContent="space-evenly" flexWrap="nowrap">
  <View width="100%" height={50} backgroundColor="theme.primary" />
  <View width="100%" height={50} backgroundColor="theme.secondary" />
  <View width="100%" height={50} backgroundColor="theme.warning" />
</Horizontal>;
```

### **Wrap**

“**_wrap_**” specifies if the items should be wrap or not based on the available space on the line.

```tsx
import { View } from "../View/View";
import { Vertical } from "../Vertical/Vertical";

<Horizontal width={100}>
  {["wrap", "nowrap", "wrap-reverse"].map((wrapping) => (
    <Horizontal key={wrapping} flexWrap={wrapping} gap={5} marginTop={10}>
      <View backgroundColor="theme.primary" width={50} height={50} />
      <View backgroundColor="theme.secondary" width={50} height={50} />
      <View backgroundColor="theme.warning" width={50} height={50} />
    </Horizontal>
  ))}
</Horizontal>;
```

### **Reverse**

“**_isReversed_**” renders the items in the reverse order at the end of the main axis.

```tsx
import { View } from "../View/View";

<Horizontal isReversed gap={5}>
  <View width={50} height={50} backgroundColor="theme.primary" />
  <View width={50} height={50} backgroundColor="theme.secondary" />
  <View width={50} height={50} backgroundColor="theme.warning" />
</Horizontal>;
```

### **Justify**

“**_justify_**” with type “Justify”, aligns the elements of the container according to the available space.

```tsx
import { Vertical } from "../Vertical/Vertical";
import { View } from "../View/View";

const size = {
  width: 50,
  height: 50,
};

<Vertical gap={20} flexWrap="nowrap" justifyContent="space-between">
  {[
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ].map((justify) => (
    <Horizontal>
      <View flex={1}>{justify}</View>
      <Horizontal
        flex={4}
        justifyContent={justify}
        gap={5}
        backgroundColor="lightgray"
      >
        <View backgroundColor="theme.primary" {...size} />
        <View backgroundColor="theme.secondary" {...size} />
        <View backgroundColor="theme.warning" {...size} />
      </Horizontal>
    </Horizontal>
  ))}
</Vertical>;
```

## **Types**

```tsx static
type Wrap = "wrap" | "nowrap" | "wrap-reverse";
```

```tsx static
type Justify =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
```
