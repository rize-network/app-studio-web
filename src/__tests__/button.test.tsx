import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'src/components/Button/Button';
import { Shape, Size } from 'src/components/Button/Button/Button.type';
import { DustBinSvg } from 'src/components/Svg';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render button component without crashing', () => {
  render(<Button />);
});

test('should render button component with correct text', () => {
  render(<Button>Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toBeInTheDocument();
  expect(buttonElement).toHaveTextContent('Button');
});

test('should render button component with correct class name', () => {
  render(<Button className="button">Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveClass('button');
});

test('should render a button with fontSize equals to sm', () => {
  render(<Button size={'sm' as Size}>Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveStyle({ fontSize: 'sm' });
});

test('should render a button with a width equals to fit-content', () => {
  render(<Button isAuto>Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveStyle({ width: 'fit-content' });
});

test('should render a button with a width equals to 100%', () => {
  render(<Button isFilled>Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveStyle({ width: '100%' });
});

test('should render a button with backgroundColor theme.secondary', () => {
  render(<Button colorScheme="theme.secondary">Button</Button>);
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toHaveStyle({ backgroundColor: 'theme.secondary' });
});

test('button component calls onClick function when clicked', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Button</Button>);
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Button with an icon on the left to match snapshot', () => {
  const tree = renderer
    .create(
      <Button icon={<DustBinSvg size={24} />} shape={'pillShaped' as Shape} colorScheme="theme.secondary">
        Delete
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button with an icon on the right to match snapshot', () => {
  const tree = renderer
    .create(
      <Button
        icon={<DustBinSvg size={24} />}
        shape={'pillShaped' as Shape}
        iconPosition="right"
        colorScheme="theme.secondary"
      >
        Delete
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button will a pillShaped shape to match snapshot', () => {
  const tree = renderer
    .create(
      <Button shape={'pillShaped' as Shape} isAuto>
        Pill Shape
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
