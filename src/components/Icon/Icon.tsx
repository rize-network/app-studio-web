import { useTheme, ViewProps, Center } from 'app-studio';
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

// Type for valid Lucide icon names with autocomplete support
export type IconName = keyof typeof dynamicIconImports;

// Base icon interface with added transform and orientation
export interface IconProps extends Omit<ViewProps, 'orientation'> {
  color?: string;
  filled?: boolean;
  orientation?: 'left' | 'right' | 'up' | 'down';
  name?: IconName;
  strokeWidth?: number | string;
  size?: number | string;
  fallback?: React.ReactNode;
}

// Default wrapper component for consistent sizing and styling
const IconWrapper: React.FC<IconProps> = ({
  widthHeight,
  color = 'currentColor',
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
  const themeColor = getColor(color);
  return {
    fill: filled ? themeColor : 'none',
    stroke: themeColor,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
};

export const Icon: React.FC<IconProps> = ({
  name = 'circle',
  widthHeight = 24,
  color = 'currentColor',
  filled = false,
  strokeWidth = 1,
  size,
  children,
  fallback,
  ...props
}) => {
  // Use size if provided, otherwise fallback to widthHeight (numeric part if possible)
  const iconSize = size || widthHeight;

  if (!name) {
    return (
      <IconWrapper widthHeight={widthHeight} color={color} {...props}>
        {children}
      </IconWrapper>
    );
  }

  // Normalize icon name (convert to kebab-case if needed)
  const iconName = name
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .toLowerCase();

  // Check if icon exists in dynamic imports
  if (!(iconName in dynamicIconImports)) {
    return (
      <IconWrapper widthHeight={iconSize} color={color} {...props}>
        {fallback || children}
      </IconWrapper>
    );
  }

  const LucideIcon = lazy(
    dynamicIconImports[iconName as keyof typeof dynamicIconImports]
  );
  const svgProps = getSvgProps(filled, color, strokeWidth);

  return (
    <IconWrapper widthHeight={iconSize} color={color} {...props}>
      <Suspense fallback={fallback || null}>
        <LucideIcon size={iconSize} {...svgProps} />
      </Suspense>
    </IconWrapper>
  );
};

// Re-export specific icons for backward compatibility mapping to Lucide names
// We use 'Icon' component with 'name' prop.

const createIcon = (name: IconName, defaultProps: Partial<IconProps> = {}) => {
  const IconComponent = (props: IconProps) => (
    <Icon name={name} {...defaultProps} {...props} />
  );
  IconComponent.displayName = `${name}Icon`;
  return IconComponent;
};

export const UserIcon = createIcon('user', { filled: false });
export const HelpIcon = createIcon('circle-help', { filled: false });
export const FolderIcon = createIcon('folder', { filled: false });
export const ChevronIcon = createIcon('chevron-up', { filled: false });
export const DragHandleIcon = createIcon('grip-vertical', { filled: false });
export const FileIcon = createIcon('file', { filled: false });
export const VideoIcon = createIcon('video', { filled: false });
export const ImageIcon = createIcon('image', { filled: false });
export const AudioIcon = createIcon('volume', { filled: false });
export const TwitterIcon = createIcon('twitter', { filled: false });
export const XIcon = createIcon('x', { filled: false });
export const TwitchIcon = createIcon('twitch', { filled: false });
export const CloseIcon = createIcon('x', { filled: false, strokeWidth: 2 });
export const InstagramIcon = createIcon('instagram', { filled: false });
export const YoutubeIcon = createIcon('youtube', { filled: false });
export const FacebookIcon = createIcon('facebook', { filled: false });
export const LinkedinIcon = createIcon('linkedin', { filled: false });
export const ThreadsIcon = createIcon('at-sign', { filled: false }); // Fallback
export const MinusIcon = createIcon('minus', { filled: false });
export const InfoIcon = createIcon('info', { filled: false });
export const PlayIcon = createIcon('play', { filled: false });
export const PauseIcon = createIcon('pause', { filled: false });
export const HeartIcon = createIcon('heart', { filled: false });
export const StarIcon = createIcon('star', { filled: false });
export const SaveIcon = createIcon('save', { filled: false });
export const WarningIcon = createIcon('triangle-alert', { filled: false });
export const BatteryIcon = createIcon('battery', { filled: false });
export const BookmarkIcon = createIcon('bookmark', { filled: false });
export const CloudIcon = createIcon('cloud', { filled: false });
export const CopyIcon = createIcon('copy', { filled: false });
export const DustBinIcon = createIcon('trash', { filled: false });
export const DeleteIcon = DustBinIcon;
export const EditIcon = createIcon('edit', { filled: false });
export const MicrophoneIcon = createIcon('mic', { filled: false });
export const StopIcon = createIcon('square', { filled: false });
export const SendIcon = createIcon('send', { filled: false });
export const LoadingSpinnerIcon = createIcon('loader', { filled: false }); // Note: usage might require animation class
export const AttachmentIcon = createIcon('paperclip', { filled: false });
export const SearchIcon = createIcon('search', { filled: false });
export const HomeIcon = createIcon('home', { filled: false });
export const SettingsIcon = createIcon('settings', { filled: false });
export const DownloadIcon = createIcon('download', { filled: false });
export const ShareIcon = createIcon('share', { filled: false });
export const TickIcon = createIcon('check', { filled: false });
export const PlusIcon = createIcon('plus', { filled: false });
export const CloseEyeIcon = createIcon('eye-off', { filled: false });
export const OpenEyeIcon = createIcon('eye', { filled: false });
export const LockIcon = createIcon('lock', { filled: false });
export const ProfileIcon = createIcon('user', { filled: false });
export const ExternalLinkIcon = createIcon('external-link', { filled: false });
export const SuccessIcon = createIcon('check-circle', { filled: false });
export const ErrorIcon = createIcon('alert-circle', { filled: false });
export const NotificationIcon = createIcon('bell', { filled: false });
export const DocumentIcon = createIcon('file-text', { filled: false });
export const ChartIcon = createIcon('bar-chart', { filled: false });
export const MoonIcon = createIcon('moon', { filled: false });
export const PanelIcon = createIcon('panel-left', { filled: false }); // Sidebar or PanelLeft
export const UploadIcon = createIcon('upload', { filled: false });

// Restored icons
export const CheckIcon = TickIcon;
export const BackIcon = (props: IconProps) => (
  <ChevronIcon orientation="left" {...props} />
);
export const ZoomOutIcon = createIcon('zoom-out', { filled: false });
export const TextIcon = createIcon('type', { filled: false });
export const ShapeIcon = createIcon('shapes', { filled: false });
export const RotateIcon = createIcon('rotate-cw', { filled: false });
export const GiftIcon = createIcon('gift', { filled: false });
export const ShieldIcon = createIcon('shield', { filled: false });
export const LogoutIcon = createIcon('log-out', { filled: false });
export const PowerOffIcon = createIcon('power', { filled: false });
export const LinkIcon = createIcon('link', { filled: false });
export const LayoutIcon = createIcon('layout', { filled: false });
export const ZapIcon = createIcon('zap', { filled: false });
export const CreditCardIcon = createIcon('credit-card', { filled: false });
export const MoreIcon = createIcon('more-horizontal', { filled: false });
export const TrashIcon = DustBinIcon;
export const FilterIcon = createIcon('filter', { filled: false });
export const CalendarIcon = createIcon('calendar', { filled: false });
export const ClockIcon = createIcon('clock', { filled: false });
export const MapPinIcon = createIcon('map-pin', { filled: false });
export const MenuIcon = createIcon('menu', { filled: false });
export const RefreshIcon = createIcon('refresh-cw', { filled: false });
export const PrintIcon = createIcon('printer', { filled: false });
export const MagicWandIcon = createIcon('wand', { filled: false });
export const UnLikeIcon = createIcon('thumbs-down', { filled: false });
export const LikeIcon = createIcon('thumbs-up', { filled: false });
export const CameraIcon = createIcon('camera', { filled: false });
export const BluetoothIcon = createIcon('bluetooth', { filled: false });
export const UnlockIcon = createIcon('unlock', { filled: false });
export const WifiIcon = createIcon('wifi', { filled: false });
export const BoldArrowIcon = createIcon('arrow-right', { filled: false });
export const ArrowIcon = createIcon('arrow-up', { filled: false });
export const SpinnerIcon = createIcon('loader', { filled: false });
export const SliderIcon = createIcon('sliders-horizontal', { filled: false });
export const CropIcon = createIcon('crop', { filled: false });
export const ZoomInIcon = createIcon('zoom-in', { filled: false });
export const DragHandleLinesIcon = createIcon('grip-horizontal', {
  filled: false,
});
export const MousePointerIcon = createIcon('mouse-pointer-2', {
  filled: false,
});
