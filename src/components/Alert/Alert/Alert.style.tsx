// Define a constant object 'Themes' exporting various theme views.
export const Themes = {
  // Start of the 'default' theme definition with style properties.
  default: {
    container: {
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    // Defines the content style for the 'default' theme.
    content: {
      color: 'color.blackAlpha.800',
    },
  },
  // The 'info' theme with unique container and content views.
  info: {
    container: {
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    // Content styles specific to the 'info' theme.
    content: {
      color: '#60a5fa',
    },
  },
  // Specifies the 'success' theme with corresponding container and content views.
  success: {
    container: {
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    // Sets the content styling nuances for the 'success' theme.
    content: {
      color: '#22c55e',
    },
  },
  // Start of the 'error' theme with its characteristic views.
  error: {
    container: {
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    // Content styling for the 'error' theme.
    content: {
      color: '#ef4444',
    },
  },
  // Introduction of the 'warning' theme views.
  warning: {
    container: {
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    // Defines color and aesthetics for the 'warning' theme's content.
    content: {
      color: '#f97316',
    },
  },
};
