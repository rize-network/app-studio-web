// Import necessary libraries and components
import React from 'react';
import renderer from 'react-test-renderer';
import { cleanup, render, screen } from '@testing-library/react';
import { Shape } from 'src/components/ToggleGroup/ToggleGroup/ToggleGroup.type';
import { ToggleGroup } from 'src/components/ToggleGroup/ToggleGroup';
import { Text } from 'src/components';

// Additional info (mocked for testing if not imported)
export const ToggleGroupShapes: Record<Shape, number | string> = {
  square: '0px',
  rounded: '4px',
  pill: '24px',
};

const items = [
  { id: 'B', value: <Text>B</Text> },
  { id: 'C', value: <Text>C</Text>, isActive: true },
  { id: 'D', value: <Text>D</Text>, isDisabled: true },
];

// Test setup and teardown
afterEach(cleanup);

// Test cases
describe('ToggleGroup Component', () => {
  // Basic Rendering
  test('renders ToggleGroup component', () => {
    render(<ToggleGroup items={items} />);
    const ToggleGroupElement = screen.getByRole('ToggleGroup');
    expect(ToggleGroupElement).toBeInTheDocument();
  });

  test('ToggleGroup to match snapshot', () => {
    const tree = renderer.create(<ToggleGroup items={items} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
