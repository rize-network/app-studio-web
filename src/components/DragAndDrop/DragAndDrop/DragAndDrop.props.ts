import { ViewProps } from 'app-studio';

export interface DragAndDropProps {
  items: any[];
  onChange?: (items: any[]) => void;
  renderItem?: (item: any, index: number) => React.ReactNode;
  containerProps?: ViewProps;
  itemProps?: ViewProps;
}
