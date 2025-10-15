import React from 'react';
import { View, Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { CardBoardViewProps } from './CardBoard.props';

export const CardBoardView: React.FC<CardBoardViewProps> = ({
  columns,
  renderCard,
  renderColumnHeader,
  renderEmptyState,
  views,
  draggedCardId,
  onCardDragStart,
  onCardDragEnd,
  onColumnDragOver,
  onCardDragOver,
  onColumnDrop,
  onCardDrop,
}) => {
  const renderDefaultCard = React.useCallback(
    (card: CardBoardViewProps['columns'][number]['cards'][number]) => (
      <Vertical gap={4} alignItems="flex-start" {...views?.cardContent}>
        <Text weight="semiBold" size="sm">
          {card.title}
        </Text>
        {card.description && (
          <Text size="sm" color="#475467">
            {card.description}
          </Text>
        )}
      </Vertical>
    ),
    [views?.cardContent]
  );

  return (
    <View
      display="flex"
      alignItems="flex-start"
      gap={16}
      width="100%"
      overflowX="auto"
      padding={16}
      {...views?.board}
    >
      {columns.map((column) => (
        <Vertical
          key={column.id}
          gap={12}
          width={280}
          flexShrink={0}
          backgroundColor="#f2f4f7"
          borderRadius={12}
          padding={16}
          boxShadow="0 1px 2px 0 rgba(16, 24, 40, 0.08)"
          {...views?.column}
        >
          <View
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            {...views?.columnHeader}
          >
            {renderColumnHeader ? (
              renderColumnHeader(column)
            ) : (
              <Text weight="semiBold" size="md" {...views?.columnTitle}>
                {column.title}
              </Text>
            )}
          </View>

          <Vertical
            gap={12}
            minHeight={40}
            onDragOver={(event) => onColumnDragOver(column.id, event)}
            onDrop={(event) => onColumnDrop(column.id, event)}
            {...views?.columnBody}
          >
            {column.cards.length === 0 && (
              <View
                padding={12}
                borderWidth="1px"
                borderStyle="dashed"
                borderColor="#d0d5dd"
                borderRadius={8}
                backgroundColor="rgba(255, 255, 255, 0.6)"
                textAlign="center"
                color="#667085"
                fontSize="14px"
                {...views?.emptyState}
              >
                {renderEmptyState ? (
                  renderEmptyState(column)
                ) : (
                  <Text size="sm" color="#667085">
                    Drop cards here
                  </Text>
                )}
              </View>
            )}

            {column.cards.map((card) => (
              <View
                key={card.id}
                draggable
                cursor="grab"
                backgroundColor="#ffffff"
                borderRadius={10}
                padding="12px"
                boxShadow="0 1px 2px 0 rgba(16, 24, 40, 0.08)"
                opacity={draggedCardId === card.id ? 0.6 : 1}
                onDragStart={(event) =>
                  onCardDragStart(column.id, card.id, event)
                }
                onDragEnd={onCardDragEnd}
                onDragOver={(event) =>
                  onCardDragOver(column.id, card.id, event)
                }
                onDrop={(event) => onCardDrop(column.id, card.id, event)}
                {...views?.card}
              >
                {renderCard
                  ? renderCard(card, column)
                  : renderDefaultCard(card)}
              </View>
            ))}
          </Vertical>

          {column.footer && (
            <View {...views?.columnFooter}>{column.footer}</View>
          )}
        </Vertical>
      ))}
    </View>
  );
};
