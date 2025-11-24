# KanbanBoard Component

A fully-featured Kanban board component with drag-and-drop support, card editing, and comprehensive callback handlers. Perfect for task management, project tracking, and workflow visualization.

## Features

- **Drag and Drop**: Move cards between columns smoothly
- **Card Management**: Create, edit, and delete cards
- **Column Support**: Multiple columns with independent card lists
- **Editable Content**: Edit card titles and descriptions inline
- **Custom Renderers**: Override default rendering for cards, columns, and empty states
- **Event Callbacks**: Comprehensive event handlers for all interactions
- **Customizable Styling**: Full control over appearance via `views` prop
- **State Management**: Built-in state management via `useKanbanBoardState` hook

## Installation

The KanbanBoard component is part of the app-studio library.

```tsx
import { KanbanBoard } from 'app-studio';
```

## Basic Usage

### Simple Kanban Board

```tsx
import { useState } from 'react';
import { KanbanBoard } from 'app-studio';

export function BasicKanbanBoard() {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: '1', title: 'Task 1', description: 'Description 1' },
        { id: '2', title: 'Task 2', description: 'Description 2' },
      ],
    },
    {
      id: 'inProgress',
      title: 'In Progress',
      cards: [{ id: '3', title: 'Task 3', description: 'Description 3' }],
    },
    {
      id: 'done',
      title: 'Done',
      cards: [],
    },
  ]);

  return (
    <KanbanBoard
      columns={columns}
      onChange={setColumns}
      onCardMove={(card, fromColumn, toColumn) => {
        console.log(`Moved ${card.title} from ${fromColumn.title} to ${toColumn.title}`);
      }}
    />
  );
}
```

### With Click Handlers

```tsx
<KanbanBoard
  columns={columns}
  onChange={setColumns}
  onCardClick={(card, column) => {
    console.log('Card clicked:', card);
  }}
  onCardDoubleClick={(card, column) => {
    console.log('Card double-clicked:', card);
  }}
  onCardMove={(card, fromColumn, toColumn) => {
    console.log(`Card moved: ${card.title}`);
  }}
/>
```

## API Reference

### KanbanBoard Props

| Prop | Type | Description |
|------|------|-------------|
| `columns` | `KanbanBoardColumn[]` | **Required**. Array of columns with cards |
| `onChange` | `(columns: KanbanBoardColumn[]) => void` | Called when board state changes |
| `onCardMove` | `(card, fromColumn, toColumn) => void` | Called when card is moved between columns |
| `onCardCreate` | `(card, column) => void` | Called when a new card is created |
| `onCardDelete` | `(card, column) => void` | Called when a card is deleted |
| `onCardClick` | `(card, column) => void` | Called when card is clicked |
| `onCardDoubleClick` | `(card, column) => void` | Called when card is double-clicked |
| `onCardTitleChange` | `(card, column, newTitle) => void` | Called when card title is edited |
| `onCardDescriptionChange` | `(card, column, newDescription) => void` | Called when card description is edited |
| `renderCard` | `(card, column) => ReactNode` | Custom card renderer |
| `renderColumnHeader` | `(column) => ReactNode` | Custom column header renderer |
| `renderEmptyState` | `(column) => ReactNode` | Custom empty state renderer |
| `views` | `KanbanBoardViews` | Styling configuration |

### Data Structures

#### KanbanBoardCard

```typescript
interface KanbanBoardCard {
  id: string;              // Unique identifier
  title: string;           // Card title
  description?: string;    // Optional card description
  metadata?: Record<string, unknown>;  // Custom metadata
  [key: string]: unknown;  // Allow additional properties
}
```

#### KanbanBoardColumn

```typescript
interface KanbanBoardColumn {
  id: string;              // Unique column identifier
  title: string;           // Column title
  cards: KanbanBoardCard[]; // Cards in this column
  footer?: React.ReactNode; // Optional footer content
  metadata?: Record<string, unknown>;  // Custom metadata
  [key: string]: unknown;  // Allow additional properties
}
```

### Views Configuration

```typescript
interface KanbanBoardViews {
  board?: ViewProps;         // Styles for board container
  column?: ViewProps;        // Styles for column container
  columnHeader?: ViewProps;  // Styles for column header
  columnTitle?: TextProps;   // Styles for column title text
  columnBody?: ViewProps;    // Styles for column body/cards area
  columnFooter?: ViewProps;  // Styles for column footer
  card?: ViewProps;          // Styles for individual cards
  cardContent?: ViewProps;   // Styles for card content area
  emptyState?: ViewProps;    // Styles for empty state message
}
```

## Event Callbacks

### onCardMove

Called when a card is moved to a different column.

```tsx
<KanbanBoard
  columns={columns}
  onCardMove={(card, fromColumn, toColumn) => {
    console.log(`${card.title} moved from ${fromColumn.title} to ${toColumn.title}`);
    // Update backend, track analytics, etc.
  }}
/>
```

### onCardClick & onCardDoubleClick

Handle card interactions.

```tsx
<KanbanBoard
  columns={columns}
  onCardClick={(card, column) => {
    // Open card detail view
    openCardDetail(card);
  }}
  onCardDoubleClick={(card, column) => {
    // Enter edit mode
    startEditing(card);
  }}
/>
```

### onCardTitleChange & onCardDescriptionChange

Called when card content is edited inline.

