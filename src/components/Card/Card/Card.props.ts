import { ViewProps } from 'app-studio';
import { CardStyles, Shape, Size, Variant } from './Card.type';

export interface CardProps extends ViewProps {
  /**
   * The visual style variant of the card
   */
  variant?: Variant;

  /**
   * The size of the card, affecting padding
   */
  size?: Size;

  /**
   * The shape of the card's corners
   */
  shape?: Shape;

  /**
   * The content to be displayed inside the card
   */
  children?: React.ReactNode;

  /**
   * Optional header content for the card
   */
  header?: React.ReactNode;

  /**
   * Optional footer content for the card
   */
  footer?: React.ReactNode;

  /**
   * Whether the card should take up the full width of its container
   */
  isFullWidth?: boolean;

  /**
   * Custom styles for different parts of the card
   */
  views?: CardStyles;

  /**
   * Optional theme mode override ('light' or 'dark')
   * If not provided, the component will use the theme mode from context
   */
}

export interface CardHeaderProps extends ViewProps {
  /**
   * The content to be displayed in the card header
   */
  children: React.ReactNode;

  /**
   * Custom styles for the header
   */
  views?: ViewProps;
}

export interface CardContentProps extends ViewProps {
  /**
   * The content to be displayed in the card body
   */
  children: React.ReactNode;

  /**
   * Custom styles for the content
   */
  views?: ViewProps;
}

export interface CardFooterProps extends ViewProps {
  /**
   * The content to be displayed in the card footer
   */
  children: React.ReactNode;

  /**
   * Custom styles for the footer
   */
  views?: ViewProps;
}

export interface CardType extends React.FC<CardProps> {
  /**
   * Card header component
   */
  Header: React.FC<CardHeaderProps>;

  /**
   * Card content component
   */
  Content: React.FC<CardContentProps>;

  /**
   * Card footer component
   */
  Footer: React.FC<CardFooterProps>;
}
