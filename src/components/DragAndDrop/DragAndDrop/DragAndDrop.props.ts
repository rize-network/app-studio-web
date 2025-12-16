import { ViewProps } from 'app-studio';
export interface DragAndDropProps {
  items: any[];
  onChange?: (items: any[]) => void;
  renderItem?: (item: any, index: number) => React.ReactNode;
  containerProps?: ViewProps;
  itemProps?: ViewProps;
}

export interface DragAndDropViewProps
  extends DragAndDropProps,
    Omit<ViewProps, 'onChange'> {
  draggedIndex: number | null;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  renderItem?: (item: any, index: number) => React.ReactNode;
  handleDragStart: (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => void;
  views?: {
    container?: ViewProps;
    item?: ViewProps;
  };
}
