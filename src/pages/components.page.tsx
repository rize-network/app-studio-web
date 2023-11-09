import React, { lazy, Suspense, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Horizontal, Vertical } from 'src/components';
import styled from 'styled-components';

// Lazy-loaded imports
const ButtonPage = lazy(() => import('src/pages/button.page'));
const CenterPage = lazy(() => import('src/pages/center.page'));
const CheckboxPage = lazy(() => import('src/pages/checkbox.page'));
const CountryPickerPage = lazy(() => import('src/pages/countryPicker.page'));
const DatePickerPage = lazy(() => import('src/pages/datePicker.page'));
const HorizontalPage = lazy(() => import('src/pages/horizontal.page'));
const TextFieldPage = lazy(() => import('src/pages/input.page'));
const LinkPage = lazy(() => import('src/pages/link.page'));
const LoaderPage = lazy(() => import('src/pages/loader.page'));
const ModalPage = lazy(() => import('src/pages/modal.page'));
const MessagePage = lazy(() => import('src/pages/message.page'));
const PasswordPage = lazy(() => import('src/pages/password.page'));
const SelectPage = lazy(() => import('src/pages/select.page'));
const SwitchPage = lazy(() => import('src/pages/switch.page'));
const TextPage = lazy(() => import('src/pages/text.page'));
const TextAreaPage = lazy(() => import('src/pages/textArea.page'));
const VerticalPage = lazy(() => import('src/pages/vertical.page'));

const ListItem = styled.li<{ isHovered: boolean; isSelected: boolean }>`
  text-decoration: none;
  color: rgba(182, 84, 15, 1);
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin: 0;
  background-color: ${(props) => (props.isHovered ? '#f2f2f2' : 'transparent')};
  font-weight: ${(props) => (props.isSelected ? 'bold' : '')};
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
  const componentList = useMemo(() => {
    return [
      { name: 'Button', path: '/button', element: <ButtonPage /> },
      { name: 'Center', path: '/center', element: <CenterPage /> },
      { name: 'Checkbox', path: '/checkbox', element: <CheckboxPage /> },
      {
        name: 'CountryPicker',
        path: '/countryPicker',
        element: <CountryPickerPage />,
      },
      { name: 'DatePicker', path: '/datepicker', element: <DatePickerPage /> },
      { name: 'Horizontal', path: '/horizontal', element: <HorizontalPage /> },
      { name: 'Link', path: '/link', element: <LinkPage /> },
      { name: 'Loader', path: '/loader', element: <LoaderPage /> },
      { name: 'Modal', path: '/modal', element: <ModalPage /> },
      { name: 'Password', path: '/password', element: <PasswordPage /> },
      { name: 'Select', path: '/select', element: <SelectPage /> },
      { name: 'Switch', path: '/switch', element: <SwitchPage /> },
      { name: 'TextArea', path: '/textarea', element: <TextAreaPage /> },
      { name: 'TextField', path: '/textfield', element: <TextFieldPage /> },
      { name: 'Text', path: '/text', element: <TextPage /> },
      { name: 'Vertical', path: '/vertical', element: <VerticalPage /> },
      { name: 'Message', path: '/message', element: <MessagePage /> },
    ];
  }, []);

  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selected, setSelected] = useState(componentList[0]);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(-1);
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
              onClick={() => setSelected(item)}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.name}
            </ListItem>
          ))}
        </List>
      </Vertical>
      <Vertical flex={4} padding="1rem 2rem" gap={10}>
        <Suspense fallback={<div>Loader...</div>}>
          <SubTitle>{selected.name}</SubTitle>
          {selected.element}
        </Suspense>
      </Vertical>
    </Horizontal>
  );
};

export default ComponentsPage;
