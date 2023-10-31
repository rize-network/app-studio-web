### **Import**

```tsx static
import { Modal } from 'app-studio';
```

### **Default**

It uses the isOpen and onClose properties to display the modal.

```tsx
import { Button } from '../Button/Button';
import { useState } from 'react';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)} isAuto>
    Open Modal
  </Button>
  <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
    <Modal.Container>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal.Container>
  </Modal.Overlay>
</>;
```

## **Modal Overlay**

It represents the overlay or backdrop that appears behind the modal content when the modal is displayed.

### **FullScreen**

“**is*fullScreen***” property changes the width and height of the modal so that it fits the entire screen.

```tsx
import { Button } from '../Button/Button';
import { useState } from 'react';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)} isAuto>
    Full Screen
  </Button>
  <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
    <Modal.Container isFullScreen>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal.Container>
  </Modal.Overlay>
</>;
```

### **Position**

“**_position_**” places the modal in the specified direction. It has a default positioning of “center”.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Horizontal } from '../Layout/Horizontal/Horizontal';

const [showTop, setShowTop] = useState(false);
const [showBottom, setShowBottom] = useState(false);
const [showRight, setShowRight] = useState(false);
const [showLeft, setShowLeft] = useState(false);
const [showCenter, setShowCenter] = useState(false);

