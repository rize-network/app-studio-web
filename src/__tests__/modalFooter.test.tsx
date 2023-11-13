import React from 'react';
import renderer from 'react-test-renderer';
import {Modal} from 'src/components/Modal/Modal';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Modal footer renders without errors', () => {
  render(<Modal.Footer>Modal Title</Modal.Footer>);
  const modalFooter = screen.getByText('Modal Title');
  expect(modalFooter).toBeInTheDocument();
});

test('Modal footer to match snapshot', () => {
  const tree = renderer
    .create(<Modal.Footer>Modal Content</Modal.Footer>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
