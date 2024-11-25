import { Headings } from './Text.type';

export const HeadingSizes: Record<Headings, Record<string, number | string>> = {
  h1: {
    fontSize: 60,
    lineHeight: 71,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: 48,
    lineHeight: 57,
    letterSpacing: 0,
  },
  h3: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.25,
  },
  h4: {
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h5: {
    fontSize: 18,
    lineHeight: 22,
    letterSpacing: 0.15,
  },
  h6: {
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: 0.15,
  },
};
