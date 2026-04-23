import React, { Fragment, useEffect } from 'react';
import { DrawerState, hideDrawer, useDrawerStore } from './Drawer.store';
import { DrawerOverlay, DrawerContainer } from './Drawer.view';
import { DrawerLayoutProps } from './Drawer.props';

export const DrawerLayout = ({
  drawers: availableDrawers,
  onShow,
  onHide,
}: DrawerLayoutProps) => {
  const activeDrawers = useDrawerStore((state: DrawerState) => state.drawers);

  useEffect(() => {
    if (onShow) {
      useDrawerStore.getState().setOnShow(onShow);
    }
  }, [onShow]);

  useEffect(() => {
    if (onHide) {
      useDrawerStore.getState().setOnHide(onHide);
    }
  }, [onHide]);

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
