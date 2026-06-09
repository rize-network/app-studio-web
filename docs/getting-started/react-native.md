# React Native Guide

`@app-studio/components` ships a **dual build**: the same imports work on web
(React + DOM) and on React Native. This page covers the RN-specific bits —
peer deps, how the build resolves files, what runs at full fidelity, and what
degrades.

---

## TL;DR

```bash
npm install @app-studio/components app-studio \
  react react-native lucide-react-native \
  react-native-svg react-native-linear-gradient react-native-reanimated
cd ios && pod install
```

```tsx
import { ThemeProvider, View, Animation } from 'app-studio';
import { Button, Text, TextField, Loader } from '@app-studio/components';

export default function App() {
  return (
    <ThemeProvider>
      <View padding={16} gap={12}>
        <Text>Hello from React Native</Text>
        <TextField label="Name" />
        <Button animate={Animation.fadeIn({ duration: '0.5s' })}>
          Press me
        </Button>
        <Loader type="dotted" size="md" />
      </View>
    </ThemeProvider>
  );
}
```

There is a full smoke-test app at `../app-studio-rn-demo/App.tsx` that
exercises Button, TextField, Switch, Loader, Modal, Title, Alert, Tabs,
Tooltip, Gradient, ProgressBar, Pagination and three Animation presets.

---

## How the dual build works

### 1. Package exports

`package.json` exposes the `react-native` condition first:

```json
{
  "exports": {
    ".": {
      "react-native": {
        "types":   "./dist/native/components/index.d.ts",
        "import":  "./dist/native/components/index.js",
        "require": "./dist/native/components/index.cjs",
        "default": "./dist/native/components/index.js"
      },
      "browser": { /* … web build … */ }
    }
  }
}
```

At **runtime** Metro picks the `react-native` branch.  
At **typecheck** time, set `moduleResolution: "bundler"` and
`customConditions: ["react-native"]` in your `tsconfig.json` so TypeScript
follows the same branch (see `app-studio-rn-demo/tsconfig.json` for a
working example).

### 2. Per-component `.native.tsx` siblings

Inside each component folder you'll find:

```
Button/Button/
├── Button.view.tsx          ← web (DOM, CSS, hover, gradients)
└── Button.view.native.tsx   ← React Native (Pressable, no hover)
```

The parent `Button.tsx` does `import ButtonView from './Button/Button.view'`.
- **Metro** has `resolver.sourceExts` ordered as `['native.tsx', 'tsx', …]`,
  so it picks the `.native.tsx`.
- **TypeScript** uses our `moduleSuffixes: [".native", ""]` option to do the
  same when typechecking against the source.

### 3. Shared files

`Button.props.ts`, `Button.state.ts`, `Button.style.ts`, `Button.type.d.ts`
are platform-neutral and shared by both builds.

---

## Required peer deps

| Peer                          | Required for                                   | Optional? |
| ----------------------------- | ---------------------------------------------- | --------- |
| `react`                       | every component                                | no        |
| `react-native`                | every component (RN side)                      | no        |
| `app-studio`                  | every component                                | no        |
| `lucide-react-native`         | every icon (Icon, Pagination chevrons, …)      | yes¹      |
| `react-native-svg`            | Loader (default/dotted/quarter), ProgressBar (circle), Accordion chevron²    | yes       |
| `react-native-linear-gradient`| `<Gradient/>` actual gradients                 | yes       |
| `react-native-reanimated`     | `animate={Animation.…()}` on any component     | yes       |
| `formik`                      | `<Formik/>` integration                        | yes       |
| `zustand`                     | Modal/Toast/Drawer stores                      | no        |

¹ All icon-name exports (`UserIcon`, `SearchIcon`, etc.) will render an empty
wrapper if `lucide-react-native` is missing. Plain `<Icon name="user"/>` also
degrades gracefully.

² Without `react-native-svg`, the Loader falls back to `<ActivityIndicator/>`
and ProgressBar `shape="circle"` falls back to the linear bar.

---

## Compatibility matrix

