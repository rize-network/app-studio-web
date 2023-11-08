import React from 'react';
import renderer from 'react-test-renderer';
import { Text } from 'src/components/Text/Text';
import { Size } from 'src/components/Text/Text/Text.type';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render text component without crashing', () => {
  render(<Text>Some Text</Text>);
});

test('should render text component with the correct text', () => {
  render(<Text>Some text here</Text>);
  const textElement = screen.getByRole('text');
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent('Some text here');
});

test('should render text component with correct class name', () => {
  render(<Text className="text">Some text here</Text>);
  const textElement = screen.getByRole('text');
  expect(textElement).toHaveClass('text');
});

test('should render a text with fontSize equals to sm', () => {
  render(<Text size={'sm' as Size}>Some text here</Text>);
  const textElement = screen.getByRole('text');
  expect(textElement).toHaveStyle({ fontSize: 'sm' });
});

test('should render a text with a weight equals to bold', () => {
  render(<Text weight="bold">Some text here</Text>);
  const textElement = screen.getByRole('text');
  expect(textElement).toHaveStyle({ fontWeight: 700 });
});

test('should render a text with an italic style', () => {
  render(<Text isItalic>Some text here</Text>);
  const textElement = screen.getByRole('text');
  expect(textElement).toHaveStyle({ fontStyle: 'italic' });
});

test('should render a subscript text to match snapshot', () => {
  const tree = renderer
    .create(
      <Text>
        H<Text isSub>2</Text>O
      </Text>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render a superscript text to match snapshot', () => {
  const tree = renderer
    .create(
      <Text>
        H<Text isSup>2</Text>O
      </Text>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('should render one truncated text line to match snapshot', () => {
  const tree = renderer
    .create(
      <Text isUnderlined maxLines={2} isTruncated>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </Text>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('text to match snapshot', () => {
  const tree = renderer
    .create(
      <Text heading="h1" weight="bold" isStriked>
        Some text here
      </Text>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
