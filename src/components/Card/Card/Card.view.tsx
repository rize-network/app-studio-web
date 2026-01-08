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

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  views,
  style,
  themeMode: elementMode,
  ...props
}) => {
  const theme = useTheme();
  const { styles: contextStyles } = useCardContext();
  const defaultStyles = getDefaultCardStyles(theme).header;

  // Merge styles: Default < Context Override < Direct Props/Style
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

  // Merge styles: Default < Context Override < Direct Props/Style
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

  // Merge styles: Default < Context Override < Direct Props/Style
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

  // Get size padding
  const sizePadding = CardSizes[size]?.padding || '16px';

  // Prepare context value, merging default styles with user's `views` overrides
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

  // Determine if we have explicit Card.Header, Card.Content, Card.Footer components
  const hasExplicitStructure = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === CardHeader ||
        child.type === CardContent ||
        child.type === CardFooter)
  );

  // Get the appropriate variant styles based on theme mode
  const { themeMode } = theme;
  const currentThemeMode = elementMode || themeMode;
  const variantStyles = getCardVariants(currentThemeMode)[variant];

  // Merge styles for the root element
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
