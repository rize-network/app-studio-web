import React from 'react';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ComboBox } from '../components/Form/ComboBox/ComboBox';
import renderer from './actRenderer.test-utils';
import { vi } from 'vitest';

const mockItems = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

afterEach(() => {
  cleanup();
});

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
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Option 1'));
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  test('opens with the keyboard and links trigger to listbox', () => {
    render(<ComboBox id="combo" items={mockItems} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(trigger, { key: 'Enter' });
    const listbox = screen.getByRole('listbox');
    expect(listbox).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(trigger).toHaveAttribute('aria-controls', listbox.id);
    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  test('is found by role and accessible name from the label', () => {
    render(<ComboBox id="combo" label="Fruit" items={mockItems} />);
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    expect(trigger).toBeInTheDocument();
  });

  test('is reachable with the keyboard', async () => {
    render(<ComboBox id="combo" label="Fruit" items={mockItems} />);
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    await userEvent.tab();
    expect(trigger).toHaveFocus();
  }, 30000);

  test('operating the named element fires onSelect with the item', () => {
    const onSelect = vi.fn();
    render(
      <ComboBox
        id="combo"
        label="Fruit"
        items={mockItems}
        onSelect={onSelect}
      />
    );
    const trigger = screen.getByRole('combobox', { name: 'Fruit' });
    fireEvent.keyDown(trigger, { key: 'ArrowDown' });
    const listbox = screen.getByRole('listbox');
    fireEvent.click(within(listbox).getByText('Option 2'));
    expect(onSelect).toHaveBeenCalledWith(mockItems[1]);
  });

  test('the search field has an accessible name', () => {
    render(
      <ComboBox
        id="combo"
        label="Fruit"
        searchPlaceholder="Find a fruit"
        items={mockItems}
      />
    );
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));
    const search = screen.getByRole('searchbox', { name: 'Find a fruit' });
    expect(search).toBeInTheDocument();
  });

  test('the search field falls back to a generic accessible name', () => {
    render(<ComboBox id="combo" label="Fruit" items={mockItems} />);
    fireEvent.click(screen.getByRole('combobox', { name: 'Fruit' }));
    expect(
      screen.getByRole('searchbox', { name: 'Search' })
    ).toBeInTheDocument();
  });
});

test('Checkbox to match snapshot', () => {
  const tree = renderer
    .create(<ComboBox id="combo" items={mockItems} showTick={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
