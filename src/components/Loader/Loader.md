### Import

```tsx static
import { Loading } from 'app-studio';
```

### Default

```tsx
<Loading />
```

### Sizes

“**_size_**” changes the the loader size. It has type “Size” with a default value of “_md_”.

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal wrap="nowrap">
  {['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'].map((size) => (
    <Loading key={size} size={size} />
  ))}
</Horizontal>;
```

### Types

“**_type_**” property is used to change the default loader. It has a type "LoaderType”.

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly">
  {['default', 'quarter', 'dotted'].map((type) => (
    <Loading key={type} type={type} />
  ))}
</Horizontal>;
```

### Speed

“**_speed_**” makes the loader rotate faster. It has a type “[Speed”](https://www.notion.so/c8ba3ae395a0419c8e55a250b7744f69).

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly">
  {['slow', 'normal', 'fast'].map((speed) => (
    <Loading key={speed} speed={speed} />
  ))}
</Horizontal>;
```

### Color

“**_color_**” changes the style colour of the text and the loader.

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly">
  <Loading loaderColor="black" textColor="black">
    Submitting
  </Loading>
  <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="left">
    Submitting
  </Loading>
</Horizontal>;
```

### TextPosition

“**_text_**” includes a description with the loader.

```tsx
import { Horizontal } from '../Layout/Horizontal/Horizontal';

<Horizontal justifyContent="space-evenly">
  <Loading loaderColor="black" textColor="black">
    Submitting
  </Loading>
  <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="top">
    Submitting
  </Loading>
  <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="bottom">
    Submitting
  </Loading>
  <Loading loaderColor="theme.primary" textColor="theme.primary" textPosition="left">
    Submitting
  </Loading>
</Horizontal>;
```

## Types

```tsx static
type LoaderType = 'default' | 'quarter' | 'dotted';
```

```tsx static
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

```tsx static
type TextPosition = 'top' | 'right' | 'bottom' | 'left';
```

```tsx static
type Speed = 'fast' | 'normal' | 'slow';
```
