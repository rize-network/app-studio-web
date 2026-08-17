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
    isAuto = false,
    views,
    themeMode: elementMode,
    // Extraits plutôt que laissés dans `...props` : la variante décide du fond,
    // du texte et du liseré ensemble, et une couleur passée par l'appelant
    // n'atteignait que le conteneur. L'étiquette, elle, lit
    // `combinedStyles.color` — donc elle restait celle de la variante, et une
    // pastille verte gardait un texte et un liseré de la variante par défaut.
    backgroundColor,
    color,
    borderColor,
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
    // `isAuto` auto-derives the badge colors from its own `content` when the
    // content is a color token (the color-scheme demo loops theme tokens as
    // `content`): the token becomes the background and the label switches to
    // white so it stays readable on the saturated brand tones.
    const autoColorToken =
      isAuto &&
      typeof contentNode === 'string' &&
      /^(color|theme|light|dark)-/.test(contentNode)
        ? contentNode
        : undefined;
    const combinedStyles: Record<string, any> = useMemo(() => {
      const base = {
        width: 'fit-content',
        display: 'flex',
        // Web flexbox defaults to row; React Native defaults to column, which
        // stacked the icon/pastil above the label and cramped the badge. Force
        // a horizontal row (no-op on web).
        flexDirection: 'row',
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
      // Une pastille qui ne peut pas être cliquée ne réagit pas au survol.
      //
      // `filled` portait `_hover` et `_active`, donc **toute** pastille
      // s'assombrissait sous le pointeur — une étiquette d'état autant qu'une
      // puce actionnable. L'élément est un `div` nu : pas de rôle, pas de
      // gestionnaire, curseur inchangé. Une promesse, non tenue.
      //
      // Elle pèse davantage depuis qu'un appelant peut colorer la pastille par
      // son sens : la réaction se pose sur ce qui vient de devenir le plus
      // attirant de la ligne.
      const isInteractive = hasAction || props.onClick !== undefined;
      if (!isInteractive) {
        delete (base as any)._hover;
        delete (base as any)._active;
      }

      // Ce que l'appelant demande gagne sur la variante — et gagne *ensemble*.
      // Donner un fond sans donner de liseré laissait l'anneau de la variante
      // par défaut : invisible tant que les deux valaient `theme-primary`, et
      // franchement visible dès qu'un écran colorait le fond.
      if (backgroundColor !== undefined) {
        (base as any).backgroundColor = backgroundColor;
        if (borderColor === undefined)
          (base as any).borderColor = backgroundColor;
      }
      if (borderColor !== undefined) (base as any).borderColor = borderColor;
      if (color !== undefined) (base as any).color = color;

      if (autoColorToken) {
        (base as any).backgroundColor = autoColorToken;
        (base as any).borderColor = autoColorToken;
        (base as any).color = 'color-white';
      }
      return base;
    }, [
      hasAction,
      props.onClick,
      backgroundColor,
      color,
      borderColor,
      shape,
      size,
      variant,
      variantStyles,
      hasAnnouncementLayout,
      announcementVariantStyles,
      position,
      autoColorToken,
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
      <Center data-role="badge" {...combinedStyles} {...props}>
        {icon && (
          <View data-role="badge-icon" {...views?.icon}>
            {icon}
          </View>
        )}

        {hasPastilContent && (
          <Text
            data-role="badge-pastil-content"
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
            data-role="badge-pastil"
            width="6px"
            height="6px"
            borderRadius="50%"
            backgroundColor={pastilColor}
            {...views?.pastil}
          />
        )}

        {hasContent && (
          <Text
            data-role="badge-text"
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
            data-role="badge-action"
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
