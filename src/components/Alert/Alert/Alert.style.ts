export const Themes = {
  // Define a constant `Themes` to hold theming styles for different contexts.
  default: {
    // The `default` theme configuration with a white background and dark border color for containers, and dark text color for content.
    container: {
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    content: {
      color: 'color.blackAlpha.800',
    },
  },
  info: {
    container: {
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    content: {
      color: '#60a5fa',
    },
  },
  success: {
    // The `success` theme configuration indicates a successful action with a light green background and darker green border for containers, and a specific green hex color for content text.
    container: {
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    content: {
      color: '#22c55e',
    },
  },
  error: {
    // The `error` theme configuration signifies an error state with a light red background and a darker red border for containers, and a set red hex color for text content.
    container: {
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    content: {
      color: '#ef4444',
    },
  },
  warning: {
    // The `warning` theme configuration suggesting caution with an orange background and darker orange border for containers, and a strong orange hex color for the content text.
    container: {
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    content: {
      color: '#f97316',
    },
  },
};
