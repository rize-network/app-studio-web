import { useTheme, ViewProps } from 'app-studio';
import React from 'react';
import { Center } from 'app-studio';

// Base icon interface with added transform and orientation
export interface IconProps extends ViewProps {
  color?: string;
  filled?: boolean;
  orientation?: 'left' | 'right' | 'up' | 'down';
}

// Default wrapper component for consistent sizing and styling
const IconWrapper: React.FC<IconProps> = ({
  widthHeight,
  color = 'black',
  transform,
  orientation = 'up',
  children,
  ...rest
}) => (
  <Center
    widthHeight={widthHeight}
    lineHeight={widthHeight}
    color={color}
    display="flex"
    transform={
      transform
        ? transform
        : orientation === 'left'
        ? 'rotate(-90deg)'
        : orientation === 'right'
        ? 'rotate(90deg)'
        : orientation === 'up'
        ? 'rotate(0deg)'
        : orientation === 'down'
        ? 'rotate(180deg)'
        : 'none'
    }
    {...rest}
  >
    {children}
  </Center>
);

// Utility function to handle fill and stroke based on 'filled' prop
const getSvgProps = (
  filled: boolean,
  color: string,
  strokeWidth: number | string
) => {
  const { getColor } = useTheme();
  return {
    fill: filled ? getColor(color) : 'none',
    stroke: filled ? 'none' : getColor(color),
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
};

export const UserIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? color : 'none'}
      stroke={filled ? 'none' : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  </IconWrapper>
);

export const HelpIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 1 1 5.91 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  </IconWrapper>
);

export const FolderIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="9" y1="17" x2="9" y2="17" />
      <line x1="15" y1="17" x2="15" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
      <line x1="12" y1="17" x2="12" y2="17" />
    </svg>
  </IconWrapper>
);

// Example Icon Component: ChevronIcon
export const ChevronIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M7.41 15.41L12 10.83L16.59 15.41L18 14L12 8L6 14L7.41 15.41Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

export const DragHandleIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <g>
        {/* First column */}
        <circle cx="9" cy="6" r="2" />
        <circle cx="9" cy="12" r="2" />
        <circle cx="9" cy="18" r="2" />

        {/* Second column */}
        <circle cx="15" cy="6" r="2" />
        <circle cx="15" cy="12" r="2" />
        <circle cx="15" cy="18" r="2" />
      </g>
    </svg>
  </IconWrapper>
);

export const FileIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill={filled ? color : 'none'}
      stroke={filled ? 'none' : color}
      strokeWidth={strokeWidth}
    >
      <path d="M6 2H14L20 8V20C20 21.1 19.1 22 18 22H6C4.9 22 4 21.1 4 20V4C4 2.9 4.9 2 6 2Z" />
      <path d="M14 2V8H20" />
    </svg>
  </IconWrapper>
);

// Video Icon Component
export const VideoIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        ry="2"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
      <polygon
        points="10 8 16 12 10 16 10 8"
        fill={filled ? (filled ? 'white' : color) : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
    </svg>
  </IconWrapper>
);

// Image Icon Component
export const ImageIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="2"
        ry="2"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        fill={filled ? (filled ? 'white' : color) : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
      <polyline
        points="21 15 16 10 5 21"
        fill="none"
        stroke={filled ? 'white' : color}
        strokeWidth={strokeWidth}
      />
    </svg>
  </IconWrapper>
);

export const TwitterIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M22.46 6.01c-.83.37-1.72.62-2.65.74a4.6 4.6 0 0 0 2.01-2.54 9.2 9.2 0 0 1-2.91 1.11 4.54 4.54 0 0 0-7.75 4.14A12.86 12.86 0 0 1 3.15 4.47a4.54 4.54 0 0 0 1.4 6.06 4.5 4.5 0 0 1-2.06-.57v.06a4.54 4.54 0 0 0 3.64 4.45 4.61 4.61 0 0 1-2.05.08 4.54 4.54 0 0 0 4.23 3.15 9.12 9.12 0 0 1-5.64 1.94c-.37 0-.74-.02-1.1-.07A12.86 12.86 0 0 0 8.21 21c8.38 0 12.96-6.94 12.96-12.96 0-.2 0-.4-.01-.6a9.28 9.28 0 0 0 2.3-2.37z"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
    </svg>
  </IconWrapper>
);

