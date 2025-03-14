import React, { lazy } from 'react';
import DragAndDropPage from 'src/pages/dragAndDrop.page';
import UploadPage from 'src/pages/upload.page';
// Lazy-loaded imports
const AlertPage = lazy(() => import('src/pages/alert.page'));
const AspectRatioPage = lazy(() => import('src/pages/aspectRatio.page'));
const AvatarPage = lazy(() => import('src/pages/avatar.page'));
const BadgePage = lazy(() => import('src/pages/badge.page'));
const ButtonPage = lazy(() => import('src/pages/button.page'));
const CenterPage = lazy(() => import('src/pages/center.page'));
const CheckboxPage = lazy(() => import('src/pages/checkbox.page'));
const ComboBoxPage = lazy(() => import('src/pages/comboBox.page'));
const CountryPickerPage = lazy(() => import('src/pages/countryPicker.page'));
const DatePickerPage = lazy(() => import('src/pages/datePicker.page'));
const FormikPage = lazy(() => import('src/pages/formik.page'));
const HomePage = lazy(() => import('src/pages/home.page'));
const HorizontalPage = lazy(() => import('src/pages/horizontal.page'));
const LinkPage = lazy(() => import('src/pages/link.page'));
const LoaderPage = lazy(() => import('src/pages/loader.page'));
const IconPage = lazy(() => import('src/pages/icon.page'));
const MessagePage = lazy(() => import('src/pages/message.page'));
const ModalPage = lazy(() => import('src/pages/modal.page'));
const PasswordPage = lazy(() => import('src/pages/password.page'));
const SelectPage = lazy(() => import('src/pages/select.page'));
const SwitchPage = lazy(() => import('src/pages/switch.page'));
const TablePage = lazy(() => import('src/pages/table.page'));
const TabsPage = lazy(() => import('src/pages/tabs.page'));
const TextPage = lazy(() => import('src/pages/text.page'));
const TextAreaPage = lazy(() => import('src/pages/textArea.page'));
const TextfieldPage = lazy(() => import('src/pages/textfield.page'));
const TogglePage = lazy(() => import('src/pages/toggle.page'));
const ToggleGroupPage = lazy(() => import('src/pages/toggleGroup.page'));
const VerticalPage = lazy(() => import('src/pages/vertical.page'));

export const componentList = [
  { name: 'Alert', path: '/alert', element: <AlertPage /> },
  { name: 'AspectRatio', path: '/aspectratio', element: <AspectRatioPage /> },
  { name: 'Avatar', path: '/avatar', element: <AvatarPage /> },
  { name: 'Badge', path: '/badge', element: <BadgePage /> },
  { name: 'Button', path: '/button', element: <ButtonPage /> },
  { name: 'Center', path: '/center', element: <CenterPage /> },
  { name: 'Checkbox', path: '/checkbox', element: <CheckboxPage /> },
  { name: 'ComboBox', path: '/combobox', element: <ComboBoxPage /> },
  {
    name: 'CountryPicker',
    path: '/countrypicker',
    element: <CountryPickerPage />,
  },
  { name: 'DatePicker', path: '/datepicker', element: <DatePickerPage /> },
  { name: 'Formik', path: '/formik', element: <FormikPage /> },
  { name: 'Home', path: '/home', element: <HomePage /> },
  { name: 'Horizontal', path: '/horizontal', element: <HorizontalPage /> },
  { name: 'Link', path: '/link', element: <LinkPage /> },
  { name: 'Loader', path: '/loader', element: <LoaderPage /> },
  { name: 'Icon', path: '/icon', element: <IconPage /> },
  { name: 'Drag and Drop', path: '/dragAndDrop', element: <DragAndDropPage /> },

  { name: 'Message', path: '/message', element: <MessagePage /> },
  { name: 'Modal', path: '/modal', element: <ModalPage /> },
  { name: 'Password', path: '/password', element: <PasswordPage /> },
  { name: 'Select', path: '/select', element: <SelectPage /> },
  { name: 'Switch', path: '/switch', element: <SwitchPage /> },
  { name: 'Table', path: '/table', element: <TablePage /> },
  { name: 'Tabs', path: '/tabs', element: <TabsPage /> },
  { name: 'Text', path: '/text', element: <TextPage /> },
  { name: 'TextArea', path: '/textarea', element: <TextAreaPage /> },
  { name: 'Textfield', path: '/textfield', element: <TextfieldPage /> },
  { name: 'Toggle', path: '/toggle', element: <TogglePage /> },
  { name: 'ToggleGroup', path: '/togglegroup', element: <ToggleGroupPage /> },
  { name: 'Vertical', path: '/vertical', element: <VerticalPage /> },
  { name: 'Upload', path: '/upload', element: <UploadPage /> },
];
