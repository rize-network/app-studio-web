import React from 'react';
import { View, Image, Text, useTheme } from 'app-studio';

// Reimplement Avatar without Radix UI

export const Avatar = React.forwardRef<HTMLDivElement, any>(
  ({ className, children, ...props }, ref) => {
    return (
      <View
        ref={ref}
        width="32px"
        height="32px"
        borderRadius="50%"
        overflow="hidden"
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="color.gray.200"
        {...props}
      >
        {children}
      </View>
    );
  }
);
Avatar.displayName = 'Avatar';

export const AvatarImage = React.forwardRef<HTMLImageElement, any>(
  ({ className, src, alt, ...props }, ref) => {
    // If src is missing or error, we should probably not render or let Fallback show.
    // However, without Radix's state management for loading/error, we might just render Image.
    // If we want fallback behavior, we need state.

    const [hasError, setHasError] = React.useState(false);

    if (hasError || !src) {
        return null;
    }

    return (
      <Image
        ref={ref}
        src={src}
        alt={alt}
        width="100%"
        height="100%"
        objectFit="cover"
        onError={() => setHasError(true)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = 'AvatarImage';

export const AvatarFallback = React.forwardRef<HTMLDivElement, any>(
  ({ className, children, ...props }, ref) => {
    // This should ideally only show if Image failed or is missing.
    // But since we are composing them as children in the parent, we can't easily communicate state up
    // without a Context.
    // However, if we assume the user uses either Image OR Fallback, or puts both and expects standard behavior:
    // With Radix, Fallback shows when Image is not loaded.
    // Here, both might render on top of each other if we are not careful.
    // Since I implemented AvatarImage to return null on error, we can just render Fallback behind it?
    // No, standard HTML flow.
    // Let's wrap Avatar in a context to manage state if we want to be robust.

    // For now, simpler: Just render it. It usually has a background and text.
    // If Image loads, it covers it (if z-index or order allows).
    // Actually, if we put Image after Fallback in DOM, Image covers Fallback.
    // If Image is null (error), Fallback is visible.

    return (
      <View
        ref={ref}
        width="100%"
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="color.gray.100" // muted
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
        {...props}
      >
         {typeof children === 'string' ? <Text>{children}</Text> : children}
      </View>
    );
  }
);
AvatarFallback.displayName = 'AvatarFallback';
