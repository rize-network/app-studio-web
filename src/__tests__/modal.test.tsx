import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from 'src/components';
import Modal from 'src/components/Modal/Modal';

test('Modal to match snapshot', () => {
  const tree = renderer
    .create(
      <Modal.Overlay isOpen={true} onClose={() => {}} position="left" blur={10} isFullScreen>
        <Modal.Container variant="sharp" shadow={{ boxShadow: 'none' }} isClosePrevented>
          <Modal.Header buttonSize="xl" buttonPosition="left">
            Modal Container
          </Modal.Header>
          <Modal.Body height="200px">
            Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras
            mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus
            sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
            fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
            fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet
            fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.
            Cras mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras
            mattis consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.Cras mattis
            consectetur purus sit amet fermentum.Cras mattis consectetur purus sit amet fermentum.
          </Modal.Body>
          <Modal.Footer>
            <Button>Cancel</Button>
          </Modal.Footer>
        </Modal.Container>
      </Modal.Overlay>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
