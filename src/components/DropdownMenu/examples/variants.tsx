import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Text, Vertical, Horizontal } from 'app-studio';
import { Button, CopyIcon, EditIcon, DeleteIcon } from 'src/components';

export const DropdownMenuVariants = () => {
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
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Horizontal gap={20}>
        <Vertical gap={10} alignItems="center">
          <Text>Default Variant</Text>
          <DropdownMenu
            trigger={<Button>Default</Button>}
            items={items}
            variant="default"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Filled Variant</Text>
          <DropdownMenu
            trigger={<Button>Filled</Button>}
            items={items}
            variant="filled"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Outline Variant</Text>
          <DropdownMenu
            trigger={<Button>Outline</Button>}
            items={items}
            variant="outline"
          />
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
