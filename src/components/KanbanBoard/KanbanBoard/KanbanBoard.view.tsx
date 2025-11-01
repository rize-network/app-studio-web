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
            padding={
              draggedCardId && hoveredColumnId === column.id ? 8 : undefined
            }
            backgroundColor={
              draggedCardId && hoveredColumnId === column.id
                ? 'rgba(127, 86, 217, 0.05)'
                : undefined
            }
            borderRadius={
              draggedCardId && hoveredColumnId === column.id ? 8 : undefined
            }
            transition="all 0.15s ease-in-out"
            {...views?.columnBody}
          >
            {draggedCardId && (
              <View
                height={10}
                borderRadius={4}
                backgroundColor={
                  hoveredColumnId === column.id &&
                  hoveredCardPosition === 'before' &&
                  hoveredCardId === (column.cards[0]?.id ?? null)
                    ? 'rgba(127, 86, 217, 0.25)'
                    : 'transparent'
                }
                borderWidth="2px"
                borderStyle="dashed"
                borderColor={
                  hoveredColumnId === column.id &&
                  hoveredCardPosition === 'before' &&
                  hoveredCardId === (column.cards[0]?.id ?? null)
                    ? '#7F56D9'
                    : 'transparent'
                }
                transition="all 0.15s ease-in-out"
                onDragOver={(event) =>
                  onCardDragOver(
                    column.id,
                    column.cards[0]?.id ?? null,
                    'before',
                    event
                  )
                }
                onDrop={(event) =>
                  onCardDrop(
                    column.id,
                    column.cards[0]?.id ?? null,
                    'before',
                    event
                  )
                }
              />
            )}

            {column.cards.length === 0 && (
              <View
                padding={12}
                borderWidth="1px"
                borderStyle="dashed"
                borderColor={
                  draggedCardId && hoveredColumnId === column.id
                    ? '#7F56D9'
                    : '#d0d5dd'
                }
                backgroundColor="rgba(255, 255, 255, 0.6)"
                borderRadius={8}
                textAlign="center"
                color="#667085"
                fontSize="14px"
                transition="all 0.15s ease-in-out"
                onDragOver={(event) =>
                  onCardDragOver(column.id, null, 'after', event)
                }
                onDrop={(event) => onCardDrop(column.id, null, 'after', event)}
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

            {column.cards.map((card, index) => {
              const showTopIndicator =
                draggedCardId &&
                hoveredColumnId === column.id &&
                hoveredCardId === card.id &&
                hoveredCardPosition === 'before';
              const showBottomIndicator =
                draggedCardId &&
                hoveredColumnId === column.id &&
                hoveredCardId === card.id &&
                hoveredCardPosition === 'after';

              return (
                <View key={card.id} position="relative">
                  {showTopIndicator && (
                    <View
                      position="absolute"
                      top={-6}
                      left={0}
                      right={0}
                      height={4}
                      borderRadius={4}
                      backgroundColor="#7F56D9"
                      zIndex={10}
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
                      const bounds =
                        event.currentTarget.getBoundingClientRect();
                      const offsetY = event.clientY - bounds.top;
                      const position =
                        offsetY <= bounds.height / 2 ? 'before' : 'after';
                      onCardDragOver(column.id, card.id, position, event);
                    }}
                    onDrop={(event) => {
                      const bounds =
                        event.currentTarget.getBoundingClientRect();
                      const offsetY = event.clientY - bounds.top;
                      const position =
                        offsetY <= bounds.height / 2 ? 'before' : 'after';
                      onCardDrop(column.id, card.id, position, event);
                    }}
                    {...views?.card}
                  >
                    {renderCard
                      ? renderCard(card, column)
                      : renderDefaultCard(card)}
                  </View>
                  {showBottomIndicator && (
                    <View
                      position="absolute"
                      bottom={-6}
                      left={0}
                      right={0}
                      height={4}
                      borderRadius={4}
                      backgroundColor="#7F56D9"
                      zIndex={10}
                    />
                  )}

                  {draggedCardId && index === column.cards.length - 1 && (
                    <View
                      marginTop={8}
                      height={10}
                      borderRadius={4}
                      backgroundColor={
                        hoveredColumnId === column.id &&
                        hoveredCardId === null &&
                        hoveredCardPosition === 'after'
                          ? 'rgba(127, 86, 217, 0.25)'
                          : 'transparent'
                      }
                      borderWidth="2px"
                      borderStyle="dashed"
                      borderColor={
                        hoveredColumnId === column.id &&
                        hoveredCardId === null &&
                        hoveredCardPosition === 'after'
                          ? '#7F56D9'
                          : 'transparent'
                      }
                      transition="all 0.15s ease-in-out"
                      onDragOver={(event) =>
                        onCardDragOver(column.id, null, 'after', event)
                      }
                      onDrop={(event) =>
                        onCardDrop(column.id, null, 'after', event)
                      }
                    />
                  )}
                </View>
              );
            })}
          </Vertical>

          {column.footer && (
            <View {...views?.columnFooter}>{column.footer}</View>
          )}
        </Vertical>
      ))}
    </View>
  );
};
