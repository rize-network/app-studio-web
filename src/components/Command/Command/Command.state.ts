// This file defines the core state management logic and hooks for the Command component, handling search, filtering, selection, and keyboard navigation.
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CommandGroup, CommandItem } from './Command.type';
export interface CommandStateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups?: CommandGroup[];
  commands?: CommandItem[];
  filter?: (value: string, item: CommandItem) => boolean;
}
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
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const filterFn = useMemo(() => filter || defaultFilterFn, [filter]);
  const allCommands = useMemo(() => {
    const groupCommands = groups.flatMap((group) => group.commands);
    return [...groupCommands, ...commands];
  }, [groups, commands]);
  const filteredCommands = useMemo(() => {
    if (!search.trim()) return allCommands;
    return allCommands.filter((item) => filterFn(search, item));
  }, [allCommands, search, filterFn]);
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
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length]);
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
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
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
  useEffect(() => {
    if (open) {
      setSelectedIndex(0);
    } else {
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