| Component             | Web | RN  | Notes                                                                                  |
| --------------------- | --- | --- | -------------------------------------------------------------------------------------- |
| Button                | ✅  | ✅  | Animations `borderMoving`/`animatedStroke`/`borderReveal` fall back to standard on RN  |
| Text / Title          | ✅  | ✅  | Title `<br>` mapped to `\n`; typewriter/slide effects dropped on RN                    |
| View / Horizontal / Vertical / Center | ✅ | ✅ | Direct primitives from `app-studio`                                       |
| Image                 | ✅  | ✅  |                                                                                        |
| Icon                  | ✅  | ✅  | Web uses `lucide-react` lazy imports; RN uses `lucide-react-native` static map         |
| Link                  | ✅  | ✅  | Web: `react-router-dom`. RN: `Linking.openURL` (external) + `onPress` (internal)       |
| Modal                 | ✅  | ✅  | RN uses `<Modal/>` for portal-like overlay                                             |
| Drawer                | ✅  | ✅  | RN uses `<Modal/>` + absolute side panel                                               |
| TextField / TextArea  | ✅  | ✅  | RN uses app-studio `<Input/>` (mapped to `TextInput`)                                  |
| Password              | ✅  | ✅  | RN: `secureTextEntry` automatically                                                    |
| Switch                | ✅  | ✅  | RN uses built-in `<Switch/>`                                                           |
| Checkbox / Radio      | ✅  | ✅  | RN: pressable View + Tick/circle icon (no HTML inputs)                                 |
| Select                | ✅  | ✅  | RN renders options in a `<Modal/>` + `<ScrollView/>`                                   |
| Tabs                  | ✅  | ✅  |                                                                                        |
| Tooltip / HoverCard   | ✅  | ✅  | RN: tap-toggled, content in a `<Modal/>` (no hover anchoring)                          |
| DropdownMenu / ContextMenu / Menubar / NavigationMenu | ✅  | ✅  | RN: open via tap (long-press for context), centered Modal           |
| Accordion             | ✅  | ✅  |                                                                                        |
| Sidebar               | ✅  | ✅  |                                                                                        |
| Carousel              | ✅  | ✅  | RN drops translateX sliding; renders active slide only                                 |
| Pagination            | ✅  | ✅  |                                                                                        |
| OTPInput              | ✅  | ✅  | RN: hidden `TextInput` over visible slot cells                                         |
| Slider                | ✅  | ✅  | RN uses the responder system (no `_hover` tooltip)                                     |
| Toast                 | ✅  | ✅  | `position:fixed` → absolute; shadow via elevation                                      |
| ProgressBar           | ✅  | ✅  | Circle variant needs `react-native-svg`                                                |
| Loader                | ✅  | ✅  | 3 variants restored via `react-native-svg` + Reanimated                                |
| Gradient              | ✅  | ✅  | Conic falls back to flat color; linear uses `react-native-linear-gradient`             |
| Background            | ✅  | ⚠️  | Decorative variants (Aurora, Meteors, Particles, Grid, Ripples) render as solid color  |
| Toggle / ToggleGroup  | ✅  | ✅  |                                                                                        |
| Alert / Avatar / Badge / Card / Separator / AspectRatio / Resizable / StatusIndicator | ✅ | ✅ | Use only portable primitives                              |
| Chart                 | ✅  | ❌  | Recharts is web-only                                                                   |
| EmojiPicker / ColorPicker / IconPicker | ✅ | ❌  | Web-only                                                              |
| Command               | ✅  | ❌  | `cmdk` is web-only                                                                     |
| DragAndDrop / DropZone / Uploader / File / AudioInput / MediaPreview | ✅ | ❌ | DOM `File` / `MediaStream`         |
| CookieConsent         | ✅  | ❌  | Cookies do not apply on RN                                                             |
| ChatWidget / ChatInput / EditComponent | ✅ | ❌  | Author-time tools, web-only                                           |

✅ available, ⚠️ degraded, ❌ not exported on RN (importing them throws).

---

## Animations on React Native

`app-studio` exposes the same `Animation.*` factories on both platforms:

```tsx
import { Animation, View } from 'app-studio';

<View animate={Animation.fadeIn({ duration: '0.6s' })}>…</View>

<View animate={Animation.pulse({
  duration: '1.2s',
  iterationCount: 'infinite',
  direction: 'alternate',
})} />

<View animate={[
  Animation.slideInUp({ duration: '0.5s' }),
]} />
```

On RN this is interpreted by the **`useAnimation` hook** (in
`app-studio/src/native/useAnimation.ts`) which:

- Parses `duration` (`"1s"`, `"500ms"`, `"0.3s"`) into ms
- Maps CSS `timingFunction` (`linear`, `ease`, `ease-in`, `ease-out`,
  `ease-in-out`, `cubic-bezier(...)`) to `Easing.bezier(...)`
- Translates CSS transforms (`translateX(-100%)`, `scale(0.5)`,
  `rotate(180deg)`, `skewX`, …) into RN transform arrays. Percentage
  translates are resolved against `Dimensions.get('window')`.
- Unrolls multi-stop keyframes (`'20%'`, `'40%'`, …) into a
  `withSequence(withTiming, withTiming, …)` chain.
- Honours `iterationCount` (`'infinite'` → `-1`) and `direction: 'alternate'`
  via `withRepeat(anim, count, reverse)`.
- Honours `delay` via `withDelay`.

Without `react-native-reanimated` installed, `useAnimation` is a no-op and
the element renders statically (no crash).

### Limitations

- One animation per element. To compose multiple, nest Views.
- `translateX(-100%)` resolves against window width, not the element's own
  width.
- No `timeline: view()` or `timeline: scroll()` (CSS scroll-driven
  animations). For scroll-driven RN animations, combine with Reanimated's
  `useAnimatedScrollHandler` manually.

---

## Setting up a fresh RN app

```bash
npx @react-native-community/cli@latest init MyApp --skip-install
cd MyApp
npm install
npm install ../app-studio ../app-studio-components
npm install react-native-svg react-native-linear-gradient \
            react-native-reanimated lucide-react-native
cd ios && pod install && cd ..

# Reanimated needs the babel plugin
# babel.config.js
# plugins: ['react-native-reanimated/plugin']

npm run ios   # or npm run android
```

Then copy `app-studio-rn-demo/App.tsx` to `MyApp/App.tsx` as a starter.

---

## Troubleshooting

| Symptom                                                  | Fix                                                                                                       |
| -------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Cannot find module '@app-studio/components'`            | Make sure `moduleResolution: "bundler"` and `customConditions: ["react-native"]` in your tsconfig.        |
| Icons render as empty wrappers                           | `npm install lucide-react-native`                                                                         |
| `<Loader/>` shows `<ActivityIndicator/>` instead of SVG  | `npm install react-native-svg` (+ `cd ios && pod install`)                                                |
| `<Gradient/>` renders as a flat color                    | `npm install react-native-linear-gradient` (+ pod install)                                                |
| `animate={…}` doesn't move                               | `npm install react-native-reanimated` and add `'react-native-reanimated/plugin'` to `babel.config.js`     |
| Build error about `HTMLDivElement` / `document`          | These are typed in shared `.tsx` files but never executed on RN — make sure your tsconfig has `lib: ["dom", "esnext"]` (RN never runs that code, TS just needs the symbols). |
