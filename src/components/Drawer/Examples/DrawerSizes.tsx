import React, { useState } from 'react';
import { Button, Drawer, Text } from 'src/components';
import { Horizontal, Vertical } from 'app-studio';
import { Size } from '../Drawer/Drawer.type';

export const DrawerSizes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [size, setSize] = useState<Size>('md');

  const openDrawer = (newSize: Size) => {
    setSize(newSize);
    setIsOpen(true);
  };

  return (
    <Vertical gap={10}>
      <Horizontal gap={10} flexWrap="wrap">
        <Button onClick={() => openDrawer('xs')}>xs</Button>
        <Button onClick={() => openDrawer('sm')}>sm</Button>
        <Button onClick={() => openDrawer('md')}>md</Button>
        <Button onClick={() => openDrawer('lg')}>lg</Button>
        <Button onClick={() => openDrawer('xl')}>xl</Button>
        <Button onClick={() => openDrawer('full')}>full</Button>
      </Horizontal>

      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size={size}>
        <Drawer.Header onClose={() => setIsOpen(false)}>
          <Text fontWeight="bold">Drawer Size: {size}</Text>
        </Drawer.Header>
        <Drawer.Body>
          <Text>This drawer has a size of {size}.</Text>
        </Drawer.Body>
      </Drawer>
    </Vertical>
  );
};
