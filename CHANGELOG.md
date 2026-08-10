# Changelog

## 0.11.0

Every form control is now findable with `getByRole(role, { name: label })` —
no `[name="…"]` selectors, no `aria-label` crutches, no role-as-prop
workarounds — and every declared public prop either does something or no
longer exists.

### Accessibility — form controls

- **Select**: stable `useId`-based ids (was `Math.random`, SSR-unstable);
  fixed the duplicate id shared by the combobox div and the hidden native
  select; the label now names the combobox via `aria-labelledby` (an explicit
  `aria-label` prop still wins); `aria-controls`/`aria-activedescendant`
  wired to the listbox and its options; open-state keyboard navigation
  (ArrowUp/ArrowDown move the highlight, Enter selects, Escape closes); the
  multi-select chip remover is a real button named "Remove {value}" (was the
  invalid `role="close-button"`).
- **Selector**: was a div with unlabeled buttons that dropped nearly every
  prop (no rest spread). Now a `role="radiogroup"` named by its label, with
  `role="radio"` + `aria-checked` options; `isDisabled`, `isReadOnly`,
  `error`, `helperText`, `aria-*` and rest props are actually honored;
  `useId` ids; error/helper text rendered with `aria-describedby`/
  `aria-invalid`. Unused internal members were removed from the props file.
- **RadioGroup**: root carries `role="radiogroup"` + `aria-labelledby`;
  helper/error texts get ids referenced via `aria-describedby`, plus
  `aria-invalid`.
- **Radio / Checkbox**: consumer rest props (`aria-*`, `role`, `data-*`) now
  land on the `<input>`, not the wrapping `<label>`; `infoText`/`error`
  moved outside the `<label>` element so they no longer pollute the
  accessible name (`getByRole('checkbox', { name })` stays exact), wired via
  `aria-describedby`. Dead `setIsChecked` removed from Checkbox props.
- **Switch**: rest props land once, on the input (was spread on both label
  and input); `description` prop wired (rendered outside the label,
  `aria-describedby`); dead `variant` removed.
- **DatePicker**: `useId` fallback + label/input `htmlFor`/`id` wiring; the
  label renders unconditionally (was only while focused, so it could never
  name the control on first render); the input is controlled (`value` bound
  to state — previously the state's date was never used); explicit
  `role="textbox"` baked in (native date inputs have no implicit ARIA
  mapping); dead `icon` prop removed.
- **CountryPicker**: invalid `type="country"` → `type="text"` with
  `role="combobox"`, `aria-expanded`, `aria-controls`,
  `aria-autocomplete="list"`, `aria-activedescendant`; the popup uses real
  `role="listbox"`/`role="option"` (was the invalid `dropDown`/
  `DropDownItem`); full keyboard path (ArrowDown/ArrowUp/Enter/Escape);
  label always rendered and associated; internal `setSelected` removed.
- **ColorInput**: trigger named by the visible label via `aria-labelledby`;
  hidden `<input type="hidden" name value>` so the control participates in
  form submission (the `name` prop was silently dropped); swatch popup is a
  keyboard-operable `listbox` with named `option`s; custom-color field and
  "Add" button have real names/roles; helper/error wired via
  `aria-describedby`/`aria-invalid`; `colorFormat` prop actually converts
  the reported value (hex/rgb/hsl — new pure helpers, shared with
  ColorPicker); native view proxies `onFocus`/`onBlur` (previously dead on
  native).
- **OTPInput**: removed unconditional `console.log` render/state spam;
  consumer rest props now reach the real input (were stranded on the
  container); dead `isFirstColumn` removed.
- **ComboBox**: search field has an accessible name; wrapper now forwards
  `searchPlaceholder` (was swallowed).
- **Title**: dev warning when `highlightText` is not a substring of
  `children` in the static case too (silently highlighted nothing);
  the rotation contract is documented in the examples.

### Dead props — wired or removed

- Wired: Button `ariaLabel`, `leftIcon`/`rightIcon` (+ `startIcon`/`endIcon`
  aliases), `loaderProps`, `isIcon`; ContextMenu `isExternal`
  (`target="_blank" rel="noopener noreferrer"`); ChatInput `isDisabled`,
  `rightElement`, `onKeyDown` (reaches the editable input),
  `onUploadProgress`/`onUploadSuccess` (also fixes the upload queue only
  advancing on errors), `onFileBrowse`; Background `blendMode`
  (`mixBlendMode` on image/video); Label `error`/`isDisabled` styling;
  TextField `isRequired` (+`aria-required`), `labelProps`,
  `leftIcon`/`rightIcon`; TextArea `isRequired`, `labelProps`, `isEditable`
  (→ `readOnly`); Badge `isAuto`; Modal Header `buttonSize`.
- Removed (unused, grep-verified): TextArea `isMultiline`; StatusIndicator
  `size`/`variant`/`icon`; TagInput leaked state members (`setTags`,
  `filteredItems`, `activeItemIndex`, `isMenuOpen`, `handleMenuItemSelect`);
  Background `designProps`; Modal `render` + Container/Body `buttonSize`;
  Message `icons`; Uploader `thumbnailContainerProps`/`loadingProps`;
  DropZone `className`; DatePicker `icon`; CountryPicker `setSelected`;
  OTPInput `isFirstColumn`; Checkbox `setIsChecked`; Switch `variant`;
  Selector internal props-file leakage.

### Types / design system

- `DesignSystemProvider` passes `config.theme` to app-studio's
  `ThemeProvider` without a cast (app-studio ≥0.9 accepts `ThemeSlots`).
- `DesignSystemTheme` docs corrected: literal hex values are snapped to the
  nearest palette token by app-studio and DO adapt to dark mode; only
  unparseable literals stay frozen (and app-studio warns for neutral slots).

### Tests

- New/extended vitest suites lock the `getByRole(role, { name })` +
  Tab-reachability + operate-by-name contract for TextField, TextArea,
  Select, Selector, Switch, Checkbox, Radio, RadioGroup, DatePicker,
  CountryPicker, ColorInput, OTPInput and ComboBox, plus behavior tests for
  every newly wired prop (Button, ContextMenu, ChatInput, Background, Label,
  Badge, Title).

### Requires

- `app-studio` ≥ 0.9.0 (ThemeSlots, `data-theme` document stamping).
