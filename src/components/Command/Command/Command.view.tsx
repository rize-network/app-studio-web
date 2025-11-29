import React, { createContext, useContext, useRef } from 'react';
import { View } from 'app-studio';
import { Text } from 'app-studio';
import { Vertical } from 'app-studio';
import { Horizontal } from 'app-studio';
import { SearchIcon } from '../../Icon/Icon';
import {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandGroupProps,
  CommandItemProps,
  CommandEmptyProps,
} from './Command.props';
import {
  CommandSizes,
  CommandVariants,
  CommandInputStyles,
  CommandListStyles,
  CommandGroupStyles,
  CommandGroupHeadingStyles,
  CommandItemStyles,
  CommandItemSelectedStyles,
  CommandItemDisabledStyles,
  CommandItemIconStyles,
  CommandItemContentStyles,
  CommandItemNameStyles,
  CommandItemDescriptionStyles,
  CommandItemShortcutStyles,
  CommandEmptyStyles,
  CommandFooterStyles,
} from './Command.style';
import { CommandItem as CommandItemInterface } from './Command.type';

// Create context for the Command component
interface CommandContextType {
  search: string;
  setSearch: (value: string) => void;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  filteredCommands: CommandItemInterface[];
  onSelect: (item: CommandItemInterface) => void;
}

const CommandContext = createContext<CommandContextType>({
  search: '',
  setSearch: () => {},
  selectedIndex: 0,
  setSelectedIndex: () => {},
  filteredCommands: [],
  onSelect: () => {},
});

// Hook to use the Command context
export const useCommandContext = () => useContext(CommandContext);

// Provider component for the Command context
export const CommandProvider: React.FC<{
  value: CommandContextType;
  children: React.ReactNode;
}> = ({ value, children }) => {
  return (
    <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
  );
};

// Command Input component
export const CommandInput: React.FC<CommandInputProps> = ({
  value,
  onValueChange,
  placeholder = 'Type a command or search...',
  views,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when component mounts
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View {...CommandInputStyles} {...views?.container} {...props}>
      <SearchIcon widthHeight={16} color="color.gray.400" marginRight="8px" />
      <View
        as="input"
        type="text"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onValueChange(e.target.value)
        }
        placeholder={placeholder}
        width="100%"
        border="none"
        outline="none"
        backgroundColor="transparent"
        fontSize="14px"
        ref={inputRef}
        {...views?.input}
      />
    </View>
  );
};

// Command List component
export const CommandList: React.FC<CommandListProps> = ({
  children,
  views,
  ...props
}) => {
  return (
    <View {...CommandListStyles} {...views?.container} {...props}>
      {children}
    </View>
  );
};

// Command Group component
export const CommandGroup: React.FC<CommandGroupProps> = ({
  heading,
  children,
  views,
  ...props
}) => {
  return (
    <View {...CommandGroupStyles} {...views?.container} {...props}>
      <Text {...CommandGroupHeadingStyles} {...views?.heading}>
        {heading}
      </Text>
      {children}
    </View>
  );
};

// Command Item component
export const CommandItem: React.FC<CommandItemProps> = ({
  item,
  selected = false,
  onSelect,
  views,
  ...props
}) => {
  const handleClick = () => {
    if (!item.disabled && onSelect) {
      onSelect();
    }
  };

  return (
    <Horizontal
      {...CommandItemStyles}
      {...(selected ? CommandItemSelectedStyles : {})}
      {...(item.disabled ? CommandItemDisabledStyles : {})}
      onClick={handleClick}
      {...views?.container}
      {...props}
    >
      {item.icon && (
        <View {...CommandItemIconStyles} {...views?.icon}>
          {item.icon}
        </View>
      )}
      <Vertical {...CommandItemContentStyles} {...views?.content}>
        <Text {...CommandItemNameStyles} {...views?.name}>
          {item.name}
        </Text>
        {item.description && (
          <Text {...CommandItemDescriptionStyles} {...views?.description}>
            {item.description}
          </Text>
        )}
      </Vertical>
      {item.shortcut && (
        <Text {...CommandItemShortcutStyles} {...views?.shortcut}>
          {item.shortcut}
        </Text>
      )}
    </Horizontal>
  );
};

