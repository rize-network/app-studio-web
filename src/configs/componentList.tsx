import React, { lazy } from 'react';

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
const IconPickerPage = lazy(() => import('src/pages/iconPicker.page'));
const TagsPage = lazy(() => import('src/pages/tags.page'));
const MessagePage = lazy(() => import('src/pages/message.page'));
const MenubarPage = lazy(() => import('src/pages/menubar.page'));
const ModalPage = lazy(() => import('src/pages/modal.page'));
const DrawerPage = lazy(() => import('src/pages/drawer.page'));
const NavigationMenuPage = lazy(() => import('src/pages/navigationMenu.page'));
const OTPInputPage = lazy(() => import('src/pages/otpInput.page'));
const PaginationPage = lazy(() => import('src/pages/pagination.page'));
const PasswordPage = lazy(() => import('src/pages/password.page'));
const ProgressBarPage = lazy(() => import('src/pages/progressBar.page'));
const SelectPage = lazy(() => import('src/pages/select.page'));
const SeparatorPage = lazy(() => import('src/pages/separator.page'));
const ResizablePage = lazy(() => import('src/pages/resizable.page'));
const SidebarPage = lazy(() => import('src/pages/sidebar.page'));
const SliderPage = lazy(() => import('src/pages/slider.page'));
const SwitchPage = lazy(() => import('src/pages/switch.page'));
const StatusIndicatorPage = lazy(
  () => import('src/pages/statusIndicator.page')
);
const TablePage = lazy(() => import('src/pages/table.page'));
const TabsPage = lazy(() => import('src/pages/tabs.page'));
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
const ChatWidgetPage = lazy(() => import('src/pages/chatwidget.page'));
const EditComponentPage = lazy(() => import('src/pages/editComponent.page'));

const GradientPage = lazy(() => import('src/pages/gradient.page'));
const DragAndDropPage = lazy(() => import('src/pages/dragAndDrop.page'));
const UploadPage = lazy(() => import('src/pages/upload.page'));
const DropZonePage = lazy(() => import('src/pages/dropZone.page'));
const AttachmentGroupPage = lazy(
  () => import('src/pages/attachmentGroup.page')
);

// Import locally to avoid circular dependencies if any
const ChatInputDemo = lazy(() => import('src/pages/chat.page'));

export type ComponentCategory =
  | 'Layout'
  | 'Inputs'
  | 'Navigation'
  | 'Data Display'
  | 'Feedback'
  | 'Utility'
  | 'Experimental'
  | 'Hidden';

export interface ComponentRoute {
  name: string;
  path: string;
  element: React.ReactNode;
  category: ComponentCategory;
}

