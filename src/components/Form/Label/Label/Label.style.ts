import { Headings } from './Label.type';

export const HeadingSizes: Record<Headings, Record<string, number | string>> = {
  h1: {
    fontSize: 96,
    lineHeight: 112,
    letterSpacing: -1.5,
  },
  h2: {
    fontSize: 60,
    lineHeight: 71,
    letterSpacing: -0.5,
  },
  h3: {
    fontSize: 48,
    lineHeight: 57,
    letterSpacing: 0,
  },
  h4: {
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.25,
  },
  h5: {
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0,
  },
  h6: {
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
};
