import React from 'react';
import { CommandProps, CommandType } from './Command/Command.props';
import { useCommandState } from './Command/Command.state';
import {
  CommandView,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem as CommandItemView,
  CommandEmpty,
} from './Command/Command.view';
// This file defines the main Command component, which acts as a container for a searchable list of commands. It manages its internal state (like search input and selection) using the `useCommandState` hook and orchestrates the rendering of its various sub-components such as input, list, groups, and items.
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
Command.Input = CommandInput;
Command.List = CommandList;
Command.Group = CommandGroup;
Command.Item = CommandItemView;
Command.Empty = CommandEmpty;
