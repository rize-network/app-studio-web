import React from 'react';
import renderer from './actRenderer.test-utils';
import { CountryPicker } from 'src/components';
import countries from 'src/components/Form/CountryPicker/countries.json';
import {
  DropDown,
  DropDownItem,
} from 'src/components/Form/CountryPicker/CountryPicker/CountryPicker.view';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
});

describe('CountryPicker component', () => {
  // The combobox role is baked into the component, so no `role` prop crutch
  // is needed in these tests.
  test('renders CountryPicker component', () => {
    render(<CountryPicker name="username" />);
    const CountryPickerElement = screen.getByRole('combobox');
    expect(CountryPickerElement).toBeInTheDocument();
  });
  test('is found by role and accessible name from the label', () => {
    render(<CountryPicker name="country" label="Country" />);
    const inputElement = screen.getByRole('combobox', { name: 'Country' });
    expect(inputElement).toBeInTheDocument();
  });
  test('is reachable with the keyboard', async () => {
    render(<CountryPicker name="country" label="Country" />);
    const inputElement = screen.getByRole('combobox', { name: 'Country' });
    await userEvent.tab();
    expect(inputElement).toHaveFocus();
  }, 30000);
  test('supports the full keyboard selection path', () => {
    const handleChange = vi.fn();
    render(
      <CountryPicker name="country" label="Country" onChange={handleChange} />
    );
    const inputElement = screen.getByRole('combobox', { name: 'Country' });
    expect(inputElement).toHaveAttribute('aria-expanded', 'false');
    // ArrowDown opens the listbox and highlights the first option.
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    const listbox = screen.getByRole('listbox');
    expect(inputElement).toHaveAttribute('aria-expanded', 'true');
    expect(inputElement).toHaveAttribute('aria-controls', listbox.id);
    // ArrowDown again moves the highlight to the second option.
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    expect(inputElement).toHaveAttribute(
      'aria-activedescendant',
      `${listbox.id}-option-1`
    );
    // Enter selects the highlighted option and closes the list.
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    expect(handleChange).toHaveBeenCalledWith(countries[1].name);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    // Escape closes a reopened list.
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    fireEvent.keyDown(inputElement, { key: 'Escape' });
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  test('renders with placeholder', () => {
    render(<CountryPicker name="username" placeholder="Enter your name" />);
    const inputElement = screen.getByPlaceholderText('Enter your name');
    expect(inputElement).toBeInTheDocument();
  });
  test('renders disabled CountryPicker', () => {
    render(<CountryPicker name="username" isDisabled />);
    const inputElement = screen.getByRole('combobox');
    expect(inputElement).toBeDisabled();
  });
  test('triggers onBlur event when the input field loses focus', () => {
    const handleBlur = vi.fn();
    render(<CountryPicker onBlur={handleBlur} />);
    const countryInput = screen.getByRole('combobox');
    fireEvent.focus(countryInput);
    fireEvent.blur(countryInput);
    // Assert that the onBlur event is triggered
    expect(handleBlur).toHaveBeenCalled();
  });
  test('triggers onChange event when selecting a country', () => {
    const handleChange = vi.fn();
    render(<CountryPicker onChange={handleChange} />);
    const countryInput = screen.getByRole('combobox');
    const selectedCountry = 'United States';
    fireEvent.change(countryInput, { target: { value: selectedCountry } });
    // Assert that the onChange event is triggered with the selected country value
    expect(handleChange).toHaveBeenCalledWith(selectedCountry);
  });
  test('renders readonly CountryPicker', () => {
    render(<CountryPicker name="username" value="readonly value" isReadOnly />);
    const inputElement = screen.getByRole('combobox');
    expect(inputElement).toHaveAttribute('readonly');
  });
  test('CountryPicker to match snapshot', () => {
    const tree = renderer
      .create(
        <CountryPicker
          size="xl"
          name="name"
          error={true}
          placeholder="Name"
          helperText={'required'}
          isAutoFocus
          shape="pill"
          variant="outline"
          views={{
            text: { color: 'theme-primary' },
            icon: { width: 0.2 },
            label: { fontSize: 15 },
            dropDown: { backgroundColor: 'theme-primary' },
            helperText: { color: 'red' },
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('DropDown component', () => {
  const options = countries;
  const views = {
    dropDown: { backgroundColor: 'red' },
    text: { color: 'white' },
  };

  test('renders DropDown component without crashing', () => {
    render(<DropDown options={options} views={views} />);
    const DropDownElement = screen.getByRole('listbox');
    expect(DropDownElement).toBeInTheDocument();
  });

  test('renders options correctly', () => {
    const options = [
      {
        name: 'Aland Islands',
        dial_code: '+358',
        emoji: '🇦🇽',
        code: 'AX',
      },
      {
        name: 'Albania',
        dial_code: '+355',
        emoji: '🇦🇱',
        code: 'AL',
      },
    ];
    render(<DropDown options={options} callback={() => {}} views={views} />);

    options.forEach((option) => {
      const optionElement = screen.getByText(option.name);
      expect(optionElement).toBeInTheDocument();
    });
    expect(screen.getAllByRole('option')).toHaveLength(options.length);
  });

  describe('DropDownItem component', () => {
    const option = 'Albania';
    const views = {
      text: { color: 'red' },
    };
    test('renders DropDownItem component without crashing', () => {
      render(
        <DropDownItem option={option} callback={() => {}} views={views} />
      );
      const DropDownItemElement = screen.getByRole('option');
      expect(DropDownItemElement).toBeInTheDocument();
      expect(DropDownItemElement).toHaveAttribute('aria-selected', 'false');
    });

    test('calls callback function when option is clicked', () => {
      const callback = vi.fn();
      render(
        <DropDownItem option={option} callback={callback} views={views} />
      );
      fireEvent.click(screen.getByRole('option'));
      expect(callback).toHaveBeenCalledWith(option);
    });
  });
});
