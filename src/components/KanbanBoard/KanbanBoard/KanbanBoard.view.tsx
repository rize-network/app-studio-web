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
  draggedCardId,
  hoveredColumnId,
  hoveredCardId,
  hoveredCardPosition,
  onCardDragStart,
  onCardDragEnd,
  onColumnDragOver,
  onCardDragOver,
  onColumnDrop,
  onCardDrop,
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
            onDragOver={(event) => onColumnDragOver(column.id, event)}
            onDrop={(event) => onColumnDrop(column.id, event)}
            borderWidth={
              draggedCardId && hoveredColumnId === column.id ? '2px' : undefined
            }
            borderStyle={
              draggedCardId && hoveredColumnId === column.id
                ? 'dashed'
                : undefined
            }
            borderColor={
              draggedCardId && hoveredColumnId === column.id
                ? '#7F56D9'
                : undefined
            }
            borderRadius={
              draggedCardId && hoveredColumnId === column.id ? 8 : undefined
            }
            backgroundColor={
              draggedCardId && hoveredColumnId === column.id
                ? 'rgba(127, 86, 217, 0.05)'
                : undefined
            }
            padding={
              draggedCardId && hoveredColumnId === column.id ? 8 : undefined
            }
            position="relative"
            transition="all 0.15s ease-in-out"
            {...views?.columnBody}
          >
            {draggedCardId &&
              hoveredColumnId === column.id &&
              hoveredCardId === null &&
              hoveredCardPosition && (
                <View
                  position="absolute"
                  left={-8}
                  right={-8}
                  height={3}
                  backgroundColor="#7F56D9"
                  borderRadius={2}
                  top={hoveredCardPosition === 'before' ? -6 : undefined}
                  bottom={hoveredCardPosition === 'after' ? -6 : undefined}
                  pointerEvents="none"
                />
              )}
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
              <View key={card.id} position="relative">
                {draggedCardId &&
                  hoveredCardId === card.id &&
                  draggedCardId !== card.id &&
                  hoveredCardPosition && (
                    <View
                      position="absolute"
                      left={-8}
                      right={-8}
                      height={3}
                      backgroundColor="#7F56D9"
                      borderRadius={2}
                      zIndex={10}
                      top={hoveredCardPosition === 'before' ? -6 : undefined}
                      bottom={hoveredCardPosition === 'after' ? -6 : undefined}
                      pointerEvents="none"
                    />
                  )}
                <View
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
                  onDragOver={(event) => {
                    event.stopPropagation();
                    onCardDragOver(column.id, card.id, event);
                  }}
                  onDrop={(event) => {
                    event.stopPropagation();
                    onCardDrop(column.id, card.id, event);
                  }}
                  {...views?.card}
                >
                  {renderCard
                    ? renderCard(card, column)
                    : renderDefaultCard(card)}
                </View>
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
