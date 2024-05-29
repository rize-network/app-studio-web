import { Formik } from 'formik';
import React from 'react';
import { FormikForm, FormikSelect } from 'src/components/Formik';
import { Vertical } from 'src/components/Layout';
import { Button } from '../../Button/Button';
import { Text } from '../../Text/Text';

import { Modal } from '../Modal';
import { hideModal, showModal } from '../Modal/Modal.store';

export const DefaultModal = () => {
  return (
    <>
      <Button onClick={() => showModal('DefaultModal')} isAuto>
        Blur Overlay
      </Button>
      <Modal.Layout
        modals={{
          DefaultModal: () => (
            <Modal.Container>
              <Modal.Header>
                <Text size="lg" weight="semiBold">
                  Title
                </Text>
              </Modal.Header>
              <Modal.Body>
                <Formik initialValues={{ name: '' }} onSubmit={console.log}>
                  {() => (
                    <FormikForm>
                      <Vertical alignItems="center">
                        <Vertical gap={20} width="100%">
                          <FormikSelect
                            key={'name'}
                            name={'name'}
                            options={[
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                              'hello',
                            ]}
                          />
                        </Vertical>
                      </Vertical>
                    </FormikForm>
                  )}
                </Formik>
                <Text>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  ctetur et.
                </Text>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={hideModal}>Cancel</Button>
              </Modal.Footer>
            </Modal.Container>
          ),
        }}
      />
    </>
  );
};
