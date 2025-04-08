import React, { Suspense, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text } from 'app-studio';
import { Horizontal } from 'src/components';
import DragAndDropPage from 'src/pages/dragAndDrop.page';
import UploadPage from 'src/pages/upload.page';
// Lazy-loaded imports
const AccordionPage = lazy(() => import('src/pages/accordion.page'));
const AlertPage = lazy(() => import('src/pages/alert.page'));
const AspectRatioPage = lazy(() => import('src/pages/aspectRatio.page'));
const AvatarPage = lazy(() => import('src/pages/avatar.page'));
const BadgePage = lazy(() => import('src/pages/badge.page'));
const ButtonPage = lazy(() => import('src/pages/button.page'));
const CardPage = lazy(() => import('src/pages/card.page'));
const CarouselPage = lazy(() => import('src/pages/carousel.page'));
const ChartPage = lazy(() => import('src/pages/chart.page'));
const CenterPage = lazy(() => import('src/pages/center.page'));
const CheckboxPage = lazy(() => import('src/pages/checkbox.page'));
const ComboBoxPage = lazy(() => import('src/pages/comboBox.page'));
const ContextMenuPage = lazy(() => import('src/pages/contextMenu.page'));
const CountryPickerPage = lazy(() => import('src/pages/countryPicker.page'));
const DatePickerPage = lazy(() => import('src/pages/datePicker.page'));
const DropdownMenuPage = lazy(() => import('src/pages/dropdownMenu.page'));
const FormikPage = lazy(() => import('src/pages/formik.page'));
const HomePage = lazy(() => import('src/pages/home.page'));
const HorizontalPage = lazy(() => import('src/pages/horizontal.page'));
const HoverCardPage = lazy(() => import('src/pages/hoverCard.page'));
const LinkPage = lazy(() => import('src/pages/link.page'));
const LoaderPage = lazy(() => import('src/pages/loader.page'));
const IconPage = lazy(() => import('src/pages/icon.page'));
const MessagePage = lazy(() => import('src/pages/message.page'));
const MenubarPage = lazy(() => import('src/pages/menubar.page'));
const ModalPage = lazy(() => import('src/pages/modal.page'));
const NavigationMenuPage = lazy(() => import('src/pages/navigationMenu.page'));
const OTPInputPage = lazy(() => import('src/pages/otpInput.page'));
const PaginationPage = lazy(() => import('src/pages/pagination.page'));
const PasswordPage = lazy(() => import('src/pages/password.page'));
const SelectPage = lazy(() => import('src/pages/select.page'));
const SeparatorPage = lazy(() => import('src/pages/separator.page'));
const ResizablePage = lazy(() => import('src/pages/resizable.page'));
const SidebarPage = lazy(() => import('src/pages/sidebar.page'));
const SliderPage = lazy(() => import('src/pages/slider.page'));
const SwitchPage = lazy(() => import('src/pages/switch.page'));
const TablePage = lazy(() => import('src/pages/table.page'));
const TabsPage = lazy(() => import('src/pages/tabs.page'));
const TextPage = lazy(() => import('src/pages/text.page'));
const TextAreaPage = lazy(() => import('src/pages/textArea.page'));
const TextfieldPage = lazy(() => import('src/pages/textfield.page'));
const ToastPage = lazy(() => import('src/pages/toast.page'));
const TogglePage = lazy(() => import('src/pages/toggle.page'));
const ToggleGroupPage = lazy(() => import('src/pages/toggleGroup.page'));
const VerticalPage = lazy(() => import('src/pages/vertical.page'));

export const componentList = [
  { name: 'Accordion', path: '/accordion', element: <AccordionPage /> },
  { name: 'Alert', path: '/alert', element: <AlertPage /> },
  { name: 'AspectRatio', path: '/aspectratio', element: <AspectRatioPage /> },
  { name: 'Avatar', path: '/avatar', element: <AvatarPage /> },
  { name: 'Badge', path: '/badge', element: <BadgePage /> },
  { name: 'Button', path: '/button', element: <ButtonPage /> },
  { name: 'Card', path: '/card', element: <CardPage /> },
  { name: 'Carousel', path: '/carousel', element: <CarouselPage /> },
  { name: 'Chart', path: '/chart', element: <ChartPage /> },
  { name: 'Center', path: '/center', element: <CenterPage /> },
  { name: 'Checkbox', path: '/checkbox', element: <CheckboxPage /> },
  { name: 'ComboBox', path: '/combobox', element: <ComboBoxPage /> },
  { name: 'ContextMenu', path: '/contextmenu', element: <ContextMenuPage /> },
  {
    name: 'CountryPicker',
    path: '/countrypicker',
    element: <CountryPickerPage />,
  },
  { name: 'DatePicker', path: '/datepicker', element: <DatePickerPage /> },
  {
    name: 'DropdownMenu',
    path: '/dropdownmenu',
    element: <DropdownMenuPage />,
  },
  { name: 'Formik', path: '/formik', element: <FormikPage /> },
  { name: 'Home', path: '/home', element: <HomePage /> },
  { name: 'Horizontal', path: '/horizontal', element: <HorizontalPage /> },
  { name: 'HoverCard', path: '/hovercard', element: <HoverCardPage /> },
  { name: 'Link', path: '/link', element: <LinkPage /> },
  { name: 'Loader', path: '/loader', element: <LoaderPage /> },
  { name: 'Icon', path: '/icon', element: <IconPage /> },
  { name: 'Drag and Drop', path: '/dragAndDrop', element: <DragAndDropPage /> },

  { name: 'Message', path: '/message', element: <MessagePage /> },
  { name: 'Menubar', path: '/menubar', element: <MenubarPage /> },
  { name: 'Modal', path: '/modal', element: <ModalPage /> },
  {
    name: 'NavigationMenu',
    path: '/navigationmenu',
    element: <NavigationMenuPage />,
  },
  { name: 'OTP Input', path: '/otpinput', element: <OTPInputPage /> },
  { name: 'Pagination', path: '/pagination', element: <PaginationPage /> },
  { name: 'Password', path: '/password', element: <PasswordPage /> },
  { name: 'Resizable', path: '/resizable', element: <ResizablePage /> },
  { name: 'Select', path: '/select', element: <SelectPage /> },
  { name: 'Separator', path: '/separator', element: <SeparatorPage /> },
  { name: 'Sidebar', path: '/sidebar', element: <SidebarPage /> },
  { name: 'Slider', path: '/slider', element: <SliderPage /> },

  { name: 'Switch', path: '/switch', element: <SwitchPage /> },
  { name: 'Table', path: '/table', element: <TablePage /> },
  { name: 'Tabs', path: '/tabs', element: <TabsPage /> },
  { name: 'Text', path: '/text', element: <TextPage /> },
  { name: 'TextArea', path: '/textarea', element: <TextAreaPage /> },
  { name: 'Textfield', path: '/textfield', element: <TextfieldPage /> },
  { name: 'Toast', path: '/toast', element: <ToastPage /> },
  { name: 'Toggle', path: '/toggle', element: <TogglePage /> },
  { name: 'ToggleGroup', path: '/togglegroup', element: <ToggleGroupPage /> },
  { name: 'Vertical', path: '/vertical', element: <VerticalPage /> },
  { name: 'Upload', path: '/upload', element: <UploadPage /> },
];

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
        height="100vh"
        overflow="auto"
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
        height="100vh"
        overflow="auto"
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
