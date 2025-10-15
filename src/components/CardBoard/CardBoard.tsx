import React from 'react';
import { CardBoardProps } from './CardBoard/CardBoard.props';
import { useCardBoardState } from './CardBoard/CardBoard.state';
import { CardBoardView } from './CardBoard/CardBoard.view';

const CardBoardComponent: React.FC<CardBoardProps> = (props) => {
  const state = useCardBoardState(props);

  return <CardBoardView {...props} {...state} />;
};

export const CardBoard = CardBoardComponent;