export const XIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </svg>
  </IconWrapper>
);

// Example of a Twitch Icon
export const TwitchIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M2 2v16h5v4l4-4h5l6-6V2H2zm18 10-3 3h-5l-3 3v-3H4V4h16v8z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
      <path
        d="M14 7h2v5h-2V7zm-4 0h2v5H10V7z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
    </svg>
  </IconWrapper>
);

// Example of another Icon: CloseIcon
export const CloseIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 2,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line stroke={color} x1="18" y1="6" x2="6" y2="18" />
      <line stroke={color} x1="6" y1="6" x2="18" y2="18" />
    </svg>
  </IconWrapper>
);

export const InstagramIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  </IconWrapper>
);

export const YoutubeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      {/* YouTube Play Button Background */}
      <path
        d="M21.8 8.001A2.8 2.8 0 0 0 19 5.2C17.793 5 12 5 12 5s-5.793 0-7 0.2a2.8 2.8 0 0 0-2.8 2.8c-0.2 1.207-0.2 3-0.2 3s0 1.793 0.2 3a2.8 2.8 0 0 0 2.8 2.8c1.207 0.2 7 0.2 7 0.2s5.793 0 7-0.2a2.8 2.8 0 0 0 2.8-2.8c0.2-1.207 0.2-3 0.2-3s0-1.793-0.2-3z"
        fill={filled ? color : 'none'}
        stroke={filled ? 'none' : color}
        strokeWidth={filled ? 0 : strokeWidth}
      />

      <polygon
        points="10 8 10 14 14 10"
        fill="white" // Ensures the play button is transparent
        stroke={'white'}
        strokeWidth={strokeWidth}
      />
    </svg>
  </IconWrapper>
);

export const FacebookIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M22 2H2v20h10v-7h-2v-3h2V9.5a4 4 0 0 1 4-4h3v3h-3a1 1 0 0 0-1 1V12h4l-1 3h-3v7h6V2z"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={filled ? 0 : strokeWidth}
      />
    </svg>
  </IconWrapper>
);

export const LinkedinIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg viewBox="0 0 24 24" {...getSvgProps(filled, color, strokeWidth)}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  </IconWrapper>
);

export const ThreadsIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg viewBox="0 0 24 24" {...getSvgProps(filled, color, strokeWidth)}>
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M19 7.5c-1.333 -3 -3.667 -4.5 -7 -4.5c-5 0 -8 2.5 -8 9s3.5 9 8 9s7 -3 7
                                    -5s-1 -5 -7 -5c-2.5 0 -3 1.25 -3 2.5c0 1.5 1 2.5 2.5 2.5c2.5 0 3.5 -1.5
                                    3.5 -5s-2 -4 -3 -4s-1.833 .333 -2.5 1"
      ></path>
    </svg>
  </IconWrapper>
);
// Example Refactored Icon: MinusIcon without undefined 'padding' prop
export const MinusIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false, // Assuming minus can be filled; adjust as needed
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line stroke={color} x1="8" y1="12" x2="16" y2="12" />
    </svg>
  </IconWrapper>
);

// Example Refactored Icon: InfoIcon with accessibility enhancements
export const InfoIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper
    widthHeight={widthHeight}
    color={color}
    {...props}
    aria-label="Information"
  >
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  </IconWrapper>
);

export const PlayIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M8 5v14l11-7z"></path>
    </svg>
  </IconWrapper>
);

export const PauseIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"></path>
    </svg>
  </IconWrapper>
);

export const HeartIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M20.84 4.61c-1.54-1.56-4.04-1.56-5.59 0l-.7.72-.7-.72a3.95 3.95 0 0 0-5.59 0c-1.56 1.56-1.56 4.09 0 5.66l6.29 6.36 6.29-6.36c1.56-1.56 1.56-4.09 0-5.66z"></path>
    </svg>
  </IconWrapper>
);

export const StarIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
    </svg>
  </IconWrapper>
);

