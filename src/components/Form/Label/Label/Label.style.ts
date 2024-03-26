import { Headings } from './Label.type';
// Import Headings type definition from Label.type module for type safety and consistency.
export const HeadingSizes: Record<Headings, Record<string, number | string>> = {
  // Initialize a constant 'HeadingSizes' to define styles for different heading levels.
  h1: {
    // Use TypeScript's 'Record' utility type to ensure the object matches the shape of 'Headings'.
    fontSize: 96,
    // Define style properties for 'h1' heading tag, including font size, line height, and letter spacing.
    lineHeight: 112,
    letterSpacing: -1.5,
  },
  h2: {
    fontSize: 60,
    // Define style properties for 'h2' heading tag similar to 'h1', but with adjusted values for size and spacing.
    lineHeight: 71,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 48,
    // Define style properties for 'h3' heading tag with a standard letter spacing of 0.
    lineHeight: 57,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 34,
    // Provide style properties for 'h4' heading tag, with a slight increase in letter spacing.
    lineHeight: 40,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 24,
    // Set the 'h5' heading tag styles, opting for no additional letter spacing.
    lineHeight: 28,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 20,
    // Set the 'h6' heading tag styles, with the smallest font size and a subtle letter spacing.
    lineHeight: 24,
    letterSpacing: 0.15,
  },
};
