import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text } from 'app-studio';
import { componentList } from '../utils/componentsPageImports'; // Adjust the path as necessary
import { Horizontal } from 'src/components';

const ListItem = ({ isHovered, isSelected, children, ...props }: any) => (
  <View
    as="li"
    color="rgba(182, 84, 15, 1)"
    cursor="pointer"
    padding={16}
    margin={0}
    backgroundColor={isHovered ? '#f2f2f2' : 'transparent'}
    fontWeight={isSelected ? 'bold' : 'normal'}
    {...props}
  >
    {children}
  </View>
);

const List = ({ children, ...props }: any) => (
  <View as="ul" listStyleType="none" padding={0} margin={0} {...props}>
    {children}
  </View>
);

const Title = ({ children, ...props }: any) => (
  <Text
    as="h2"
    padding={16}
    fontWeight="bold"
    color="rgba(182, 84, 15, 1)"
    textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)"
    {...props}
  >
    {children}
  </Text>
);

const SubTitle = ({ children, ...props }: any) => (
  <Text
    as="h3"
    fontWeight="bold"
    color="rgba(182, 84, 15, 1)"
    textShadow="2px 2px 4px rgba(0, 0, 0, 0.1)"
    {...props}
  >
    {children}
  </Text>
);

export const ComponentsPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(componentList[0]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
  };

  const handleListItemClick = (item: any) => {
    setSelected(item);
  };

  return (
    <Horizontal flexDirection="row" height="100%" flexWrap="nowrap">
      <View
        flexDirection="column"
        flex={1}
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
        transition="box-shadow 0.3s ease-in-out"
      >
        <Title onPress={() => navigate('/home')}>Navigation</Title>
        <List>
          {componentList.map((item, index) => (
            <ListItem
              key={index}
              isHovered={index === hoveredIndex}
              isSelected={selected.name === item.name}
              onPress={() => handleListItemClick(item)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </View>
      <View
        flexDirection="column"
        flex={4}
        paddingHorizontal={32}
        paddingVertical={16}
        gap={10}
      >
        <Suspense fallback={<View>Loading...</View>}>
          <SubTitle>{selected.name}</SubTitle>
          {selected.element}
        </Suspense>
      </View>
    </Horizontal>
  );
};

export default ComponentsPage;
