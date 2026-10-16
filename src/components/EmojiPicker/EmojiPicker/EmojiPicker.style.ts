import { ViewProps } from 'app-studio';
import { Size, Variant, Shape, EmojiCategory, Emoji } from './EmojiPicker.type';
// Defines a collection of default styles for various components within the EmojiPicker, organizing common UI elements for consistent presentation.
export const DefaultEmojiPickerStyles = {
  container: {
    position: 'relative',
    display: 'inline-block',
    width: '100%',
  } as ViewProps,
  trigger: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  } as ViewProps,
  dropdown: {
    position: 'absolute',
    mixBlendMode: 'normal',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: 'color-white',
    borderRadius: 12,
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    minWidth: '320px',
    maxHeight: '400px',
    overflow: 'hidden',
  } as ViewProps,
  searchInput: {
    marginBottom: '12px',
  } as ViewProps,
  categoryTabs: {
    display: 'flex',
    // Web flexbox defaults to row, but React Native defaults to column — set it
    // explicitly so the category bar is horizontal on native too.
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottom: '1px solid color-gray-100',
    marginBottom: '12px',
    overflowX: 'auto',
  } as ViewProps,
  categoryTab: {
    padding: '8px 12px',
    cursor: 'pointer',
    borderBottom: '2px solid transparent',
    transition: 'all 0.2s ease-in-out',
    fontSize: '14px',
    fontWeight: '500',
    color: 'color-gray-600',
    whiteSpace: 'nowrap',
    borderRadius: '8px 8px 0 0',
  } as ViewProps,
  emojiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 1fr)',
    // Native has no CSS grid; row + wrap of fixed-width items reproduces the
    // grid (these flex props are ignored under `display:grid` on web).
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: '4px',
    maxHeight: '240px',
    overflowY: 'auto',
    padding: '4px',
    color: 'color-black',
  } as ViewProps,
  emoji: {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 6,
    fontSize: '20px',
    transition: 'all 0.2s ease-in-out',
  } as ViewProps,
  recentEmojis: {
    borderBottom: '1px solid color-gray-100',
    marginBottom: '12px',
    paddingBottom: '12px',
  } as ViewProps,
};
// Maps predefined size options (e.g., 'xs', 'sm', 'md') to specific style properties, providing standardized sizing for interactive elements.
export const Sizes: Record<Size, ViewProps> = {
  xs: {
    height: '28px',
    fontSize: '12px',
    padding: '4px 8px',
  },
  sm: {
    height: '32px',
    fontSize: '12px',
    padding: '6px 10px',
  },
  md: {
    height: '40px',
    fontSize: '14px',
    padding: '8px 12px',
  },
  lg: {
    height: '48px',
    fontSize: '14px',
    padding: '10px 14px',
  },
  xl: {
    height: '56px',
    fontSize: '16px',
    padding: '12px 16px',
  },
};
// Maps predefined shape options (e.g., 'default', 'square', 'pill') to specific border radius styles, enabling consistent visual forms.
export const Shapes: Record<Shape, ViewProps> = {
  default: {
    borderRadius: 8,
  },
  square: {
    borderRadius: 0,
  },
  rounded: {
    borderRadius: 8,
  },
  pill: {
    borderRadius: 9999,
  },
};
// Maps predefined visual variants (e.g., 'default', 'outline', 'filled') to specific style properties, offering different aesthetic treatments for components.
export const Variants: Record<Variant, ViewProps> = {
  default: {
    backgroundColor: 'color-white',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
  filled: {
    backgroundColor: 'color-gray-50',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'color-gray-200',
    color: 'color-gray-800',
  },
};
// Assigns a representative emoji label to each predefined emoji category, enhancing visual navigation and identification.
export const CategoryLabels: Record<EmojiCategory, string> = {
  recent: '🕒',
  smileys: '😀',
  people: '👤',
  animals: '🐶',
  food: '🍎',
  activities: '⚽',
  travel: '🚗',
  objects: '💡',
  symbols: '❤️',
  flags: '🏁',
};
// Provides a comprehensive array of emoji objects, each containing the emoji character, its name, category, and relevant keywords for search and display.
export { DefaultEmojiData } from './EmojiPicker.data';
