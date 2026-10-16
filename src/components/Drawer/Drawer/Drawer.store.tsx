import { create } from 'zustand';
// Defines the structure for a single drawer instance stored in the global state.
export interface DrawerItem {
  // Unique identifier for the drawer, used for managing its visibility.
  name: string;
  // Properties passed to the drawer component, including an 'isOpen' boolean to control its visibility.
  props: any & { isOpen: boolean };
  // Properties specifically for the overlay associated with the drawer.
  overlayProps: any;
}
// Defines the shape of the global state managed by the Zustand store for all drawers.
export interface DrawerState {
  // An array containing all currently registered drawer items.
  drawers: DrawerItem[];
  // Function to register and display a new drawer or update an existing one, taking its name and optional properties.
  show: (name: string, drawerProps?: any, overlayProps?: any) => void;
  // Function to remove a drawer from the state, optionally by its name. If no name is provided, all drawers are hidden.
  hide: (name?: string) => void;
  // Callback function executed when a drawer is shown, providing its name and props.
  onShow: (name: string, props?: any) => void;
  // Callback function executed when a drawer is hidden, providing its name.
  onHide: (name?: string) => void;
  // Function to set a custom 'onShow' callback handler for drawer display events.
  setOnShow: (onShow: (name: string, props?: any) => void) => void;
  // Function to set a custom 'onHide' callback handler for drawer hide events.
  setOnHide: (onHide: (name?: string) => void) => void;
}
// Initializes the Zustand store for managing global drawer state and actions.
export const useDrawerStore = create<DrawerState>((set) => ({
  // Initial state where no drawers are registered.
  drawers: [],
  // Default `onHide` callback handler, which simply returns the name if provided.
  onHide: (name?: string) => name,
  // Default `onShow` callback handler, which returns an object containing the drawer name and props.
  onShow: (name: string, props?: any) => ({ name, props }),
  // Action to add a new drawer to the state or update an existing one. It sets the 'isOpen' prop to false initially.
  show: (name, drawerProps = {}, overlayProps = {}) => {
    set((state: DrawerState) => ({
      ...state,
      drawers: [
        ...state.drawers,
        {
          name,
          props: { ...drawerProps, isOpen: false },
          overlayProps,
        },
      ],
    }));
  },
  // Action to remove a specific drawer by name or clear all drawers from the state.
  hide: (name) => {
    set((state: DrawerState) => {
      if (!name) {
        return { drawers: [] };
      }
      return {
        ...state,
        drawers: state.drawers.filter((drawer) => drawer.name !== name),
      };
    });
  },
  // Action to update the 'onHide' callback handler in the store.
  setOnHide: (onHide: (name?: string) => void) => {
    set((state: DrawerState) => ({ ...state, onHide }));
  },
  // Action to update the 'onShow' callback handler in the store.
  setOnShow: (onShow: (name: string, props?: any) => void) => {
    set((state: DrawerState) => ({ ...state, onShow }));
  },
}));
// Utility function to imperatively display a drawer by managing its state in the store, including hiding any existing instance and setting 'isOpen' to true after a microtask.
export const showDrawer = (
  name: string,
  drawerProps: any = {},
  overlayProps: any = {}
) => {
  const state = useDrawerStore.getState();
  state.hide(name);
  state.show(name, drawerProps, overlayProps);
  state.onShow(name, drawerProps);
  queueMicrotask(() => {
    useDrawerStore.setState((s) => ({
      drawers: s.drawers.map((drawer) =>
        drawer.name === name
          ? { ...drawer, props: { ...drawer.props, isOpen: true } }
          : drawer
      ),
    }));
  });
};
// Utility function to imperatively hide a drawer, triggering the 'onHide' callback and removing it from the store.
export const hideDrawer = (name?: string) => {
  useDrawerStore.getState().onHide(name);
  useDrawerStore.getState().hide(typeof name === 'string' ? name : undefined);
};
