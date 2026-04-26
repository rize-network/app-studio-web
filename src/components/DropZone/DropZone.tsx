import React from 'react';
import { DropZoneProps } from './DropZone/DropZone.props';
import { useDropZone } from './DropZone/DropZone.state';
import { DropZoneView } from './DropZone/DropZone.view';
// This file defines the main DropZone React functional component, which orchestrates the integration of its properties with state management from 'useDropZone' and renders the final presentation layer using 'DropZoneView'.
export const DropZone: React.FC<DropZoneProps> = (props) => {
  const state = useDropZone(props);
  return <DropZoneView {...props} {...state} />;
};
