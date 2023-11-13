import React from 'react';
import renderer from 'react-test-renderer';
import {Modal} from 'src/components/Modal/Modal';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Modal Header renders without errors', () => {
  render(<Modal.Header>Modal Title</Modal.Header>);
  const modalHeader = screen.getByText('Modal Title');
  expect(modalHeader).toBeInTheDocument();
});

test('Modal Header renders without closing button', () => {
  const tree = renderer
    .create(<Modal.Header buttonPosition="none">Modal Content</Modal.Header>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Modal Header renders with custom closing button', () => {
  const tree = renderer
    .create(<Modal.Header buttonPosition="left">Modal Content</Modal.Header>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Modal Header renders with closing button with size large', () => {
  const tree = renderer
    .create(<Modal.Header buttonSize="lg">Modal Content</Modal.Header>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Modal Header renders with closing button color black', () => {
  const tree = renderer
    .create(<Modal.Header buttonColor="black">Modal Content</Modal.Header>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
