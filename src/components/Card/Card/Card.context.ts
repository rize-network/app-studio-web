import { createContext, useContext } from 'react';
import { CardStyles } from './Card.type';
export interface CardContextValue {
  styles?: CardStyles;
}
// This file establishes the React Context for the Card component, facilitating global access to shared properties like styling across its children, and provides a custom hook for convenient context consumption.
export const CardContext = createContext<CardContextValue>({});
export const useCardContext = () => {
  return useContext(CardContext);
};
