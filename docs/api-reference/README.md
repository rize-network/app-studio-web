# API Reference

This section provides detailed API documentation for all components in the App Studio Web Component Library.

## Component Categories

- [Layout Components](#layout-components)
- [Form Components](#form-components)
- [Navigation Components](#navigation-components)
- [Feedback Components](#feedback-components)
- [Data Display Components](#data-display-components)
- [Utility Components](#utility-components)
- [Interactive Components](#interactive-components)

## Layout Components

- [View](./layout/view.md) - Base container component
- [Horizontal](./layout/horizontal.md) - Horizontal flex container
- [Vertical](./layout/vertical.md) - Vertical flex container
- [Center](./layout/center.md) - Centered flex container
- [AspectRatio](./layout/aspect-ratio.md) - Container with fixed aspect ratio
- [Separator](./layout/separator.md) - Visual or semantic separator
- [Resizable](./layout/resizable.md) - Resizable container

## Form Components

- [Checkbox](./form/checkbox.md) - Checkbox input
- [ChatInput](./form/chat-input.md) - Chat input with file uploads and prompt examples
- [Radio](./form/radio.md) - Radio input
- [Select](./form/select.md) - Select dropdown
- [Switch](./form/switch.md) - Toggle switch
- [TextArea](./form/text-area.md) - Multi-line text input
- [TextField](./form/text-field.md) - Single-line text input
- [OTPInput](./form/otp-input.md) - One-time password input

## Navigation Components

- [Accordion](./navigation/accordion.md) - Expandable content sections
- [Menubar](./navigation/menubar.md) - Horizontal menu
- [NavigationMenu](./navigation/navigation-menu.md) - Navigation menu
- [Pagination](./navigation/pagination.md) - Page navigation
- [Sidebar](./navigation/sidebar.md) - Side navigation
- [Tabs](./navigation/tabs.md) - Tabbed interface

## Feedback Components

- [Alert](./feedback/alert.md) - Informational message
- [Modal](./feedback/modal.md) - Dialog box
- [Toast](./feedback/toast.md) - Temporary notification
- [Tooltip](./feedback/tooltip.md) - Contextual information

## Data Display Components

- [Avatar](./data-display/avatar.md) - User or entity representation
- [Badge](./data-display/badge.md) - Small count or status indicator
- [Card](./data-display/card.md) - Content container
- [Table](./data-display/table.md) - Tabular data
- [Chart](./data-display/chart.md) - Data visualization
- [Flow](./data-display/flow.md) - Interactive workflow diagrams and flowcharts
- [OKR](./data-display/okr.md) - Objectives and Key Results tracking
- [Tree](./data-display/tree.md) - Hierarchical tree structure

## Utility Components

- [Button](./utility/button.md) - Interactive button
- [Gradient](./utility/gradient.md) - Gradient background
- [Loader](./utility/loader.md) - Loading indicator
- [Text](./utility/text.md) - Text display

## Interactive Components

- [Carousel](./interactive/carousel.md) - Slideshow
- [ContextMenu](./interactive/context-menu.md) - Right-click menu
- [DropdownMenu](./interactive/dropdown-menu.md) - Dropdown menu
- [HoverCard](./interactive/hover-card.md) - Card that appears on hover
- [Slider](./interactive/slider.md) - Range input
- [Toggle](./interactive/toggle.md) - Toggle button
- [ToggleGroup](./interactive/toggle-group.md) - Group of toggle buttons

## Component API Structure

Each component's API documentation follows a consistent structure:

1. **Import** - How to import the component
2. **Props** - Detailed list of props with types and descriptions
3. **Examples** - Basic usage examples
4. **Variants** - Available variants and their usage
5. **Compound Components** - Sub-components (if applicable)
6. **Accessibility** - Accessibility features and considerations
7. **Best Practices** - Recommended usage patterns

## Generating API Documentation

Component API documentation is automatically generated using the `bot-doc` tool. To regenerate documentation for a component:

```bash
npm run bot-doc -- ComponentName src/components/ComponentName
```

To regenerate documentation for all components:

```bash
npm run create-docs
```
