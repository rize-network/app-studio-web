import React, { createContext, useContext } from 'react';
import { Modal, ScrollView } from 'react-native';
import { View, Text, ViewProps } from 'app-studio';
import {
  DropdownMenuContextType,
  DropdownMenuItem as DropdownMenuItemType,
  Position,
  Alignment,
} from './DropdownMenu.type';
import {
  DropdownMenuTriggerProps,
  DropdownMenuContentProps,
  DropdownMenuItemProps,
  DropdownMenuDividerProps,
} from './DropdownMenu.props';
import { DropdownMenuSizes, DropdownMenuVariants } from './DropdownMenu.style';

const DropdownMenuContext = createContext<DropdownMenuContextType>({
  isOpen: false,
  setIsOpen: () => {},
  activeSubmenuId: null,
  setActiveSubmenuId: () => {},
  size: 'md',
  variant: 'default',
  triggerRef: { current: null },
});

export const DropdownMenuProvider: React.FC<{
  children: React.ReactNode;
  value: DropdownMenuContextType;
}> = ({ children, value }) => {
  return (
    <DropdownMenuContext.Provider value={value}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

export const useDropdownMenuContext = () => {
  const context = useContext(DropdownMenuContext);
  if (!context) {
    throw new Error(
      'useDropdownMenuContext must be used within a DropdownMenuProvider'
    );
  }
  return context;
};

export const DropdownMenuTrigger: React.FC<DropdownMenuTriggerProps> = ({
  children,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen } = useDropdownMenuContext();
  const handlePress = () => setIsOpen(!isOpen);
  return (
    <View
      onPress={handlePress}
      onClick={handlePress}
      {...views?.container}
      {...props}
    >
      {children}
    </View>
  );
};

export const DropdownMenuContent: React.FC<DropdownMenuContentProps> = ({
  items,
  views,
  ...props
}) => {
  const { isOpen, setIsOpen, variant } = useDropdownMenuContext();
  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
    >
      <View
        flex={1}
        backgroundColor="color-blackAlpha-400"
        justifyContent="center"
        alignItems="center"
        onPress={() => setIsOpen(false)}
        onClick={() => setIsOpen(false)}
      >
        <View
          minWidth={200}
          borderRadius={4}
          overflow="hidden"
          {...DropdownMenuVariants[variant]}
          {...views?.menu}
          {...props}
        >
          <ScrollView>
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <DropdownMenuDivider key={`divider-${index}`} views={views} />
                );
              }
              return (
                <DropdownMenuItem key={item.id} item={item} views={views} />
              );
            })}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export const DropdownMenuItem: React.FC<DropdownMenuItemProps> = ({
  item,
  views,
  ...props
}) => {
  const { size, setIsOpen } = useDropdownMenuContext();
  const handlePress = () => {
    if (item.disabled) return;
    if (item.onClick) item.onClick();
    setIsOpen(false);
  };
  return (
    <View
      flexDirection="row"
      alignItems="center"
      opacity={item.disabled ? 0.5 : 1}
      onPress={handlePress}
      onClick={handlePress}
      {...DropdownMenuSizes[size]}
      {...views?.item}
      {...props}
    >
      {item.icon && (
        <View marginRight={8} {...views?.icon}>
          {item.icon}
        </View>
      )}
      <View flexGrow={1}>
        {typeof item.label === 'string' ? (
          <Text>{item.label}</Text>
        ) : (
          item.label
        )}
      </View>
    </View>
  );
};

export const DropdownMenuDivider: React.FC<DropdownMenuDividerProps> = ({
  views,
  ...props
}) => {
  return (
    <View
      height={1}
      backgroundColor="color-gray-200"
      marginVertical={4}
      {...views?.divider}
      {...props}
    />
  );
};

export const DropdownMenuView: React.FC<
  {
    trigger: React.ReactNode;
    items: DropdownMenuItemType[];
    side?: Position;
    align?: Alignment;
    views?: any;
  } & ViewProps
> = ({ trigger, items, views, themeMode: elementMode, ...props }) => {
  return (
    <View {...views?.container} {...props}>
      <DropdownMenuTrigger views={views}>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent items={items} views={views} />
    </View>
  );
};
