import React from 'react';
import { CardProps, CardType } from './Card/Card.props';
import {
  CardView,
  CardHeader,
  CardContent,
  CardFooter,
} from './Card/Card.view';

/**
 * Card component for displaying content in a contained, styled box.
 * Can be used with Card.Header, Card.Content, and Card.Footer for structured layout,
 * or with direct children for simpler usage.
 */
const CardComponent: React.FC<CardProps> = (props) => {
  return <CardView {...props} />;
};

export const Card = CardComponent as CardType;

// Assign the sub-components to the main component
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;
