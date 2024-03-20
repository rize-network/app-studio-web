import React, { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Horizontal, Vertical } from 'src/components';
import styled from 'styled-components';
import { componentList } from '../utils/componentsPageImports'; // Adjust the path as necessary

const ListItem = styled.li<{ isHovered: boolean; isSelected: boolean }>`
  text-decoration: none;
  color: rgba(182, 84, 15, 1);
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin: 0;
  background-color: ${(props) => (props.isHovered ? '#f2f2f2' : 'transparent')};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Title = styled.h2`
  padding: 1rem;
  font-weight: bold;
  color: rgba(182, 84, 15, 1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubTitle = styled.h3`
  font-weight: bold;
  color: rgba(182, 84, 15, 1);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
`;

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
    <Horizontal height="100%" wrap="nowrap">
      <Vertical
        flex={1}
        boxShadow="0 2px 5px rgba(0, 0, 0, 0.2)"
        transition="box-shadow 0.3s ease-in-out"
      >
        <Title onClick={() => navigate('/home')}>Navigation</Title>
        <List>
          {componentList.map((item, index) => (
            <ListItem
              key={index}
              isHovered={index === hoveredIndex}
              isSelected={selected.name === item.name}
              onClick={() => handleListItemClick(item)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </Vertical>
      <Vertical flex={4} padding="1rem 2rem" gap={10}>
        <Suspense fallback={<div>Loading...</div>}>
          <SubTitle>{selected.name}</SubTitle>
          {selected.element}
        </Suspense>
      </Vertical>
    </Horizontal>
  );
};

export default ComponentsPage;
