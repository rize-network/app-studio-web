import React from 'react';
import renderer from 'react-test-renderer';
import Modal from 'src/components/Modal/Modal';

import { cleanup, render } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

test('Modal Overlay renders without errors when isOpen prop is true', () => {
  render(
    <Modal.Overlay isOpen={true} onClose={() => {}}>
      <div>Modal Content</div>
    </Modal.Overlay>
  );
});

// test('Modal Overlay applies correct default styles', () => {
//   render(
//     <Modal.Overlay isOpen={true} onClose={() => {}}>
//       Modal Content
//     </Modal.Overlay>
//   );
//   const modalOverlay = screen.getByText('Modal Content');
//   expect(modalOverlay).toHaveStyle('height: 100vh');
//   expect(modalOverlay).toHaveStyle('width: 100vw');
// });

// test('Modal Overlay applies custom styles using props spread', () => {
//   render(
//     <Modal.Overlay isOpen={true} onClose={() => {}} color="color.red">
//       Modal Content
//     </Modal.Overlay>
//   );
//   const modalOverlay = screen.getByText('Modal Content');
//   expect(modalOverlay).toHaveClass('color: red');
// });

test('Modal Overlay to match snapshot', () => {
  const tree = renderer
    .create(
      <Modal.Overlay
        isOpen={true}
        onClose={() => {}}
        blur={5}
        position="top"
        isClosePrevented
      >
        <Modal.Container>Modal Content</Modal.Container>
      </Modal.Overlay>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
