### **Import**

```tsx static
import { Avatar } from '@app-studio/web';
```

### **Default**

```tsx
import React from 'react';
import { Avatar } from '../Avatar';

export const DefaultDemo = () => (
  <Avatar src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg" />
);
```

### **size**

"size is an optional property of type Size to set the size of the avatar."

```tsx
import React from 'react';
import { Vertical } from 'src/components/Layout/Vertical/Vertical';
import { Avatar } from '../Avatar';
import { Size } from '../Avatar/Avatar.type';

export const SizeDemo = () => {
  return (
    <Vertical gap={10}>
      {['xs', 'sm', 'md', 'lg', 'xl'].map((size, index) => (
        <Avatar
          key={index}
          src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
          size={size as Size}
        />
      ))}
    </Vertical>
  );
};
```

### **fallback**

"fallback is an optional string for a fallback image URL, in case the src fails to load."

```tsx
import React from 'react';
import { Avatar } from '../Avatar';

export const FallbackDemo = () => <Avatar src="" fallback="ML" />;
```

### **styles**

"styles is an optional property for custom styling of the Avatar component, following the AvatarStyles type."

```tsx
import React from 'react';
import { Avatar } from '../Avatar';

export const StylesDemo = () => {
  return (
    <Avatar
      src="https://t3.ftcdn.net/jpg/06/17/13/26/360_F_617132669_YptvM7fIuczaUbYYpMe3VTLimwZwzlWf.jpg"
      styles={{
        container: {
          boxShadow: 'none', // Add shadow effect
        },
        fallback: {
          color: 'theme.secondary',
        },
        image: {
          objectFit: 'fill',
        },
      }}
    />
  );
};
```