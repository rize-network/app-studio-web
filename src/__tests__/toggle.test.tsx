// Import necessary libraries and components
import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import { Shape, Variant } from 'src/components/Toggle/Toggle/Toggle.type';
import { Toggle } from 'src/components/Toggle/Toggle';
import { ToggleShapes } from 'src/components/Toggle/Toggle/Toggle.style';

// Test setup and teardown
afterEach(cleanup);

// Test cases
describe('Toggle Component', () => {
  // Basic Rendering
  test('renders Toggle component', () => {
    render(<Toggle>Default</Toggle>);
    const toggleElement = screen.getByRole('Toggle');
    expect(toggleElement).toBeInTheDocument();
  });

  // Shape Variants
  describe('Shape Variants', () => {
    // Read the scale from the source rather than duplicating it: this test
    // used to hardcode 4px/24px against a local mock and silently drifted when
    // the design-system pass changed the real values.
    test.each(Object.keys(ToggleShapes) as Shape[])(
      'applies correct border-radius for shape %s',
      (shape) => {
        render(<Toggle shape={shape}>Default</Toggle>);
        const toggleElement = screen.getByRole('Toggle');
        const radius = ToggleShapes[shape];
        expect(toggleElement).toHaveStyle({
          borderRadius: typeof radius === 'number' ? `${radius}px` : radius,
        });
      }
    );
  });

  // Variant Styles
  describe('Variant Styles', () => {
    test.each([
      ['outline', { borderStyle: 'solid' }],
      ['link', { textDecoration: 'underline' }],
      ['ghost', {}], // Add expected styles for ghost if necessary
    ])('applies correct styles for variant %s', (variant, expectedStyles) => {
      render(<Toggle variant={variant as Variant}>Default</Toggle>);
      const toggleElement = screen.getByRole('Toggle');
      for (const [key, value] of Object.entries(expectedStyles)) {
        expect(toggleElement).toHaveStyle({ [key]: value });
      }
    });
  });
});

test('Toggle to match snapshot', () => {
  const tree = renderer.create(<Toggle>Default</Toggle>).toJSON();
  expect(tree).toMatchSnapshot();
});
