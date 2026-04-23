import React from 'react';
import { Text } from 'app-studio';
import { Button } from '../../Button/Button';
import { Drawer } from '../Drawer';
import { hideDrawer, showDrawer } from '../Drawer/Drawer.store';

export const StoreDrawer = () => {
  return (
    <>
      <Button
        onClick={() =>
          showDrawer('StoreDrawer', { placement: 'right', size: 'md' })
        }
        isAuto
      >
        Open Store Drawer
      </Button>
      <Drawer.Layout
        drawers={{
          StoreDrawer: () => (
            <>
              <Drawer.Header>
                <Text size="lg" weight="semiBold">
                  Store Drawer
                </Text>
              </Drawer.Header>
              <Drawer.Body>
                <Text>
                  This drawer is opened via the store API, the same way the
                  Modal works. Call showDrawer(&apos;StoreDrawer&apos;) to open
                  it and hideDrawer() to close it.
                </Text>
              </Drawer.Body>
              <Drawer.Footer>
                <Button variant="outline" onClick={() => hideDrawer()}>
                  Cancel
                </Button>
                <Button onClick={() => hideDrawer()}>Save</Button>
              </Drawer.Footer>
            </>
          ),
        }}
      />
    </>
  );
};
