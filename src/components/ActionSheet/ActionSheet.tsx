import React from 'react';
import { ActionSheetProps } from './ActionSheet/ActionSheet.props';
import { useActionSheetState } from './ActionSheet/ActionSheet.state';
import ActionSheetView from './ActionSheet/ActionSheet.view';

const ActionSheetComponent: React.FC<ActionSheetProps> = (props) => {
  const actionSheetState = useActionSheetState(props);

  return <ActionSheetView {...props} {...actionSheetState} />;
};

export const ActionSheet = ActionSheetComponent;
