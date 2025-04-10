import React, { createContext, useContext } from 'react';
import { CardStyles } from './Card.type';

export interface CardContextValue {
  styles?: CardStyles;
}

export const CardContext = createContext<CardContextValue>({});

export const useCardContext = () => {
  return useContext(CardContext);
};
