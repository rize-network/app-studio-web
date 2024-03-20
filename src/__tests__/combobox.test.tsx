import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ComboBox } from '../components/Form/ComboBox/ComboBox';
import renderer from 'react-test-renderer';

const mockItems = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('ComboBox', () => {
  test('renders Checkbox component', () => {
    render(<ComboBox id="combo" items={mockItems} />);
    const CheckboxElement = screen.getByRole('combobox');
    expect(CheckboxElement).toBeInTheDocument();
  });

  test('renders with placeholder text', () => {
    render(
      <ComboBox id="combo" placeholder="Select an option" items={mockItems} />
    );
    expect(screen.getByRole('combobox')).toHaveTextContent('Select an option');
  });

  test('does not show tick next to selected item if showTick is false', () => {
    render(<ComboBox id="combo" items={mockItems} showTick={false} />);
    fireEvent.click(screen.getByRole('combobox'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });
});

test('Checkbox to match snapshot', () => {
  const tree = renderer
    .create(<ComboBox id="combo" items={mockItems} showTick={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