export const componentList: ComponentRoute[] = [
  // Layout
  {
    name: 'AspectRatio',
    path: '/aspectratio',
    element: <AspectRatioPage />,
    category: 'Layout',
  },
  {
    name: 'Background',
    path: '/background',
    element: <BackgroundPage />,
    category: 'Layout',
  },
  { name: 'Card', path: '/card', element: <CardPage />, category: 'Layout' },
  {
    name: 'Drawer',
    path: '/drawer',
    element: <DrawerPage />,
    category: 'Layout',
  },
  {
    name: 'HoverCard',
    path: '/hovercard',
    element: <HoverCardPage />,
    category: 'Layout',
  },
  { name: 'Modal', path: '/modal', element: <ModalPage />, category: 'Layout' },
  {
    name: 'Resizable',
    path: '/resizable',
    element: <ResizablePage />,
    category: 'Layout',
  },
  {
    name: 'Separator',
    path: '/separator',
    element: <SeparatorPage />,
    category: 'Layout',
  },
  {
    name: 'Sidebar',
    path: '/sidebar',
    element: <SidebarPage />,
    category: 'Layout',
  },

  // Inputs
  {
    name: 'Audio Input',
    path: '/audio-input',
    element: <AudioInputPage />,
    category: 'Inputs',
  },
  {
    name: 'Button',
    path: '/button',
    element: <ButtonPage />,
    category: 'Inputs',
  },
  {
    name: 'Checkbox',
    path: '/checkbox',
    element: <CheckboxPage />,
    category: 'Inputs',
  },
  {
    name: 'ColorPicker',
    path: '/colorpicker',
    element: <ColorPickerPage />,
    category: 'Inputs',
  },
  {
    name: 'ComboBox',
    path: '/combobox',
    element: <ComboBoxPage />,
    category: 'Inputs',
  },
  {
    name: 'CountryPicker',
    path: '/countrypicker',
    element: <CountryPickerPage />,
    category: 'Inputs',
  },
  {
    name: 'DatePicker',
    path: '/datepicker',
    element: <DatePickerPage />,
    category: 'Inputs',
  },
  {
    name: 'EmojiPicker',
    path: '/emojipicker',
    element: <EmojiPickerPage />,
    category: 'Inputs',
  },
  {
    name: 'Formik',
    path: '/formik',
    element: <FormikPage />,
    category: 'Inputs',
  },
  {
    name: 'OTP Input',
    path: '/otpinput',
    element: <OTPInputPage />,
    category: 'Inputs',
  },
  {
    name: 'Password',
    path: '/password',
    element: <PasswordPage />,
    category: 'Inputs',
  },
  {
    name: 'Select',
    path: '/select',
    element: <SelectPage />,
    category: 'Inputs',
  },
  {
    name: 'Slider',
    path: '/slider',
    element: <SliderPage />,
    category: 'Inputs',
  },
  {
    name: 'Switch',
    path: '/switch',
    element: <SwitchPage />,
    category: 'Inputs',
  },
  {
    name: 'TagInput',
    path: '/tagInput',
    element: <TagsPage />,
    category: 'Inputs',
  },
  {
    name: 'TextArea',
    path: '/textarea',
    element: <TextAreaPage />,
    category: 'Inputs',
  },
  {
    name: 'Textfield',
    path: '/textfield',
    element: <TextfieldPage />,
    category: 'Inputs',
  },
  {
    name: 'Toggle',
    path: '/toggle',
    element: <TogglePage />,
    category: 'Inputs',
  },
  {
    name: 'ToggleGroup',
    path: '/togglegroup',
    element: <ToggleGroupPage />,
    category: 'Inputs',
  },
  {
    name: 'Upload',
    path: '/upload',
    element: <UploadPage />,
    category: 'Inputs',
  },

  // Navigation
  {
    name: 'Accordion',
    path: '/accordion',
    element: <AccordionPage />,
    category: 'Navigation',
  },
  {
    name: 'ContextMenu',
    path: '/contextmenu',
    element: <ContextMenuPage />,
    category: 'Navigation',
  },
  {
    name: 'DropdownMenu',
    path: '/dropdownmenu',
    element: <DropdownMenuPage />,
    category: 'Navigation',
  },
  {
    name: 'Link',
    path: '/link',
    element: <LinkPage />,
    category: 'Navigation',
  },
  {
    name: 'Menubar',
    path: '/menubar',
    element: <MenubarPage />,
    category: 'Navigation',
  },
  {
    name: 'NavigationMenu',
    path: '/navigationmenu',
    element: <NavigationMenuPage />,
    category: 'Navigation',
  },
  {
    name: 'Pagination',
    path: '/pagination',
    element: <PaginationPage />,
    category: 'Navigation',
  },
  {
    name: 'Tabs',
    path: '/tabs',
    element: <TabsPage />,
    category: 'Navigation',
  },

  // Data Display
  {
    name: 'AttachmentGroup',
    path: '/attachment-group',
    element: <AttachmentGroupPage />,
    category: 'Data Display',
  },
  {
    name: 'Avatar',
    path: '/avatar',
    element: <AvatarPage />,
    category: 'Data Display',
  },
  {
    name: 'Badge',
    path: '/badge',
    element: <BadgePage />,
    category: 'Data Display',
  },
  {
    name: 'Carousel',
    path: '/carousel',
    element: <CarouselPage />,
    category: 'Data Display',
  },
  {
    name: 'Chart',
    path: '/chart',
    element: <ChartPage />,
    category: 'Data Display',
  },
  {
    name: 'Icon',
    path: '/icon',
    element: <IconPage />,
    category: 'Data Display',
  },
  {
    name: 'IconPicker',
    path: '/iconpicker',
    element: <IconPickerPage />,
    category: 'Data Display',
  },
  {
    name: 'Table',
    path: '/table',
    element: <TablePage />,
    category: 'Data Display',
  },
  {
    name: 'Title',
    path: '/title',
    element: <TitlePage />,
    category: 'Data Display',
  },
  {
    name: 'Tooltip',
    path: '/tooltip',
    element: <TooltipPage />,
    category: 'Data Display',
  },

  // Feedback
  {
    name: 'Alert',
    path: '/alert',
    element: <AlertPage />,
    category: 'Feedback',
  },
  {
    name: 'CookieConsent',
    path: '/cookieconsent',
    element: <CookieConsentPage />,
    category: 'Feedback',
  },
  {
    name: 'Loader',
    path: '/loader',
    element: <LoaderPage />,
    category: 'Feedback',
  },
  {
    name: 'Message',
    path: '/message',
    element: <MessagePage />,
    category: 'Feedback',
  },
  {
    name: 'ProgressBar',
    path: '/progress-bar',
    element: <ProgressBarPage />,
    category: 'Feedback',
  },
  {
    name: 'StatusIndicator',
    path: '/status-indicator',
    element: <StatusIndicatorPage />,
    category: 'Feedback',
  },
  {
    name: 'Toast',
    path: '/toast',
    element: <ToastPage />,
    category: 'Feedback',
  },

  // Utility
  // (Moving Icon and IconPicker to Data Display or Inputs? Data Display seems fine for Icon, IconPicker is Input really but lets iterate)
  // Actually IconPicker is an input. Moving to Inputs.
  // Re-evaluating...
  // Let's stick with the current assignments above, but move IconPicker to Inputs.

  // Experimental / Advanced
  {
    name: 'Chat',
    path: '/chat',
    element: <ChatInputDemo />,
    category: 'Experimental',
  },
  {
    name: 'ChatWidget',
    path: '/chat-widget',
    element: <ChatWidgetPage />,
    category: 'Experimental',
  },
  {
    name: 'Command',
    path: '/command',
    element: <CommandPage />,
    category: 'Experimental',
  },
  {
    name: 'Drag and Drop',
    path: '/dragAndDrop',
    element: <DragAndDropPage />,
    category: 'Experimental',
  },
  {
    name: 'DropZone',
    path: '/dropzone',
    element: <DropZonePage />,
    category: 'Experimental',
  },
  {
    name: 'EditComponent',
    path: '/edit-component',
    element: <EditComponentPage />,
    category: 'Experimental',
  },
  {
    name: 'Gradient',
    path: '/gradient',
    element: <GradientPage />,
    category: 'Experimental',
  },

  // Hidden/Others
  { name: 'Home', path: '/home', element: <HomePage />, category: 'Hidden' },
];

// Fixing IconPicker category since it wasn't in the list above
const iconPickerIndex = componentList.findIndex((c) => c.name === 'IconPicker');
if (iconPickerIndex >= 0) {
  componentList[iconPickerIndex].category = 'Inputs';
}
