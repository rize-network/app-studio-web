import React from 'react';
import renderer from 'react-test-renderer';
import Modal from 'src/components/Modal/Modal';

import { cleanup, render, screen } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('ModalContainer renders without errors when children prop is provided', () => {
  render(
    <Modal.Container>
      <div>Modal Content</div>
    </Modal.Container>
  );
});

test('ModalContainer renders children within the container', () => {
  render(
    <Modal.Container>
      <div>Modal Content</div>
    </Modal.Container>
  );
  expect(screen.getByText('Modal Content')).toBeInTheDocument();
});

test('ModalContainer applies correct default styles', () => {
  render(
    <Modal.Container role="container">
      <div>Modal Content</div>
    </Modal.Container>
  );
  const modalContainer = screen.getByRole('container');
  expect(modalContainer).toHaveStyle('overflow: hidden');
  expect(modalContainer).toHaveStyle('background-color: white');
});

test('ModalContainer to be full screen', () => {
  render(
    <Modal.Container role="container" isFullScreen>
      <div>Modal Content</div>
    </Modal.Container>
  );
  const modalContainer = screen.getByText('Modal Content');
  expect(modalContainer).toHaveStyle('width: 600');
  expect(modalContainer).toHaveStyle('height: fit-content');
});

test('ModalContainer applies custom styles using props spread', () => {
  render(
    <Modal.Container role="container" style={{ color: 'red' }}>
      <div>Modal Content</div>
    </Modal.Container>
  );
  const modalContainer = screen.getByRole('container');
  expect(modalContainer).toHaveStyle('color: red');
});

test('Modal Container to match snapshot', () => {
  const tree = renderer
    .create(
      <Modal.Container role="container" shape="rounded" shadow={{ boxShadow: 'none' }} isFullScreen>
        <div>Modal Content</div>
      </Modal.Container>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
