import React, { createContext, useContext, useRef } from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import { ActionSheet } from '../../ActionSheet/ActionSheet';
import { CloseIcon, SearchIcon } from '../../Icon/Icon';
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
  CommandItem as CommandItemInterface,
  CommandSize,
} from './Command.type';

const CommandActionMetrics: Record<
  CommandSize,
  {
    minHeight: number;
    paddingVertical: number;
    titleSize: number;
    descriptionSize: number;
  }
> = {
  sm: {
    minHeight: 48,
    paddingVertical: 9,
    titleSize: 15,
    descriptionSize: 12,
  },
  md: {
    minHeight: 56,
    paddingVertical: 11,
    titleSize: 16,
    descriptionSize: 13,
  },
  lg: {
    minHeight: 64,
    paddingVertical: 13,
    titleSize: 17,
    descriptionSize: 14,
  },
};

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
  placeholder = 'Search actions',
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
      paddingHorizontal={16}
      paddingTop={2}
      paddingBottom={12}
      {...views?.container}
      {...props}
    >
      <Horizontal
        flex={1}
        minHeight={44}
        alignItems="center"
        borderRadius={14}
        paddingHorizontal={12}
        backgroundColor="color-gray-100"
      >
        <SearchIcon widthHeight={17} color="color-gray-500" marginRight={8} />
        <CommandTextInput
          width="100%"
          backgroundColor="transparent"
          color="#111827"
          fontSize={16}
          placeholderTextColor="#6B7280"
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
          {...views?.input}
          value={value}
          onValueChange={onValueChange}
          placeholder={placeholder}
          ref={inputRef}
        />
        {value.length > 0 && (
          <Horizontal
            widthHeight={28}
            alignItems="center"
            justifyContent="center"
            borderRadius={999}
            backgroundColor="color-gray-200"
            marginLeft={8}
            onPress={() => onValueChange('')}
            onClick={() => onValueChange('')}
          >
            <CloseIcon widthHeight={14} color="color-gray-600" />
          </Horizontal>
        )}
      </Horizontal>
    </Horizontal>
  );
};

export const CommandList: React.FC<CommandListProps> = ({
  children,
  views,
  ...props
}) => (
  <Vertical paddingTop={2} paddingBottom={8} {...views?.container} {...props}>
    {children}
  </Vertical>
);

export const CommandGroup: React.FC<CommandGroupProps> = ({
  heading,
  children,
  views,
  ...props
}) => (
  <Vertical paddingBottom={8} {...views?.container} {...props}>
    <Text
      paddingHorizontal={20}
      paddingTop={14}
      paddingBottom={6}
      fontSize={12}
      lineHeight={16}
      fontWeight="600"
      color="color-gray-500"
      textTransform="uppercase"
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
      paddingVertical={11}
      paddingHorizontal={20}
      borderBottomWidth={1}
      borderBottomColor="color-gray-100"
      backgroundColor={selected ? 'color-gray-100' : 'transparent'}
      opacity={item.disabled ? 0.5 : 1}
      onPress={handlePress}
      onClick={handlePress}
      {...views?.container}
      {...props}
    >
      {item.icon && (
        <View
          widthHeight={34}
          alignItems="center"
          justifyContent="center"
          borderRadius={17}
          backgroundColor="color-gray-100"
          marginRight={12}
          flexShrink={0}
          {...views?.icon}
        >
          {item.icon}
        </View>
      )}
      <Vertical flex={1} minWidth={0} gap={2} {...views?.content}>
        <Text
          fontSize={16}
          lineHeight={22}
          fontWeight="500"
          color="color-gray-900"
          {...views?.name}
        >
          {item.name}
        </Text>
        {item.description && (
          <Text
            fontSize={13}
            lineHeight={18}
            color="color-gray-500"
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
          lineHeight={16}
          color="color-gray-500"
          backgroundColor="color-gray-100"
          borderRadius={6}
          paddingHorizontal={7}
          paddingVertical={3}
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
    minHeight={132}
    paddingHorizontal={24}
    paddingVertical={28}
    {...views?.container}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text
        fontSize={15}
        lineHeight={22}
        color="color-gray-500"
        textAlign="center"
      >
        {children}
      </Text>
    ) : (
      children
    )}
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
  const actionMetrics = CommandActionMetrics[sheetSize];

  return (
    <ActionSheet
      isOpen={open}
      onClose={closeCommand}
      showHandle
      maxHeight="86%"
      size={sheetSize}
      header={
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder={placeholder}
          views={views?.searchInput}
        />
      }
      views={{
        sheet: {
          paddingTop: 8,
          ...views?.container,
        },
        content: {
          paddingTop: 2,
          paddingBottom: 8,
          ...views?.list,
        },
      }}
      {...props}
    >
      <CommandProvider value={contextValue}>
        <Vertical ref={listRef as any}>
          {isEmpty ? (
            emptyState ? (
              typeof emptyState === 'string' ? (
                <CommandEmpty views={views?.empty}>{emptyState}</CommandEmpty>
              ) : (
                emptyState
              )
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
                        container: {
                          minHeight: actionMetrics.minHeight,
                          paddingVertical: actionMetrics.paddingVertical,
                          ...views?.item,
                        },
                        icon: views?.icon,
                        content: views?.content,
                        name: {
                          fontSize: actionMetrics.titleSize,
                          lineHeight: actionMetrics.titleSize + 6,
                          ...views?.name,
                        },
                        description: {
                          fontSize: actionMetrics.descriptionSize,
                          lineHeight: actionMetrics.descriptionSize + 5,
                          ...views?.description,
                        },
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
                  container: {
                    minHeight: actionMetrics.minHeight,
                    paddingVertical: actionMetrics.paddingVertical,
                    ...views?.item,
                  },
                  icon: views?.icon,
                  content: views?.content,
                  name: {
                    fontSize: actionMetrics.titleSize,
                    lineHeight: actionMetrics.titleSize + 6,
                    ...views?.name,
                  },
                  description: {
                    fontSize: actionMetrics.descriptionSize,
                    lineHeight: actionMetrics.descriptionSize + 5,
                    ...views?.description,
                  },
                  shortcut: views?.shortcut,
                }}
              />
            ))
          )}
          {footer && (
            <View
              paddingHorizontal={20}
              paddingTop={12}
              paddingBottom={8}
              borderTopWidth={1}
              borderTopColor="color-gray-100"
              {...views?.footer}
            >
              {typeof footer === 'string' ? (
                <Text fontSize={12} lineHeight={18} color="color-gray-500">
                  {footer}
                </Text>
              ) : (
                footer
              )}
            </View>
          )}
        </Vertical>
      </CommandProvider>
    </ActionSheet>
  );
};
