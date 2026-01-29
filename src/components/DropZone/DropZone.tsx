import React from 'react';
import { DropZoneProps } from './DropZone/DropZone.props';
import { useDropZone } from './DropZone/DropZone.state';
import { DropZoneView } from './DropZone/DropZone.view';

export const DropZone: React.FC<DropZoneProps> = (props) => {
  const state = useDropZone(props);

  return <DropZoneView {...props} {...state} />;
};
