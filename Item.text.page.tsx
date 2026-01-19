import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Center, Vertical, Horizontal, View } from 'app-studio';
import { useLocation, useParams } from 'react-router-dom';
import { Icon, Tooltip } from '@app-studio/web';
import { C2, C3, H2 } from 'src/components/Text';
import { TextSkeletons } from 'src/components/skeletons';
import { ItemRenderer } from 'src/pages/item/components/Item.content';
import { SectionRenderer } from 'src/pages/item/components/Item.text';
import { ItemSheetRenderer } from 'src/pages/item/components/Item.sheet';
import { ItemJsonViewer } from 'src/pages/item/components/Item.json';
import { ItemKanbanViewer } from 'src/pages/item/components/Item.kanban';
import { ItemCalendarRenderer } from 'src/pages/item/components/Item.calendar';
import { TeamRosterViewer } from 'src/pages/item/components/TeamRosterViewer';
import { MentorChatView } from 'src/pages/item/components/MentorChatView';
import { useItemRequests } from 'src/pages/item/item.request';
import { Drawer } from '@app-studio/web';
import { EditorForm } from 'src/forms/EditorForm';
import { TocSidebar } from 'src/components/TocSidebar';

// Design tokens for consistent styling
const SPACING = {
  page: 40,
  section: 24,
  element: 16,
  small: 8,
} as const;

const COLORS = {
  fab: {
    background: 'color-gray-900',
    hover: 'color-gray-800',
  },
} as const;

const SHADOWS = {
  fab: '0 4px 16px rgba(0, 0, 0, 0.15)',
  fabHover: '0 8px 24px rgba(0, 0, 0, 0.2)',
} as const;

const parseMaybeJson = (value: unknown): unknown => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return value;
  }

  const startsWithBrace = trimmed.startsWith('{') && trimmed.endsWith('}');
  const startsWithBracket = trimmed.startsWith('[') && trimmed.endsWith(']');

  if (!startsWithBrace && !startsWithBracket) {
    return value;
  }

  try {
    return JSON.parse(trimmed);
  } catch (error) {
    return value;
  }
};

const normalizeJsonValue = (value: unknown): unknown => {
  const parsedValue = parseMaybeJson(value);

  if (Array.isArray(parsedValue)) {
    return parsedValue.map((entry) => normalizeJsonValue(entry));
  }

  if (parsedValue && typeof parsedValue === 'object' && !(parsedValue instanceof Date)) {
    return Object.entries(parsedValue as Record<string, unknown>).reduce((acc, [key, entry]) => {
      acc[key] = normalizeJsonValue(entry);
      return acc;
    }, {} as Record<string, unknown>);
  }

  return parsedValue;
};

const normalizeItemData = (item: any) => {
  if (!item || !Array.isArray(item?.jsons)) {
    return item;
  }

  return {
    ...item,
    jsons: item.jsons.map((jsonItem: any) => {
      if (!jsonItem) {
        return jsonItem;
      }

      return {
        ...jsonItem,
        json: normalizeJsonValue(jsonItem?.json),
      };
    }),
  };
};

const isTabularStructure = (payload: any): boolean => {
  const normalizedPayload = normalizeJsonValue(payload);

  if (!normalizedPayload) {
    return false;
  }

  if (Array.isArray(normalizedPayload)) {
    if (normalizedPayload.length === 0) {
      return false;
    }

    return normalizedPayload.every((entry) => entry && typeof entry === 'object' && !Array.isArray(entry));
  }

  if (typeof normalizedPayload !== 'object') {
    return false;
  }

  const columns = Array.isArray((normalizedPayload as any).columns);
  const headers = Array.isArray((normalizedPayload as any).headers);
  const dataSet =
    (normalizedPayload as any).data ||
    (normalizedPayload as any).rows ||
    (normalizedPayload as any).records ||
    undefined;

  if (Array.isArray(dataSet)) {
    if (dataSet.length === 0) {
      return columns || headers;
    }

    return dataSet.every((entry) => entry && typeof entry === 'object' && !Array.isArray(entry));
  }

  return columns || headers;
};

type ItemViewMode = 'text' | 'json' | 'sheet' | 'kanban' | 'calendar';

