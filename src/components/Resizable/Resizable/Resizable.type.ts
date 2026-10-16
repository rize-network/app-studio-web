import { ViewProps } from 'app-studio';
// Defines the possible orientations for the resizable component, either horizontal or vertical.
export type Orientation = 'horizontal' | 'vertical';
// Specifies where the resize handle can be positioned: at the start, end, or both sides of a panel.
export type HandlePosition = 'start' | 'end' | 'both';
// Defines a set of predefined size variants ('sm', 'md', 'lg') that can be applied to the component.
export type Size = 'sm' | 'md' | 'lg';
// Defines visual style variants ('default', 'subtle', 'prominent') for the component's appearance.
export type Variant = 'default' | 'subtle' | 'prominent';
// Defines the interface for a storage mechanism used by the Resizable component to persist panel states.
export interface ResizableStorage {
  // Method to retrieve an item from storage using its unique identifier.
  getItem: (id: string) => string | null;
  // Method to store an item with a given ID and its corresponding value.
  setItem: (id: string, value: string) => void;
}
// Defines the structure for information pertaining to a single resizable panel.
export interface PanelInfo {
  // A unique identifier for the panel.
  id: string;
  // The current size of the panel.
  size: number;
  // Optional minimum size the panel can be resized to.
  minSize?: number;
  // Optional maximum size the panel can be resized to.
  maxSize?: number;
  // Optional flag indicating whether the panel can be collapsed.
  collapsible?: boolean;
  // Optional flag indicating the current collapsed state of the panel.
  collapsed?: boolean;
}
// Defines the shape of the context object provided by the Resizable component, enabling communication and state sharing among child components.
export interface ResizableContextType {
  // The current orientation of the resizable panels.
  orientation: Orientation;
  // The predefined size variant applied to the component.
  size: Size;
  // The visual style variant applied to the component.
  variant: Variant;
  // A boolean indicating if a resize operation is currently in progress.
  isResizing: boolean;
  // Function to update the 'isResizing' state.
  setIsResizing: (isResizing: boolean) => void;
  // Registers a new resizable panel with the context, providing its initial configuration.
  registerPanel: (
    // The unique identifier for the panel.
    id: string,
    // The initial size of the panel.
    initialSize: number,
    // Optional minimum size for the panel.
    minSize?: number,
    // Optional maximum size for the panel.
    maxSize?: number,
    // Optional flag indicating if the panel can be collapsed.
    collapsible?: boolean
  ) => void;
  // Unregisters a panel from the context using its ID.
  unregisterPanel: (id: string) => void;
  // Retrieves the current size of a panel identified by its ID.
  getPanelSize: (id: string) => number;
  // Sets the size of a panel identified by its ID.
  setPanelSize: (id: string, size: number) => void;
  // Checks if a panel identified by its ID is currently collapsed.
  isPanelCollapsed: (id: string) => boolean;
  // Toggles the collapsed state of a panel identified by its ID.
  togglePanelCollapse: (id: string) => void;
  // Initiates a resize operation, capturing the handle ID and client position.
  startResize: (handleId: string, clientPosition: number) => void;
  // Handles the ongoing movement during a resize operation, updating panel sizes based on client position.
  onResize: (clientPosition: number) => void;
  // Concludes the current resize operation.
  endResize: () => void;
}
// Defines the interface for custom styling properties that can be applied to various sub-components of the Resizable component.
export interface ResizableStyles {
  // Optional styling for the main container of the resizable component.
  container?: ViewProps;
  // Optional styling for individual resizable panels.
  panel?: ViewProps;
  // Optional styling specifically for panels when they are in a collapsed state.
  collapsedPanel?: ViewProps;
  // Optional styling for the resize handle, including specific styles for hover and active states.
  handle?: ViewProps & { _hover?: ViewProps; _active?: ViewProps };
  // Optional styling for the icon displayed within the resize handle.
  handleIcon?: ViewProps;
  // Optional styling for the icon used to collapse or expand panels.
  collapseIcon?: ViewProps;
}
