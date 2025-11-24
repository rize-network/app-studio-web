import React from 'react';
import { View, Vertical } from 'app-studio';
import { Text } from '../../Text/Text';
import { KanbanBoardViewProps } from './KanbanBoard.props';
import { PlusIcon, TrashIcon } from '../../Icon/Icon';

export const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({
  columns,
  renderCard,
  renderColumnHeader,
  renderEmptyState,
  views,
  draggedCardId,
  hoveredColumnId,
  onCardDragStart,
  onCardDragEnd,
  onColumnDragOver,
  onCardDragOver,
  onColumnDrop,
  onCardDrop,
  onCardCreate,
  onCardDelete,
  onCardClick,
  onCardDoubleClick,
  onCardTitleChange,
  onCardDescriptionChange,
}) => {
  const [editingCardId, setEditingCardId] = React.useState<string | null>(null);
  const [editingDescriptionCardId, setEditingDescriptionCardId] =
    React.useState<string | null>(null);
  const [editedTitle, setEditedTitle] = React.useState<string>('');
  const [editedDescription, setEditedDescription] = React.useState<string>('');

  const handleTitleDoubleClick = React.useCallback(
    (
      event: React.MouseEvent,
      card: KanbanBoardViewProps['columns'][number]['cards'][number]
    ) => {
      event.stopPropagation();
      setEditingCardId(card.id);
      setEditedTitle(card.title);
    },
    []
  );

  const handleDescriptionDoubleClick = React.useCallback(
    (
      event: React.MouseEvent,
      card: KanbanBoardViewProps['columns'][number]['cards'][number]
    ) => {
      event.stopPropagation();
      setEditingDescriptionCardId(card.id);
      setEditedDescription(card.description || '');
    },
    []
  );

  const handleTitleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditedTitle(event.target.value);
    },
    []
  );

  const handleDescriptionChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEditedDescription(event.target.value);
    },
    []
  );

  const handleTitleBlur = React.useCallback(
    (
      card: KanbanBoardViewProps['columns'][number]['cards'][number],
      column: KanbanBoardViewProps['columns'][number]
    ) => {
      if (editingCardId === card.id) {
        onCardTitleChange?.(card, column, editedTitle);
        setEditingCardId(null);
      }
    },
    [editingCardId, editedTitle, onCardTitleChange]
  );

  const handleDescriptionBlur = React.useCallback(
    (
      card: KanbanBoardViewProps['columns'][number]['cards'][number],
      column: KanbanBoardViewProps['columns'][number]
    ) => {
      if (editingDescriptionCardId === card.id) {
        onCardDescriptionChange?.(card, column, editedDescription);
        setEditingDescriptionCardId(null);
      }
    },
    [editingDescriptionCardId, editedDescription, onCardDescriptionChange]
  );

  const handleTitleKeyDown = React.useCallback(
    (
      event: React.KeyboardEvent<HTMLInputElement>,
      card: KanbanBoardViewProps['columns'][number]['cards'][number],
      column: KanbanBoardViewProps['columns'][number]
    ) => {
      if (event.key === 'Enter') {
        handleTitleBlur(card, column);
      }
    },
    [handleTitleBlur]
  );

  const handleDescriptionKeyDown = React.useCallback(
    (
      event: React.KeyboardEvent<HTMLTextAreaElement>,
      card: KanbanBoardViewProps['columns'][number]['cards'][number],
      column: KanbanBoardViewProps['columns'][number]
    ) => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleDescriptionBlur(card, column);
      }
    },
    [handleDescriptionBlur]
  );

  const renderDefaultCard = React.useCallback(
    (
      card: KanbanBoardViewProps['columns'][number]['cards'][number],
      column: KanbanBoardViewProps['columns'][number]
    ) => (
      <Vertical gap={4} alignItems="flex-start" {...views?.cardContent}>
        {editingCardId === card.id ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={() => handleTitleBlur(card, column)}
            onKeyDown={(event) => handleTitleKeyDown(event, card, column)}
            autoFocus
            style={{
              border: '1px solid #d0d5dd',
              borderRadius: '4px',
              padding: '4px 8px',
              fontSize: '14px',
              fontWeight: '600',
              width: '100%',
            }}
          />
        ) : (
          <Text
            weight="semiBold"
            size="sm"
            onDoubleClick={(event) => handleTitleDoubleClick(event, card)}
          >
            {card.title}
          </Text>
        )}
        {card.description &&
          (editingDescriptionCardId === card.id ? (
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
              onBlur={() => handleDescriptionBlur(card, column)}
              onKeyDown={(event) =>
                handleDescriptionKeyDown(event, card, column)
              }
              autoFocus
              style={{
                border: '1px solid #d0d5dd',
                borderRadius: '4px',
                padding: '4px 8px',
                fontSize: '14px',
                width: '100%',
                minHeight: '60px',
              }}
            />
          ) : (
            <Text
              size="sm"
              color="#475467"
              onDoubleClick={(event) => handleDescriptionDoubleClick(event, card)}
            >
              {card.description}
            </Text>
          ))}
      </Vertical>
    ),
    [
      views?.cardContent,
      editingCardId,
      editedTitle,
      editingDescriptionCardId,
      editedDescription,
      handleTitleBlur,
      handleTitleChange,
      handleTitleDoubleClick,
      handleTitleKeyDown,
      handleDescriptionBlur,
      handleDescriptionChange,
      handleDescriptionDoubleClick,
      handleDescriptionKeyDown,
    ]
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
            <View
              onClick={() =>
                onCardCreate?.(
                  { id: `new-card-${Date.now()}`, title: 'Nouvelle carte' },
                  column
                )
              }
            >
              <PlusIcon widthHeight={16} />
            </View>
          </View>

          <Vertical
            gap={12}
            minHeight={40}
            onDragOver={(event) => onColumnDragOver(column.id, event)}
            onDrop={(event) => onColumnDrop(column.id, event)}
            opacity={
              draggedCardId && hoveredColumnId === column.id ? 0.9 : undefined
            }
            transition="all 0.15s ease-in-out"
            {...views?.columnBody}
          >
            {column.cards.map((card) => (
              <View key={card.id} position="relative">
                <View
                  draggable
                  cursor="grab"
                  backgroundColor="#ffffff"
                  borderRadius={10}
                  padding="12px"
                  boxShadow="0 1px 2px 0 rgba(16, 24, 40, 0.08)"
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
                  onClick={() => onCardClick?.(card, column)}
                  onDoubleClick={() => onCardDoubleClick?.(card, column)}
                  {...views?.card}
                >
                  <View
                    display="flex"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <View flexGrow={1}>
                      {renderCard
                        ? renderCard(card, column)
                        : renderDefaultCard(card, column)}
                    </View>
                    <View
                      onClick={(e) => {
                        e.stopPropagation();
                        onCardDelete?.(card, column);
                      }}
                    >
                      <TrashIcon widthHeight={16} />
                    </View>
                  </View>
                </View>
              </View>
            ))}
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
              onClick={() =>
                onCardCreate?.(
                  { id: `new-card-${Date.now()}`, title: 'Nouvelle carte' },
                  column
                )
              }
            >
              {renderEmptyState ? (
                renderEmptyState(column)
              ) : (
                <Text size="sm" color="#667085">
                  Create a new card
                </Text>
              )}
            </View>
          </Vertical>

          {column.footer && (
            <View {...views?.columnFooter}>{column.footer}</View>
          )}
        </Vertical>
      ))}
    </View>
  );
};
