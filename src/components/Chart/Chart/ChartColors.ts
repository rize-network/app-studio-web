// Defines a collection of named color tokens, mapping descriptive color names to specific string values (e.g., CSS class names or design system tokens) for consistent styling within the Chart component.
export const CHART_COLORS = {
  blue: 'color-blue-500',
  green: 'color-green-500',
  purple: 'color-purple-500',
  orange: 'color-orange-500',
  red: 'color-red-500',
  teal: 'color-teal-500',
  pink: 'color-pink-500',
  indigo: 'color-indigo-500',
  yellow: 'color-yellow-500',
  cyan: 'color-cyan-500',
};
// Establishes a predefined sequence of colors from the CHART_COLORS palette to be used by default in charts when a specific color scheme is not explicitly provided, ensuring visual consistency.
export const DEFAULT_CHART_COLORS = [
  CHART_COLORS.blue,
  CHART_COLORS.green,
  CHART_COLORS.purple,
  CHART_COLORS.orange,
  CHART_COLORS.red,
  CHART_COLORS.teal,
  CHART_COLORS.pink,
  CHART_COLORS.indigo,
  CHART_COLORS.yellow,
  CHART_COLORS.cyan,
];
