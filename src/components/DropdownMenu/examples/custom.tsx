import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Text, Vertical } from 'app-studio';
import { Button, CopyIcon, EditIcon, DeleteIcon } from 'src/components';

export const CustomDropdownMenu = () => {
  const items: any[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <CopyIcon widthHeight={16} />,
      onClick: () => alert('Copy clicked'),
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon widthHeight={16} />,
      onClick: () => alert('Edit clicked'),
    },
    {
      id: 'divider-1',
      divider: true,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon widthHeight={16} />,
      onClick: () => alert('Delete clicked'),
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Custom Styled Dropdown Menu</Text>
      <DropdownMenu
        trigger={<Button variant="outline">Custom Menu</Button>}
        items={items}
        views={{
          menu: {
            backgroundColor: 'color-blue',
            color: 'color-white',
            borderRadius: '8px',
          },
          item: {
            _hover: {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
          },
          divider: {
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
          },
        }}
      />
    </Vertical>
  );
};
