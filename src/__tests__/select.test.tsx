import React from 'react';
import renderer from 'react-test-renderer';
import { Select } from 'src/components';
import { MultiSelect } from 'src/components/Form/Select/Select/Select.view';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

describe('Select component', () => {
  test('renders Select component', () => {
    render(<Select name="active" role="textbox" options={['Item1', 'Item2', 'Item3']} />);
    const SelectElement = screen.getByRole('textbox');
    expect(SelectElement).toBeInTheDocument();
  });

  test('renders disabled Select', () => {
    render(<Select name="diabled" isDisabled role="textbox" options={['Item1', 'Item2', 'Item3']} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  test('renders readonly Select', () => {
    render(<Select name="username" isReadOnly role="textbox" options={['Item1', 'Item2', 'Item3']} />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readonly');
  });

  test('cannot change state when readOnly prop is passed', () => {
    render(
      <Select isReadOnly role="textbox" options={['Item1', 'Item2', 'Item3']}>
        Test Select
      </Select>
    );
    const select = screen.getByRole('textbox');
    fireEvent.click(select);
    expect(select).not.toBeChecked();
  });

  test('Select to match snapshot', () => {
    const tree = renderer
      .create(
        <Select
          name="name"
          size="xl"
          error
          options={['Item1', 'Item2', 'Item3']}
          shadow={{ boxShadow: 'rgb(249, 115, 22) 0px 4px 14px 0px' }}
          isReadOnly
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('MultiSelect component', () => {
  const option = 'Option 1';

  test('renders MultiSelect component without crashing', () => {
    render(<MultiSelect option={option} removeOption={() => {}} />);
    expect(screen.getByText(option)).toBeInTheDocument();
  });

  test('calls removeOption when close button is clicked', () => {
    const option = 'Option 1';
    const removeOption = jest.fn();
    render(<MultiSelect option={option} removeOption={removeOption} />);

    const closeButton = screen.getByRole('close-button');
    fireEvent.click(closeButton);
    expect(removeOption).toHaveBeenCalledWith(option);
  });

  test('renders MultiSelect component with provided size', () => {
    render(<MultiSelect option={option} role="MultiSelect" size="md" removeOption={() => {}} />);
    const MultiSelectElement = screen.getByRole('MultiSelect');
    expect(MultiSelectElement).toBeInTheDocument();
    expect(MultiSelectElement).toHaveStyle({ fontSize: 16 });
  });
});
