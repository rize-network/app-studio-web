import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Drawer } from './Drawer';
// Defines a test suite for the Drawer component, grouping all related tests for its functionality.
describe('Drawer Component', () => {
  // Declares a set of default properties (isOpen, onClose) to be used by multiple test cases, ensuring consistent testing conditions.
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
  };
  // Tests whether the Drawer component correctly renders its children (content) when the 'isOpen' prop is set to true.
  test('renders drawer content when isOpen is true', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Drawer Content</div>
      </Drawer>
    );
    expect(screen.getByText('Drawer Content')).toBeInTheDocument();
  });
  test('overlay is visible when isOpen is true', () => {
    render(
      <Drawer {...defaultProps}>
        <div>Drawer Content</div>
      </Drawer>
    );
    const overlay = screen.getByTestId('drawer-overlay');
    expect(overlay).toHaveStyle('visibility: visible');
  });
  test('overlay is hidden when isOpen is false', () => {
    render(
      <Drawer {...defaultProps} isOpen={false}>
        <div>Drawer Content</div>
      </Drawer>
    );
    const overlay = screen.getByTestId('drawer-overlay');
    expect(overlay).toHaveStyle('visibility: hidden');
  });
  test('calls onClose when overlay is clicked', () => {
    const onClose = jest.fn();
    render(
      <Drawer {...defaultProps} onClose={onClose}>
        <div>Drawer Content</div>
      </Drawer>
    );
    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
  test('does not call onClose when overlay is clicked and isClosePrevented is true', () => {
    const onClose = jest.fn();
    render(
      <Drawer {...defaultProps} onClose={onClose} isClosePrevented={true}>
        <div>Drawer Content</div>
      </Drawer>
    );
    const overlay = screen.getByTestId('drawer-overlay');
    fireEvent.click(overlay);
    expect(onClose).not.toHaveBeenCalled();
  });
  test('does not call onClose when clicking inside the drawer container', () => {
    const onClose = jest.fn();
    render(
      <Drawer {...defaultProps} onClose={onClose}>
        <div>Drawer Content</div>
      </Drawer>
    );
    const content = screen.getByText('Drawer Content');
    fireEvent.click(content);
    expect(onClose).not.toHaveBeenCalled();
  });
});
