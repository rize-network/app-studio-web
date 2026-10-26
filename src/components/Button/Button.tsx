import React from 'react';
import { ButtonProps } from './Button/Button.props';
import { ButtonElement } from './Button/Button.element';
// Importing TypeScript type for button properties to ensure the component receives the correct props.
import ButtonView from './Button/Button.view';
import { useHover } from 'app-studio';
import { useMergedDesignSystemComponentProps } from 'src/design-system';
// Forwards `ref` to the rendered button (web) or its underlying view (native),
// sharing the node with the hover tracker.
const ButtonComponent = React.forwardRef<ButtonElement, ButtonProps>(
  (props: any, ref) => {
    const [hoverRef, hover] = useHover();
    const setRef = React.useCallback(
      (node: ButtonElement | null) => {
        // Hover is tracked on DOM nodes only; React Native has no hover.
        hoverRef.current =
          typeof HTMLElement !== 'undefined' && node instanceof HTMLElement
            ? node
            : null;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      },
      [hoverRef, ref]
    );
    const mergedProps = useMergedDesignSystemComponentProps('button', props);

    // Provenance-aware content color: only THIS instance can declare an
    // explicit content color — via `textColor`, or by passing the CSS-meaning
    // pair (`backgroundColor` + `color`, where `color` keeps its CSS sense).
    // It must be read from the raw instance props BEFORE the design-system
    // merge, which would otherwise let a brand default like Nike's
    // white-on-black `textColor` bleed into e.g. a white carousel control and
    // render its icon white-on-white.
    const explicitTextColor =
      props.textColor ??
      (props.backgroundColor != null && props.color != null
        ? props.color
        : undefined);

    return (
      <ButtonView
        ref={setRef}
        isHovered={hover}
        {...mergedProps}
        explicitTextColor={explicitTextColor}
      />
    );
  }
);
ButtonComponent.displayName = 'Button';
export const Button = ButtonComponent;
