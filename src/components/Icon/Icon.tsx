import { View, ViewProps } from 'app-studio';
import React from 'react';
import { Center } from '../Layout/Center/Center';

// Base icon interface
interface IconProps extends Omit<ViewProps, 'size'> {
  size?: number;
  color?: string;
}

// Default wrapper component for consistent sizing
const IconWrapper: React.FC<IconProps> = ({
  size,
  color = 'black',
  transform,
  orientation,
  children,
}) => (
  <Center
    size={size}
    lineHeight={size}
    color={color}
    display="flex"
    transform={
      transform
        ? transform
        : orientation == 'left'
        ? 'rotate(-90deg)'
        : orientation == 'right'
        ? 'rotate(90deg)'
        : orientation == 'up'
        ? 'rotate(0deg)'
        : orientation == 'down'
        ? 'rotate(180deg)'
        : 'none'
    }
  >
    {children}
  </Center>
);

export const ChevronIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.771 7.115a.829.829 0 0 0-1.2 0L3 15.686l1.2 1.2 7.971-7.971 7.972 7.971 1.2-1.2-8.572-8.571Z" />
    </svg>
  </IconWrapper>
);

export const CheckIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path
        d="M17.0001 9L10 16L7 13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </IconWrapper>
);

export const CloseIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
    </svg>
  </IconWrapper>
);

export const CloseEyeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={color} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

export const DustBinIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
  </IconWrapper>
);

export const EditIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132" />
    </svg>
  </IconWrapper>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M14 3h7v7h-2V5.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h5v2H6v11h11v-4h2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  </IconWrapper>
);

export const MinusIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper padding={2} size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="2"
    >
      <path d="M7 12h10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrapper>
);

export const InfoIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  </IconWrapper>
);

export const OpenEyeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
    </svg>
  </IconWrapper>
);

export const PlusIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </svg>
  </IconWrapper>
);
export const SpinnerIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="2"
        opacity="0.3"
      />
      <path
        d="M22 12a10 10 0 1 1-4.93-8.62"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </IconWrapper>
);

export const ProfileIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path
        fill="currentColor"
        d="M12 13c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4zm0-9c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
      />
    </svg>
  </IconWrapper>
);

export const ArrowIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M12 4l7 7h-4v7h-6v-7H5l7-7z" />
    </svg>
  </IconWrapper>
);

export const SearchIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  </IconWrapper>
);

export const SuccessIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </IconWrapper>
);

export const TickIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="2"
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrapper>
);

export const NotificationIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
    </svg>
  </IconWrapper>
);

export const SettingsIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M19.4 13c0-.3.1-.6.1-1s0-.7-.1-1l2.1-1.6c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-.9l-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.2 0-.5.2-.5.4l-.4 2.6c-.6.2-1.2.5-1.7.9l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.4.1.6L4.6 11c0 .3-.1.6-.1 1s0 .7.1 1l-2.1 1.6c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7.9l.4 2.6c0 .2.3.4.5.4h4c.2 0 .5-.2.5-.4l.4-2.6c.6-.2 1.2-.5 1.7-.9l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.4-.1-.6L19.4 13zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
    </svg>
  </IconWrapper>
);

export const CalendarIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M19 4h-1V3c0-.55-.45-1-1-1s-1 .45-1 1v1H8V3c0-.55-.45-1-1-1s-1 .45-1 1v1H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
    </svg>
  </IconWrapper>
);

export const AddIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.286 11.143h-9.429V1.715h-1.714v9.428H1.714v1.715h9.429v9.428h1.714v-9.428h9.429v-1.715Z" />
    </svg>
  </IconWrapper>
);

export const DownloadIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </svg>
  </IconWrapper>
);

export const UploadIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z" />
    </svg>
  </IconWrapper>
);

export const BookmarkIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
    </svg>
  </IconWrapper>
);

export const HomeIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" />
    </svg>
  </IconWrapper>
);

