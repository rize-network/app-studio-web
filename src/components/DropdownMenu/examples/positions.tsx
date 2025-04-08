import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Text, Vertical, View, Horizontal } from 'app-studio';
import { Button, CopyIcon, EditIcon, DeleteIcon } from 'src/components';

export const DropdownMenuPositions = () => {
  const items = [
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
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon widthHeight={16} />,
      onClick: () => alert('Delete clicked'),
    },
  ];

  return (
    <Vertical gap={30} width="100%" maxWidth={600}>
      <Text fontWeight="bold" marginBottom={10}>
        Different Positions
      </Text>

      <Horizontal gap={20} flexWrap="wrap">
        <Vertical gap={10} alignItems="center">
          <Text>Bottom (Default)</Text>
          <DropdownMenu
            trigger={<Button>Bottom</Button>}
            items={items}
            side="bottom"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Top</Text>
          <DropdownMenu
            trigger={<Button>Top</Button>}
            items={items}
            side="top"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Left</Text>
          <DropdownMenu
            trigger={<Button>Left</Button>}
            items={items}
            side="left"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Right</Text>
          <DropdownMenu
            trigger={<Button>Right</Button>}
            items={items}
            side="right"
          />
        </Vertical>
      </Horizontal>

      <Text fontWeight="bold" marginBottom={10}>
        Different Alignments
      </Text>

      <Horizontal gap={20} flexWrap="wrap">
        <Vertical gap={10} alignItems="center">
          <Text>Start (Default)</Text>
          <DropdownMenu
            trigger={<Button>Start</Button>}
            items={items}
            align="start"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>Center</Text>
          <DropdownMenu
            trigger={<Button>Center</Button>}
            items={items}
            align="center"
          />
        </Vertical>

        <Vertical gap={10} alignItems="center">
          <Text>End</Text>
          <DropdownMenu
            trigger={<Button>End</Button>}
            items={items}
            align="end"
          />
        </Vertical>
      </Horizontal>
    </Vertical>
  );
};
