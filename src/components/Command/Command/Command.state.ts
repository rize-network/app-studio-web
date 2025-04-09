import { useState, useEffect, useCallback, useRef } from 'react';
import { CommandGroup, CommandItem } from './Command.type';

export interface CommandStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandGroup[];
  commands?: CommandItem[];
  filter?: (value: string, item: CommandItem) => boolean;
}

export const useCommandState = ({
  open,
  onOpenChange,
  groups = [],
  commands = [],
  filter,
}: CommandStateProps) => {
  // Combine commands from groups and flat list
  const allCommands = useCallback(() => {
    const groupCommands = groups.flatMap((group) => group.commands);
    return [...groupCommands, ...commands];
  }, [groups, commands]);

  // State for search input
  const [search, setSearch] = useState('');
  
  // State for selected item index
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  // Ref for the command list element
  const listRef = useRef<HTMLDivElement>(null);

  // Default filter function
  const defaultFilter = (value: string, item: CommandItem) => {
    if (!value) return true;
    
    const searchValue = value.toLowerCase();
    const matchesName = item.name.toLowerCase().includes(searchValue);
    const matchesDescription = item.description?.toLowerCase().includes(searchValue) || false;
    const matchesKeywords = item.keywords?.some(keyword => 
      keyword.toLowerCase().includes(searchValue)
    ) || false;
    
    return matchesName || matchesDescription || matchesKeywords;
  };

  // Filter commands based on search
  const filterCommands = useCallback((searchValue: string) => {
    const filterFn = filter || defaultFilter;
    return allCommands().filter(item => filterFn(searchValue, item));
  }, [allCommands, filter, defaultFilter]);

  // Filtered commands based on search
  const [filteredCommands, setFilteredCommands] = useState<CommandItem[]>(allCommands());

  // Filtered groups based on search
  const filteredGroups = useCallback(() => {
    if (!search) return groups;
    
    return groups
      .map(group => ({
        ...group,
        commands: group.commands.filter(command => 
          (filter || defaultFilter)(search, command)
        ),
      }))
      .filter(group => group.commands.length > 0);
  }, [groups, search, filter, defaultFilter]);

  // Update filtered commands when search changes
  useEffect(() => {
    setFilteredCommands(filterCommands(search));
    setSelectedIndex(0);
  }, [search, filterCommands]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].onSelect();
          onOpenChange(false);
          setSearch('');
        }
        break;
      case 'Escape':
        e.preventDefault();
        onOpenChange(false);
        setSearch('');
        break;
    }
  }, [open, filteredCommands, selectedIndex, onOpenChange]);

  // Add keyboard event listener
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Scroll selected item into view
  useEffect(() => {
    if (listRef.current && open) {
      const selectedElement = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, open]);

  // Reset state when command palette is opened
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    }
  }, [open]);

  return {
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    filteredGroups: filteredGroups(),
    listRef,
  };
};
