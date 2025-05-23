/**
 * FileUploader Styles
 */

import { ViewProps } from 'app-studio';

export const containerStyles: ViewProps = {
  width: '100%',
};

export const dropzoneStyles = (isDragging: boolean): ViewProps => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 'lg',
  borderWidth: '2px',
  borderStyle: 'dashed',
  borderColor: isDragging ? 'theme.primary' : 'color.gray.300',
  borderRadius: 'md',
  backgroundColor: isDragging ? 'color.blue.50' : 'color.gray.50',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  _hover: {
    borderColor: 'theme.primary',
    backgroundColor: 'color.blue.50',
  },
});

export const fileListStyles: ViewProps = {
  marginTop: 'md',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: 'sm',
};

export const fileItemStyles: ViewProps = {
  display: 'flex',
  alignItems: 'center',
  padding: 'sm',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'color.gray.200',
  backgroundColor: 'color.white',
};

export const fileIconStyles = (fileType: string): ViewProps => {
  const getIconColor = () => {
    if (fileType.startsWith('image/')) return 'color.green.500';
    if (fileType.startsWith('video/')) return 'color.purple.500';
    if (fileType.startsWith('audio/')) return 'color.yellow.500';
    if (fileType.includes('pdf')) return 'color.red.500';
    if (fileType.includes('word') || fileType.includes('document'))
      return 'color.blue.500';
    if (fileType.includes('excel') || fileType.includes('sheet'))
      return 'color.green.600';
    return 'color.gray.500';
  };

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: 'md',
    backgroundColor: 'color.gray.100',
    color: getIconColor(),
    marginRight: 'sm',
  };
};

export const fileInfoStyles: ViewProps = {
  flex: 1,
  overflow: 'hidden',
};

export const fileNameStyles: ViewProps = {
  fontWeight: 'medium',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const fileSizeStyles: ViewProps = {
  fontSize: 'sm',
  color: 'color.gray.500',
};

export const fileActionsStyles: ViewProps = {
  display: 'flex',
  gap: 'xs',
};

export const progressBarContainerStyles: ViewProps = {
  width: '100%',
  height: '4px',
  backgroundColor: 'color.gray.200',
  borderRadius: 'full',
  marginTop: 'xs',
  overflow: 'hidden',
};

export const progressBarStyles = (progress: number): ViewProps => ({
  height: '100%',
  width: `${progress}%`,
  backgroundColor: 'theme.primary',
  transition: 'width 0.2s ease',
});
