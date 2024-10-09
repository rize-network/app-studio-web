### **Import**

```tsx static
import { Vertical } from "@app-studio/web";
```

### **Default**

Flex direction is set as “column.

```tsx
import { View } from "../View/View";

<Vertical>
  <View height={50} backgroundColor="theme.primary" />
  <View height={50} backgroundColor="theme.secondary" />
  <View height={50} backgroundColor="theme.warning" />
</Vertical>;
```

### **Wrap**

“**_wrap_**” specifies if the items should be wrap or not based on the available space on the line. By default, wrap is set to “wrap”.

**Example**

```tsx
import { Horizontal } from "../Horizontal/Horizontal";
import { View } from "../View/View";

const size = {
  width: 50,
  height: 50,
};

<Horizontal gap={5} justifyContent="space-evenly">
  {["wrap", "nowrap", "wrap-reverse"].map((wrapping, index) => (
    <View key={index}>
      <View>{wrapping}</View>
      <Vertical flexWrap={wrapping} gap={5} height={200} flex={1}>
        <View backgroundColor="theme.primary" {...size} />
        <View backgroundColor="theme.secondary" {...size} />
        <View backgroundColor="theme.warning" {...size} />
        <View backgroundColor="theme.success" {...size} />
        <View backgroundColor="theme.error" {...size} />
        <View backgroundColor="color.blue" {...size} />
      </Vertical>
    </View>
  ))}
</Horizontal>;
```

## **Reverse**

“**_isReversed_**” renders the items in the reverse order at the end of the main axis.

```tsx
import { View } from "../View/View";

<Vertical isReversed gap={5}>
  <View height={50} backgroundColor="theme.primary" />
  <View height={50} backgroundColor="theme.secondary" />
  <View height={50} backgroundColor="theme.warning" />
</Vertical>;
```

## **Justify**

“**_justify_**” with type “Justify”, aligns the elements of the container according to the available space.

```tsx
import { Horizontal } from "../Horizontal/Horizontal";
import { View } from "../View/View";

const size = {
  width: 50,
  height: 50,
};

<Horizontal gap={20} flexWrap="nowrap" justifyContent="space-between">
  {[
    "flex-start",
    "flex-end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ].map((justify) => (
    <Vertical flex={1}>
      {justify}
      <Vertical
        justifyContent={justify}
        gap={5}
        height={300}
        backgroundColor="lightgray"
      >
        <View backgroundColor="theme.primary" {...size} />
        <View backgroundColor="theme.secondary" {...size} />
        <View backgroundColor="theme.warning" {...size} />
      </Vertical>
    </Vertical>
  ))}
</Horizontal>;
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
