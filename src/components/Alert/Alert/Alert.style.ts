export const Themes = {
  // Defines an object 'Themes' to store theming styles for different application states.
  default: {
    // The default theme style, generally used for the normal or base state of the application.
    container: {
      // Container styles for the default theme, including background color and border color.
      backgroundColor: 'white',
      border: 'color.blackAlpha.800',
    },
    // Text color style for the content within the default theme.
    content: {
      color: 'color.blackAlpha.800',
    },
    // The info theme style, usually indicating an informational message or state.
  },
  // Container styles for the info theme, with a lighter blue background and a slightly darker blue border to create a visual distinction.
  info: {
    container: {
      backgroundColor: 'color.blue.200',
      // Text color style for content within the info theme, using hex color for consistency.
      border: 'color.blue.400',
    },
    content: {
      // The success theme style, indicative of successful operations or confirmations.
      color: '#60a5fa',
      // Container styles for the success theme, with green background and border colors to signify success.
    },
  },
  success: {
    // Text color style for content within the success theme, employing a consistent green hue.
    container: {
      backgroundColor: 'color.green.200',
      border: 'color.green.400',
      // The error theme style, representing error messages or critical issues.
    },
    // Container styles for the error theme, featuring red hues to alert users of errors.
    content: {
      color: '#22c55e',
    },
    // Text color style for content within the error theme, using a hex code for the red color.
  },
  error: {
    container: {
      // The warning theme style, used to indicate warnings or important notices that need attention.
      backgroundColor: 'color.red.200',
      // Container styles for the warning theme, with orange tones to draw attention and signal caution.
      border: 'color.red.400',
    },
    content: {
      // Text color style for content within the warning theme, picking an orange shade that stands out.
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
