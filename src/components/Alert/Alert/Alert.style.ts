// Define an exportable constant object named Themes, which will contain different theme configurations for an application.
export const Themes = {
  // The 'default' theme configuration which serves as the base theme for the application.
  default: {
    // In the 'default' theme, define styles for the 'container' element, likely defining the overall look and boundaries for UI components.
    container: {
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    // Define styles for the 'content' elements within the 'default' theme, which probably include text, icons, or other elements that carry meaning.
    content: {
      color: 'color.blackAlpha.800',
    },
  },
  // The 'info' theme configuration with visual styles that could be used to display informational messages or elements in the application.
  info: {
    container: {
      backgroundColor: 'color.blue.200',
      border: 'color.blue.400',
    },
    content: {
      color: '#60a5fa',
    },
  },
  // The 'success' theme configuration tailored for indicating successful operations or positive messages.
  success: {
    container: {
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
    },
    content: {
      color: '#22c55e',
    },
  },
  // The 'error' theme configuration used to denote error messages or elements that require urgent user attention.
  error: {
    container: {
      backgroundColor: 'color.red.200',
      border: 'color.red.400',
    },
    content: {
      color: '#ef4444',
    },
  },
  // The 'warning' theme configuration designed for warning signs or to caution users about a specific operation or context.
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
