# App Studio Components

![App Studio Components](https://img.shields.io/badge/App%20Studio-Components-blue)
![React](https://img.shields.io/badge/React-18%2B-61DAFB)
![React Native](https://img.shields.io/badge/React%20Native-0.71%2B-20232a)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6)
![License](https://img.shields.io/badge/License-MIT-green)

A comprehensive, accessible, and customizable cross-platform component library built
with TypeScript and [`app-studio`](https://app-studio.dev/). Components ship a
**web** build (React + DOM) and a **React Native** build that share the same
public API — Metro picks platform-specific `.native.tsx` siblings
automatically.

## 🚀 What's Included

- **60+ UI Components** with one API across web and React Native
- **Dual build** — `dist/web/*` for browsers, `dist/native/components/*` for RN
- **ADK Agent Components** for Agent Development Kit integration
- **Cross-platform animations** — `Animation.fadeIn()` etc. play through
  `react-native-reanimated` on RN, CSS keyframes on web
- **Full TypeScript Support** — exports are split via package.json
  `exports`/`react-native` conditions; `customConditions: ["react-native"]`
  lets `tsc` resolve the right typings for consumers
- **Production Ready** — battle-tested in real apps

## 📚 Documentation

- **[Getting Started](./docs/getting-started/introduction.md)** — quick intro & setup
- **[Component Library](./docs/README.md)** — all component pages
- **[React Native guide](./docs/getting-started/react-native.md)** — how the RN
  build works, peer deps, what degrades
- **[ADK Components](./README-ADK.md)** — Agent Development Kit integration
- **[API Integration](./docs/api-integration.md)** — backend integration
- **[Development Guide](./docs/component-development/guide.md)** — contributing

## Installation

### Web

```bash
npm install @app-studio/components app-studio
# peers for the web build
npm install react react-dom react-router-dom formik zustand lucide-react
```

### React Native

```bash
npm install @app-studio/components app-studio
# RN peer deps (the ones marked optional below are only needed if you use the
# corresponding components)
npm install react react-native lucide-react-native
# Optional — gracefully degraded when absent
npm install react-native-svg               # Loader/ProgressBar circle/Accordion chevron
npm install react-native-linear-gradient   # <Gradient/>
npm install react-native-reanimated        # <X animate={Animation.fadeIn()}/>
cd ios && pod install                       # for iOS
```

> See [`app-studio-rn-demo`](../app-studio-rn-demo/) for a working
> typecheck-ready RN consumer sandbox.

## Quick Start

### Web

```tsx
import { Button, Text } from '@app-studio/components';

export function App() {
  return (
    <div>
      <Text>Hello, world!</Text>
      <Button onClick={() => alert('Clicked!')}>Click me</Button>
    </div>
  );
}
```

### React Native

```tsx
import { ThemeProvider, View, Animation } from 'app-studio';
import { Button, Text } from '@app-studio/components';

export default function App() {
  return (
    <ThemeProvider>
      <View padding={16}>
        <Text>Hello from React Native!</Text>
        <Button
          onClick={() => console.log('Clicked!')}
          animate={Animation.fadeIn({ duration: '0.6s' })}
        >
          Click me
        </Button>
      </View>
    </ThemeProvider>
  );
}
```

Metro automatically resolves `Button.view.tsx` → `Button.view.native.tsx` on
native; the `animate` prop is interpreted by Reanimated when the peer is
installed.

## Component Categories

### Layout
View · Center · Horizontal · Vertical · AspectRatio · Separator · Resizable

### Form
Checkbox · Radio · Select · Switch · TextArea · TextField · Password ·
OTPInput · Label · ColorInput · ComboBox · CountryPicker · DatePicker ·
Selector · TagInput

### Navigation
Accordion · Menubar · NavigationMenu · Pagination · Sidebar · Tabs

### Feedback
Alert · Modal · Toast · Tooltip

### Data Display
Avatar · Badge · Card · Table · Chart¹ · ProgressBar · StatusIndicator

### Utility
Button · Gradient · Loader · Text · Title · Icon · Link · Background

### Interactive
Carousel · ContextMenu · DropdownMenu · HoverCard · Slider · Toggle · ToggleGroup ·
ShareButton · Drawer · Sheet · Portal

> ¹ Components marked with a footnote do not have a React Native build (web
> only); they will throw if imported on RN. See the
> [React Native guide](./docs/getting-started/react-native.md) for the full
> compatibility matrix.

## Cross-Platform Notes

| Concern        | Web                              | React Native                                       |
| -------------- | -------------------------------- | -------------------------------------------------- |
| Routing/links  | `react-router-dom`               | `Linking.openURL` for external, `onPress` for nav  |
| Form container | semantic `<form>`                | styled `View`; submit and validation are explicit  |
| Grid layout    | CSS Grid                          | fixed integer columns via flex rows                |
| Portals        | `ReactDOM.createPortal`          | `RN <Modal/>` for overlays; `<Portal/>` is inline  |
| Icons          | `lucide-react` dynamic imports   | `lucide-react-native` (static)                     |
| Animations     | CSS keyframes via `app-studio`   | `react-native-reanimated` (same `Animation` API)   |
| Gradients      | `linear-gradient` CSS            | `react-native-linear-gradient`                     |
| SVG            | inline `<svg>`                   | `react-native-svg` (optional)                      |
| Hover effects  | `_hover`, `useHover`             | no-op stubs (touch-only)                           |

## Design System

All components follow a consistent design system with:

- **Typography**: Inter/Geist font, specific sizes/weights
- **Spacing**: 4px grid system
- **Colors**: Neutral palette with semantic tokens (`theme-primary`,
  `color-gray-500`, …)
- **Rounded corners**: Consistent border radius scale
- **Transitions**: Subtle CSS / Reanimated animations

## Development

### Prerequisites

- Node.js >= 18
- npm or yarn

### Setup

```bash
git clone https://github.com/rize-network/app-studio-components.git
cd app-studio-components
npm install --legacy-peer-deps
npm start                      # Vite dev server (web playground)
```

### Available Scripts

| Script                       | Description                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `npm start`                  | Web dev server                                                                             |
| `npm run build`              | Web library bundle via Vite (`dist/web.*`)                                                 |
| `npm run typecheck:native`   | Strict native TypeScript check (catches RN-incompatible code)                              |
| `npm run build:native`       | Emit `dist/native/components/*.{js,d.ts}` for RN consumers                                 |
| `npm test`                   | Vitest                                                                                     |
| `npm run storybook`          | Storybook                                                                                  |
| `npm run lint:fix`           | ESLint + Prettier                                                                          |

### Creating New Components

```bash
npm run create-structure -- --name=YourComponentName
```

The script scaffolds:

```
src/components/YourComponentName/
├── YourComponentName.tsx           # public wrapper
├── examples/
└── YourComponentName/
    ├── YourComponentName.props.ts
    ├── YourComponentName.state.ts
    ├── YourComponentName.style.ts
    ├── YourComponentName.type.d.ts
    └── YourComponentName.view.tsx
```

If your component uses DOM-only APIs (HTML elements, mouse events, CSS
gradients, portal, etc.), add a `YourComponentName.view.native.tsx` sibling
with the React Native implementation. Metro will pick it automatically.

## Contributing

See the [Contributing Guide](CONTRIBUTING.md). When adding components, also
update:

1. `src/components/index.tsx` (export it)
2. `docs/components/YourComponentName.mdx` (one page per component)
3. The compatibility matrix in
   [`docs/getting-started/react-native.md`](./docs/getting-started/react-native.md)
   if the component has a native sibling.

## License

MIT — see [LICENSE](LICENSE).

## Acknowledgements

- Built with [React](https://react.dev/) and [React Native](https://reactnative.dev/)
- Styled with [App Studio](https://app-studio.dev/)
- Animations via [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- Icons via [Lucide](https://lucide.dev/)
- Form handling via [Formik](https://formik.org/)
- State management via [Zustand](https://github.com/pmndrs/zustand)
