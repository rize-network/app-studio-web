import React from 'react';
import { DropdownMenu } from '../DropdownMenu';
import { Text, Vertical } from 'app-studio';
import {
  Button,
  CopyIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  ShareIcon,
} from 'src/components';

export const DefaultDropdownMenu = () => {
  const handleCopy = () => alert('Copy clicked');
  const handleEdit = () => alert('Edit clicked');
  const handleDelete = () => alert('Delete clicked');
  const handleDownload = () => alert('Download clicked');
  const handleShare = () => alert('Share clicked');

  const items: any[] = [
    {
      id: 'copy',
      label: 'Copy',
      icon: <CopyIcon widthHeight={16} />,
      onClick: handleCopy,
    },
    {
      id: 'edit',
      label: 'Edit',
      icon: <EditIcon widthHeight={16} />,
      onClick: handleEdit,
    },
    {
      id: 'divider-1',
      divider: true,
    },
    {
      id: 'delete',
      label: 'Delete',
      icon: <DeleteIcon widthHeight={16} />,
      onClick: handleDelete,
    },
    {
      id: 'more',
      label: 'More Options',
      items: [
        {
          id: 'download',
          label: 'Download',
          icon: <DownloadIcon widthHeight={16} />,
          onClick: handleDownload,
        },
        {
          id: 'share',
          label: 'Share',
          icon: <ShareIcon widthHeight={16} />,
          onClick: handleShare,
        },
      ],
    },
    {
      id: 'disabled',
      label: 'Disabled Option',
      disabled: true,
    },
  ];

  return (
    <Vertical gap={20} width="100%" maxWidth={400}>
      <Text marginBottom={10}>Default Dropdown Menu</Text>
      <DropdownMenu trigger={<Button>Open Menu</Button>} items={items} />
    </Vertical>
  );
};