export const SaveIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
      <polyline points="17 21 17 13 7 13 7 21"></polyline>
      <polyline points="7 3 7 8 15 8"></polyline>
    </svg>
  </IconWrapper>
);

export const WarningIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M10.29 3.86l-6.6 11.4c-.78 1.36.2 3.1 1.71 3.1h13.2c1.51 0 2.49-1.74 1.71-3.1l-6.6-11.4a2 2 0 0 0-3.42 0z"></path>
      <line stroke={color} x1="12" y1="6" x2="12" y2="13"></line>
      <line stroke={color} x1="12" y1="15" x2="12" y2="15"></line>
    </svg>
  </IconWrapper>
);

export const BatteryIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"></path>
    </svg>
  </IconWrapper>
);

export const BookmarkIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"></path>
    </svg>
  </IconWrapper>
);

export const CloudIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"></path>
    </svg>
  </IconWrapper>
);

export const CopyIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  </IconWrapper>
);

export const DustBinIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
    </svg>
  </IconWrapper>
);

export const DeleteIcon = DustBinIcon;

export const EditIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M18.3785 8.44975L8.9636 17.8648C8.6844 18.144 8.3288 18.3343 7.94161 18.4117L4.99988 19.0001L5.58823 16.0583C5.66566 15.6711 5.85597 15.3155 6.13517 15.0363L15.5501 5.62132M18.3785 8.44975L19.7927 7.03553C20.1832 6.64501 20.1832 6.01184 19.7927 5.62132L18.3785 4.20711C17.988 3.81658 17.3548 3.81658 16.9643 4.20711L15.5501 5.62132M18.3785 8.44975L15.5501 5.62132"></path>
    </svg>
  </IconWrapper>
);

export const ErrorIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = true,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line
        x1="15"
        y1="9"
        x2="9"
        y2="15"
        stroke={filled ? 'white' : color}
      ></line>
      <line
        x1="9"
        y1="9"
        x2="15"
        y2="15"
        stroke={filled ? 'white' : color}
      ></line>
    </svg>
  </IconWrapper>
);

export const DownloadIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"></path>
    </svg>
  </IconWrapper>
);

export const MenuIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line stroke={color} x1="3" y1="12" x2="21" y2="12"></line>
      <line stroke={color} x1="3" y1="6" x2="21" y2="6"></line>
      <line stroke={color} x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  </IconWrapper>
);

export const ShareIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="18" cy="5" r="3"></circle>
      <circle cx="6" cy="12" r="3"></circle>
      <circle cx="18" cy="19" r="3"></circle>
      <line stroke={color} x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
      <line stroke={color} x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
    </svg>
  </IconWrapper>
);

export const RefreshIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <polyline points="23 4 23 10 17 10"></polyline>
      <path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"></path>
    </svg>
  </IconWrapper>
);

export const PrintIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
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

export const MagicWandIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = true,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      {/* Main wand - thicker and better positioned */}
      <rect
        x="-3"
        y="17"
        width="15"
        height="4"
        rx="1"
        transform="rotate(-40 2 13)"
      />

      {/* Star 1 - larger top right */}
      <path d="M17 3L18 6L21 7L18 8L17 11L16 8L13 7L16 6L17 3Z" />

      {/* Star 2 - middle size middle right */}
      <path d="M21 9L21.7 11L23.5 12L21.7 13L21 15L20.3 13L18.5 12L20.3 11L21 9Z" />

      {/* Star 3 - smaller bottom right */}
      <path d="M16 15L16.7 16.5L18 17L16.7 17.5L16 19L15.3 17.5L14 17L15.3 16.5L16 15Z" />
    </svg>
  </IconWrapper>
);
export const PanelIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M9 3v18" />
    </svg>
  </IconWrapper>
);
export const FilterIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M3 4h18l-7 10v5l-4 2v-7L3 4z"></path>
    </svg>
  </IconWrapper>
);

export const HomeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"></path>
    </svg>
  </IconWrapper>
);

export const LocationIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path>
    </svg>
  </IconWrapper>
);

export const LockIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      {filled ? (
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
      ) : (
        <>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          <circle cx="12" cy="16" r="1.5"></circle>
        </>
      )}
    </svg>
  </IconWrapper>
);

