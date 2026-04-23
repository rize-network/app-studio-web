import { create } from 'zustand';

export interface DrawerItem {
  name: string;
  props: any & { isOpen: boolean };
  overlayProps: any;
}

export interface DrawerState {
  drawers: DrawerItem[];
  show: (name: string, drawerProps?: any, overlayProps?: any) => void;
  hide: (name?: string) => void;
  onShow: (name: string, props?: any) => void;
  onHide: (name?: string) => void;
  setOnShow: (onShow: (name: string, props?: any) => void) => void;
  setOnHide: (onHide: (name?: string) => void) => void;
}

export const useDrawerStore = create<DrawerState>((set) => ({
  drawers: [],
  onHide: (name?: string) => name,
  onShow: (name: string, props?: any) => ({ name, props }),
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
  setOnHide: (onHide: (name?: string) => void) => {
    set((state: DrawerState) => ({ ...state, onHide }));
  },
  setOnShow: (onShow: (name: string, props?: any) => void) => {
    set((state: DrawerState) => ({ ...state, onShow }));
  },
}));

export const showDrawer = (
  name: string,
  drawerProps: any = {},
  overlayProps: any = {}
) => {
  const state = useDrawerStore.getState();

  // Close any existing drawer with this name
  state.hide(name);

  // Add new drawer
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

export const hideDrawer = (name?: string) => {
  useDrawerStore.getState().onHide(name);
  useDrawerStore.getState().hide(typeof name === 'string' ? name : undefined);
};
