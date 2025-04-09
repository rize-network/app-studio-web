import React from 'react';
import {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandGroupProps,
  CommandItemProps,
  CommandEmptyProps,
  CommandType,
} from './Command/Command.props';
import { useCommandState } from './Command/Command.state';
import {
  CommandView,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem as CommandItemView,
  CommandEmpty,
} from './Command/Command.view';

/**
 * Command component for displaying a command palette with search functionality.
 */
const CommandComponent: React.FC<CommandProps> = ({
  open,
  onOpenChange,
  groups = [],
  commands = [],
  placeholder,
  size = 'md',
  variant = 'default',
  filter,
  emptyState,
  footer,
  views,
  ...props
}) => {
  const {
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    filteredGroups,
    listRef,
  } = useCommandState({
    open,
    onOpenChange,
    groups,
    commands,
    filter,
  });

  return (
    <CommandView
      open={open}
      onOpenChange={onOpenChange}
      groups={groups}
      commands={commands}
      placeholder={placeholder}
      size={size}
      variant={variant}
      emptyState={emptyState}
      footer={footer}
      search={search}
      setSearch={setSearch}
      selectedIndex={selectedIndex}
      setSelectedIndex={setSelectedIndex}
      filteredCommands={filteredCommands}
      filteredGroups={filteredGroups}
      listRef={listRef}
      views={views}
      {...props}
    />
  );
};

export const Command = CommandComponent as CommandType;

// Assign the sub-components to the main component
Command.Input = CommandInput;
Command.List = CommandList;
Command.Group = CommandGroup;
Command.Item = CommandItemView;
Command.Empty = CommandEmpty;