export const MicrophoneIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 1a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V5a4 4 0 0 0-4-4z"></path>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
      <line stroke={color} x1="12" y1="19" x2="12" y2="23"></line>
      <line stroke={color} x1="8" y1="23" x2="16" y2="23"></line>
    </svg>
  </IconWrapper>
);

export const MoonIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
    </svg>
  </IconWrapper>
);

export const NotificationIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  </IconWrapper>
);

export const OpenEyeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 4C7 4 2.73 7.11 1 12c1.73 4.89 6 8 11 8s9.27-3.11 11-8c-1.73-4.89-6-8-11-8zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
    </svg>
  </IconWrapper>
);

export const ProfileIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        fill={filled ? color : 'none'}
        d="M12 13c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4zm0-9c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z M12 2C9.79 2 8 3.79 8 6s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z M12 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
      />{' '}
    </svg>
  </IconWrapper>
);

export const SettingsIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M19.4 13c0-.3.1-.6.1-1s0-.7-.1-1l2.1-1.6c.2-.2.2-.4.1-.6l-2-3.5c-.1-.2-.4-.3-.6-.2l-2.5 1c-.5-.4-1.1-.7-1.7-.9l-.4-2.6c0-.2-.3-.4-.5-.4h-4c-.2 0-.5.2-.5.4l-.4 2.6c-.6.2-1.2.5-1.7.9l-2.5-1c-.2-.1-.5 0-.6.2l-2 3.5c-.1.2-.1.4.1.6L4.6 11c0 .3-.1.6-.1 1s0 .7.1 1l-2.1 1.6c-.2.2-.2.4-.1.6l2 3.5c.1.2.4.3.6.2l2.5-1c.5.4 1.1.7 1.7.9l.4 2.6c0 .2.3.4.5.4h4c.2 0 .5-.2.5-.4l.4-2.6c.6-.2 1.2-.5 1.7-.9l2.5 1c.2.1.5 0 .6-.2l2-3.5c.1-.2.1-.4-.1-.6L19.4 13zM12 15.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"></path>
    </svg>
  </IconWrapper>
);

export const SuccessIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path>
    </svg>
  </IconWrapper>
);

export const UnLikeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v2c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"></path>
    </svg>
  </IconWrapper>
);

export const ClockIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  </IconWrapper>
);

export const CameraIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3l2-3h8l2 3h3a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  </IconWrapper>
);

export const BluetoothIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M17.71 7.71L12 2h-1v7.59L6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 11 14.41V22h1l5.71-5.71-4.3-4.29 4.3-4.29zM13 5.83l1.88 1.88L13 9.59V5.83zm1.88 10.46L13 18.17v-3.76l1.88 1.88z" />
    </svg>
  </IconWrapper>
);

export const LikeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"></path>
    </svg>
  </IconWrapper>
);

export const UnlockIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      {filled ? (
        <path d="M12 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm6-9h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h1.9c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z" />
      ) : (
        <>
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
          <circle cx="12" cy="16" r="1.5"></circle>
        </>
      )}
    </svg>
  </IconWrapper>
);

export const WifiIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"></path>
    </svg>
  </IconWrapper>
);

export const UploadIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1"></path>
      <path d="M9 15l3 -3l3 3"></path>
      <path d="M12 12l0 9"></path>
    </svg>
  </IconWrapper>
);

export const SearchIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,

  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  </IconWrapper>
);

// Stop Icon (rectangle) for stopping agent
export const StopIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 2,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    </svg>
  </IconWrapper>
);

// Send Icon (paper airplane) for chat submit
export const SendIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 2,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  </IconWrapper>
);

// Loading Spinner Icon for agent running indicator
export const LoadingSpinnerIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 2,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
  </IconWrapper>
);