export const MenuIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
  </IconWrapper>
);

export const ShareIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
    </svg>
  </IconWrapper>
);

export const FilterIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" />
    </svg>
  </IconWrapper>
);

export const RefreshIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
    </svg>
  </IconWrapper>
);

export const CopyIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
    </svg>
  </IconWrapper>
);

export const SaveIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z" />
    </svg>
  </IconWrapper>
);

export const PrintIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z" />
    </svg>
  </IconWrapper>
);

export const LockIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
    </svg>
  </IconWrapper>
);

// Previous icons remain the same...

export const UnlockIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
    </svg>
  </IconWrapper>
);

export const StarIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  </IconWrapper>
);

export const HeartIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  </IconWrapper>
);

export const ThumbUpIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  </IconWrapper>
);

export const ThumbDownIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z" />
    </svg>
  </IconWrapper>
);

export const LocationIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
    </svg>
  </IconWrapper>
);

export const ClockIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
    </svg>
  </IconWrapper>
);

export const CameraIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M9 3L7.17 5H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2h-3.17L15 3H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
      <path d="M12 17c1.65 0 3-1.35 3-3s-1.35-3-3-3-3 1.35-3 3 1.35 3 3 3z" />
    </svg>
  </IconWrapper>
);

export const MicrophoneIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
      <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
    </svg>
  </IconWrapper>
);

export const WifiIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
    </svg>
  </IconWrapper>
);

export const BluetoothIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 24 24" fill={'currentColor'}>
      <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
    </svg>
  </IconWrapper>
);

export const BatteryIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
    </svg>
  </IconWrapper>
);

// More modern UI icons
export const SunIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  </IconWrapper>
);

export const MoonIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  </IconWrapper>
);

export const ErrorIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'white',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg viewBox="0 0 510 510">
      <path d="M255,0C114.615,0,0,114.615,0,255s114.615,255,255,255s255-114.615,255-255S395.385,0,255,0z M255,459c-114.75,0-207-92.25-207-207c0-114.75,92.25-207,207-207c114.75,0,207,92.25,207,207C462,366.75,369.75,459,255,459z" />
      <path d="M255,140.25c11.05,0,20-8.95,20-20s-8.95-20-20-20s-20,8.95-20,20S243.95,140.25,255,140.25z" />
      <path d="M265,357c0,11.05-8.95,20-20,20s-20-8.95-20-20v-175c0-11.05,8.95-20,20-20s20,8.95,20,20V357z" />
    </svg>
  </IconWrapper>
);

export const WarningIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'white',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192.146 192.146"
      fill={'currentColor'}
    >
      <g id="SVGRepo_bgCarrier"></g>
      <g id="SVGRepo_tracerCarrier"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <g>
            <g>
              <path d="M108.186,144.372c0,7.054-4.729,12.32-12.037,12.32h-0.254c-7.054,0-11.92-5.266-11.92-12.32 c0-7.298,5.012-12.31,12.174-12.31C103.311,132.062,108.059,137.054,108.186,144.372z M88.44,125.301h15.447l2.951-61.298H85.46 L88.44,125.301z M190.372,177.034c-2.237,3.664-6.214,5.921-10.493,5.921H12.282c-4.426,0-8.51-2.384-10.698-6.233 c-2.159-3.849-2.11-8.549,0.147-12.349l84.111-149.22c2.208-3.722,6.204-5.96,10.522-5.96h0.332 c4.445,0.107,8.441,2.618,10.513,6.546l83.515,149.229C192.717,168.768,192.629,173.331,190.372,177.034z M179.879,170.634 L96.354,21.454L12.292,170.634H179.879z"></path>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </IconWrapper>
);

export const CloudIcon: React.FC<IconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <IconWrapper size={size} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={'currentColor'}
      strokeWidth="1"
    >
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
    </svg>
  </IconWrapper>
);
