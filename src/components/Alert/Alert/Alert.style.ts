export const Themes = {
  // Define a 'Themes' object that stores different theme styles which can be applied to UI components.
  default: {
    // The 'default' theme provides a standard look for components with a white background and dark borders/ text.
    container: {
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
      // Each theme has a 'container' nested object describing the background color and border style for UI containers.
    },
    content: {
      color: 'color.blackAlpha.800',
      // The 'content' nested object within each theme specifies the text color to be used within the container.
    },
  },
  info: {
    container: {
      // The 'info' theme suggests a use case for informational messages with blue tones for the background and border.
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    content: {
      color: '#60a5fa',
    },
  },
  success: {
    container: {
      // The 'success' theme carries a green color palette, often used to indicate successful operations in an application.
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    content: {
      color: '#22c55e',
    },
  },
  error: {
    container: {
      // The 'error' theme features a red color scheme, commonly used to alert users to errors or critical issues.
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    content: {
      color: '#ef4444',
    },
  },
  warning: {
    container: {
      // The 'warning' theme communicates caution to the user utilizing orange colors for the background and text.
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    content: {
      color: '#f97316',
    },
  },
};
