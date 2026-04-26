import { ViewProps } from 'app-studio';
import { CardStyles, Shape, Size, Variant } from './Card.type';
export interface CardProps extends ViewProps {
  // Defines the visual style or theme of the card.
  variant?: Variant;
  // Specifies the predefined dimensions or scale of the card.
  size?: Size;
  // Determines the border-radius or overall physical contour of the card.
  shape?: Shape;
  // Content to be rendered within the main body of the card.
  children?: React.ReactNode;
  // Content to be displayed as the card's header section.
  header?: React.ReactNode;
  // Content to be displayed as the card's footer section.
  footer?: React.ReactNode;
  // If true, the card will occupy the full available width of its parent container.
  isFullWidth?: boolean;
  // Optional styling overrides for different parts of the card component.
  views?: CardStyles;
}
export interface CardHeaderProps extends ViewProps {
  // Content to be rendered inside the card's header.
  children: React.ReactNode;
  // Optional styling overrides for the card header container.
  views?: ViewProps;
}
export interface CardContentProps extends ViewProps {
  // Content to be rendered inside the card's main content area.
  children: React.ReactNode;
  // Optional styling overrides for the card content container.
  views?: ViewProps;
}
export interface CardFooterProps extends ViewProps {
  // Content to be rendered inside the card's footer.
  children: React.ReactNode;
  // Optional styling overrides for the card footer container.
  views?: ViewProps;
}
export interface CardType extends React.FC<CardProps> {
  // Represents the Card Header sub-component, accepting CardHeaderProps.
  Header: React.FC<CardHeaderProps>;
  // Represents the Card Content sub-component, accepting CardContentProps.
  Content: React.FC<CardContentProps>;
  // Represents the Card Footer sub-component, accepting CardFooterProps.
  Footer: React.FC<CardFooterProps>;
}