// Horizontal lines drag handle icon for Tree component
export const DragHandleLinesIcon: React.FC<IconProps> = ({
  widthHeight = 16,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1.5,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M4 6H12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d="M4 10H12"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  </IconWrapper>
);

export const CloseEyeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        d="M19.7071 5.70711C20.0976 5.31658 20.0976 4.68342 19.7071 4.29289C19.3166 3.90237 18.6834 3.90237 18.2929 4.29289L14.032 8.55382C13.4365 8.20193 12.7418 8 12 8C9.79086 8 8 9.79086 8 12C8 12.7418 8.20193 13.4365 8.55382 14.032L4.29289 18.2929C3.90237 18.6834 3.90237 19.3166 4.29289 19.7071C4.68342 20.0976 5.31658 20.0976 5.70711 19.7071L9.96803 15.4462C10.5635 15.7981 11.2582 16 12 16C14.2091 16 16 14.2091 16 12C16 11.2582 15.7981 10.5635 15.4462 9.96803L19.7071 5.70711ZM12.518 10.0677C12.3528 10.0236 12.1792 10 12 10C10.8954 10 10 10.8954 10 12C10 12.1792 10.0236 12.3528 10.0677 12.518L12.518 10.0677ZM11.482 13.9323L13.9323 11.482C13.9764 11.6472 14 11.8208 14 12C14 13.1046 13.1046 14 12 14C11.8208 14 11.6472 13.9764 11.482 13.9323ZM15.7651 4.8207C14.6287 4.32049 13.3675 4 12 4C9.14754 4 6.75717 5.39462 4.99812 6.90595C3.23268 8.42276 2.00757 10.1376 1.46387 10.9698C1.05306 11.5985 1.05306 12.4015 1.46387 13.0302C1.92276 13.7326 2.86706 15.0637 4.21194 16.3739L5.62626 14.9596C4.4555 13.8229 3.61144 12.6531 3.18002 12C3.6904 11.2274 4.77832 9.73158 6.30147 8.42294C7.87402 7.07185 9.81574 6 12 6C12.7719 6 13.5135 6.13385 14.2193 6.36658L15.7651 4.8207ZM12 18C11.2282 18 10.4866 17.8661 9.78083 17.6334L8.23496 19.1793C9.37136 19.6795 10.6326 20 12 20C14.8525 20 17.2429 18.6054 19.002 17.0941C20.7674 15.5772 21.9925 13.8624 22.5362 13.0302C22.947 12.4015 22.947 11.5985 22.5362 10.9698C22.0773 10.2674 21.133 8.93627 19.7881 7.62611L18.3738 9.04043C19.5446 10.1771 20.3887 11.3469 20.8201 12C20.3097 12.7726 19.2218 14.2684 17.6986 15.5771C16.1261 16.9282 14.1843 18 12 18Z"
        fill="currentColor"
      />
    </svg>
  </IconWrapper>
);

export const TrashIcon = DeleteIcon;

export const AttachmentIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      width={widthHeight}
      height={widthHeight}
      viewBox="0 0 24 24"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path
        // fillRule="evenodd"
        // clipRule="evenodd"
        d="M3.70104 5.15932C3.0938 3.61775 3.85122 1.8758 5.39278 1.26856L5.56558 1.2005C7.10714 0.593259 8.84909 1.35068 9.45633 2.89225L13.071 12.0685C13.4252 12.9677 12.9833 13.9839 12.0841 14.3381L11.9977 14.3721C11.0985 14.7264 10.0823 14.2845 9.72809 13.3853L7.81051 8.5172C7.7093 8.26027 7.83554 7.96995 8.09247 7.86874C8.34939 7.76753 8.63972 7.89377 8.74092 8.1507L10.6585 13.0188C10.8103 13.4042 11.2458 13.5935 11.6312 13.4417L11.7176 13.4077C12.103 13.2559 12.2923 12.8204 12.1405 12.435L8.52592 3.25875C8.12109 2.23104 6.95979 1.72609 5.93208 2.13092L5.75929 2.19898C4.73158 2.60381 4.22663 3.76511 4.63145 4.79282L8.99282 15.8648C9.65066 17.5348 11.5378 18.3554 13.2078 17.6975L13.467 17.5954C15.137 16.9376 15.9576 15.0505 15.2997 13.3804L12.6354 6.61663C12.5342 6.3597 12.6604 6.06938 12.9173 5.96817C13.1743 5.86696 13.4646 5.9932 13.5658 6.25013L16.2301 13.0139C17.0904 15.1978 16.0174 17.6656 13.8335 18.5258L13.5743 18.6279C11.3904 19.4882 8.92266 18.4152 8.0624 16.2313L3.70104 5.15932Z"
      ></path>{' '}
    </svg>
  </IconWrapper>
);