// Command Empty component
export const CommandEmpty: React.FC<CommandEmptyProps> = ({
  children = 'No results found.',
  views,
  ...props
}) => {
  return (
    <View {...CommandEmptyStyles} {...views?.container} {...props}>
      {children}
    </View>
  );
};

// Main Command View component
export const CommandView: React.FC<
  CommandProps & {
    search: string;
    setSearch: (value: string) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    filteredCommands: CommandItemInterface[];
    filteredGroups: any[];
    listRef: React.RefObject<HTMLDivElement>;
  }
> = ({
  open,
  onOpenChange,
  groups = [],
  commands = [],
  placeholder,
  size = 'md',
  variant = 'default',
  emptyState,
  footer,
  search,
  setSearch,
  selectedIndex,
  setSelectedIndex,
  filteredCommands,
  filteredGroups,
  listRef,
  views,
  filter,
  ...props
}) => {
  if (!open) return null;

  const handleItemSelect = React.useCallback(
    (item: CommandItemInterface) => {
      if (item.disabled) return;
      item.onSelect();
      onOpenChange(false);
      setSearch('');
    },
    [onOpenChange, setSearch]
  );

  const handleBackdropClick = React.useCallback(
    (e: React.MouseEvent) =>
      e.target === e.currentTarget && onOpenChange(false),
    [onOpenChange]
  );

  const contextValue = React.useMemo(
    () => ({
      search,
      setSearch,
      selectedIndex,
      setSelectedIndex,
      filteredCommands,
      onSelect: handleItemSelect,
    }),
    [
      search,
      selectedIndex,
      filteredCommands,
      handleItemSelect,
      setSearch,
      setSelectedIndex,
    ]
  );

  const hasGroups = groups.length > 0;
  // const hasCommands = commands.length > 0;
  const isEmpty = filteredCommands.length === 0;

  return (
    <View
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.4)"
      zIndex={9999}
      onClick={handleBackdropClick}
      {...props}
    >
      <CommandProvider value={contextValue}>
        <View
          borderRadius="8px"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          {...CommandSizes[size]}
          {...CommandVariants[variant]}
          {...views?.container}
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={placeholder}
            views={views?.searchInput}
          />

          <View ref={listRef} flex={1} overflow="auto" {...views?.list}>
            {isEmpty ? (
              emptyState ? (
                emptyState
              ) : (
                <CommandEmpty views={views?.empty} />
              )
            ) : hasGroups ? (
              filteredGroups.map((group) => (
                <CommandGroup
                  key={group.id}
                  heading={group.name}
                  views={views?.groupHeading}
                >
                  {group.commands.map((item: any) => {
                    const commandIndex = filteredCommands.findIndex(
                      (cmd) => cmd.id === item.id
                    );
                    return (
                      <CommandItem
                        key={item.id}
                        item={item}
                        selected={commandIndex === selectedIndex}
                        onSelect={() => handleItemSelect(item)}
                        data-index={commandIndex}
                        views={{
                          container: views?.item,
                          icon: views?.icon,
                          content: views?.content,
                          name: views?.name,
                          description: views?.description,
                          shortcut: views?.shortcut,
                        }}
                      />
                    );
                  })}
                </CommandGroup>
              ))
            ) : (
              filteredCommands.map((item, index) => (
                <CommandItem
                  key={item.id}
                  item={item}
                  selected={index === selectedIndex}
                  onSelect={() => handleItemSelect(item)}
                  data-index={index}
                  views={{
                    container: views?.item,
                    icon: views?.icon,
                    content: views?.content,
                    name: views?.name,
                    description: views?.description,
                    shortcut: views?.shortcut,
                  }}
                />
              ))
            )}
          </View>

          {footer && (
            <View {...CommandFooterStyles} {...views?.footer}>
              {footer}
            </View>
          )}
        </View>
      </CommandProvider>
    </View>
  );
};
