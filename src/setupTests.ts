// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
// The `/vitest` entry both registers the matchers AND augments vitest's
// `Assertion` type — the bare import only typed jest's `expect`, so every
// `toBeInTheDocument` failed tsc with TS2339 while passing at runtime.
import '@testing-library/jest-dom/vitest';

class IntersectionObserverMock {
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
}

// @ts-ignore
global.IntersectionObserver = IntersectionObserverMock;
