import React from 'react';
import { View, useTheme } from 'app-studio';
import { Text } from '../../Text/Text';
import { KanbanBoardViewProps } from './KanbanBoard.props';

export const KanbanBoardView: React.FC<KanbanBoardViewProps> = ({
  columns,
  renderCard,
  renderColumnHeader,
  dropPreview,
  dragLocation,
  registerCardRef,
  handleCardDragStart,
  handleCardDragEnd,
  handleColumnDragOver,
  handleColumnDrop,
  views,
  themeMode: elementMode,
  ...props
}) => {
  const { themeMode } = useTheme();
  const currentThemeMode = elementMode || themeMode;
  const isDark = currentThemeMode === 'dark';

  const columnBackground = isDark ? 'color.gray.800' : 'color.gray.50';
  const cardBackground = isDark ? 'color.gray.900' : 'white';
  const columnTitleColor = isDark ? 'color.gray.100' : 'color.gray.900';
  const descriptionColor = isDark ? 'color.gray.300' : 'color.gray.600';
  const placeholderColor = isDark ? 'color.primary.400' : 'color.primary.500';

  return (
    <View
      display="flex"
      alignItems="flex-start"
      gap={16}
      overflowX="auto"
      padding={16}
      {...views?.board}
      {...props}
    >
      {columns.map((column) => {
        const placeholderIndex =
          dropPreview?.columnId === column.id ? dropPreview.index : null;

        return (
          <View
            key={column.id}
            display="flex"
            flexDirection="column"
            minWidth="260px"
            maxWidth="320px"
            backgroundColor={columnBackground}
            borderRadius="12px"
            boxShadow="sm"
            padding={16}
            gap={12}
            onDragOver={(event: React.DragEvent<HTMLDivElement>) =>
              handleColumnDragOver(column.id, event)
            }
            onDrop={(event: React.DragEvent<HTMLDivElement>) =>
              handleColumnDrop(column.id, event)
            }
            {...views?.column}
          >
            <View {...views?.columnHeader}>
              {renderColumnHeader ? (
                renderColumnHeader(column)
              ) : (
                <Text fontWeight="600" fontSize="16px" color={columnTitleColor}>
                  {column.title}
                </Text>
              )}
            </View>

            <View
              display="flex"
              flexDirection="column"
              gap={8}
              {...views?.columnBody}
            >
              {column.cards.map((card, index) => {
                const isDragging =
                  dragLocation?.columnId === column.id &&
                  dragLocation.cardIndex === index;

                const shouldRenderPlaceholder =
                  placeholderIndex !== null && placeholderIndex === index;

                return (
                  <React.Fragment key={card.id}>
                    {shouldRenderPlaceholder && (
                      <View
                        height="4px"
                        borderRadius="2px"
                        backgroundColor={placeholderColor}
                        opacity={0.5}
                        {...views?.placeholder}
                      />
                    )}
                    <View
                      ref={(node) => registerCardRef(column.id, index, node)}
                      draggable
                      cursor="grab"
                      borderRadius="12px"
                      backgroundColor={cardBackground}
                      boxShadow="xs"
                      padding={12}
                      opacity={isDragging ? 0.6 : 1}
                      onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
                        handleCardDragStart(column.id, index, event)
                      }
                      onDragEnd={handleCardDragEnd}
                      {...views?.card}
                    >
                      {renderCard ? (
                        renderCard(card, column)
                      ) : (
                        <>
                          <Text
                            fontWeight="600"
                            fontSize="14px"
                            color={columnTitleColor}
                          >
                            {card.title}
                          </Text>
                          {card.description && (
                            <Text
                              fontSize="13px"
                              color={descriptionColor}
                              marginTop={4}
                            >
                              {card.description}
                            </Text>
                          )}
                        </>
                      )}
                    </View>
                  </React.Fragment>
                );
              })}
              {placeholderIndex !== null &&
                placeholderIndex === column.cards.length && (
                  <View
                    height="4px"
                    borderRadius="2px"
                    backgroundColor={placeholderColor}
                    opacity={0.5}
                    {...views?.placeholder}
                  />
                )}
            </View>
          </View>
        );
      })}
    </View>
  );
};
