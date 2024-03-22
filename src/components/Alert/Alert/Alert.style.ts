export const Themes = {
  // Declare a constant object named 'Themes' exporting different theme objects which can be utilized throughout the application for consistent styling.
  default: {
    // 'default' theme object, holding style properties for a default visual theme.
    container: {
      // Specify the 'container' style properties for the default theme, such as background color and border.
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    content: {
      // Define the 'content' style properties, particularly its text color for the default theme.
      color: 'color.blackAlpha.800',
    },
  },
  info: {
    // 'info' theme object, intended for informational messages or interface elements.
    container: {
      // Set 'info' theme's 'container' background and border colors using a predefined color palette.
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    content: {
      // Assign a hex color code for the 'content' text color within the 'info' theme.
      color: '#60a5fa',
    },
  },
  success: {
    // 'success' theme object, used for indicating successful operations or states.
    container: {
      // Define the 'container' styling for the 'success' theme, using shades of green to signify success.
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    content: {
      // Apply a hex color code for 'content' text color in the 'success' theme, aligning with success semantics.
      color: '#22c55e',
    },
  },
  error: {
    // 'error' theme object; includes styles typically used to denote errors or problematic states.
    container: {
      // Style the 'error' theme's 'container' with red shades to represent errors or warnings.
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    content: {
      // Select a hex color for the 'content' within the 'error' theme to maintain the error-related color scheme.
      color: '#ef4444',
    },
  },
  warning: {
    // 'warning' theme object, primarily for cautionary messages or states needing attention.
    container: {
      // Choose 'container' styles for the 'warning' theme with orange colors, commonly associated with warnings.
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    content: {
      // Determine a specific hex color for 'content' text in the 'warning' theme, complementing the warning motif.
      color: '#f97316',
    },
  },
};
