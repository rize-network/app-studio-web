import React, { Fragment, useEffect } from 'react';
import { DrawerState, hideDrawer, useDrawerStore } from './Drawer.store';
import { DrawerOverlay, DrawerContainer } from './Drawer.view';
import { DrawerLayoutProps } from './Drawer.props';
// Defines the main layout component responsible for rendering multiple drawer instances dynamically.
export const DrawerLayout = ({
  // Specifies a map or object containing all available drawer components by their names, allowing the layout to find and render them.
  drawers: availableDrawers,
  // Callback function that is invoked when a drawer is shown. This hook allows external side effects or state updates.
  onShow,
  // Callback function that is invoked when a drawer is hidden. This hook allows external side effects or state updates.
  onHide,
}: DrawerLayoutProps) => {
  // Retrieves the currently active drawers from the global drawer store, which determines which drawers should be rendered.
  const activeDrawers = useDrawerStore((state: DrawerState) => state.drawers);
  // Synchronizes the 'onShow' callback with the global drawer store's state, ensuring it's available for other parts of the drawer system.
  useEffect(() => {
    if (onShow) {
      useDrawerStore.getState().setOnShow(onShow);
    }
  }, [onShow]);
  // Synchronizes the 'onHide' callback with the global drawer store's state, making it accessible for managing drawer visibility.
  useEffect(() => {
    if (onHide) {
      useDrawerStore.getState().setOnHide(onHide);
    }
  }, [onHide]);
  // Conditionally renders nothing if there are no active drawers, preventing the rendering of an empty layout.
  if (activeDrawers.length === 0) {
    return null;
  }
  return (
    <Fragment>
      {activeDrawers.map((drawer: any, index: number) => {
        const DrawerComponent = availableDrawers[drawer.name];
        if (!DrawerComponent) {
          console.error(`${drawer.name} drawer doesn't exist`);
          return null;
        }
        const {
          placement,
          size,
          isClosePrevented,
          blur,
          containerProps,
          ...contentProps
        } = drawer.props || {};
        return (
          <DrawerOverlay
            key={index}
            isOpen={drawer.props.isOpen}
            onClose={() => hideDrawer(drawer.name)}
            isClosePrevented={isClosePrevented}
            blur={blur}
            {...drawer.overlayProps}
            style={{
              zIndex: 1000 + index,
              ...(drawer.overlayProps?.style || {}),
            }}
          >
            <DrawerContainer
              placement={placement}
              size={size}
              isOpen={drawer.props.isOpen}
              {...(containerProps || {})}
            >
              <DrawerComponent {...contentProps} />
            </DrawerContainer>
          </DrawerOverlay>
        );
      })}
    </Fragment>
  );
};
