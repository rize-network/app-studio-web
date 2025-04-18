import React from 'react';
import renderer from 'react-test-renderer';
import { TextArea } from 'src/components';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

describe('TextArea', () => {
  test('renders TextArea component without crashing', () => {
    render(<TextArea name="username" role="textbox" />);
    const TextAreaElement = screen.getByRole('textbox');
    expect(TextAreaElement).toBeInTheDocument();
  });

  test('renders TextArea with default value', () => {
    render(<TextArea name="username" value="John" role="textbox" />);
    const TextAreaElement = screen.getByRole('textbox');
    expect(TextAreaElement).toHaveValue('John');
  });

  test('renders disabled TextField', () => {
    render(<TextArea name="username" isDisabled role="textbox" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  test('renders readonly TextField', () => {
    render(<TextArea name="username" value="readonly value" isReadOnly />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readonly');
    expect(inputElement).toHaveValue('readonly value');
    userEvent.type(inputElement, 'attempt to change');
    expect(inputElement).toHaveValue('readonly value');
  });

  // test('renders TextArea with none variant', () => {
  //   render(
  //     <TextArea
  //       name="username"
  //       value="John"
  //       role="textbox"
  //       variant="none"
  //     />
  //   );
  //   const TextAreaElement = screen.getByRole('textbox');
  //   expect(TextAreaElement).toHaveStyle({
  //     border: 'none',
  //     backgroundColor: 'transparent',
  //   });
  // });

  test('calls onChange callback when value changes', () => {
    const onChangeMock = jest.fn();
    render(<TextArea name="username" onChange={onChangeMock} role="textbox" />);
    const TextAreaElement = screen.getByRole('textbox');
    fireEvent.change(TextAreaElement, { target: { value: 'new value' } });
    expect(onChangeMock).toHaveBeenCalled();
  });

  // test('renders TextArea with custom styles', () => {
  //   render(
  //     <TextArea name="username" style={{ color: 'red' }} role="textbox" />
  //   );
  //   const TextAreaElement = screen.getByRole('textbox');
  //   expect(TextAreaElement).toHaveStyle({ color: 'red' });
  // });

  test('renders TextArea with additional props', () => {
    render(<TextArea name="username" data-testid="textarea" role="textbox" />);
    const TextAreaElement = screen.getByTestId('textarea');
    expect(TextAreaElement).toBeInTheDocument();
  });
});

test('TextArea to match snapshot', () => {
  const tree = renderer
    .create(
      <TextArea
        name="name"
        maxRows={3}
        maxCols={35}
        error={true}
        placeholder="Name"
        helperText={'required'}
        variant="outline"
        size="xl"
        views={{
          container: {
            backgroundColor: 'red',
          },
          label: {
            fontSize: 15,
          },
          field: {
            backgroundColor: 'red',
          },
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
