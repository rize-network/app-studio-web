# Typography Scales — Which One to Reach For

The library ships three typography scales with different intended ranges.
Reaching for the wrong one is the most common cause of "why is this control
28px tall" bugs: the display scales start where the control scale ends.

## Control scale — `FontSizes` (`src/utils/typography.ts`)

For **dense UI**: form controls, table cells, badges, helper text, anything
inside a field shell. This is the scale `size="xs…xl"` maps to on form
components (TextField, Select, Checkbox, …).

| size | px | typical use |
| ---- | -- | ----------- |
| `xs` | 10 | badges, overlines, micro-labels |
| `sm` | 12 | helper text, table meta, chips |
| `md` | 14 | default control text, body in dense layouts |
| `lg` | 16 | prominent controls, body text |
| `xl` | 20 | section leads, large controls |

## Heading scale — `HeadingSizes` (`Label` / `Text` `heading="h1…h6"`)

For **document structure**: page and section headings inside content. `h6`
(20px) down to `h4` (34px) are the ones that coexist with controls; `h1–h3`
(48–96px) are hero-sized.

| heading | px | typical use |
| ------- | -- | ----------- |
| `h6` | 20 | card titles, dense section headers |
| `h5` | 24 | section headers |
| `h4` | 34 | page titles |
| `h3` | 48 | large page titles |
| `h2` | 60 | hero secondary |
| `h1` | 96 | hero |

## Display scale — `TitleSizes` (`Title` `size="xs…xl"`)

For **marketing/hero surfaces only** — `Title` is not a heading for app
screens. Its `xs` (24px) already overlaps `h5`, and `md` (48px) upward is
hero territory. Inside application chrome, use `Text heading="h4…h6"` or the
control scale instead.

| size | px |
| ---- | -- |
| `xs` | 24 |
| `sm` | 32 |
| `md` | 48 |
| `lg` | 96 |
| `xl` | 110 |

## Rule of thumb

- Inside a field, row, or menu → control scale (`size`).
- Titling a card, panel, or page → `heading="h4…h6"`.
- Above the fold on a landing page → `Title`.

## If your product tokens use `T*`/`C*` naming

There is no `T*`/`C*` token scale in this library — that vocabulary lives in
product design tokens. It maps onto the scales above as **T\* = titles →
heading scale** and **C\* = controls/content → control scale**:

| product tier | intended use | library equivalent |
| ------------ | ------------ | ------------------ |
| `T1` (~34px+) | page/hero title | `heading="h4"` and up, or `Title` on marketing surfaces |
| `T2` (~28px) | section title — **too large for dense controls** | round down to `heading="h5"` (24px) in app chrome |
| `T3` (~20px) | card/panel title | `heading="h6"` or control `xl` |
| `C1` (~14px) | default control & body text | control `md` |
| `C2` (~12px) | helper text, meta, chips | control `sm` |

The recurring trap is reaching for a `T*` tier inside a field, row, or menu:
dense UI never goes above the control scale (`size`), which is why "T2 in a
toolbar" always ends up rebuilt as `C1`/`C2`.
