import React from 'react';
import renderer from 'react-test-renderer';
import { CountryPicker } from 'src/components';
import countries from 'src/components/Form/CountryPicker/countries.json';
import { DropDown, DropDownItem } from 'src/components/Form/CountryPicker/CountryPicker/CountryPicker.view';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('CountryPicker component', () => {
  test('renders CountryPicker component', () => {
    render(<CountryPicker name="username" role="textbox" />);
    const CountryPickerElement = screen.getByRole('textbox');
    expect(CountryPickerElement).toBeInTheDocument();
  });
  test('renders CountryPicker with specified role', () => {
    render(<CountryPicker name="username" role="textbox" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });
  test('renders with placeholder', () => {
    render(<CountryPicker name="username" placeholder="Enter your name" />);
    const inputElement = screen.getByPlaceholderText('Enter your name');
    expect(inputElement).toBeInTheDocument();
  });
  test('renders disabled CountryPicker', () => {
    render(<CountryPicker name="username" isDisabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });
  test('triggers onBlur event when the input field loses focus', () => {
    const handleBlur = jest.fn();
    render(<CountryPicker onBlur={handleBlur} />);
    const countryInput = screen.getByRole('textbox');
    fireEvent.focus(countryInput);
    fireEvent.blur(countryInput);
    // Assert that the onBlur event is triggered
    expect(handleBlur).toHaveBeenCalled();
  });
  test('triggers onChange event when selecting a country', () => {
    const handleChange = jest.fn();
    render(<CountryPicker onChange={handleChange} />);
    const countryInput = screen.getByRole('textbox');
    const selectedCountry = 'United States';
    fireEvent.change(countryInput, { target: { value: selectedCountry } });
    // Assert that the onChange event is triggered with the selected country value
    expect(handleChange).toHaveBeenCalledWith(selectedCountry);
  });
  test('renders readonly CountryPicker', () => {
    render(<CountryPicker name="username" value="readonly value" isReadOnly />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readonly');
  });
  test('renders helper text', () => {
    const helperText = 'This is helper text';
    render(<CountryPicker name="error" helperText={helperText} error={true} />);
    const helperTextElement = screen.queryByText(helperText);
    expect(helperTextElement).toBeInTheDocument();
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
          shape="pillShaped"
          variant="outline"
          styles={{
            text: { color: 'theme.primary' },
            icon: { width: 0.2 },
            label: { fontSize: 15 },
            dropDown: { backgrounColor: 'theme.primary' },
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
  const callback = jest.fn();
  const styles = {
    dropDown: { backgroundColor: 'red' },
    text: { color: 'white' },
  };

  test('renders DropDown component without crashing', () => {
    render(<DropDown options={options} styles={styles} />);
    const DropDownElement = screen.getByRole('dropDown');
    expect(DropDownElement).toBeInTheDocument();
  });

  test('applies custom styles to the dropdown list', () => {
    render(<DropDown options={options} callback={callback} styles={styles} />);
    const dropDownList = screen.getByRole('dropDown');
    expect(dropDownList).toHaveStyle('background-color: red');
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
    render(<DropDown options={options} callback={() => {}} styles={styles} />);

    options.forEach((option) => {
      const optionElement = screen.getByText(option.name);
      expect(optionElement).toBeInTheDocument();
    });
  });

  test('renders DropDown component with provided size', () => {
    render(<DropDown options={options} styles={styles} size="md" />);
    const DropDownElement = screen.getByRole('dropDown');
    expect(DropDownElement).toBeInTheDocument();
    expect(DropDownElement).toHaveStyle({ fontSize: 16 });
  });

  test('calls callback function with selected option', () => {
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
    const callback = jest.fn();
    render(<DropDown options={options} callback={callback} styles={styles} />);

    const selectedOption = options[1];
    const optionElement = screen.getByText(selectedOption.name);
    fireEvent.click(optionElement);

    expect(callback).toHaveBeenCalledWith(selectedOption.name);
  });
});

describe('DropDownItem component', () => {
  const option = 'Albania';
  const styles = {
    text: { color: 'red' },
  };
  test('renders DropDownItem component without crashing', () => {
    render(<DropDownItem option={option} callback={() => {}} styles={styles} />);
    const DropDownItemElement = screen.getByRole('DropDownItem');
    expect(DropDownItemElement).toBeInTheDocument();
  });

  test('calls callback function when option is clicked', () => {
    const option = 'United States';
    const callback = jest.fn();
    render(<DropDownItem option={option} callback={callback} styles={styles} />);

    const optionElement = screen.getByText(option);
    fireEvent.click(optionElement);

    expect(callback).toHaveBeenCalledWith(option);
  });

  test('changes background color on hover', () => {
    const option = 'United States';
    render(<DropDownItem option={option} callback={() => {}} styles={styles} />);

    const optionElement = screen.getByText(option);
    fireEvent.mouseEnter(optionElement);

    expect(optionElement).toHaveStyle('background-color: trueGray.100');

    fireEvent.mouseLeave(optionElement);

    expect(optionElement).not.toHaveStyle('background-color: trueGray.100');
  });

  test('renders DropDownItem component with provided size', () => {
    render(<DropDownItem option={option} selected="Option 1" size="md" callback={() => {}} styles={styles} />);
    const DropDownItemElement = screen.getByRole('DropDownItem');
    expect(DropDownItemElement).toBeInTheDocument();
    expect(DropDownItemElement).toHaveStyle({ fontSize: 16 });
  });

  test('should call callback when an option is selected', () => {
    const callback = jest.fn();
    render(<DropDownItem option={option} selected="Option 2" callback={callback} styles={styles} />);
    fireEvent.click(screen.getByRole('DropDownItem'));
    expect(callback).toHaveBeenCalledTimes(1);
  });
});
