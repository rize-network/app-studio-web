import React from 'react';
import renderer from './actRenderer.test-utils';
import { TextArea } from 'src/components';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  cleanup();
});

test('renders TextArea component', () => {
  const { container } = render(<textarea />);
  expect(container).toBeInTheDocument();
});

// The runtime half of the `onChange` contract. The type-level half lives in
// src/__tests__/types/TextField.props.type-test.tsx.
test('onChange receives the value, not a DOM event', async () => {
  const received: unknown[] = [];
  render(<TextArea name="body" onChange={(value) => received.push(value)} />);

  await userEvent.type(screen.getByRole('textbox'), 'abc');

  expect(received).toEqual(['a', 'ab', 'abc']);
  received.forEach((arg) => {
    expect(typeof arg).toBe('string');
    expect((arg as any).target).toBeUndefined();
  });
}, 30000);

test('onChangeText fires on web, matching the native view', async () => {
  // Regression: the web view destructured `onChangeText` and never called it,
  // so the callback worked on native and was silently dropped on web.
  const received: string[] = [];
  render(<TextArea name="body" onChangeText={(text) => received.push(text)} />);

  await userEvent.type(screen.getByRole('textbox'), 'hi');

  expect(received).toEqual(['h', 'hi']);
}, 30000);

test('a controlled TextArea keeps the characters it is typed', async () => {
  const Controlled = () => {
    const [body, setBody] = React.useState('');
    return <TextArea name="body" value={body} onChange={setBody} />;
  };
  render(<Controlled />);

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'hello');

  expect(input).toHaveValue('hello');
}, 30000);

test('TextArea matches snapshot', () => {
  const tree = renderer.create(<textarea />).toJSON();
  expect(tree).toMatchSnapshot();
});

test('isEditable={false} renders the textarea read-only', async () => {
  render(<TextArea name="body" value="fixed" isEditable={false} />);
  const input = screen.getByRole('textbox');
  expect(input).toHaveAttribute('readonly');
  await userEvent.type(input, 'attempt to change');
  expect(input).toHaveValue('fixed');
}, 30000);

test('a TextArea is editable by default', async () => {
  render(<TextArea name="body" />);
  const input = screen.getByRole('textbox');
  expect(input).not.toHaveAttribute('readonly');
  await userEvent.type(input, 'ok');
  expect(input).toHaveValue('ok');
}, 30000);

test('isRequired marks the textarea required and aria-required', () => {
  render(<TextArea name="body" isRequired />);
  const input = screen.getByRole('textbox');
  expect(input).toBeRequired();
  expect(input).toHaveAttribute('aria-required', 'true');
});

test('labelProps is spread onto the field label', () => {
  render(
    <TextArea name="body" label="Body" labelProps={{ id: 'body-label' }} />
  );
  expect(screen.getByText('Body')).toHaveAttribute('id', 'body-label');
});
