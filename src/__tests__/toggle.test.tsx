// Import necessary libraries and components
import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen } from '@testing-library/react';
import { Shape, Variant } from 'src/components/Toggle/Toggle/Toggle.type';
import { Toggle } from 'src/components/Toggle/Toggle';

// Additional info (mocked for testing if not imported)
export const ToggleShapes: Record<Shape, number | string> = {
  sharp: '0px',
  rounded: '4px',
  pillShaped: '24px',
};

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
    test.each([
      ['sharp', '0px'],
      ['rounded', '4px'],
      ['pillShaped', '24px'],
    ])(
      'applies correct border-radius for shape %s',
      (shape, expectedRadius) => {
        render(<Toggle shape={shape as Shape}>Default</Toggle>);
        const toggleElement = screen.getByRole('Toggle');
        expect(toggleElement).toHaveStyle({ borderRadius: expectedRadius });
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
