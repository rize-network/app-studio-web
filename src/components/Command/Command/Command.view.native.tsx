import React, { createContext, useContext, useRef } from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
import { SearchIcon } from '../../Icon/Icon';
import { CommandTextInput } from './CommandTextInput';
import {
  CommandProps,
  CommandInputProps,
  CommandListProps,
  CommandGroupProps,
  CommandItemProps,
  CommandEmptyProps,
} from './Command.props';
import {
  CommandEmptyStyles,
  CommandFooterStyles,
  CommandGroupHeadingStyles,
  CommandGroupStyles,
  CommandInputStyles,
  CommandItemContentStyles,
  CommandItemDescriptionStyles,
  CommandItemDisabledStyles,
  CommandItemIconStyles,
  CommandItemNameStyles,
  CommandItemSelectedStyles,
  CommandItemShortcutStyles,
  CommandItemStyles,
  CommandListStyles,
} from './Command.style';
import { CommandItem as CommandItemInterface } from './Command.type';

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

export const useCommandContext = () => useContext(CommandContext);

export const CommandProvider: React.FC<{
  value: CommandContextType;
  children: React.ReactNode;
}> = ({ value, children }) => (
  <CommandContext.Provider value={value}>{children}</CommandContext.Provider>
);

export const CommandInput: React.FC<CommandInputProps> = ({
  value,
  onValueChange,
  placeholder = 'Type a command or search...',
  views,
  ...props
}) => {
  const inputRef = useRef<any>(null);

  React.useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus?.(), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Horizontal
      alignItems="center"
      minHeight={52}
      paddingHorizontal={16}
      borderBottomWidth={1}
      borderBottomColor="color-gray-200"
      {...CommandInputStyles}
      {...views?.container}
      {...props}
    >
      <SearchIcon widthHeight={16} color="color-gray-400" marginRight={8} />
      <CommandTextInput
        width="100%"
        backgroundColor="transparent"
        fontSize={16}
        {...views?.input}
        value={value}
        onValueChange={onValueChange}
        placeholder={placeholder}
        ref={inputRef}
      />
    </Horizontal>
  );
};

export const CommandList: React.FC<CommandListProps> = ({
  children,
  views,
  ...props
}) => (
  <Vertical
    paddingVertical={8}
    {...CommandListStyles}
    {...views?.container}
    {...props}
  >
    {children}
  </Vertical>
);

export const CommandGroup: React.FC<CommandGroupProps> = ({
  heading,
  children,
  views,
  ...props
}) => (
  <Vertical
    marginBottom={8}
    {...CommandGroupStyles}
    {...views?.container}
    {...props}
  >
    <Text
      paddingHorizontal={16}
      paddingVertical={8}
      fontSize={12}
      lineHeight={16}
      fontWeight="700"
      color="color-gray-500"
      textTransform="uppercase"
      {...CommandGroupHeadingStyles}
      {...views?.heading}
    >
      {heading}
    </Text>
    {children}
  </Vertical>
);

export const CommandItem: React.FC<CommandItemProps> = ({
  item,
  selected = false,
  onSelect,
  views,
  ...props
}) => {
  const handlePress = () => {
    if (!item.disabled && onSelect) onSelect();
  };

  return (
    <Horizontal
      alignItems="center"
      minHeight={56}
      paddingVertical={10}
      paddingHorizontal={16}
      marginHorizontal={8}
      borderRadius={8}
      backgroundColor={selected ? 'color-blue-50' : 'transparent'}
      opacity={item.disabled ? 0.5 : 1}
      onPress={handlePress}
      onClick={handlePress}
      {...CommandItemStyles}
      {...(selected ? CommandItemSelectedStyles : {})}
      {...(item.disabled ? CommandItemDisabledStyles : {})}
      {...views?.container}
      {...props}
    >
      {item.icon && (
        <View marginRight={12} {...CommandItemIconStyles} {...views?.icon}>
          {item.icon}
        </View>
      )}
      <Vertical
        flex={1}
        minWidth={0}
        {...CommandItemContentStyles}
        {...views?.content}
      >
        <Text
          fontSize={14}
          lineHeight={20}
          fontWeight="500"
          color="color-gray-900"
          {...CommandItemNameStyles}
          {...views?.name}
        >
          {item.name}
        </Text>
        {item.description && (
          <Text
            fontSize={12}
            lineHeight={18}
            color="color-gray-500"
            marginTop={2}
            {...CommandItemDescriptionStyles}
            {...views?.description}
          >
            {item.description}
          </Text>
        )}
      </Vertical>
      {item.shortcut && (
        <Text
          marginLeft={12}
          fontSize={12}
          lineHeight={18}
          color="color-gray-500"
          {...CommandItemShortcutStyles}
          {...views?.shortcut}
        >
          {item.shortcut}
        </Text>
      )}
    </Horizontal>
  );
};

export const CommandEmpty: React.FC<CommandEmptyProps> = ({
  children = 'No results found.',
  views,
  ...props
}) => (
  <View
    alignItems="center"
    justifyContent="center"
    padding={20}
    {...CommandEmptyStyles}
    {...views?.container}
    {...props}
  >
    {children}
  </View>
);

export const CommandView: React.FC<
  CommandProps & {
    search: string;
    setSearch: (value: string) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    filteredCommands: CommandItemInterface[];
    filteredGroups: any[];
    listRef: React.RefObject<HTMLDivElement | null>;
  }
> = ({
  open,
  onOpenChange,
  groups = [],
  commands: _commands = [],
  placeholder,
  size = 'md',
  variant: _variant = 'default',
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
  filter: _filter,
  ...props
}) => {
  const closeCommand = React.useCallback(() => {
    onOpenChange(false);
    setSearch('');
  }, [onOpenChange, setSearch]);

  const handleItemSelect = React.useCallback(
    (item: CommandItemInterface) => {
      if (item.disabled) return;
      item.onSelect();
      closeCommand();
    },
    [closeCommand]
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
  const isEmpty = filteredCommands.length === 0;
  const sheetSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';

  return (
    <ActionSheet
      isOpen={open}
      onClose={closeCommand}
      showHandle
      maxHeight="86%"
      size={sheetSize}
      views={{
        sheet: {
          paddingTop: 8,
          ...views?.container,
        },
        content: {
          paddingBottom: 8,
          ...views?.list,
        },
      }}
      {...props}
    >
      <CommandProvider value={contextValue}>
        <Vertical overflow="hidden">
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder={placeholder}
            views={views?.searchInput}
          />
          <Vertical ref={listRef as any} {...views?.list}>
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
                  {group.commands.map((item: CommandItemInterface) => {
                    const commandIndex = filteredCommands.findIndex(
                      (cmd) => cmd.id === item.id
                    );
                    return (
                      <CommandItem
                        key={item.id}
                        item={item}
                        selected={commandIndex === selectedIndex}
                        onSelect={() => handleItemSelect(item)}
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
          </Vertical>
          {footer && (
            <View {...CommandFooterStyles} {...views?.footer}>
              {footer}
            </View>
          )}
        </Vertical>
      </CommandProvider>
    </ActionSheet>
  );
};
