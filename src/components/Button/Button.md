### **Import**

```tsx static
import { Button } from 'app-studio';
```

### **Default**

```tsx
import { Center } from '../Layout/Center/Center';

<Center width="100%">
  <Button>Push Me</Button>
</Center>;
```

### **Disabled**

“isDisabled” makes the button unusable and un-clickable with a “disabled” look.

```tsx
import { Center } from '../Layout/Center/Center';
<Center width="100%">
  <Button isDisabled>Disabled</Button>
</Center>;
```

### **Size**

“size” alters the padding, text size, and border of the button. This attribute belongs to the "Sizes" type and has a default value of "md".

```jsx
import { Vertical } from '../Layout/Vertical/Vertical';

<Vertical gap={10}>
  {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
    <Button key={index} size={size}>
      {size}
    </Button>
  ))}
  <Button isAuto>Auto Width</Button>
  <Button isFilled>Full Width</Button>
</Vertical>;
```

### **ColorScheme**

“colorScheme” allows you to modify the background color of the button. It accepts a value from the "ColorThemes" type, with the default color set to "theme.primary".

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly" gap={10}>
  {['theme.primary', 'theme.secondary', 'theme.warning', 'theme.success', 'theme.error'].map((color, index) => (
    <Button key={index} colorScheme={color} isAuto>
      {color}
    </Button>
  ))}
</Horizontal>;
```

### **Shadow**

"shadow" attribute applies a shadow effect to the button.

```tsx
import { Center } from '../Layout/Center/Center';
<Center width="100%">
  <Button shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}>Click Me</Button>
</Center>;
```

### **Loader**

"isLoader" and "loading" attributes display a loading animation, which indicates that an action is in progress.

```tsx
import { Loader } from '../Loader/Loader';
import { Text } from '../Text/Text';
import { Center } from '../Layout/Center/Center';

<Center width="100%">
  <Button isLoader>
    <Loader loaderColor="white" />
    <Text size="sm">Submitting</Text>
  </Button>
</Center>;
```

### **Variant**

"variant" allows for the customization of the button's styles. The attribute belongs to the "Variants" type and has a default variant of "filled".

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly" gap={10}>
  {['filled', 'outline', 'link', 'ghost'].map((variant, index) => (
    <Button key={index} variant={variant} colorScheme="theme.primary" isAuto>
      {variant}
    </Button>
  ))}
</Horizontal>;
```

### **Shape**

“shape” property changes the edges of the button. This property belongs to the "Shapes" type and has a default value of "rounded".

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly" wrap="nowrap" gap={10}>
  {['sharp', 'rounded', 'pillShaped'].map((border, index) => (
    <Button key={index} shape={border} isAuto>
      {border}
    </Button>
  ))}
</Horizontal>;
```

### **Icon**

“icon” provides the flexibility to incorporate any desired icon within the button.

```tsx
import { Center } from '../Layout/Center/Center';
import { DustBinSvg } from '../Svg/DustBin';

<Center justifyContent="space-evenly">
  <Button icon={<BsBucket size={24} />} height={48}>
    Delete
  </Button>
  <Button height={48} icon={<DustBinSvg size={24} />} shape={'pillShaped'} iconPosition="right" colorScheme="theme.secondary">
    Delete
  </Button>
  <Button icon={<DustBinSvg size={24} />} colorScheme="color.black" isIconRounded isAuto />
</Center>;
```

### Types

#### Sizes

```tsx static
type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

#### Variants

```tsx static
type Variants = 'filled' | 'outline' | 'link' | 'ghost';
```

#### IconPositions

```tsx static
type IconPositions = 'left' | 'right';
```

#### Shapes

```tsx static
type Shapes = 'sharp' | 'rounded' | 'pillShaped';
```
