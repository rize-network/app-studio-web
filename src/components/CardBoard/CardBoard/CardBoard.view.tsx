import React from 'react';
import {
  Horizontal,
  Text,
  Vertical,
  View,
  useTheme,
  type ViewProps,
} from 'app-studio';
import type { CardBoardViewProps } from './CardBoard.props';

const DropZone: React.FC<
  ViewProps & {
    isActive: boolean;
    isVisible: boolean;
  }
> = ({ isActive, isVisible, ...props }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View
      height={isActive ? '56px' : '12px'}
      borderRadius="12px"
      margin="4px 0"
      backgroundColor={isActive ? 'rgba(59,130,246,0.15)' : 'transparent'}
      border={
        isActive
          ? '2px dashed rgba(59,130,246,0.45)'
          : '2px dashed rgba(148,163,184,0.3)'
      }
      transition="all 0.18s ease"
      {...props}
    />
  );
};

const Tag: React.FC<{ children: React.ReactNode } & ViewProps> = ({
  children,
  ...props
}) => (
  <View
    as="span"
    padding="2px 8px"
    borderRadius="9999px"
    backgroundColor="rgba(99, 102, 241, 0.12)"
    color="rgba(79, 70, 229, 1)"
    fontSize="12px"
    fontWeight={600}
    letterSpacing="0.02em"
    {...props}
  >
    {children}
  </View>
);

