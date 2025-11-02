import React from 'react';
import { View, Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { KanbanBoardViewProps } from './KanbanBoard.props';

export const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({
  columns,
  renderCard,
  renderColumnHeader,
  renderEmptyState,
  views,
  draggedCard,
  cardRefsRef,
  onCardMouseDown,
}) => {
  const renderDefaultCard = React.useCallback(
    (card: KanbanBoardViewProps['columns'][number]['cards'][number]) => (
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
            position="relative"
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

            {column.cards.map((card, cardIndex) => (
              <View
                key={card.id}
                ref={(el) => {
                  if (el) {
                    cardRefsRef.current.set(
                      `${column.id}-${card.id}`,
                      el as HTMLDivElement
                    );
                  } else {
                    cardRefsRef.current.delete(`${column.id}-${card.id}`);
                  }
                }}
                cursor="grab"
                backgroundColor="#ffffff"
                borderRadius={10}
                padding="12px"
                boxShadow="0 1px 2px 0 rgba(16, 24, 40, 0.08)"
                opacity={draggedCard?.cardId === card.id ? 0.5 : 1}
                transition="transform 0.2s, opacity 0.2s"
                onMouseDown={(event) =>
                  onCardMouseDown(column.id, card.id, cardIndex, event)
                }
                onTouchStart={(event) =>
                  onCardMouseDown(column.id, card.id, cardIndex, event)
                }
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
