import React from 'react';
import { CardProps, CardType } from './Card/Card.props';
import {
  CardView,
  CardHeader,
  CardContent,
  CardFooter,
} from './Card/Card.view';
// This file defines and exports the main `Card` component, which serves as a wrapper for its sub-components like `Card.Header`, `Card.Content`, and `Card.Footer`, enabling a compound component pattern for flexible content structuring.
const CardComponent: React.FC<CardProps> = (props) => {
  return <CardView {...props} />;
};
export const Card = CardComponent as CardType;
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
