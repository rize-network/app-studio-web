import React from 'react';
import { View } from '../../Layout/View/View';
import { Vertical } from '../../Layout/Vertical/Vertical';
import { CardProps, CardHeaderProps, CardContentProps, CardFooterProps } from './Card.props';
import { CardSizes, CardShapes, CardVariants } from './Card.style';

export const CardHeader: React.FC<CardHeaderProps> = ({ 
  children, 
  views,
  ...props 
}) => {
  return (
    <View
      paddingBottom="16px"
      borderBottomWidth="1px"
      borderBottomStyle="solid"
      borderBottomColor="color.gray.200"
      {...views}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardContent: React.FC<CardContentProps> = ({ 
  children, 
  views,
  ...props 
}) => {
  return (
    <View
      paddingTop="16px"
      paddingBottom="16px"
      {...views}
      {...props}
    >
      {children}
    </View>
  );
};

export const CardFooter: React.FC<CardFooterProps> = ({ 
  children, 
  views,
  ...props 
}) => {
  return (
    <View
      paddingTop="16px"
      borderTopWidth="1px"
      borderTopStyle="solid"
      borderTopColor="color.gray.200"
      {...views}
      {...props}
    >
      {children}
    </View>
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
  ...props
}) => {
  // Determine if we have explicit Card.Header, Card.Content, Card.Footer components
  // or if we need to wrap children in a default layout
  const hasExplicitStructure = React.Children.toArray(children).some(
    child => React.isValidElement(child) && 
    (child.type === CardHeader || child.type === CardContent || child.type === CardFooter)
  );

  return (
    <View
      width={isFullWidth ? '100%' : 'auto'}
      borderRadius={CardShapes[shape]}
      overflow="hidden"
      {...CardVariants[variant]}
      {...props}
      {...views?.container}
    >
      {hasExplicitStructure ? (
        children
      ) : (
        <Vertical>
          {header && (
            <CardHeader {...views?.header}>
              {header}
            </CardHeader>
          )}
          <CardContent {...views?.content}>
            {children}
          </CardContent>
          {footer && (
            <CardFooter {...views?.footer}>
              {footer}
            </CardFooter>
          )}
        </Vertical>
      )}
    </View>
  );
};
