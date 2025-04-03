import React from 'react';
import renderer from 'react-test-renderer';
import { Badge } from 'src/components';

import { cleanup, render, screen } from '@testing-library/react';
import { Position, Shape, Size } from 'src/components/Badge/Badge/Badge.type';

afterEach(() => {
  cleanup();
});

test('renders Badge component', () => {
  render(<Badge content="default" />);
  const BadgeElement = screen.getByRole('badge');
  expect(BadgeElement).toBeInTheDocument();
});

describe('Badge Shape Variants', () => {
  test.each([
    ['sharp', '0px'],
    ['rounded', '4px'],
    ['pillShaped', '24px'],
  ])('applies correct border-radius for shape %s', (shape, expectedRadius) => {
    render(<Badge content="test" shape={shape as Shape} />);
    const badgeElement = screen.getByRole('badge');
    expect(badgeElement).toHaveStyle({ borderRadius: expectedRadius });
  });
});

describe('Badge Positioning', () => {
  test.each([
    ['top-right', { top: '0', right: '0' }],
    ['top-left', { top: '0', left: '0' }],
    ['bottom-right', { bottom: '0', right: '0' }],
    ['bottom-left', { bottom: '0', left: '0' }],
  ])('positions badge correctly at %s', (position, expectedStyles) => {
    render(<Badge content="test" position={position as Position} />);
    const badgeElement = screen.getByRole('badge');
    expect(badgeElement).toHaveStyle(expectedStyles);
  });
});

describe('Badge Sizes', () => {
  test.each([
    ['xs', '20px'],
    ['sm', '24px'],
    ['md', '28px'],
    ['lg', '32px'],
    ['xl', '36px'],
  ])('applies correct size for %s size', (size, expectedMinWidth) => {
    render(<Badge content="test" size={size as Size} />);
    const badgeElement = screen.getByRole('badge');
    expect(badgeElement).toHaveStyle({ minWidth: expectedMinWidth });
  });
});

describe('Badge Custom Styles', () => {
  test('applies custom styles correctly', () => {
    const customStyles = {
      container: {
        backgroundColor: 'transparent',
        borderColor: 'purple',
      },
      text: {
        color: 'purple',
      },
    };

    render(<Badge content="test" views={customStyles} />);
    const badgeElement = screen.getByRole('badge');
    const badgeText = screen.getByRole('badgeText');

    expect(badgeElement).toHaveStyle({
      backgroundColor: 'transparent',
      borderColor: 'purple',
    });
    expect(badgeText).toHaveStyle({
      color: 'purple',
    });
  });
});

test('Badge to match snapshot', () => {
  const tree = renderer.create(<Badge content="default" />).toJSON();
  expect(tree).toMatchSnapshot();
});
