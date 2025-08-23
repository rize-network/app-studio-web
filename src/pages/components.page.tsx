import React, { Suspense, useState, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text, Horizontal } from 'app-studio';
import TreePage from './tree.page';
import FlowPage from './flow.page';
import ChatInputDemo from './chat.page';

const GradientPage = lazy(() => import('src/pages/gradient.page'));
const DragAndDropPage = lazy(() => import('src/pages/dragAndDrop.page'));
const UploadPage = lazy(() => import('src/pages/upload.page'));
// const AIChatPage = lazy(() => import('src/pages/chat.page'));

const ADKComponentsPage = lazy(
  () => import('src/pages/adk/adkComponents.page')
);
const AgentChatPage = lazy(() => import('src/pages/adk/agentChat.page'));
const AdkIntegrationPage = lazy(
  () => import('src/pages/adk/adkIntegration.page')
);

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
const CheckboxPage = lazy(() => import('src/pages/checkbox.page'));
const ColorPickerPage = lazy(() => import('src/pages/colorPicker.page'));
const ComboBoxPage = lazy(() => import('src/pages/comboBox.page'));
const CommandPage = lazy(() => import('src/pages/command.page'));
const ContextMenuPage = lazy(() => import('src/pages/contextMenu.page'));
const CountryPickerPage = lazy(() => import('src/pages/countryPicker.page'));
const DatePickerPage = lazy(() => import('src/pages/datePicker.page'));
const DropdownMenuPage = lazy(() => import('src/pages/dropdownMenu.page'));
const EmojiPickerPage = lazy(() => import('src/pages/emojiPicker.page'));
const FormikPage = lazy(() => import('src/pages/formik.page'));
const HomePage = lazy(() => import('src/pages/home.page'));
const HoverCardPage = lazy(() => import('src/pages/hoverCard.page'));
const LinkPage = lazy(() => import('src/pages/link.page'));
const LoaderPage = lazy(() => import('src/pages/loader.page'));
const IconPage = lazy(() => import('src/pages/icon.page'));
const TagsPage = lazy(() => import('src/pages/tags.page'));
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
const TitlePage = lazy(() => import('src/pages/title.page'));
const CookieConsentPage = lazy(() => import('src/pages/cookieConsent.page'));
const ToastPage = lazy(() => import('src/pages/toast.page'));
const TooltipPage = lazy(() => import('src/pages/tooltip.page'));
const TogglePage = lazy(() => import('src/pages/toggle.page'));
const ToggleGroupPage = lazy(() => import('src/pages/toggleGroup.page'));
const AudioInputPage = lazy(() => import('src/pages/audioInput.page'));

const BackgroundPage = lazy(() => import('src/pages/background.page'));

export const componentList = [
  { name: 'Accordion', path: '/accordion', element: <AccordionPage /> },
  { name: 'Chat', path: '/chat', element: <ChatInputDemo /> },
  { name: 'Agent Chat', path: '/agent-chat', element: <AgentChatPage /> },
  {
    name: 'ADK Components',
    path: '/adk-components',
    element: <ADKComponentsPage />,
  },
  {
    name: 'ADK Integration',
    path: '/adk-integration',
    element: <AdkIntegrationPage />,
  },
  { name: 'Gradient', path: '/gradient', element: <GradientPage /> },

  { name: 'Alert', path: '/alert', element: <AlertPage /> },
  { name: 'AspectRatio', path: '/aspectratio', element: <AspectRatioPage /> },
  { name: 'Avatar', path: '/avatar', element: <AvatarPage /> },
  { name: 'Background', path: '/background', element: <BackgroundPage /> },
  { name: 'Badge', path: '/badge', element: <BadgePage /> },
  { name: 'Button', path: '/button', element: <ButtonPage /> },
  { name: 'Card', path: '/card', element: <CardPage /> },
  { name: 'Carousel', path: '/carousel', element: <CarouselPage /> },
  { name: 'Chart', path: '/chart', element: <ChartPage /> },
  { name: 'Checkbox', path: '/checkbox', element: <CheckboxPage /> },
  { name: 'ColorPicker', path: '/colorpicker', element: <ColorPickerPage /> },
  { name: 'Command', path: '/command', element: <CommandPage /> },
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
  { name: 'EmojiPicker', path: '/emojipicker', element: <EmojiPickerPage /> },
  { name: 'Formik', path: '/formik', element: <FormikPage /> },
  { name: 'Home', path: '/home', element: <HomePage /> },
  { name: 'HoverCard', path: '/hovercard', element: <HoverCardPage /> },
  { name: 'Link', path: '/link', element: <LinkPage /> },
  { name: 'Loader', path: '/loader', element: <LoaderPage /> },
  { name: 'Icon', path: '/icon', element: <IconPage /> },
  {
    name: 'TagInput',
    path: '/tagInput',
    element: <TagsPage />,
  },
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
  { name: 'Title', path: '/title', element: <TitlePage /> },
  {
    name: 'CookieConsent',
    path: '/cookieconsent',
    element: <CookieConsentPage />,
  },
  { name: 'Toast', path: '/toast', element: <ToastPage /> },
  { name: 'Tooltip', path: '/tooltip', element: <TooltipPage /> },
  { name: 'Toggle', path: '/toggle', element: <TogglePage /> },
  { name: 'ToggleGroup', path: '/togglegroup', element: <ToggleGroupPage /> },
  { name: 'Upload', path: '/upload', element: <UploadPage /> },
  { name: 'Tree', path: '/tree', element: <TreePage /> },
  { name: 'Flow', path: '/flow', element: <FlowPage /> },
  { name: 'Audio Input', path: '/audio-input', element: <AudioInputPage /> },
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
