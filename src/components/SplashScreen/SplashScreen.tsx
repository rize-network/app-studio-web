/**
 * SplashScreen — a cross-platform launch/loading overlay.
 *
 * Reworks the original app-demo SplashLayout (React Native only, driven by
 * `react-native-bootsplash` + `react-native-animatable`) into a dependency-free
 * component that works on web and native. It animates out through app-studio's
 * unified `Animation` system (which routes to CSS on web and reanimated on
 * native), so the same code plays everywhere. Drive it either with the shared
 * `useSplashStore` (call `setSplashLoaded()` when ready) or the controlled
 * `isLoaded` prop.
 */
import React, { useEffect, useState } from 'react';
import { Center, Vertical, Image, Animation, isBrowser } from 'app-studio';
import { Loader } from '../Loader/Loader';
import { useSplashStore } from './SplashScreen.store';
import { SplashScreenProps } from './SplashScreen.types';

export const SplashScreen: React.FC<SplashScreenProps> = ({
  logo,
  logoSrc,
  loader,
  showLoader = true,
  duration = 600,
  isLoaded,
  onHidden,
  backgroundColor = 'color-white',
  children,
  ...props
}) => {
  const storeLoaded = useSplashStore((state) => state.loaded);
  const loaded = isLoaded !== undefined ? isLoaded : storeLoaded;

  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!loaded || exiting) return;
    setExiting(true);
    const timer = setTimeout(() => {
      setVisible(false);
      onHidden?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [loaded, exiting, duration, onHidden]);

  if (!visible) return null;

  // `position: fixed` pins to the viewport on web; native has no `fixed`, so
  // fall back to `absolute` (the splash is expected to mount at the app root).
  const position = (isBrowser() ? 'fixed' : 'absolute') as any;
  const animate = exiting
    ? Animation.fadeOut({ duration: `${duration}ms` })
    : undefined;

  const logoNode =
    logo ??
    (logoSrc ? (
      <Image src={logoSrc} width={120} height={120} alt="logo" />
    ) : null);

  return (
    <Center
      position={position}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={9999}
      backgroundColor={backgroundColor}
      animate={animate}
      {...props}
    >
      <Vertical alignItems="center" gap={24}>
        {logoNode}
        {showLoader && (loader ?? <Loader />)}
      </Vertical>
      {children}
    </Center>
  );
};