const ItemDisplayPage: React.FC = () => {
  const [drawerState, setDrawerState] = React.useState<{
    isOpen: boolean;
    title: string;
    content: string;
    sectionId?: string;
    mode: 'create' | 'edit';
  }>({
    isOpen: false,
    title: '',
    content: '',
    sectionId: undefined,
    mode: 'create',
  });

  let params: any = useParams();
  const location = useLocation();

  if (!params.itemType && params.tab) {
    params.itemType = params.tab;
  }

  if (params.itemType === 'overview') {
    params.itemType = 'project';
  }
  if (params.ownerType == 'product' && (params.itemType == 'product' || params.itemType == 'offer')) {
    params.ownerType = 'project';
  }

  if (params.projectId && !params.ownerType) {
    params.ownerType = 'project';
    params.ownerId = params.projectId;
    console.log({ params });
  }

  const { ownerType, ownerId, itemType, itemId } = params;

  const refreshData = () => {
    if (itemId) {
      getItemByIdRequest.run(itemId);
    } else {
      getItemRequest.run(ownerType, ownerId, itemType);
    }
  };

  const { getItemRequest, getItemByIdRequest, updateTextRequest, lockTextRequest, createItemTextRequest } =
    useItemRequests({
      onUpdateTextSuccess: () => {
        refreshData();
        setDrawerState((prev) => ({ ...prev, isOpen: false }));
      },
      onCreateItemSuccess: () => {
        refreshData();
        setDrawerState((prev) => ({ ...prev, isOpen: false }));
      },
      onLockTextSuccess: () => {
        refreshData();
      },
    });

  useEffect(() => {
    if (itemId) {
      getItemByIdRequest.run(itemId);
    } else if (ownerType && ownerId && itemType) {
      getItemRequest.run(ownerType, ownerId, itemType);
    }
  }, [location.pathname]);

  const buildFallbackTitle = useCallback((item: any): string => {
    if (item?.name && typeof item.name === 'string' && item.name.trim().length > 0) {
      return item.name;
    }

    if (item?.itemType && typeof item.itemType === 'string') {
      return item.itemType
        .replace(/[_-]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (char) => char.toUpperCase())
        .trim();
    }

    if (item?.view && typeof item.view === 'string' && item.view.length > 0) {
      return `${item.view.charAt(0).toUpperCase()}${item.view.slice(1)} Result`;
    }

    return 'Project';
  }, []);

  const rawItemData = itemId ? getItemByIdRequest.data : getItemRequest.data;
  const itemData = useMemo(() => normalizeItemData(rawItemData), [rawItemData]);
  const title = useMemo(() => buildFallbackTitle(itemData), [buildFallbackTitle, itemData]);

  const determineViewMode = useCallback((): ItemViewMode => {
    if (!itemData) {
      return 'text';
    }

    const explicitView = typeof itemData.view === 'string' ? itemData.view.toLowerCase() : undefined;

    if (
      explicitView === 'sheet' ||
      explicitView === 'json' ||
      explicitView === 'text' ||
      explicitView === 'calendar' ||
      explicitView === 'kanban'
    ) {
      return explicitView as ItemViewMode;
    }

    const hasTexts = Array.isArray(itemData.texts) && itemData.texts.length > 0;
    if (hasTexts) {
      return 'text';
    }

    const jsons = Array.isArray(itemData.jsons) ? itemData.jsons : [];
    if (jsons.length === 0) {
      return 'text';
    }

    if (jsons.some((jsonItem) => isTabularStructure(jsonItem?.json))) {
      return 'sheet';
    }

    return 'json';
  }, [itemData]);

  const viewMode = useMemo(() => determineViewMode(), [determineViewMode]);

  const handleSectionEdit = useCallback((section: any) => {
    if (section?.id) {
      setDrawerState({
        isOpen: true,
        title: section.title,
        content: section.text || section.content,
        sectionId: section.id,
        mode: 'edit',
      });
    }
  }, []);

  const handleDrawerSubmit = (values: any) => {
    if (drawerState.mode === 'edit' && drawerState.sectionId) {
      (updateTextRequest as any).run(drawerState.sectionId, { text: values.content });
    } else {
      // Create
      const currentItem = itemId ? getItemByIdRequest.data : getItemRequest.data;
      if (currentItem?.id) {
        (createItemTextRequest as any).run({
          item: { connect: { id: currentItem.id } },
          title: 'New Section',
          text: values.content,
        });
      }
    }
  };

  const isTeamRoster = useMemo(() => {
    const itemType = (itemData as any)?.itemType;
    const ownerType = (itemData as any)?.ownerType;
    const skill = (itemData as any)?.skill;

    return itemType === 'team-members' || ownerType === 'team' || skill === 'team';
  }, [itemData]);

  const projectIdForContext = useMemo(() => {
    if (params.projectId) {
      return params.projectId;
    }

    if (ownerType === 'project' && ownerId) {
      return ownerId;
    }

    const itemOwnerId = (itemData as any)?.ownerId;
    const itemOwnerType = (itemData as any)?.ownerType;

    if (itemOwnerType === 'project' && itemOwnerId) {
      return itemOwnerId;
    }

    return undefined;
  }, [itemData, ownerId, ownerType, params.projectId]);

  const isMentorItem = useMemo(() => {
    const skillFromItem = ((itemData as any)?.skill || '').toLowerCase();
    const skillFromParams = (params.skill || '').toLowerCase();
    const typeFromItem = ((itemData as any)?.itemType || '').toLowerCase();

    if (skillFromItem === 'mentor' || skillFromParams === 'mentor') {
      return true;
    }

    return typeFromItem.startsWith('mentor');
  }, [itemData, params.skill]);

  const handleTaskCompleted = useCallback(() => {
    if (itemId) {
      getItemByIdRequest.run(itemId);
    } else {
      getItemRequest.run(ownerType, ownerId, itemType);
    }
  }, [itemId, getItemByIdRequest.run, getItemRequest.run, ownerType, ownerId, itemType]);

  const handleFabClick = () => {
    setDrawerState({
      isOpen: true,
      title: 'New Section',
      content: '',
      mode: 'create',
    });
  };

  const content = useMemo(() => {
    if (!itemData) {
      return null;
    }

    if (isMentorItem) {
      return (
        <MentorChatView
          item={itemData}
          projectId={projectIdForContext}
          ownerId={ownerId}
          ownerType={ownerType}
          onEdit={handleSectionEdit}
          lockRequest={lockTextRequest}
        />
      );
    }

    if (isTeamRoster) {
      return <TeamRosterViewer item={itemData} />;
    }

    if (viewMode === 'kanban') {
      return <ItemKanbanViewer item={itemData} readOnly={false} />;
    }

    if (viewMode === 'sheet') {
      return <ItemSheetRenderer item={itemData} ownerId={ownerId} ownerType={ownerType} />;
    }

    if (viewMode === 'json') {
      return <ItemJsonViewer item={itemData} />;
    }

    if (viewMode === 'calendar') {
      return <ItemCalendarRenderer item={itemData} />;
    }

    // Default Text View
    return <SectionRenderer item={itemData} lockRequest={lockTextRequest} onEdit={handleSectionEdit} />;
  }, [
    handleSectionEdit,
    isMentorItem,
    isTeamRoster,
    itemData,
    lockTextRequest,
    ownerId,
    ownerType,
    projectIdForContext,
    viewMode,
  ]);

  // Extract TOC items specifically for Text View
  const tocItems = useMemo(() => {
    if (viewMode !== 'text' || !itemData) return [];

    const texts = itemData.texts || [];
    // If we have plain texts, use them. If not, check JSONs (SectionRenderer logic)
    if (texts.length > 0) {
      const order = itemData.order || [];
      return texts
        .slice()
        .sort((a: any, b: any) => {
          const aIdx = order.indexOf(a.title || '');
          const bIdx = order.indexOf(b.title || '');
          return aIdx - bIdx;
        })
        .map((t: any) => ({ id: t.id, title: t.title }));
    }

    // JSON logic simplified for TOC (taking keys)
    if (itemData.jsons?.[0]?.json) {
      return Object.keys(itemData.jsons[0].json).map((key) => ({ id: undefined, title: key }));
    }

    return [];
  }, [itemData, viewMode]);


  return (
    <ItemRenderer
      item={itemData}
      title={title}
      onTaskCompleted={handleTaskCompleted}
      showGenerationInfo={true}
      autoMonitorTask={false}
    >
      {viewMode === 'text' && !isMentorItem && !isTeamRoster ? (
        <Horizontal height="100%" width="100%" overflow="hidden">
          {/* Main Content Column */}
          <Vertical
            flex={1}
            height="100%"
            overflowY="auto"
            padding={SPACING.page}
            id="item-scroll-container"
            position="relative"
          >
            {!(itemId ? getItemByIdRequest.loading : getItemRequest.loading) ? (
              (itemId ? getItemByIdRequest.data : getItemRequest.data) ? (
                tocItems.length > 0 || content ? (
                  <Vertical gap={SPACING.element} paddingBottom={80} width="100%" maxWidth={800}>
                    <Vertical gap={SPACING.small}>
                      <H2 fontFamily="inherit">{title}</H2>
                    </Vertical>
                    {content}
                  </Vertical>
                ) : (
                  /* Empty State */
                  <Center width="100%" height="100%" flexDirection="column" gap={SPACING.element}>
                    <Icon name="file-text" width={48} height={48} color="color-gray-300" />
                    <Vertical alignItems="center" gap={SPACING.small}>
                      <C2 color="color-gray-500" fontWeight={500}>
                        No content yet
                      </C2>
                      <C3 color="color-gray-400" textAlign="center" maxWidth={300}>
                        Get started by adding your first section using the button below.
                      </C3>
                    </Vertical>
                  </Center>
                )
              ) : null
            ) : (
              <Center width="100%" height="100%" marginBottom={SPACING.page}>
                <TextSkeletons textLines={5} />
              </Center>
            )}
          </Vertical>

          {/* TOC Sidebar */}
          {tocItems.length > 0 && <TocSidebar items={tocItems} scrollContainerId="item-scroll-container" />}
        </Horizontal>
      ) : (
        <Vertical
          width="100%"
          padding={SPACING.page}
          media={{ mobile: { paddingTop: 10 } }}
          overflowY="auto"
          height="100%"
        >
          {!(itemId ? getItemByIdRequest.loading : getItemRequest.loading) ? (
            (itemId ? getItemByIdRequest.data : getItemRequest.data) ? (
              content
            ) : (
              /* Empty State for non-text views */
              <Center width="100%" height="100%" flexDirection="column" gap={SPACING.element}>
                <Icon name="inbox" width={48} height={48} color="color-gray-300" />
                <C2 color="color-gray-500">No data available</C2>
              </Center>
            )
          ) : (
            <Center width="100%" height="100%" marginBottom={SPACING.page}>
              <TextSkeletons textLines={5} />
            </Center>
          )}
        </Vertical>
      )}
      {/* Floating Action Button - Always visible */}
      <Tooltip content="Add new section" position="left">
        <Center
          position="fixed"
          bottom={SPACING.page}
          right={SPACING.page}
          width={56}
          height={56}
          borderRadius={28}
          backgroundColor={COLORS.fab.background}
          boxShadow={SHADOWS.fab}
          cursor="pointer"
          onClick={handleFabClick}
          zIndex={100}
          role="button"
          aria-label="Add new section"
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleFabClick();
            }
          }}
          _hover={{
            backgroundColor: COLORS.fab.hover,
            boxShadow: SHADOWS.fabHover,
            transform: 'scale(1.05)',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          _focus={{
            outline: '2px solid',
            outlineColor: 'color-blue-500',
            outlineOffset: '2px',
          }}
        >
          <Icon name="plus" color="white" width={24} height={24} />
        </Center>
      </Tooltip>

      {/* Drawer */}
      <Drawer isOpen={drawerState.isOpen} onClose={() => setDrawerState((prev) => ({ ...prev, isOpen: false }))}>
        <Drawer.Overlay
          isOpen={drawerState.isOpen}
          onClose={() => setDrawerState((prev) => ({ ...prev, isOpen: false }))}
        >
          <Drawer.Container size="md">
            <Drawer.Body>
              <EditorForm
                sectionContent={drawerState.content}
                initialValues={{ content: drawerState.content }}
                sectionTitle={drawerState.title}
                handleCancel={() => setDrawerState((prev) => ({ ...prev, isOpen: false }))}
                handleSubmit={(values) => handleDrawerSubmit(values)}
                request={drawerState.mode === 'create' ? createItemTextRequest : updateTextRequest}
              />
            </Drawer.Body>
          </Drawer.Container>
        </Drawer.Overlay>
      </Drawer>
    </ItemRenderer>
  );
};

export default ItemDisplayPage;
