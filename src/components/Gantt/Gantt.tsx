import React from 'react';
import { GanttView } from './Gantt/Gantt.view';
import { GanttProps } from './Gantt/Gantt.props';

export const Gantt: React.FC<GanttProps> = (props) => {
  return <GanttView {...props} />;
};
