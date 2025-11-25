import React, { useState } from 'react';
import { Button, Drawer, Text } from 'src/components';
import { Vertical } from 'app-studio';

export const DefaultDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Vertical>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Drawer.Header onClose={() => setIsOpen(false)}>
          <Text fontWeight="bold">Drawer Title</Text>
        </Drawer.Header>
        <Drawer.Body>
          <Text>This is the body of the drawer.</Text>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>Save</Button>
        </Drawer.Footer>
      </Drawer>
    </Vertical>
  );
};
