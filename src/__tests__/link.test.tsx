import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Link } from 'src/components/Link/Link';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('should render Link component without crashing', () => {
  render(
    <BrowserRouter>
      <Link href={'/'}>Default</Link>
    </BrowserRouter>
  );
});

test('should render Link component with correct text', () => {
  render(
    <BrowserRouter>
      <Link href="/" role="Link">
        Link
      </Link>
    </BrowserRouter>
  );
  const LinkElement = screen.getByRole('Link');
  expect(LinkElement).toBeInTheDocument();
  expect(LinkElement).toHaveTextContent('Link');
});

test('should render Link component with correct class name', () => {
  render(
    <BrowserRouter>
      <Link role="Link" href={'https://www.npmjs.com/package/app-studio'} className="link">
        External
      </Link>
    </BrowserRouter>
  );
  const LinkElement = screen.getByRole('Link');
  expect(LinkElement).toHaveClass('link');
});

test('Link to have text decoration underline on hover should match snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <Link href={'https://www.npmjs.com/package/app-studio'} underline="hover">
          Link
        </Link>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Link to open external link in a new tab should match snapshot', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        {' '}
        <Link href={'https://www.npmjs.com/package/app-studio'} isExternal iconSize="sm">
          External
        </Link>
      </BrowserRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