export const CardBoardView: React.FC<CardBoardViewProps> = ({
  boardColumns,
  draggedCard,
  activeDropZone,
  getDropZoneHandlers,
  handleCardDragStart,
  handleCardDragEnd,
  emptyColumnMessage = 'Drag cards here',
  views,
  themeMode: elementMode,
}) => {
  const theme = useTheme();
  const resolvedTheme = elementMode ?? theme.themeMode ?? 'light';
  const isDark = resolvedTheme === 'dark';

  const boardBackground = isDark
    ? 'linear-gradient(135deg, rgba(30,41,59,0.98), rgba(15,23,42,0.94))'
    : 'linear-gradient(135deg, rgba(248,250,252,0.9), rgba(241,245,249,0.9))';

  const columnBackground = isDark
    ? 'rgba(30, 41, 59, 0.65)'
    : 'rgba(255, 255, 255, 0.85)';

  const columnBorder = isDark
    ? '1px solid rgba(148, 163, 184, 0.12)'
    : '1px solid rgba(148, 163, 184, 0.25)';

  const cardBackground = isDark
    ? 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(30,41,59,0.92))'
    : 'linear-gradient(135deg, rgba(255,255,255,1), rgba(248,250,252,0.94))';

  const cardShadow = isDark
    ? '0 8px 24px rgba(15, 23, 42, 0.35)'
    : '0 10px 30px rgba(15, 23, 42, 0.12)';

  return (
    <Horizontal
      gap="24px"
      alignItems="flex-start"
      width="100%"
      padding="24px"
      overflowX="auto"
      backgroundImage={boardBackground}
      backdropFilter="blur(12px)"
      borderRadius="24px"
      {...views?.board}
    >
      {boardColumns.map((column) => (
        <Vertical
          key={column.id}
          minWidth="280px"
          flexShrink={0}
          background={columnBackground}
          border={columnBorder}
          borderRadius="20px"
          boxShadow="0 24px 40px rgba(15, 23, 42, 0.08)"
          overflow="hidden"
          {...views?.column}
        >
          <Vertical
            padding="18px 20px 12px"
            gap="6px"
            borderBottom={
              isDark
                ? '1px solid rgba(148, 163, 184, 0.12)'
                : '1px solid rgba(226, 232, 240, 0.7)'
            }
            background={
              isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(248, 250, 252, 0.85)'
            }
            {...views?.columnHeader}
          >
            <Horizontal alignItems="center" justifyContent="space-between">
              <Text
                as="h3"
                fontSize="16px"
                fontWeight={700}
                color={
                  isDark ? 'rgba(248,250,252,0.95)' : 'rgba(15,23,42,0.92)'
                }
                textTransform="uppercase"
                letterSpacing="0.08em"
                {...views?.columnTitle}
              >
                {column.title}
              </Text>
              <Text
                fontSize="12px"
                color={
                  isDark
                    ? 'rgba(148, 163, 184, 0.8)'
                    : 'rgba(100, 116, 139, 0.9)'
                }
              >
                {column.cards.length}
              </Text>
            </Horizontal>
            {column.description ? (
              <Text
                fontSize="13px"
                lineHeight="20px"
                color={
                  isDark
                    ? 'rgba(148, 163, 184, 0.85)'
                    : 'rgba(100, 116, 139, 0.9)'
                }
                {...views?.columnDescription}
              >
                {column.description}
              </Text>
            ) : null}
          </Vertical>

          <Vertical
            padding="16px"
            gap="12px"
            minHeight="120px"
            {...views?.columnBody}
          >
            {column.cards.length === 0 ? (
              <DropZone
                isActive={Boolean(
                  activeDropZone &&
                    activeDropZone.columnId === column.id &&
                    activeDropZone.index === 0
                )}
                isVisible
                display="flex"
                alignItems="center"
                justifyContent="center"
                minHeight="120px"
                color={
                  isDark ? 'rgba(148,163,184,0.85)' : 'rgba(100,116,139,0.75)'
                }
                fontSize="14px"
                fontWeight={500}
                textAlign="center"
                padding="16px"
                borderStyle="dashed"
                borderColor={
                  isDark ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.45)'
                }
                backgroundColor={
                  isDark ? 'rgba(30,41,59,0.45)' : 'rgba(191,219,254,0.18)'
                }
                {...getDropZoneHandlers(column.id, 0)}
                {...views?.emptyState}
              >
                {emptyColumnMessage}
              </DropZone>
            ) : (
              column.cards.map((card, index) => (
                <React.Fragment key={card.id}>
                  <DropZone
                    isActive={Boolean(
                      activeDropZone &&
                        activeDropZone.columnId === column.id &&
                        activeDropZone.index === index
                    )}
                    isVisible={Boolean(draggedCard)}
                    {...getDropZoneHandlers(column.id, index)}
                    {...views?.dropZone}
                  />

                  <View
                    draggable
                    onDragStart={(event: React.DragEvent) =>
                      handleCardDragStart(event, card.id, column.id)
                    }
                    onDragEnd={handleCardDragEnd}
                    background={cardBackground}
                    borderRadius="16px"
                    padding="16px"
                    boxShadow={cardShadow}
                    border={`1px solid ${
                      card.accentColor ??
                      (isDark
                        ? 'rgba(96,165,250,0.35)'
                        : 'rgba(59,130,246,0.25)')
                    }`}
                    position="relative"
                    overflow="hidden"
                    cursor="grab"
                    transition="transform 0.2s ease, box-shadow 0.2s ease"
                    transform={
                      draggedCard?.cardId === card.id
                        ? 'scale(1.02)'
                        : 'scale(1)'
                    }
                    opacity={draggedCard?.cardId === card.id ? 0.75 : 1}
                    {...views?.card}
                  >
                    <View
                      position="absolute"
                      left="0"
                      top="0"
                      bottom="0"
                      width="4px"
                      background={
                        card.accentColor ??
                        (isDark
                          ? 'linear-gradient(180deg, rgba(59,130,246,1), rgba(96,165,250,0.55))'
                          : 'linear-gradient(180deg, rgba(59,130,246,0.95), rgba(125,211,252,0.65))')
                      }
                    />

                    <Vertical gap="8px">
                      <Horizontal
                        alignItems="flex-start"
                        justifyContent="space-between"
                      >
                        <Text
                          as="h4"
                          fontSize="15px"
                          fontWeight={700}
                          lineHeight="22px"
                          color={
                            isDark
                              ? 'rgba(226,232,240,0.95)'
                              : 'rgba(15,23,42,0.95)'
                          }
                          {...views?.cardTitle}
                        >
                          {card.title}
                        </Text>
                        {card.meta ? (
                          <View marginLeft="12px">{card.meta}</View>
                        ) : null}
                      </Horizontal>

                      {card.description ? (
                        <Text
                          fontSize="13px"
                          lineHeight="20px"
                          color={
                            isDark
                              ? 'rgba(148,163,184,0.85)'
                              : 'rgba(71,85,105,0.85)'
                          }
                          {...views?.cardDescription}
                        >
                          {card.description}
                        </Text>
                      ) : null}

                      {card.tags && card.tags.length > 0 ? (
                        <Horizontal gap="8px" flexWrap="wrap">
                          {card.tags.map((tag) => (
                            <Tag key={tag} {...views?.tag}>
                              {tag}
                            </Tag>
                          ))}
                        </Horizontal>
                      ) : null}

                      {card.footer ? (
                        <View marginTop="8px" {...views?.cardFooter}>
                          {card.footer}
                        </View>
                      ) : null}
                    </Vertical>
                  </View>
                </React.Fragment>
              ))
            )}

            <DropZone
              isActive={Boolean(
                activeDropZone &&
                  activeDropZone.columnId === column.id &&
                  activeDropZone.index === column.cards.length
              )}
              isVisible={Boolean(draggedCard)}
              {...getDropZoneHandlers(column.id, column.cards.length)}
              {...views?.dropZone}
            />
          </Vertical>
        </Vertical>
      ))}
    </Horizontal>
  );
};
