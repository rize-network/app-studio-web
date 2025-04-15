import React, { useMemo } from 'react';
import { View, useTheme } from 'app-studio';
import { Vertical } from 'app-studio';
import {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
} from './Card.props';
import { CardShapes, CardVariants, getDefaultCardStyles } from './Card.style';
import { CardContext, useCardContext } from './Card.context';

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  views,
  style,
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

  return <View {...mergedProps}>{children}</View>;
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  views,
  style,
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

  return <View {...mergedProps}>{children}</View>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  views,
  style,
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

  return <View {...mergedProps}>{children}</View>;
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
  ...props
}) => {
  const theme = useTheme();
  const defaultStyles = getDefaultCardStyles(theme);

  // Prepare context value, merging default styles with user's `views` overrides
  const contextValue = useMemo(
    () => ({
      styles: {
        container: { ...defaultStyles.container, ...views?.container },
        header: { ...defaultStyles.header, ...views?.header },
        content: { ...defaultStyles.content, ...views?.content },
        footer: { ...defaultStyles.footer, ...views?.footer },
      },
    }),
    [defaultStyles, views]
  );

  // Determine if we have explicit Card.Header, Card.Content, Card.Footer components
  // or if we need to wrap children in a default layout
  const hasExplicitStructure = React.Children.toArray(children).some(
    (child) =>
      React.isValidElement(child) &&
      (child.type === CardHeader ||
        child.type === CardContent ||
        child.type === CardFooter)
  );

  // Merge styles for the root element
  const mergedRootProps = {
    width: isFullWidth ? '100%' : 'auto',
    borderRadius: CardShapes[shape],
    overflow: 'hidden',
    ...CardVariants[variant],
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
          <Vertical>
            {header && <CardHeader>{header}</CardHeader>}
            <CardContent>{children}</CardContent>
            {footer && <CardFooter>{footer}</CardFooter>}
          </Vertical>
        )}
      </View>
    </CardContext.Provider>
  );
};
