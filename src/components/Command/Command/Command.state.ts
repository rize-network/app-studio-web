import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CommandGroup, CommandItem } from './Command.type';

export interface CommandStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandGroup[];
  commands?: CommandItem[];
  filter?: (value: string, item: CommandItem) => boolean;
}

// Default filter function defined outside the hook to avoid recreating it on each render
const defaultFilterFn = (value: string, item: CommandItem) => {
  if (!value) return true;

  const searchValue = value.toLowerCase();
  const matchesName = item.name.toLowerCase().includes(searchValue);
  const matchesDescription =
    item.description?.toLowerCase().includes(searchValue) || false;
  const matchesKeywords =
    item.keywords?.some((keyword) =>
      keyword.toLowerCase().includes(searchValue)
    ) || false;

  return matchesName || matchesDescription || matchesKeywords;
};

export const useCommandState = ({
  open,
  onOpenChange,
  groups = [],
  commands = [],
  filter,
}: CommandStateProps) => {
  // State for search input
  const [search, setSearch] = useState('');

  // State for selected item index
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Ref for the command list element
  const listRef = useRef<HTMLDivElement>(null);

  // Use the provided filter or fall back to the default
  const filterFn = useMemo(() => filter || defaultFilterFn, [filter]);

  // Combine and memoize all commands from groups and flat list
  const allCommands = useMemo(() => {
    const groupCommands = groups.flatMap((group) => group.commands);
    return [...groupCommands, ...commands];
  }, [groups, commands]);

  // Filter and memoize commands based on search
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands;
    return allCommands.filter((item) => filterFn(search, item));
  }, [allCommands, search, filterFn]);

  // Filter and memoize groups based on search
  const filteredGroups = useMemo(() => {
    if (!search) return groups;

    const filterFn = filter || defaultFilterFn;
    return groups
      .map((g) => ({
        ...g,
        commands: g.commands.filter((c) => filterFn(search, c)),
      }))
      .filter((g) => g.commands.length);
  }, [groups, search, filter]);

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
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
    },
    [open, filteredCommands, selectedIndex, onOpenChange]
  );

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
      const selectedElement = listRef.current.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [selectedIndex, open]);

  // Reset state when command palette is opened
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    } else {
      // Clear search when closed
      setSearch('');
    }
  }, [open]);

  return {
    search,
    setSearch,
    selectedIndex,
    setSelectedIndex,
    filteredCommands,
    filteredGroups,
    listRef,
  };
};
