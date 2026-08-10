import React from 'react';
import renderer from './actRenderer.test-utils';
import { cleanup, render, screen } from '@testing-library/react';
import { ContextMenu } from 'src/components/ContextMenu/ContextMenu';

afterEach(() => {
  cleanup();
});

test('renders ContextMenu component', () => {
  render(<div>Context Menu</div>);
});

test('ContextMenu matches snapshot', () => {
  const tree = renderer.create(<div>Context Menu</div>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('a link item with isExternal opens in a new tab with the safe rel pairing', () => {
  render(
    <ContextMenu.Item to="https://appstudio.dev" isExternal>
      Documentation
    </ContextMenu.Item>
  );
  const item = screen.getByRole('menuitem');
  expect(item.tagName).toBe('A');
  expect(item).toHaveAttribute('href', 'https://appstudio.dev');
  expect(item).toHaveAttribute('target', '_blank');
  expect(item).toHaveAttribute('rel', 'noopener noreferrer');
});

test('a link item without isExternal stays in the same tab', () => {
  render(<ContextMenu.Item to="/settings">Settings</ContextMenu.Item>);
  const item = screen.getByRole('menuitem');
  expect(item.tagName).toBe('A');
  expect(item).toHaveAttribute('href', '/settings');
  expect(item).not.toHaveAttribute('target');
  expect(item).not.toHaveAttribute('rel');
});
