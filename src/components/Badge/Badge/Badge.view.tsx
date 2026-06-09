/**
 * Badge View Component
 *
 * Renders a badge with various styles and states according to the design guidelines.
 */

import React, { useMemo } from 'react';
import { BadgeProps } from './Badge.props';
import {
  BadgeAnnouncementSizes,
  BadgeAnnouncementTextSizes,
  BadgePastilContentSizes,
  BadgeShapes,
  BadgeSizes,
  PositionStyles,
  getBadgeAnnouncementVariant,
  getBadgeVariants,
} from './Badge.style';
import { Center, useTheme, View } from 'app-studio';
import { Text } from 'app-studio';
import { getThemes } from '../../StatusIndicator/StatusIndicator/StatusIndicator.style';

// No need to import ViewProps as it's not used directly
/**
 * Badge View Component
 */
const BadgeView: React.FC<BadgeProps> = React.memo(
  ({
    content,
    children,
    icon,
    pastil,
    pastilContent,
    action,
    position,
    shape = 'pill',
    variant = 'filled',
    size = 'md',
    views,
    themeMode: elementMode,
    ...props
  }) => {
    const { themeMode } = useTheme();
    const currentThemeMode = elementMode || themeMode;
    const variantStyles = useMemo(
      () => getBadgeVariants(currentThemeMode)[variant],
      [currentThemeMode, variant]
    );
    const announcementVariantStyles = useMemo(
      () => getBadgeAnnouncementVariant(currentThemeMode),
      [currentThemeMode]
    );
    const statusThemes = useMemo(
      () => getThemes(currentThemeMode),
      [currentThemeMode]
    );
    const hasPastilContent =
      pastilContent !== undefined && pastilContent !== null;
    const hasAction = action !== undefined && action !== null;
    const hasAnnouncementLayout = hasPastilContent || hasAction;
    const contentNode =
      children !== undefined && children !== null ? children : content;
    const hasContent = contentNode !== undefined && contentNode !== null;

    // Combine styles for the badge (memoized to avoid recreation on every render)
    // For non-filled variants (outline/ghost/link), reapply the variant's color
    // and background AFTER the brand container styles so the variant wins —
    // otherwise a brand container.color set for filled badges (e.g. white)
    // would also paint outline badge text white on a white surface.
    const combinedStyles: Record<string, any> = useMemo(() => {
      const base = {
        width: 'fit-content',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        borderRadius: BadgeShapes[shape],
        ...BadgeSizes[size],
        ...variantStyles,
        ...(hasAnnouncementLayout ? BadgeAnnouncementSizes[size] : {}),
        ...(hasAnnouncementLayout ? announcementVariantStyles : {}),
        ...(position ? PositionStyles[position] : {}),
        ...views?.container,
      };
      if (variant !== 'filled' && !hasAnnouncementLayout) {
        if ((variantStyles as any).color !== undefined) {
          (base as any).color = (variantStyles as any).color;
        }
        if ((variantStyles as any).borderColor !== undefined) {
          (base as any).borderColor = (variantStyles as any).borderColor;
        }
        if ((variantStyles as any).backgroundColor !== undefined) {
          (base as any).backgroundColor = (
            variantStyles as any
          ).backgroundColor;
        }
        if (variantStyles && (variantStyles as any).style) {
          (base as any).style = {
            ...((base as any).style || {}),
            ...(variantStyles as any).style,
          };
        }
      }
      return base;
    }, [
      shape,
      size,
      variant,
      variantStyles,
      hasAnnouncementLayout,
      announcementVariantStyles,
      position,
      views?.container,
    ]);

    // Determine pastil color
    let pastilColor = 'currentColor';
    if (typeof pastil === 'string') {
      if (pastil in statusThemes) {
        pastilColor = (statusThemes as any)[pastil].indicator.backgroundColor;
      } else {
        pastilColor = pastil;
      }
    } else if (pastil === true) {
      // Default pastil color if simply true
      pastilColor = 'color-green-500'; // Example default or inherit
      if (variant === 'filled') pastilColor = 'color-white';
    }

    return (
      <Center role="badge" {...combinedStyles} {...props}>
        {icon && (
          <View role="badge-icon" {...views?.icon}>
            {icon}
          </View>
        )}

        {hasPastilContent && (
          <Text
            role="badge-pastil-content"
            backgroundColor={'color-gray-900'}
            borderRadius="9999px"
            color={'color-white'}
            fontWeight="700"
            letterSpacing={0}
            textTransform="uppercase"
            whiteSpace="nowrap"
            {...BadgePastilContentSizes[size]}
            {...views?.pastilContent}
          >
            {pastilContent}
          </Text>
        )}

        {pastil && (
          <View
            role="badge-pastil"
            width="6px"
            height="6px"
            borderRadius="50%"
            backgroundColor={pastilColor}
            {...views?.pastil}
          />
        )}

        {hasContent && (
          <Text
            role="badgeText"
            color={
              hasAnnouncementLayout ? 'color-gray-900' : combinedStyles.color
            }
            fontWeight={hasAnnouncementLayout ? '700' : '600'}
            textAlign="center"
            letterSpacing={hasAnnouncementLayout ? 0 : '0.02em'}
            whiteSpace={hasAnnouncementLayout ? 'nowrap' : undefined}
            {...(hasAnnouncementLayout ? BadgeAnnouncementTextSizes[size] : {})}
            {...views?.text}
          >
            {contentNode}
          </Text>
        )}

        {hasAction && (
          <Text
            role="badge-action"
            color="color-gray-400"
            fontWeight="500"
            letterSpacing={0}
            whiteSpace="nowrap"
            {...BadgeAnnouncementTextSizes[size]}
            {...views?.action}
          >
            {action}
          </Text>
        )}
      </Center>
    );
  }
);
export default BadgeView;
