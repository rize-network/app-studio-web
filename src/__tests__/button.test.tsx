import React from 'react';
import renderer from './actRenderer.test-utils';
import { Button } from 'src/components/Button/Button';
import { Shape } from 'src/components/Button/Button/Button.type';
import { DustBinIcon } from 'src/components/Icon/Icon';

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';

afterEach(() => {
  cleanup();
});

test('subtle variant accepts a raw CSS backgroundColor without producing garbage tints', () => {
  const { container } = render(
    <Button variant="subtle" backgroundColor="#22c55e">
      Delete
    </Button>
  );
  // Appending the app-studio alpha suffix to a hex value (`#22c55e-100`) is
  // not a color; the tint must go through color-mix for raw CSS values.
  expect(container.innerHTML).not.toContain('#22c55e-');
});

test('subtle variant still tints from a color token, replacing existing alpha', () => {
  const { container } = render(
    <Button variant="subtle" color="color-green-900-300">
      Save
    </Button>
  );
  expect(container.innerHTML).not.toContain('900-300-100');
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

// test('should render a button with fontSize equals to sm', () => {
//   render(<Button size={'sm' as Size}>Button</Button>);
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveStyle({ fontSize: 'sm' });
// });

// test('should render a button with a width equals to fit-content', () => {
//   render(<Button isAuto>Button</Button>);
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveStyle({ width: 'fit-content' });
// });

// test('should render a button with a width equals to 100%', () => {
//   render(<Button isFilled>Button</Button>);
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveStyle({ width: '100%' });
// });

// test('should render a button with backgroundColor theme-secondary', () => {
//   render(<Button >Button</Button>);
//   const buttonElement = screen.getByRole('button');
//   expect(buttonElement).toHaveStyle({ backgroundColor: 'theme-secondary' });
// });

test('button component calls onClick function when clicked', () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Button</Button>);
  const buttonElement = screen.getByRole('button');
  fireEvent.click(buttonElement);
  expect(handleClick).toHaveBeenCalledTimes(1);
});

test('Button with an icon on the left to match snapshot', () => {
  const tree = renderer
    .create(
      <Button icon={<DustBinIcon size={24} />} shape={'pill' as Shape}>
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
        icon={<DustBinIcon size={24} />}
        shape={'pill' as Shape}
        iconPosition="right"
      >
        Delete
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button will a pill shape to match snapshot', () => {
  const tree = renderer
    .create(
      <Button shape={'pill' as Shape} isAuto>
        Pill Shape
      </Button>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('ariaLabel is applied as the accessible name of the button', () => {
  render(<Button ariaLabel="Delete the item">Delete</Button>);
  const buttonElement = screen.getByRole('button', {
    name: 'Delete the item',
  });
  expect(buttonElement).toHaveAttribute('aria-label', 'Delete the item');
});

test('leftIcon renders before and rightIcon after the button label', () => {
  render(
    <Button
      leftIcon={<span data-testid="left-icon" />}
      rightIcon={<span data-testid="right-icon" />}
    >
      Label
    </Button>
  );
  const buttonElement = screen.getByRole('button');
  const left = screen.getByTestId('left-icon');
  const right = screen.getByTestId('right-icon');
  expect(buttonElement).toContainElement(left);
  expect(buttonElement).toContainElement(right);
  // DOM order: the left icon comes before the right icon, with the label
  // rendered between them.
  expect(
    left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING
  ).toBeTruthy();
  const row = left.parentElement?.parentElement;
  expect(row?.textContent).toContain('Label');
});

test('startIcon and endIcon are aliases of leftIcon and rightIcon', () => {
  render(
    <Button
      startIcon={<span data-testid="start-icon" />}
      endIcon={<span data-testid="end-icon" />}
    >
      Label
    </Button>
  );
  const buttonElement = screen.getByRole('button');
  expect(buttonElement).toContainElement(screen.getByTestId('start-icon'));
  expect(buttonElement).toContainElement(screen.getByTestId('end-icon'));
});

test('loaderProps is forwarded to the Loader when isLoading', () => {
  const { container } = render(
    <Button isLoading loaderProps={{ id: 'button-loader' }}>
      Saving
    </Button>
  );
  expect(container.querySelector('#button-loader')).toBeTruthy();
});
