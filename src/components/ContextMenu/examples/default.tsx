import React from 'react';
import { ContextMenu } from '../ContextMenu';
import { Text, Vertical, View } from 'app-studio';
import {
  CopyIcon,
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  ShareIcon,
} from '../../Icon/Icon';
import { ContextMenuItem } from '../ContextMenu/ContextMenu.type';

export const DefaultContextMenu = () => {
  const handleCopy = () => alert('Copy clicked');
  const handleEdit = () => alert('Edit clicked');
  const handleDelete = () => alert('Delete clicked');
  const handleDownload = () => alert('Download clicked');
  const handleShare = () => alert('Share clicked');

  const items: ContextMenuItem[] = [
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
    // {
    //   id: 'divider-1',
    //   divider: true
    // },
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
      <Text marginBottom={10}>Default Context Menu</Text>
      <ContextMenu items={items}>
        <View
          padding={20}
          backgroundColor="color-gray-100"
          borderRadius={8}
          textAlign="center"
          cursor="context-menu"
        >
          <Text>Right-click here to open the context menu</Text>
        </View>
      </ContextMenu>
    </Vertical>
  );
};