<>
  <Horizontal gap={10} wrap="nowrap">
    <Button onClick={() => setShowTop(true)}>Top</Button>
    <Button onClick={() => setShowBottom(true)}>Bottom</Button>
    <Button onClick={() => setShowRight(true)}>Right</Button>
    <Button onClick={() => setShowLeft(true)}>Left</Button>
    <Button onClick={() => setShowCenter(true)}>Center</Button>
  </Horizontal>

  {showBottom && (
    <Modal.Overlay isOpen={showBottom} onClose={() => setShowBottom(false)} position="bottom">
      <Modal.Container>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowBottom(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showTop && (
    <Modal.Overlay isOpen={showTop} onClose={() => setShowTop(false)} position="top">
      <Modal.Container>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowTop(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showLeft && (
    <Modal.Overlay isOpen={showLeft} onClose={() => setShowLeft(false)} position="left">
      <Modal.Container>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowLeft(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showRight && (
    <Modal.Overlay isOpen={showRight} onClose={() => setShowRight(false)} position="right">
      <Modal.Container>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowRight(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showCenter && (
    <Modal.Overlay isOpen={showCenter} onClose={() => setShowCenter(false)} position="center">
      <Modal.Container>
        <Modal.Header>Title</Modal.Header>
        <Modal.Body>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
          Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
          nisl consectetur et.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowCenter(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

### **Blur**

“**_blur_**” adds a blur effect on the modal overlay.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)}>Blur Overlay</Button>
  <Modal.Overlay isOpen={show} onClose={() => setShow(false)} blur={10}>
    <Modal.Container>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal.Container>
  </Modal.Overlay>
</>;
```

### **Prevent Close**

“**_isClosePrevented_**” prevents the user from closing the modal when clicking outside of it.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)} isAuto>
    Prevent Close on Overlay
  </Button>
  <Modal.Overlay isOpen={show} onClose={() => setShow(false)} isClosePrevented>
    <Modal.Container>
      <Modal.Header>Title</Modal.Header>
      <Modal.Body>
        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam.
        Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
        nisl consectetur et.
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setShow(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal.Container>
  </Modal.Overlay>
</>;
```

## **Modal Container**

It represents the main container or wrapper that holds all the content and components of a modal.

### **Shapes**

“**_shape_**” gives a sharp or rounded edges to the modal container.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { Horizontal } from '../Layout/Horizontal/Horizontal';

const [showSharp, setShowSharp] = useState(false);
const [showRounded, setShowRounded] = useState(false);

<>
  <Horizontal gap={10}>
    <Button onClick={() => setShowSharp(true)}>Sharp</Button>
    <Button onClick={() => setShowRounded(true)}>Rounded</Button>
  </Horizontal>

  {showSharp && (
    <Modal.Overlay isOpen={showSharp} onClose={() => setShowSharp(false)}>
      <Modal.Container variant="sharp">
        <Modal.Body>
          <Text isTruncated maxLines={2}>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Text>
        </Modal.Body>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showRounded && (
    <Modal.Overlay isOpen={showRounded} onClose={() => setShowRounded(false)}>
      <Modal.Container variant="rounded">
        <Modal.Body>
          <Text isTruncated maxLines={2}>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Text>
        </Modal.Body>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

### **Shadow**

“**_shadow_**” adds a shadow effect on the modal container.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)}>Shadow</Button>

  {show && (
    <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
      <Modal.Container shadow={{ boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.6)' }}>
        <Modal.Body>
          <Text isTruncated maxLines={2}>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget
            quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et.
          </Text>
        </Modal.Body>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

## **Modal Header**

It represents the header section of a modal, which typically contains a title or heading and optionally other elements such as a close button or additional controls.

### **Close Button Alignment**

“**_buttonPosition_**” places the closing button found in the header modal in the specified direction. It has a default position of “**right**”.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Horizontal } from '../Layout/Horizontal/Horizontal';

const [showRight, setShowRight] = useState(false);
const [showWithout, setShowWithout] = useState(false);
const [showLeft, setShowLeft] = useState(false);

<>
  <Horizontal gap={10}>
    <Button onClick={() => setShowRight(true)} isAuto>
      Close button on the right
    </Button>
    <Button onClick={() => setShowWithout(true)} isAuto>
      Without Close Button
    </Button>
    <Button onClick={() => setShowLeft(true)} isAuto>
      Without Close left
    </Button>
  </Horizontal>
  {showRight && (
    <Modal.Overlay isOpen={showRight} onClose={() => setShowRight(false)}>
      <Modal.Container>
        <Modal.Header> Close Button</Modal.Header>
        <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowRight(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showWithout && (
    <Modal.Overlay isOpen={showWithout} onClose={() => setShowWithout(false)}>
      <Modal.Container>
        <Modal.Header buttonPosition="none"> Close Button</Modal.Header>
        <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowWithout(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
  {showLeft && (
    <Modal.Overlay isOpen={showLeft} onClose={() => setShowLeft(false)}>
      <Modal.Container>
        <Modal.Header buttonPosition="left">Close Button</Modal.Header>
        <Modal.Body>Cras mattis consectetur purus sit amet fermentum.</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowLeft(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

## **Modal Body**

It represents the main content area of a modal, where the primary information or user interaction elements are displayed.

### **LargeContent**

A vertical scroll is displayed, if the content height exceed the body height.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)}>Scroll</Button>
  {show && (
    <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
      <Modal.Container>
        <Modal.Header buttonPosition="none">
          <Text size="lg" weight="semibold">
            Title
          </Text>
        </Modal.Header>
        <Modal.Body height="200px">
          Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
          consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur
          purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit
          amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet Cras
          mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
          consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur
          purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit
          amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
          fermentum.Cras mattis consectetur purus sit amet fermentum.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

## **Modal Footer**

It represents the footer section of a modal, which typically contains buttons or controls for actions related to the modal's content.

```tsx
import { useState } from 'react';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const [show, setShow] = useState(false);

<>
  <Button onClick={() => setShow(true)}>Footer</Button>
  {show && (
    <Modal.Overlay isOpen={show} onClose={() => setShow(false)}>
      <Modal.Container>
        <Modal.Header buttonPosition="none">
          <Text size="lg" weight="semibold">
            Title
          </Text>
        </Modal.Header>
        <Modal.Body height="200px">
          Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
          consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur
          purus sit amet fermentum.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal.Container>
    </Modal.Overlay>
  )}
</>;
```

## **Types**

```tsx static
type Position = 'top' | 'left' | 'right' | 'bottom' | 'center';
```

```tsx static
type Shape = 'sharp' | 'rounded';
```

```tsx static
type CloseButtonPosition = 'left' | 'right' | 'none';
```

```tsx static
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
```

## **Default Styles**

#### **OverlayAlignments**

```tsx static
const OverlayAlignments: Record<Position, CSSProperties> = {
  center: { justifyContent: 'center', alignItems: 'center' },
  top: { justifyContent: 'center' },
  right: { justifyContent: 'flex-end', alignItems: 'center' },
  bottom: { justifyContent: 'center', alignItems: 'flex-end' },
  left: { alignItems: 'center' },
};
```

#### **ContainerShapes**

```tsx static
const ContainerShapes: Record<Shape, CSSProperties> = {
  sharp: { borderRadius: 0 },
  rounded: { borderRadius: 4 },
};
```

#### **HeaderIconSizes**

```tsx static
const HeaderIconSizes: Record<Size, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};
```
