import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { View, Text, Horizontal, useTheme } from 'app-studio';
import { Button } from 'src/components/Button/Button';
import { useThemeActions } from 'src/providers';
import { componentList } from 'src/configs/componentList';

const ListItem = ({ isHovered, isSelected, children, ...props }: any) => (
  <View
    as="li"
    color="theme-primary"
    cursor="pointer"
    padding={16}
    margin={0}
    backgroundColor={
      isSelected
        ? 'color-primary-100'
        : isHovered
        ? 'color-gray-100'
        : 'transparent'
    }
    fontWeight={isSelected ? 'bold' : 'normal'}
    {...props}
  >
    {children}
  </View>
);

const List = ({ children, ...props }: any) => (
  <View as="ul" listStyleType="none" padding={0} margin={0} role="list" {...props}>
    {children}
  </View>
);

const Title = ({ children, ...props }: any) => (
  <Text as="h1" padding={16} fontWeight="bold" fontSize={24} color="theme-primary" {...props}>
    {children}
  </Text>
);

const SubTitle = ({ children, ...props }: any) => (
  <Text as="h2" fontWeight="bold" color="theme-primary" {...props}>
    {children}
  </Text>
);

const ListSectionHeader = ({ children, ...props }: any) => (
  <Text
    as="span"
    display="block"
    fontSize={12}
    fontWeight="600"
    color="color-gray-500"
    paddingHorizontal={16}
    paddingTop={16}
    paddingBottom={8}
    textTransform="uppercase"
    {...props}
  >
    {children}
  </Text>
);

const CATEGORY_ORDER = [
  'Layout',
  'Inputs',
  'Navigation',
  'Data Display',
  'Feedback',
  'Experimental',
];

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { themeMode } = useTheme();
  const { toggleThemeMode } = useThemeActions();
  const [hoveredIndex, setHoveredIndex] = useState<string | number>(-1);

  const handleMouseEnter = (index: string | number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const currentItem =
    componentList.find(
      (item) =>
        item.path === location.pathname || item.path === '/' + location.pathname
    ) || componentList[0];

  const appMenuItems = [
    { name: 'Home', path: '/' },
    { name: 'Docs', path: '/docs' },
    { name: 'Theme Test', path: '/theme-test' },
  ];

  const groupedComponents = useMemo(() => {
    const groups: Record<string, typeof componentList> = {};
    componentList.forEach((component) => {
      const category = component.category || 'Other';
      if (category === 'Hidden') return;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(component);
    });

    // Sort components within groups
    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => a.name.localeCompare(b.name));
    });

    return groups;
  }, []);

  // Scroll to top on route change
  React.useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <Horizontal flexDirection="row" height="100%" flexWrap="nowrap">
      <View
        flexDirection="column"
        flex={1}
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
        transition="box-shadow 0.3s ease-in-out"
        height="100vh"
        overflow="auto"
        backgroundColor="theme-background"
        minWidth="250px"
        maxWidth="300px"
      >
        <Horizontal
          alignItems="center"
          justifyContent="space-between"
          paddingRight={16}
        >
          <Title onPress={() => navigate('/')}>App Studio</Title>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleThemeMode}
            color="theme-primary"
          >
            {themeMode === 'light' ? '🌙' : '☀️'}
          </Button>
        </Horizontal>

        <View as="nav" aria-label="Sidebar navigation">
          {/* Main App Menu */}
          <ListSectionHeader>Main</ListSectionHeader>
          <List>
            {appMenuItems.map((item, index) => {
              const isSelected =
                location.pathname === item.path ||
                (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <ListItem
                  key={`app-${index}`}
                  isHovered={`app-${index}` === hoveredIndex}
                  isSelected={isSelected}
                  onPress={() => navigate(item.path)}
                  onMouseEnter={() => handleMouseEnter(`app-${index}`)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.name}
                </ListItem>
              );
            })}
          </List>

          {/* Categorized Components */}
          {CATEGORY_ORDER.map((category) => {
            const components = groupedComponents[category];
            if (!components || components.length === 0) return null;

            return (
              <React.Fragment key={category}>
                <ListSectionHeader>{category}</ListSectionHeader>
                <List>
                  {components.map((item, index) => {
                    const isSelected = location.pathname === item.path;
                    const itemKey = `${category}-${index}`;
                    return (
                      <ListItem
                        key={itemKey}
                        isHovered={itemKey === hoveredIndex}
                        isSelected={isSelected}
                        onPress={() => navigate(item.path)}
                        onMouseEnter={() => handleMouseEnter(itemKey)}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.name}
                      </ListItem>
                    );
                  })}
                </List>
              </React.Fragment>
            );
          })}

          {/* Catch-all for any categories not in the explicit order list */}
          {Object.keys(groupedComponents)
            .filter((cat) => !CATEGORY_ORDER.includes(cat) && cat !== 'Hidden')
            .map((category) => {
              const components = groupedComponents[category];
              return (
                <React.Fragment key={category}>
                  <ListSectionHeader>{category}</ListSectionHeader>
                  <List>
                    {components.map((item, index) => {
                      const isSelected = location.pathname === item.path;
                      const itemKey = `${category}-${index}`;
                      return (
                        <ListItem
                          key={itemKey}
                          isHovered={itemKey === hoveredIndex}
                          isSelected={isSelected}
                          onPress={() => navigate(item.path)}
                          onMouseEnter={() => handleMouseEnter(itemKey)}
                          onMouseLeave={handleMouseLeave}
                        >
                          {item.name}
                        </ListItem>
                      );
                    })}
                  </List>
                </React.Fragment>
              );
            })}
        </View>
      </View>
      <View
        flexDirection="column"
        flex={4}
        paddingHorizontal={32}
        paddingVertical={16}
        gap={10}
        height="100vh"
        overflow="auto"
        backgroundColor="theme-background"
        id="main-content"
      >
        {/* We only show SubTitle for components to avoid double titles on standalone pages */}
        {location.pathname !== '/' &&
          location.pathname !== '/docs' &&
          location.pathname !== '/theme-test' && (
            <SubTitle>{currentItem?.name}</SubTitle>
          )}
        <Outlet />
      </View>
    </Horizontal>
  );
};

export default AppLayout;
