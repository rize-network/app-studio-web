/**
 * The canonical size scale for form fields.
 *
 * One source of truth, because there used to be several: TextField and Select
 * each declared their own `fieldSizeStyles`, ComboBox declared a third in its
 * style file (with `xs` at 28px rather than 24px), and DatePicker, TagInput and
 * CountryPicker declared none at all — so they fell back to a fixed 10px
 * padding and rendered the same height at every size.
 *
 * The vertical metrics match `ButtonSizes`, so a Button and a field of the same
 * size line up in a row without any alignment work.
 *
 * `paddingVertical` is chosen so that padding + the input's natural line box +
 * the 1px border stays *under* `minHeight` at every size. `minHeight` is then
 * the binding constraint and each field renders at exactly its declared height,
 * while still being free to grow when its content wraps (TagInput chips, for
 * instance).
 */

import { Size } from './Input.type';

export interface FieldSizeMetrics {
  minHeight: number;
  paddingVertical: number;
  paddingHorizontal: number;
}

export const FieldSizes: Record<Size, FieldSizeMetrics> = {
  xs: { minHeight: 24, paddingVertical: 4, paddingHorizontal: 10 },
  sm: { minHeight: 32, paddingVertical: 7, paddingHorizontal: 10 },
  md: { minHeight: 40, paddingVertical: 9, paddingHorizontal: 12 },
  lg: { minHeight: 48, paddingVertical: 11, paddingHorizontal: 14 },
  xl: { minHeight: 56, paddingVertical: 13, paddingHorizontal: 16 },
};

/** Field metrics as `ViewProps`, ready to spread onto the field shell. */
export const fieldSizeProps = (size: Size) => {
  const { minHeight, paddingVertical, paddingHorizontal } = FieldSizes[size];
  return {
    minHeight: `${minHeight}px`,
    paddingTop: `${paddingVertical}px`,
    paddingBottom: `${paddingVertical}px`,
    paddingLeft: `${paddingHorizontal}px`,
    paddingRight: `${paddingHorizontal}px`,
  };
};
