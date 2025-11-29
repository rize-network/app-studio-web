import React, { useState } from 'react';
import { Button, Drawer } from '../../../components';
import { Placement } from '../Drawer/Drawer.type';
import { Horizontal, Vertical, Text } from 'app-studio';

export const DrawerPlacements = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>('right');

  const openDrawer = (newPlacement: Placement) => {
    setPlacement(newPlacement);
    setIsOpen(true);
  };

  return (
    <Vertical gap={10}>
      <Horizontal gap={10}>
        <Button onClick={() => openDrawer('left')}>Left</Button>
        <Button onClick={() => openDrawer('right')}>Right</Button>
        <Button onClick={() => openDrawer('top')}>Top</Button>
        <Button onClick={() => openDrawer('bottom')}>Bottom</Button>
      </Horizontal>

      <Drawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        placement={placement}
      >
        <Drawer.Header onClose={() => setIsOpen(false)}>
          <Text fontWeight="bold">Drawer ({placement})</Text>
        </Drawer.Header>
        <Drawer.Body>
          <Text>This drawer slides from the {placement}.</Text>
        </Drawer.Body>
      </Drawer>
    </Vertical>
  );
};
