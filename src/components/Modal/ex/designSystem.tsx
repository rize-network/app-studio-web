/**
 * Modal Examples - Design System
 *
 * Showcases the Modal component following the design guidelines:
 * - Typography: Inter/Geist font, specific sizes/weights
 * - Spacing: 4px grid system
 * - Colors: Neutral palette with semantic colors
 * - Rounded corners: Consistent border radius
 * - Transitions: Subtle animations
 */

import React, { useState } from 'react';
import { Modal } from '../Modal';
import { Button } from '../../Button/Button';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { View } from 'app-studio';

export const DesignSystemModal = () => {
  const [isBasicModalOpen, setIsBasicModalOpen] = useState(false);
  const [isHeaderFooterModalOpen, setIsHeaderFooterModalOpen] = useState(false);
  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(false);
  const [isBlurredModalOpen, setIsBlurredModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [position, setPosition] = useState<
    'center' | 'top' | 'right' | 'bottom' | 'left'
  >('center');

  return (
    <Vertical gap={32}>
      {/* Basic Modal */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Basic Modal
        </Text>
        <Button onClick={() => setIsBasicModalOpen(true)}>
          Open Basic Modal
        </Button>
        <Modal.Container
          isOpen={isBasicModalOpen}
          onClose={() => setIsBasicModalOpen(false)}
        >
          <Modal.Body>
            <Vertical gap={16}>
              <Text size="xl" fontWeight="600">
                Basic Modal
              </Text>
              <Text>
                This is a basic modal following the design system guidelines. It
                has consistent typography, spacing based on a 4px grid system,
                and subtle animations.
              </Text>
              <Horizontal justifyContent="flex-end" marginTop={16}>
                <Button onClick={() => setIsBasicModalOpen(false)}>
                  Close
                </Button>
              </Horizontal>
            </Vertical>
          </Modal.Body>
        </Modal.Container>
      </View>

      {/* Modal with Header and Footer */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Modal with Header and Footer
        </Text>
        <Button onClick={() => setIsHeaderFooterModalOpen(true)}>
          Open Modal with Header and Footer
        </Button>
        <Modal.Container
          isOpen={isHeaderFooterModalOpen}
          onClose={() => setIsHeaderFooterModalOpen(false)}
        >
          <Modal.Header>
            <Text size="xl" fontWeight="600">
              Modal with Header and Footer
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              This modal has a header with a close button and a footer with
              action buttons. The header and footer have subtle borders to
              separate them from the content.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline"
              onClick={() => setIsHeaderFooterModalOpen(false)}
              marginRight={8}
            >
              Cancel
            </Button>
            <Button onClick={() => setIsHeaderFooterModalOpen(false)}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal.Container>
      </View>

      {/* Fullscreen Modal */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Fullscreen Modal
        </Text>
        <Button onClick={() => setIsFullscreenModalOpen(true)}>
          Open Fullscreen Modal
        </Button>
        <Modal.Container
          isOpen={isFullscreenModalOpen}
          onClose={() => setIsFullscreenModalOpen(false)}
          isFullScreen
        >
          <Modal.Header>
            <Text size="xl" fontWeight="600">
              Fullscreen Modal
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Vertical gap={16} height="100%">
              <Text>
                This modal takes up the full screen. Its useful for complex
                forms or detailed content that requires more space.
              </Text>
              <View
                flex={1}
                backgroundColor="color.gray.50"
                borderRadius="8px"
                padding={16}
                marginVertical={16}
              >
                <Text>Content area with flexible height</Text>
              </View>
            </Vertical>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsFullscreenModalOpen(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Container>
      </View>

      {/* Modal Positions */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Modal Positions
        </Text>
        <Horizontal gap={8} flexWrap="wrap">
          <Button
            onClick={() => {
              setPosition('center');
              setIsPositionModalOpen(true);
            }}
          >
            Center
          </Button>
          <Button
            onClick={() => {
              setPosition('top');
              setIsPositionModalOpen(true);
            }}
          >
            Top
          </Button>
          <Button
            onClick={() => {
              setPosition('right');
              setIsPositionModalOpen(true);
            }}
          >
            Right
          </Button>
          <Button
            onClick={() => {
              setPosition('bottom');
              setIsPositionModalOpen(true);
            }}
          >
            Bottom
          </Button>
          <Button
            onClick={() => {
              setPosition('left');
              setIsPositionModalOpen(true);
            }}
          >
            Left
          </Button>
        </Horizontal>
        <Modal.Container
          isOpen={isPositionModalOpen}
          onClose={() => setIsPositionModalOpen(false)}
          position={position}
        >
          <Modal.Header>
            <Text size="xl" fontWeight="600">
              {position.charAt(0).toUpperCase() + position.slice(1)} Position
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              This modal is positioned at the {position} of the screen.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsPositionModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Container>
      </View>

      {/* Blurred Background Modal */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Blurred Background Modal
        </Text>
        <Button onClick={() => setIsBlurredModalOpen(true)}>
          Open Blurred Modal
        </Button>
        <Modal.Container
          isOpen={isBlurredModalOpen}
          onClose={() => setIsBlurredModalOpen(false)}
          blur={8}
        >
          <Modal.Header>
            <Text size="xl" fontWeight="600">
              Blurred Background
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              This modal has a blurred background effect, creating a frosted
              glass appearance that follows the design systems aesthetic.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsBlurredModalOpen(false)}>Close</Button>
          </Modal.Footer>
        </Modal.Container>
      </View>

      {/* Custom Styled Modal */}
      <View>
        <Text marginBottom={8} fontWeight="600">
          Custom Styled Modal
        </Text>
        <Button onClick={() => setIsCustomModalOpen(true)}>
          Open Custom Modal
        </Button>
        <Modal.Container
          isOpen={isCustomModalOpen}
          onClose={() => setIsCustomModalOpen(false)}
          views={{
            container: {
              backgroundColor: 'color.blue.50',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Modal.Header
            buttonColor="color.blue.600"
            views={{
              header: {
                backgroundColor: 'color.blue.100',
                borderBottomColor: 'color.blue.200',
              },
            }}
          >
            <Text size="xl" fontWeight="600" color="color.blue.800">
              Custom Styled Modal
            </Text>
          </Modal.Header>
          <Modal.Body
            views={{
              view: {
                color: 'color.blue.800',
              },
            }}
          >
            <Text>
              This modal has custom styling while still following the design
              systems principles. It uses the blue color palette with consistent
              spacing and typography.
            </Text>
          </Modal.Body>
          <Modal.Footer
            views={{
              container: {
                backgroundColor: 'color.blue.100',
                borderTopColor: 'color.blue.200',
              },
            }}
          >
            <Button
              backgroundColor="color.blue.600"
              _hover={{ backgroundColor: 'color.blue.700' }}
              onClick={() => setIsCustomModalOpen(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal.Container>
      </View>
    </Vertical>
  );
};
