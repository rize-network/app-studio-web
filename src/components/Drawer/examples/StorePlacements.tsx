import React from 'react';
import { Button } from '../../Button/Button';
import { Drawer } from '../Drawer';
import { type Placement } from '../Drawer/Drawer.type';
import { Horizontal, Vertical, Text } from 'app-studio';
import { showDrawer } from '../Drawer/Drawer.store';

export const StorePlacements = () => {
  const openDrawer = (placement: Placement) => {
    showDrawer('StorePlacementDrawer', { placement, size: 'md' });
  };

  return (
    <Vertical gap={10}>
      <Horizontal gap={10}>
        <Button onClick={() => openDrawer('left')}>Left</Button>
        <Button onClick={() => openDrawer('right')}>Right</Button>
        <Button onClick={() => openDrawer('top')}>Top</Button>
        <Button onClick={() => openDrawer('bottom')}>Bottom</Button>
      </Horizontal>

      <Drawer.Layout
        drawers={{
          StorePlacementDrawer: () => (
            <>
              <Drawer.Header>
                <Text fontWeight="bold">Store Drawer</Text>
              </Drawer.Header>
              <Drawer.Body>
                <Text>
                  This drawer is opened via the store with different placements
                  using showDrawer(&apos;StorePlacementDrawer&apos;, {'{'}
                  placement, size{'}'}).
                </Text>
              </Drawer.Body>
            </>
          ),
        }}
      />
    </Vertical>
  );
};
