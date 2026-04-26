import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Vertical } from 'app-studio';
import {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
} from './Card.props';
import {
  CardShapes,
  CardSizes,
  getCardVariants,
  getDefaultCardStyles,
} from './Card.style';
import { CardContext, useCardContext } from './Card.context';
// Defines the `CardHeader` functional component, responsible for rendering the header section of the Card.
export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  views,
  style,
  themeMode: elementMode,
  ...props
}) => {
  // Initializes `theme` using the `useTheme` hook to access the current theme context for styling.
  const theme = useTheme();
  // Extracts `contextStyles` from the `CardContext` using `useCardContext` to apply context-specific styles.
  const { styles: contextStyles } = useCardContext();
  // Retrieves default header styles based on the current theme.
  const defaultStyles = getDefaultCardStyles(theme).header;
  // Combines default styles, context styles, and component props to create the final set of properties for the `CardHeader`.
  const mergedProps = {
    ...defaultStyles,
    ...contextStyles?.header,
    ...props,
    style: {
      ...defaultStyles?.style,
      ...contextStyles?.header?.style,
      ...style,
    },
  };
  return (
    <Vertical gap={8} {...mergedProps}>
      {children}
    </Vertical>
  );
};
export const CardContent: React.FC<CardContentProps> = ({
  children,
  views,
  style,
  themeMode: elementMode,
  ...props
}) => {
  const theme = useTheme();
  const { styles: contextStyles } = useCardContext();
  const defaultStyles = getDefaultCardStyles(theme).content;
  const mergedProps = {
    ...defaultStyles,
    ...contextStyles?.content,
    ...props,
    style: {
      ...defaultStyles?.style,
      ...contextStyles?.content?.style,
      ...style,
    },
  };
  return (
    <Vertical gap={12} {...mergedProps}>
      {children}
    </Vertical>
  );
};
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  views,
  style,
  themeMode: elementMode,
  ...props
}) => {
  const theme = useTheme();
  const { styles: contextStyles } = useCardContext();
  const defaultStyles = getDefaultCardStyles(theme).footer;
  const mergedProps = {
    ...defaultStyles,
    ...contextStyles?.footer,
    ...props,
    style: {
      ...defaultStyles?.style,
      ...contextStyles?.footer?.style,
      ...style,
    },
  };
  return (
    <Vertical gap={8} {...mergedProps}>
      {children}
    </Vertical>
  );
};
export const CardView: React.FC<CardProps> = ({
  variant = 'default',
  size = 'md',
  shape = 'rounded',
  children,
  header,
  footer,
  isFullWidth = false,
  views,
  style,
  themeMode: elementMode,
  ...props
}) => {
  const theme = useTheme();
  const defaultStyles = getDefaultCardStyles(theme);
  const sizePadding = CardSizes[size]?.padding || '16px';
  const contextValue = useMemo(
    () => ({
      styles: {
        container: {
          ...defaultStyles.container,
          borderRadius: CardShapes[shape],
          ...views?.container,
        },
        header: {
          ...defaultStyles.header,
          padding: sizePadding,
          ...views?.header,
        },
        content: {
          ...defaultStyles.content,
          padding: sizePadding,
          ...views?.content,
        },
        footer: {
          ...defaultStyles.footer,
          padding: sizePadding,
          ...views?.footer,
        },
      },
    }),
    [defaultStyles, views, sizePadding, shape]
  );
  const hasExplicitStructure = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === CardHeader ||
        child.type === CardContent ||
        child.type === CardFooter)
  );
  const { themeMode } = theme;
  const currentThemeMode = elementMode || themeMode;
  const variantStyles = getCardVariants(currentThemeMode)[variant];
  const mergedRootProps = {
    width: isFullWidth ? '100%' : 'auto',
    overflow: 'hidden',
    ...variantStyles,
    ...contextValue.styles.container,
    ...props,
    style: { ...contextValue.styles.container?.style, ...style },
  };
  return (
    <CardContext.Provider value={contextValue}>
      <View {...mergedRootProps}>
        {hasExplicitStructure ? (
          children
        ) : (
          <Vertical width="100%">
            {header && <CardHeader>{header}</CardHeader>}
            <CardContent>{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
          </Vertical>
        )}
      </View>
    </CardContext.Provider>
  );
};