export const ExternalLinkIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(true, color, strokeWidth)}
    >
      <path d="M14 3h7v7h-2V5.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h5v2H6v11h11v-4h2v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />
    </svg>
  </IconWrapper>
);

export const PlusIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line stroke={color} x1="12" y1="5" x2="12" y2="19" />
      <line stroke={color} x1="5" y1="12" x2="19" y2="12" />
    </svg>
  </IconWrapper>
);

export const TickIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </IconWrapper>
);

export const BoldArrowIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = true,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 4l7 7h-4v7h-6v-7H5l7-7z" />
    </svg>
  </IconWrapper>
);

export const ArrowIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line stroke={color} x1="12" y1="20" x2="12" y2="8"></line>
      <polyline points="6 12 12 6 18 12"></polyline>
    </svg>
  </IconWrapper>
);

export const SpinnerIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.25"></circle>
      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"></path>
    </svg>
  </IconWrapper>
);

export const CalendarIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line stroke={color} x1="16" y1="2" x2="16" y2="6"></line>
      <line stroke={color} x1="8" y1="2" x2="8" y2="6"></line>
      <line stroke={color} x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  </IconWrapper>
);
export const SliderIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line x1="3" y1="4" x2="10" y2="4" />
      <line x1="14" y1="4" x2="21" y2="4" />
      <line x1="3" y1="12" x2="12" y2="12" />
      <line x1="16" y1="12" x2="21" y2="12" />
      <line x1="10" y1="1" x2="10" y2="7" />
      <line x1="16" y1="9" x2="16" y2="15" />
    </svg>
  </IconWrapper>
);

export const CropIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M6 2v14a2 2 0 0 0 2 2h14" />
      <path d="M18 22V8a2 2 0 0 0-2-2H2" />
    </svg>
  </IconWrapper>
);

export const ZoomInIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  </IconWrapper>
);

export const ZoomOutIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  </IconWrapper>
);

export const TextIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="12" y1="6" x2="12" y2="18" />
      <line x1="8" y1="18" x2="16" y2="18" />
    </svg>
  </IconWrapper>
);

export const ShapeIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="4" y="8" width="8" height="8" />
      <circle cx="16" cy="16" r="4" />
      <polygon points="16,4 19,8 13,8" />
    </svg>
  </IconWrapper>
);

export const RotateIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
    </svg>
  </IconWrapper>
);

export const DocumentIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  </IconWrapper>
);

export const ChartIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />

      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="10 9 9 9 8 9" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
      <polyline points="10 9 9 9 8 9" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  </IconWrapper>
);
export const GiftIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M12 8V21" />
      <path d="M3 12v6a3 3 0 0 0 3 3h3V12" />
      <path d="M18 21h-3v-9h6v6a3 3 0 0 1-3 3z" />
      <path d="M12 8c-.5-2.5-4-3-5-1.5S9 10 12 8z" />
      <path d="M12 8c.5-2.5 4-3 5-1.5S15 10 12 8z" />
    </svg>
  </IconWrapper>
);

export const ShieldIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = true,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  </IconWrapper>
);

export const CheckIcon = TickIcon;

export const LogoutIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
      <path d="M13 5v-2a1 1 0 0 0-1-1H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h7a1 1 0 0 0 1-1v-2" />
    </svg>
  </IconWrapper>
);
export const PowerOffIcon: React.FC<IconProps> = ({
  widthHeight = 24,
  color = 'currentColor',
  strokeWidth = 1.5,
  filled = false,
  ...props
}) => (
  <IconWrapper widthHeight={widthHeight} color={color} {...props}>
    <svg
      viewBox="0 0 24 24"
      aria-hidden="false"
      focusable="false"
      {...getSvgProps(filled, color, strokeWidth)}
    >
      <line x1="12" y1="2" x2="12" y2="8" />
      <path d="M6.8 6.8a8 8 0 1 0 10 0" />
    </svg>
  </IconWrapper>
);
