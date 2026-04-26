import React from 'react';
import { TitleProps } from './Title/Title.props';
import TitleView from './Title/Title.view';
// Defines the main `Title` functional component, acting as a public interface that renders the `TitleView` component and passes all incoming properties to it.
const TitleComponent: React.FC<TitleProps> = (props) => {
  return <TitleView {...props} />;
};
export const Title = TitleComponent;
