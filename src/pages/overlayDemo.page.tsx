import React, { useCallback, useState } from 'react';
import { Horizontal, Text, Vertical } from 'app-studio';
import { Button } from 'src/components/Button/Button';
import { Modal } from 'src/components/Modal/Modal';
import { hideModal, showModal } from 'src/components/Modal/Modal/Modal.store';
import { Drawer } from 'src/components/Drawer/Drawer';
import {
  hideDrawer,
  showDrawer,
} from 'src/components/Drawer/Drawer/Drawer.store';

type LogEntry = { id: number; source: 'modal' | 'drawer'; event: string };

const Card = ({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) => (
  <Vertical
    gap={8}
    padding={16}
    borderWidth="1px"
    borderStyle="solid"
    borderColor="color.gray.200"
    borderRadius={8}
    backgroundColor="color.white"
  >
    <Text fontWeight="semiBold" fontSize="md">
      {title}
    </Text>
    <Text color="color.gray.600" fontSize="sm">
      {description}
    </Text>
    <Horizontal gap={8} flexWrap="wrap" paddingTop={8}>
      {children}
    </Horizontal>
  </Vertical>
);

export const OverlayDemoPage = () => {
  const [log, setLog] = useState<LogEntry[]>([]);

  const append = useCallback((source: 'modal' | 'drawer', event: string) => {
    setLog((prev) =>
      [{ id: Date.now() + Math.random(), source, event }, ...prev].slice(0, 20)
    );
  }, []);

  const onModalShow = useCallback(
    (name: string) => append('modal', `show(${name})`),
    [append]
  );
  const onModalHide = useCallback(
    (name?: string) => append('modal', `hide(${name ?? 'all'})`),
    [append]
  );
  const onDrawerShow = useCallback(
    (name: string) => append('drawer', `show(${name})`),
    [append]
  );
  const onDrawerHide = useCallback(
    (name?: string) => append('drawer', `hide(${name ?? 'all'})`),
    [append]
  );

  const modals = {
    HelpModal: (props: any) => {
      console.log('[HelpModal] rendering with props:', props);
      return (
        <Modal.Container {...props}>
          <Modal.Header>
            <Text fontWeight="semiBold" fontSize="lg">
              Need help?
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              This modal was opened through the store API. You can stack it with
              a drawer without either re-registering its callbacks on every
              render.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="outline" onClick={() => hideModal('HelpModal')}>
              Close
            </Button>
            <Button
              onClick={() => {
                hideModal('HelpModal');
                showDrawer('SettingsDrawer', {
                  placement: 'right',
                  size: 'md',
                });
              }}
            >
              Open settings drawer
            </Button>
          </Modal.Footer>
        </Modal.Container>
      );
    },
    ConfirmDeleteModal: (props: any) => {
      console.log('[ConfirmDeleteModal] rendering with props:', props);
      return (
        <Modal.Container {...props}>
          <Modal.Header>
            <Text fontWeight="semiBold" fontSize="lg">
              Delete account?
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text>
              This modal is opened from inside the settings drawer. Closing it
              should leave the drawer visible underneath.
            </Text>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline"
              onClick={() => hideModal('ConfirmDeleteModal')}
            >
              Cancel
            </Button>
            <Button
              variant="filled"
              backgroundColor="color.red.500"
              onClick={() => {
                hideModal('ConfirmDeleteModal');
                hideDrawer('SettingsDrawer');
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal.Container>
      );
    },
  };

  const drawers = {
    SettingsDrawer: () => (
      <>
        <Drawer.Header onClose={() => hideDrawer('SettingsDrawer')}>
          <Text fontWeight="semiBold" fontSize="lg">
            Profile settings
          </Text>
        </Drawer.Header>
        <Drawer.Body>
          <Vertical gap={12}>
            <Text>
              The drawer and modal layouts share a page. Opening a modal from
              this drawer should not trigger a render loop.
            </Text>
            <Button
              variant="outline"
              onClick={() => showModal('ConfirmDeleteModal')}
            >
              Delete account
            </Button>
          </Vertical>
        </Drawer.Body>
        <Drawer.Footer>
          <Button
            variant="outline"
            onClick={() => hideDrawer('SettingsDrawer')}
          >
            Cancel
          </Button>
          <Button onClick={() => hideDrawer('SettingsDrawer')}>Save</Button>
        </Drawer.Footer>
      </>
    ),
    NotificationsDrawer: () => (
      <>
        <Drawer.Header onClose={() => hideDrawer('NotificationsDrawer')}>
          <Text fontWeight="semiBold" fontSize="lg">
            Notifications
          </Text>
        </Drawer.Header>
        <Drawer.Body>
          <Vertical gap={8}>
            <Text>• Deploy succeeded on production.</Text>
            <Text>• 3 new comments on PR #209.</Text>
            <Text>• Weekly report is ready.</Text>
          </Vertical>
        </Drawer.Body>
        <Drawer.Footer>
          <Button onClick={() => hideDrawer('NotificationsDrawer')}>
            Mark all as read
          </Button>
        </Drawer.Footer>
      </>
    ),
  };

  return (
    <Vertical gap={24} padding={24}>
      <Vertical gap={4}>
        <Text as="h1" fontWeight="bold" fontSize="2xl">
          Overlay demo — Modal.Layout + Drawer.Layout
        </Text>
        <Text color="color.gray.600">
          Real-world integration check: both layouts mounted once, triggered
          from the store, and chained from each other.
        </Text>
      </Vertical>

      <Card
        title="Standalone triggers"
        description="Each button opens a single overlay from the store."
      >
        <Button onClick={() => showModal('HelpModal')}>Open help modal</Button>
        <Button
          variant="outline"
          onClick={() =>
            showDrawer('SettingsDrawer', { placement: 'right', size: 'md' })
          }
        >
          Open settings drawer
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showDrawer('NotificationsDrawer', {
              placement: 'bottom',
              size: 'sm',
            })
          }
        >
          Open notifications drawer
        </Button>
      </Card>

      <Card
        title="Cross-overlay flows"
        description="These chains validate that a modal can open a drawer (and vice versa) without breaking the store or causing re-render loops."
      >
        <Button
          onClick={() => {
            showModal('HelpModal');
          }}
        >
          Modal → Drawer
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            showDrawer('SettingsDrawer', { placement: 'right', size: 'md' })
          }
        >
          Drawer → Modal
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            hideModal();
            hideDrawer();
          }}
        >
          Close everything
        </Button>
      </Card>

      <Card
        title="Store event log"
        description="onShow / onHide callbacks are registered via Modal.Layout and Drawer.Layout. If they kept re-registering every render the page would freeze; seeing discrete entries here confirms the fix."
      >
        <Vertical
          gap={4}
          width="100%"
          maxHeight={220}
          overflow="auto"
          padding={8}
          backgroundColor="color.gray.50"
          borderRadius={6}
        >
          {log.length === 0 ? (
            <Text color="color.gray.500">
              No events yet — trigger an overlay above.
            </Text>
          ) : (
            log.map((entry) => (
              <Text
                key={entry.id}
                fontFamily="monospace"
                fontSize="sm"
                color={
                  entry.source === 'modal'
                    ? 'color.blue.700'
                    : 'color.purple.700'
                }
              >
                [{entry.source}] {entry.event}
              </Text>
            ))
          )}
        </Vertical>
      </Card>

      <Modal.Layout modals={modals} onShow={onModalShow} onHide={onModalHide} />
      <Drawer.Layout
        drawers={drawers}
        onShow={onDrawerShow}
        onHide={onDrawerHide}
      />
    </Vertical>
  );
};

export default OverlayDemoPage;
