# ADK Components Customization Guide

This guide demonstrates how to customize ADK components using the enhanced `views` prop and `containerProps` for complete control over appearance and behavior.

## Overview

All ADK components now support comprehensive customization through:

1. **Enhanced `views` prop** - Granular control over individual component parts
2. **Container props** - Direct styling of the main container
3. **Theme props** - Built-in color schemes and layout options
4. **Responsive design** - Automatic adaptation across devices

## Component Customization

### AgentChat Component

The AgentChat component supports extensive customization of all its parts:

```tsx
<AgentChat
  appName="my-agent"
  userId="user123"
  colorScheme="purple"
  compact={false}
  rounded={true}
  containerProps={{
    backgroundColor: 'color.purple.25',
    border: '2px solid',
    borderColor: 'color.purple.300',
  }}
  views={{
    // Main areas
    container: { backgroundColor: 'color.purple.25' },
    header: { backgroundColor: 'color.purple.500', color: 'white' },
    messageList: { backgroundColor: 'color.white', padding: '20px' },
    inputArea: { backgroundColor: 'color.purple.50', padding: '16px' },
    
    // Message styling
    userMessage: {
      backgroundColor: 'color.purple.500',
      color: 'white',
      borderRadius: '18px 18px 4px 18px',
      padding: '12px 16px',
    },
    botMessage: {
      backgroundColor: 'color.purple.100',
      color: 'color.purple.900',
      borderRadius: '18px 18px 18px 4px',
      padding: '12px 16px',
    },
    
    // Input components
    inputField: {
      borderRadius: '24px',
      border: '2px solid',
      borderColor: 'color.purple.200',
    },
    sendButton: {
      backgroundColor: 'color.purple.500',
      borderRadius: '50%',
    },
    
    // State indicators
    typingIndicator: {
      color: 'color.purple.600',
      backgroundColor: 'color.purple.100',
      borderRadius: '16px',
    },
    
    // Function calls and code
    functionCall: {
      backgroundColor: 'color.purple.50',
      border: '1px solid',
      borderColor: 'color.purple.200',
      borderRadius: '8px',
    },
    codeBlock: {
      backgroundColor: 'color.gray.900',
      color: 'color.gray.100',
      borderRadius: '8px',
    },
  }}
/>
```

### AgentSession Component

The AgentSession component provides comprehensive session management customization:

```tsx
<AgentSession
  appName="my-agent"
  userId="user123"
  colorScheme="green"
  layout="list"
  showPreviews={true}
  enableBulkOperations={true}
  containerProps={{
    backgroundColor: 'color.green.25',
    border: '2px solid',
    borderColor: 'color.green.300',
  }}
  views={{
    // Main areas
    container: { backgroundColor: 'color.green.25' },
    header: { backgroundColor: 'color.green.500', color: 'white' },
    sessionList: { backgroundColor: 'color.white', padding: '16px' },
    
    // Session items
    sessionItem: {
      backgroundColor: 'color.green.50',
      borderRadius: '8px',
      padding: '12px',
      border: '1px solid',
      borderColor: 'color.green.200',
    },
    activeSessionItem: {
      backgroundColor: 'color.green.100',
      borderColor: 'color.green.500',
      borderWidth: '2px',
    },
    
    // Session content
    sessionTitle: { fontWeight: '600', color: 'color.green.900' },
    sessionDescription: { color: 'color.green.700' },
    sessionTimestamp: { color: 'color.green.600', fontSize: '12px' },
    
    // Action buttons
    createButton: {
      backgroundColor: 'color.green.500',
      color: 'white',
      borderRadius: '8px',
    },
    deleteButton: {
      backgroundColor: 'color.red.500',
      color: 'white',
      borderRadius: '6px',
    },
    
    // Search and filters
    searchInput: {
      borderRadius: '20px',
      border: '2px solid',
      borderColor: 'color.green.200',
    },
  }}
/>
```

## Available Views Properties

### AgentChat Views

- **Main Areas**: `container`, `header`, `messageList`, `inputArea`, `attachmentArea`
- **Messages**: `message`, `userMessage`, `botMessage`, `systemMessage`, `messageContent`, `messageTimestamp`, `messageAvatar`, `messageActions`
- **Input**: `inputField`, `sendButton`, `attachButton`, `recordButton`, `inputToolbar`
- **States**: `loadingIndicator`, `typingIndicator`, `errorMessage`, `emptyState`
- **Features**: `functionCall`, `functionResponse`, `codeBlock`, `codeOutput`, `thoughtBubble`
- **Attachments**: `attachmentPreview`, `attachmentItem`, `attachmentRemoveButton`

### AgentSession Views

- **Main Areas**: `container`, `header`, `toolbar`, `sessionList`, `sessionActions`, `filtersPanel`
- **Session Items**: `sessionItem`, `activeSessionItem`, `sessionInfo`, `sessionTitle`, `sessionDescription`, `sessionMetadata`, `sessionTimestamp`, `sessionTags`, `sessionStats`
- **Actions**: `createButton`, `deleteButton`, `exportButton`, `importButton`, `refreshButton`, `selectButton`, `duplicateButton`
- **Search/Filter**: `searchInput`, `filterDropdown`, `sortDropdown`, `dateRangePicker`, `tagFilter`
- **States**: `emptyState`, `loadingState`, `errorState`
- **Bulk Operations**: `bulkActions`, `selectAllCheckbox`, `bulkDeleteButton`, `bulkExportButton`

## Theme Options

### Color Schemes
- `blue` (default)
- `purple`
- `green`
- `orange`
- `red`
- `gray`

### Layout Options

**AgentSession Layouts:**
- `list` - Vertical list layout
- `grid` - Grid layout for sessions
- `compact` - Condensed view

**AgentTrace Layouts:**
- `timeline` - Timeline visualization
- `tree` - Tree structure
- `table` - Tabular view
- `graph` - Graph visualization

## Best Practices

1. **Consistent Color Schemes**: Use the same color scheme across related components
2. **Responsive Design**: Test customizations across different screen sizes
3. **Accessibility**: Ensure sufficient color contrast and readable fonts
4. **Performance**: Avoid overly complex styling that might impact performance
5. **Maintainability**: Use design tokens from the app-studio color system

## Examples

See the enhanced examples in each component's `examples/default.tsx` file for comprehensive demonstrations of all customization options.
