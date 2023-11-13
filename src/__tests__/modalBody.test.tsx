import React from 'react';
import renderer from 'react-test-renderer';
import {Modal} from 'src/components/Modal/Modal';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Modal body renders without errors', () => {
  render(<Modal.Body>Modal Title</Modal.Body>);
  const modalBody = screen.getByText('Modal Title');
  expect(modalBody).toBeInTheDocument();
});

test('Modal body to match snapshot', () => {
  const tree = renderer
    .create(<Modal.Body buttonColor="black">Modal Content</Modal.Body>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
