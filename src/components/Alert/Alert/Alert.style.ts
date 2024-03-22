export const Themes = {
  // Define a 'Themes' object that serves as a theme configuration for various UI components.
  default: {
    // 'default' theme properties with a white background and dark border for general use.
    container: {
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    // 'info' theme properties with light blue shades for informational messages or elements.
    content: {
      color: 'color.blackAlpha.800',
    },
  },
  info: {
    // 'success' theme properties with green shades indicating success states or confirmation messages.
    container: {
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    content: {
      // 'error' theme properties with red shades for error messages or critical warnings.
      color: '#60a5fa',
    },
  },
  success: {
    container: {
      // 'warning' theme properties with orange shades for warnings or important notices.
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    content: {
      color: '#22c55e',
    },
  },
  error: {
    container: {
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    content: {
      color: '#ef4444',
    },
  },
  warning: {
    container: {
      backgroundColor: 'color.orange.200',
      border: 'color.orange.400',
    },
    content: {
      color: '#f97316',
    },
  },
};
