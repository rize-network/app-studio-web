import { ViewProps } from 'app-studio';
export interface DragAndDropProps {
  // An array of items to be rendered and managed by the drag-and-drop component.
  items: any[];
  // Callback function invoked when the order of items changes, providing the updated array of items.
  onChange?: (items: any[]) => void;
  // A function to customize how each item in the list is rendered, receiving the item data and its index.
  renderItem?: (item: any, index: number) => React.ReactNode;
  // Optional props to be applied to the main container element of the drag-and-drop component.
  containerProps?: ViewProps;
  // Optional props to be applied to each individual draggable item's container.
  itemProps?: ViewProps;
}
export interface DragAndDropViewProps
  extends DragAndDropProps,
    Omit<ViewProps, 'onChange'> {
  // The index of the item currently being dragged, or null if no item is being dragged.
  draggedIndex: number | null;
  // A mutable ref object to store references to the DOM elements of each draggable item for position tracking.
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  // A function to customize how each item in the list is rendered within the view component, receiving the item data and its index.
  renderItem?: (item: any, index: number) => React.ReactNode;
  // Function to initiate the drag operation, triggered by mouse or touch events, and identifies the item by its index.
  handleDragStart: (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => void;
  // Optional props to be applied to various sub-views within the component.
  views?: {
    // Optional props specifically for the container view of the drag-and-drop component.
    container?: ViewProps;
    // Optional props specifically for the individual item views within the drag-and-drop component.
    item?: ViewProps;
  };
}