```tsx
<KanbanBoard
  columns={columns}
  onCardTitleChange={(card, column, newTitle) => {
    // Update card title in backend
    updateCard(card.id, { title: newTitle });
  }}
  onCardDescriptionChange={(card, column, newDescription) => {
    // Update card description in backend
    updateCard(card.id, { description: newDescription });
  }}
/>
```

## Custom Rendering

### Custom Card Renderer

```tsx
<KanbanBoard
  columns={columns}
  renderCard={(card, column) => (
    <div className="custom-card">
      <h3>{card.title}</h3>
      <p>{card.description}</p>
      <span className="priority">{card.metadata?.priority}</span>
    </div>
  )}
/>
```

### Custom Column Header

```tsx
<KanbanBoard
  columns={columns}
  renderColumnHeader={(column) => (
    <div className="custom-header">
      <h2>{column.title}</h2>
      <span className="card-count">{column.cards.length}</span>
    </div>
  )}
/>
```

### Custom Empty State

```tsx
<KanbanBoard
  columns={columns}
  renderEmptyState={(column) => (
    <div className="empty-state">
      <p>No tasks in {column.title}</p>
      <button>Create first task</button>
    </div>
  )}
/>
```

## Common Patterns

### Full-Featured Kanban Board

```tsx
export function FullKanbanBoard() {
  const [columns, setColumns] = useState(initialColumns);

  const handleCardCreate = (card, column) => {
    console.log('New card:', card);
  };

  const handleCardDelete = (card, column) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.id === column.id
          ? { ...col, cards: col.cards.filter(c => c.id !== card.id) }
          : col
      )
    );
  };

  const handleCardMove = (card, fromColumn, toColumn) => {
    setColumns(prevColumns => {
      const newColumns = prevColumns.map(col => {
        if (col.id === fromColumn.id) {
          return { ...col, cards: col.cards.filter(c => c.id !== card.id) };
        }
        if (col.id === toColumn.id) {
          return { ...col, cards: [...col.cards, card] };
        }
        return col;
      });
      return newColumns;
    });
  };

  return (
    <KanbanBoard
      columns={columns}
      onChange={setColumns}
      onCardCreate={handleCardCreate}
      onCardDelete={handleCardDelete}
      onCardMove={handleCardMove}
      onCardClick={(card, column) => {
        console.log('Card clicked:', card.id);
      }}
      onCardDoubleClick={(card, column) => {
        console.log('Card double-clicked:', card.id);
      }}
    />
  );
}
```

### With Custom Styling

```tsx
<KanbanBoard
  columns={columns}
  onChange={setColumns}
  views={{
    board: {
      backgroundColor: '#f5f5f5',
      padding: '20px',
      borderRadius: '8px',
    },
    column: {
      backgroundColor: '#fff',
      borderRadius: '6px',
      padding: '12px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      padding: '12px',
      border: '1px solid #e0e0e0',
    },
  }}
/>
```

### Syncing with Backend

```tsx
export function SyncedKanbanBoard() {
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial data
    fetchColumns().then(data => {
      setColumns(data);
      setLoading(false);
    });
  }, []);

  const handleCardMove = async (card, fromColumn, toColumn) => {
    try {
      await updateCardColumn(card.id, toColumn.id);
      setColumns(prevColumns => {
        // Update state
        return prevColumns;
      });
    } catch (error) {
      console.error('Failed to move card:', error);
      // Revert changes
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <KanbanBoard
      columns={columns}
      onChange={setColumns}
      onCardMove={handleCardMove}
    />
  );
}
```

## Drag and Drop Details

The KanbanBoard uses native HTML5 drag and drop. The component handles:

1. **Card Drag Start**: Triggered when user starts dragging a card
2. **Card Drag Over**: Called when dragging over other cards (detects relative position)
3. **Card Drop**: Called when card is dropped
4. **Column Drop**: Alternative drop zone if dropping in empty column
5. **Drag End**: Cleanup after drag operation

Position detection is relative - the component determines where in the target column the card should be placed.

## Best Practices

1. **Unique IDs**: Always ensure card and column IDs are unique
2. **Immutability**: Don't mutate `columns` directly; create new arrays/objects
3. **Callback Updates**: Use `onChange` callback to keep state in sync
4. **Backend Sync**: Sync changes back to backend in `onCardMove`, `onCardCreate`, `onCardDelete`
5. **Error Handling**: Implement error handling and rollback for failed operations
6. **Performance**: For large boards (100+ cards), consider virtualization
7. **Metadata**: Use `metadata` property to store additional card information without cluttering the interface

## State Management Hook

For advanced use cases, you can use the internal state hook:

```tsx
import { useKanbanBoardState } from 'app-studio/components/KanbanBoard/KanbanBoard/KanbanBoard.state';

const state = useKanbanBoardState({
  columns,
  onChange: setColumns,
  // ... other props
});

// state includes:
// - draggedCardId: current dragged card ID
// - hoveredColumnId: column being hovered over
// - Drag event handlers
```

## Examples

Check out the example implementations:
- Basic Example: `src/components/KanbanBoard/examples/Basic.tsx`
- Full Page: `src/pages/kanbanBoard.page.tsx`

## Accessibility

- Keyboard support for drag operations (ARIA labels)
- Screen reader friendly with proper semantic HTML
- Visual feedback during drag operations
- Clear focus management

## Browser Support

Works in all modern browsers that support HTML5 drag and drop.

## Performance Considerations

- Component re-renders on every state change (columns array)
- For 1000+ cards, consider implementing virtualization
- Use `React.memo` for custom renderers to prevent unnecessary re-renders
- Debounce backend sync operations for rapid changes
