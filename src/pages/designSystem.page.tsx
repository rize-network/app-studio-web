import React, { useMemo, useState } from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import {
  Accordion,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Checkbox,
  DesignSystemConfig,
  DesignSystemConfigId,
  DesignSystemProvider,
  Loader,
  NavigationMenu,
  ProgressBar,
  Select,
  Separator,
  Slider,
  StatusIndicator,
  Switch,
  Table,
  Tabs,
  TextArea,
  TextField,
  designSystemConfigList,
  designSystemConfigs,
  Tooltip,
  HoverCard,
  Toggle,
  ToggleGroup,
  ColorPicker,
  Pagination,
  ShareButton,
  Link,
  Title,
  AspectRatio,
  Carousel,
  OTPInput,
} from 'src/components';
import type { BrandPersonality } from 'src/components';
import { Radio } from 'src/components/Form/Radio/Radio';
import { Helmet } from 'react-helmet-async';

type BrandTitleStyle = {
  highlightStyle:
    | 'background'
    | 'underline'
    | 'gradient'
    | 'outline'
    | 'glow'
    | 'solid'
    | 'default';
  fontWeight: number | string;
  letterSpacing?: string;
  fontStyle?: 'normal' | 'italic';
  textTransform?: 'none' | 'uppercase' | 'lowercase';
  highlightFontStyle?: 'normal' | 'italic';
  highlightFontWeight?: number | string;
  highlightLetterSpacing?: string;
};

const brandTitleStyles: Record<string, BrandTitleStyle> = {
  airbnb: {
    highlightStyle: 'background',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  apple: {
    highlightStyle: 'solid',
    fontWeight: 600,
    letterSpacing: '-0.03em',
  },
  coinbase: {
    highlightStyle: 'solid',
    fontWeight: 600,
    letterSpacing: '-0.02em',
  },
  figma: {
    highlightStyle: 'underline',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    highlightFontWeight: 700,
  },
  linear: {
    highlightStyle: 'gradient',
    fontWeight: 600,
    letterSpacing: '-0.03em',
  },
  nike: {
    highlightStyle: 'underline',
    fontWeight: 800,
    letterSpacing: '0.02em',
    textTransform: 'uppercase',
    highlightFontStyle: 'italic',
    highlightFontWeight: 900,
  },
  notion: {
    highlightStyle: 'underline',
    fontWeight: 600,
    letterSpacing: '-0.01em',
    highlightFontStyle: 'italic',
  },
  revolut: {
    highlightStyle: 'gradient',
    fontWeight: 700,
    letterSpacing: '-0.03em',
  },
  shopify: {
    highlightStyle: 'background',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  spacex: {
    highlightStyle: 'glow',
    fontWeight: 700,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    highlightLetterSpacing: '0.06em',
  },
  spotify: {
    highlightStyle: 'background',
    fontWeight: 800,
    letterSpacing: '-0.03em',
  },
  stripe: {
    highlightStyle: 'gradient',
    fontWeight: 700,
    letterSpacing: '-0.03em',
  },
  tesla: {
    highlightStyle: 'solid',
    fontWeight: 500,
    letterSpacing: '-0.01em',
    textTransform: 'uppercase',
  },
  uber: {
    highlightStyle: 'underline',
    fontWeight: 700,
    letterSpacing: '-0.02em',
  },
  vercel: {
    highlightStyle: 'outline',
    fontWeight: 700,
    letterSpacing: '-0.04em',
  },
};

const defaultBrandTitleStyle: BrandTitleStyle = {
  highlightStyle: 'background',
  fontWeight: 700,
  letterSpacing: '-0.02em',
};

const getBrandTitleStyle = (config: DesignSystemConfig): BrandTitleStyle =>
  brandTitleStyles[config.metadata.id] ?? defaultBrandTitleStyle;

type SurfacePalette = {
  canvas: string;
  surface: string;
  text: string;
  muted: string;
  border: string;
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  onPrimary: string;
  appearance: 'light' | 'dark';
};

// Both palettes carry the brand's theme slots as CSS-ready values: a token
// (`color-black`) becomes `var(--color-black)`, a literal (`#2563eb`) passes
// through. The frame wraps its content in a DesignSystemProvider pinned to
// `appearance`, so every `var(--…)` flips for that mode (`data-theme`). Because
// the values are already CSS-ready, samples can drop them into a component prop
// OR a raw inline `style` / gradient string and they resolve the same way — no
// per-sample color detection, no light/dark branching. app-studio owns the flip.
const buildPalette = (
  config: DesignSystemConfig,
  appearance: 'light' | 'dark'
): SurfacePalette => {
  const t = config.theme;
  return {
    canvas: toCss(t.canvas),
    surface: toCss(t.surface),
    text: toCss(t.text),
    muted: toCss(t.muted),
    border: toCss(t.border),
    primary: toCss(t.primary),
    secondary: toCss(t.secondary),
    success: toCss(t.success),
    warning: toCss(t.warning),
    error: toCss(t.error),
    onPrimary: toCss(t.onPrimary),
    appearance,
  };
};

const getLightPalette = (config: DesignSystemConfig): SurfacePalette =>
  buildPalette(config, 'light');

const getDarkPalette = (config: DesignSystemConfig): SurfacePalette =>
  buildPalette(config, 'dark');

const PaletteFrame = ({
  palette,
  label,
  config,
  children,
}: {
  palette: SurfacePalette;
  label: string;
  config: DesignSystemConfig;
  children: React.ReactNode;
}) => (
  <Vertical gap={10} flex="1 1 320px" minWidth={0}>
    <Horizontal gap={8} alignItems="center">
      <View
        width={10}
        height={10}
        borderRadius={9999}
        backgroundColor={palette.appearance === 'dark' ? '#111111' : '#ffffff'}
        borderWidth={1}
        borderStyle="solid"
        borderColor="rgba(0,0,0,0.15)"
      />
      <Text
        fontSize={11}
        fontWeight="700"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        {label}
      </Text>
    </Horizontal>
    {/* Pin this frame to its appearance; app-studio resolves every theme/color
        token inside it for that mode — light tokens render light here, dark
        tokens render dark in the sibling frame. No manual color resolution. */}
    <DesignSystemProvider config={config} mode={palette.appearance}>
      <View
        padding={20}
        borderRadius={16}
        borderWidth={1}
        borderStyle="solid"
        backgroundColor="color-white"
        borderColor="color-gray-200"
        color="color-black"
      >
        {children}
      </View>
    </DesignSystemProvider>
  </Vertical>
);

// Token → CSS boundary. app-studio resolves design tokens (`color-*`,
// `theme-*`, `light-*`, `dark-*`) only on component PROPS, never inside a raw
// inline `style` object or a gradient/box-shadow string. Anything that has to
// live in raw CSS must cross this boundary first: a token becomes the matching
// `var(--token)` (which still flips per mode via `data-theme`), and any literal
// (hex / rgba) passes through untouched. This is the ONLY place the showcase
// translates a token — samples never inspect or branch on the color itself.
const toCss = (value?: string): string => {
  if (!value || typeof value !== 'string') return value as string;
  return /^(color|theme|light|dark)-/.test(value) ? `var(--${value})` : value;
};

// Translucent fill from any color (token or literal) for use in raw CSS.
// `color-mix` accepts both `var(--token)` and hex, so the result flips per mode
// when fed a token — no light/dark branching required.
const softCss = (value: string, percent: number): string =>
  `color-mix(in srgb, ${toCss(value)} ${percent}%, transparent)`;

// Inverse of `toCss` for DISPLAY only: turn `var(--color-black)` back into the
// readable token name (`color-black`) when we want to show the token as text.
const tokenLabel = (value?: string): string =>
  value && value.startsWith('var(--') ? value.slice(6, -1) : (value as string);

const defaultPersonality: BrandPersonality = {
  cornerStyle: 'soft',
  typeWeight: 'bold',
  typeCase: 'normal',
  typeStyle: 'normal',
  letterSpacing: '-0.01em',
  accentTreatment: 'flat',
  signatureMotif: '●',
  density: 'comfortable',
  surfaceTone: 'paper',
  cardRadius: 12,
  pillRadius: 9999,
  badgeRadius: 6,
  voice: 'neutral',
};

const getPersonality = (config: DesignSystemConfig): BrandPersonality =>
  config.personality || defaultPersonality;

const personalityFontWeight = (
  p: BrandPersonality,
  bump: 'light' | 'normal' | 'heavy' = 'normal'
): number => {
  const base: Record<BrandPersonality['typeWeight'], number> = {
    light: 300,
    regular: 400,
    bold: 700,
    black: 800,
  };
  let w = base[p.typeWeight];
  if (bump === 'light') w = Math.max(300, w - 200);
  if (bump === 'heavy') w = Math.min(900, w + 100);
  return w;
};

const personalityDensityScale = (p: BrandPersonality) => {
  switch (p.density) {
    case 'tight':
      return { padding: 16, gap: 10, large: 20 };
    case 'spacious':
      return { padding: 28, gap: 18, large: 36 };
    case 'comfortable':
    default:
      return { padding: 22, gap: 14, large: 28 };
  }
};

const personalityTextTransform = (p: BrandPersonality): 'uppercase' | 'none' =>
  p.typeCase === 'uppercase' ? 'uppercase' : 'none';

const personalitySurfaceStyle = (
  p: BrandPersonality,
  palette: SurfacePalette
): React.CSSProperties => {
  switch (p.surfaceTone) {
    case 'glass':
      return {
        backgroundColor:
          palette.appearance === 'dark'
            ? 'rgba(255,255,255,0.04)'
            : 'rgba(255,255,255,0.65)',
        backdropFilter: 'blur(14px)',
      };
    case 'mono':
      return {
        backgroundColor:
          palette.appearance === 'dark' ? '#0a0a0a' : toCss(palette.surface),
      };
    case 'matte':
      return {
        backgroundColor: palette.appearance === 'dark' ? '#181818' : '#f4f4f4',
      };
    case 'paper':
    default:
      // `surface` already flips per mode via its token — no branching needed.
      return { backgroundColor: toCss(palette.surface) };
  }
};

const personalityAccentBackground = (
  p: BrandPersonality,
  palette: SurfacePalette
): string => {
  const primary = toCss(palette.primary);
  const secondary = toCss(palette.secondary || palette.primary);
  switch (p.accentTreatment) {
    case 'gradient':
      return `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`;
    case 'glow':
      return primary;
    case 'stripe':
      return `repeating-linear-gradient(45deg, ${primary} 0 8px, ${secondary} 8px 16px)`;
    case 'halftone':
      return `radial-gradient(circle at 30% 30%, ${primary} 0%, ${secondary} 70%)`;
    case 'flat':
    default:
      return primary;
  }
};

const personalityAccentShadow = (
  p: BrandPersonality,
  palette: SurfacePalette
): string | undefined => {
  if (p.accentTreatment === 'glow') {
    return `0 0 24px ${softCss(palette.primary, 40)}, 0 0 4px ${toCss(
      palette.primary
    )}`;
  }
  return undefined;
};

const personalityHeadingStyle = (p: BrandPersonality): React.CSSProperties => ({
  letterSpacing: p.letterSpacing,
  textTransform: personalityTextTransform(p),
  fontStyle: p.typeStyle,
  fontWeight: personalityFontWeight(p, 'heavy'),
});

const personalityLabelStyle = (p: BrandPersonality): React.CSSProperties => ({
  letterSpacing: p.typeCase === 'uppercase' ? '0.12em' : '0.06em',
  textTransform: 'uppercase',
  fontStyle: p.typeStyle,
  fontWeight: personalityFontWeight(p, 'normal'),
});

const readContainerRadius = (
  config: DesignSystemConfig,
  name: string
): string | number | undefined => {
  const cfg = (config.components as any)?.[name];
  return cfg?.views?.container?.borderRadius;
};

type ElevationLevel = {
  name: string;
  label: string;
  description: string;
  shadow: string;
};

const getElevationLevels = (config: DesignSystemConfig): ElevationLevel[] => {
  const raw = config.tokens.rawCssVars || {};
  const borderColor = config.theme.border;
  const surfaceColor = config.theme.surface;
  const focusColor = config.theme.primary;

  const ring = raw['shadow-ring'] || `rgba(0,0,0,0.08) 0px 0px 0px 1px`;
  const ringLight =
    raw['shadow-ring-light'] || `${borderColor} 0px 0px 0px 1px`;
  const card =
    raw['shadow-card'] ||
    `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px 0px, ${surfaceColor} 0px 0px 0px 1px`;
  const cardFull =
    raw['shadow-card-full'] ||
    `rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 2px 0px, rgba(0,0,0,0.04) 0px 8px 8px -8px, ${surfaceColor} 0px 0px 0px 1px`;

  return [
    {
      name: 'Level 0',
      label: 'Flat',
      description: 'No shadow',
      shadow: 'none',
    },
    {
      name: 'Level 1',
      label: 'Ring',
      description: 'Shadow-as-border',
      shadow: ring,
    },
    {
      name: 'Level 1b',
      label: 'Light Ring',
      description: 'Lighter ring',
      shadow: ringLight,
    },
    {
      name: 'Level 2',
      label: 'Card',
      description: 'Ring + subtle lift',
      shadow: card,
    },
    {
      name: 'Level 3',
      label: 'Full Card',
      description: 'Ring + lift + ambient + glow',
      shadow: cardFull,
    },
    {
      name: 'Focus',
      label: 'Accessibility ring',
      description: 'Focus state — 2px ring',
      shadow: `0 0 0 2px ${focusColor}`,
    },
  ];
};

const componentRadius = (
  config: DesignSystemConfig,
  name: string
): string | number => {
  const fallbackChain: Record<string, string[]> = {
    accordion: ['accordion', 'card', 'alert'],
    tabs: ['tabs', 'button'],
    panel: ['card', 'alert'],
  };
  const chain = fallbackChain[name] ?? [name];
  for (const candidate of chain) {
    const value = readContainerRadius(config, candidate);
    if (value !== undefined) return value;
  }
  return '12px';
};

const TabIconHeader = ({ glyph, badge }: { glyph: string; badge?: string }) => (
  <View position="relative" display="inline-flex">
    <View
      width={32}
      height={32}
      borderRadius="50%"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      style={{
        backgroundColor: 'rgba(0,0,0,0.06)',
        fontSize: 18,
        lineHeight: '20px',
      }}
    >
      {glyph}
    </View>
    {badge ? (
      <View
        position="absolute"
        top={-10}
        right={-18}
        paddingHorizontal={6}
        paddingVertical={2}
        borderRadius={9999}
        style={{
          backgroundColor: '#ffffff',
          color: '#222222',
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.04em',
          boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
        }}
      >
        {badge}
      </View>
    ) : null}
  </View>
);

const sampleTabs = [
  {
    title: 'Homes',
    value: 'homes',
    icon: <TabIconHeader glyph="🏠" />,
    content: (
      <Text fontSize={14} lineHeight="20px">
        Tokens, inputs, and feedback components share the active config.
      </Text>
    ),
  },
  {
    title: 'Experiences',
    value: 'experiences',
    icon: <TabIconHeader glyph="🎈" badge="NEW" />,
    content: (
      <Text fontSize={14} lineHeight="20px">
        Explicit props still override the config defaults.
      </Text>
    ),
  },
  {
    title: 'Services',
    value: 'services',
    icon: <TabIconHeader glyph="🛎️" badge="NEW" />,
    content: (
      <Text fontSize={14} lineHeight="20px">
        Each tab carries an icon. Active tab uses the theme primary underline.
      </Text>
    ),
  },
];

const tableColumns = [
  { title: 'Token', field: 'token' },
  { title: 'Value', field: 'value' },
  { title: 'Role', field: 'role' },
];

const navigationItems = [
  { id: 'overview', label: 'Overview', href: '#' },
  { id: 'components', label: 'Components', href: '#' },
  { id: 'tokens', label: 'Tokens', href: '#' },
];

const Swatch = ({
  color,
  name,
  role,
  border,
}: {
  color: string;
  name: string;
  role: string;
  text: string;
  border: string;
}) => (
  <View
    borderWidth={1}
    borderStyle="solid"
    borderRadius={8}
    overflow="hidden"
    minWidth={0}
    borderColor={border}
  >
    <View height={76} backgroundColor={color} />
    <Vertical gap={4} padding={12}>
      <Text fontSize={13} lineHeight="18px" fontWeight="700">
        {name}
      </Text>
      <Text fontSize={12} lineHeight="16px" opacity={0.7}>
        {color}
      </Text>
      <Text fontSize={12} lineHeight="16px" opacity={0.72}>
        {role}
      </Text>
    </Vertical>
  </View>
);

const Section = ({
  title,
  children,
  config,
}: {
  title: string;
  children: React.ReactNode;
  config: DesignSystemConfig;
}) => (
  <Vertical
    gap={18}
    padding={24}
    borderWidth={1}
    borderStyle="solid"
    borderRadius={12}
    backgroundColor={config.theme.canvas}
    borderColor={config.theme.border}
  >
    <Text
      fontSize={18}
      lineHeight="24px"
      fontWeight="700"
      color={config.theme.text}
    >
      {title}
    </Text>
    {children}
  </Vertical>
);

const HeroSection = ({ config }: { config: DesignSystemConfig }) => {
  const t = getBrandTitleStyle(config);
  const highlightTextColor =
    t.highlightStyle === 'background'
      ? config.theme.onPrimary
      : config.theme.primary;

  return (
    <View
      width="100%"
      borderRadius={20}
      overflow="hidden"
      borderWidth={1}
      borderStyle="solid"
      borderColor={config.theme.border}
      backgroundColor={config.theme.surface}
    >
      <Horizontal width="100%" flexWrap="wrap" alignItems="stretch" gap={0}>
        <Vertical
          flex="1 1 360px"
          minWidth={0}
          padding={36}
          gap={20}
          justifyContent="center"
        >
          <Badge variant="outline" content={`${config.metadata.label} hero`} />

          <Title
            key={`${config.metadata.id}-${t.highlightStyle}`}
            size="xl"
            responsive
            highlightText="design system"
            highlightStyle={t.highlightStyle}
            highlightColor={config.theme.primary}
            highlightSecondaryColor={
              t.highlightStyle === 'gradient'
                ? config.theme.secondary
                : config.theme.onPrimary
            }
            views={{
              container: { color: config.theme.text },
              text: {
                color: config.theme.text,
                fontFamily: config.tokens.typography.fontFamily,
                fontWeight: t.fontWeight,
                style: {
                  letterSpacing: t.letterSpacing,
                  fontStyle: t.fontStyle ?? 'normal',
                  textTransform: t.textTransform ?? 'none',
                },
              },
              highlight: {
                color: highlightTextColor,
                fontWeight: t.highlightFontWeight ?? t.fontWeight,
                style: {
                  fontStyle: t.highlightFontStyle ?? t.fontStyle ?? 'normal',
                  letterSpacing: t.highlightLetterSpacing ?? t.letterSpacing,
                  textTransform: t.textTransform ?? 'none',
                },
              },
            }}
          >
            Build a beautiful design system in minutes
          </Title>

          <Text
            color={config.theme.muted}
            fontFamily={config.tokens.typography.fontFamily}
            style={{ fontSize: 16, lineHeight: '24px', maxWidth: 520 }}
          >
            Each brand defines its own highlight treatment —{' '}
            <Text as="span" color={config.theme.primary} fontWeight="700">
              {t.highlightStyle}
            </Text>{' '}
            with weight{' '}
            <Text as="span" fontWeight="700">
              {t.fontWeight}
            </Text>
            {t.highlightFontStyle === 'italic' || t.fontStyle === 'italic'
              ? ', italic'
              : ''}
            {t.textTransform === 'uppercase' ? ', uppercase' : ''}.
          </Text>

          <Horizontal gap={12} flexWrap="wrap">
            <Button colorScheme="primary" size="md">
              Get started
            </Button>
            <Button variant="outline" colorScheme="primary" size="md">
              View docs
            </Button>
          </Horizontal>
        </Vertical>

        <View
          flex="1 1 320px"
          minWidth={0}
          minHeight={260}
          position="relative"
          overflow="hidden"
          style={{
            backgroundImage: `linear-gradient(135deg, ${
              config.theme.primary
            }, ${config.theme.secondary || config.theme.primary})`,
          }}
        >
          <View
            position="absolute"
            top="50%"
            left="50%"
            width={180}
            height={180}
            borderRadius={9999}
            style={{
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255,255,255,0.18)',
              filter: 'blur(40px)',
            }}
          />
          <Vertical
            width="100%"
            height="100%"
            minHeight={260}
            padding={32}
            justifyContent="flex-end"
            alignItems="flex-start"
            gap={12}
          >
            <Text
              fontWeight="700"
              fontFamily={config.tokens.typography.fontFamily}
              style={{
                color: config.theme.onPrimary,
                fontSize: 13,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {config.metadata.label}
            </Text>
            <Text
              fontWeight="700"
              fontFamily={config.tokens.typography.fontFamily}
              style={{
                color: config.theme.onPrimary,
                fontSize: 28,
                lineHeight: '32px',
                letterSpacing: '-0.02em',
              }}
            >
              {config.theme.primary}
            </Text>
          </Vertical>
        </View>
      </Horizontal>
    </View>
  );
};

const FoundationPreview = ({ config }: { config: DesignSystemConfig }) => {
  const tableData = config.tokens.colors.slice(0, 5).map((color) => ({
    token: color.name,
    value: color.value,
    role: color.role,
  }));

  return (
    <Vertical gap={24}>
      <Section title="Color" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
          gap={12}
        >
          {config.tokens.colors.slice(0, 12).map((color) => (
            <Swatch
              key={color.name}
              color={color.value}
              name={color.name}
              role={color.role}
              text={config.theme.text}
              border={config.theme.border}
            />
          ))}
        </View>
      </Section>

      <Section title="Typography" config={config}>
        <Vertical gap={24}>
          <Vertical gap={4}>
            <Text
              fontFamily={config.tokens.typography.fontFamily}
              fontSize={48}
              lineHeight="1.0"
              fontWeight="700"
              letterSpacing="0.96px"
              textTransform="uppercase"
            >
              Making Life Multiplanetary
            </Text>
            <Text fontSize={10} color={config.theme.muted}>
              Display — 48px / Bold / 1.00 / Uppercase
            </Text>
          </Vertical>

          <Vertical gap={4}>
            <Text
              fontFamily={config.tokens.typography.fontFamily}
              fontSize={16}
              lineHeight="1.7"
              fontWeight="400"
            >
              SpaceX designs, manufactures and launches advanced rockets and
              spacecraft. The company was founded to revolutionize space
              technology.
            </Text>
            <Text fontSize={10} color={config.theme.muted}>
              Body — 16px / 400 / 1.70
            </Text>
          </Vertical>

          <Vertical gap={4}>
            <Text
              fontFamily={config.tokens.typography.fontFamily}
              fontSize={13}
              lineHeight="0.94"
              fontWeight="700"
              letterSpacing="1.17px"
              textTransform="uppercase"
            >
              Falcon 9 · Starship · Dragon
            </Text>
            <Text fontSize={10} color={config.theme.muted}>
              Nav Bold — 13px / 700 / 0.94 / Uppercase
            </Text>
          </Vertical>

          <Vertical gap={4}>
            <Text
              fontFamily={config.tokens.typography.fontFamily}
              fontSize={12}
              lineHeight="1.0"
              fontWeight="400"
              letterSpacing="1px"
              textTransform="uppercase"
            >
              Mission Overview
            </Text>
            <Text fontSize={10} color={config.theme.muted}>
              Caption — 12px / 400 / 1.00 / Uppercase
            </Text>
          </Vertical>

          <Vertical gap={4}>
            <Text
              fontFamily={config.tokens.typography.fontFamily}
              fontSize={10}
              lineHeight="0.94"
              fontWeight="400"
              letterSpacing="1px"
              textTransform="uppercase"
            >
              Launch Date: 2026-04-15
            </Text>
            <Text fontSize={10} color={config.theme.muted}>
              Micro — 10px / 400 / 0.94 / Uppercase
            </Text>
          </Vertical>

          <Horizontal gap={10} flexWrap="wrap" marginTop={12}>
            {config.tokens.typography.fontSizes.map((size) => (
              <Badge key={size} variant="outline" content={size} />
            ))}
          </Horizontal>
        </Vertical>
      </Section>

      <Section title="Spacing, Radius, Shadow" config={config}>
        <Vertical gap={18}>
          <Horizontal gap={12} flexWrap="wrap" alignItems="flex-end">
            {config.tokens.spacing.slice(0, 10).map((space) => (
              <Vertical key={space} gap={8} alignItems="center">
                <View
                  width={space}
                  minWidth={4}
                  height={24}
                  borderRadius={2}
                  backgroundColor={config.theme.primary}
                />
                <Text fontSize={11} color={config.theme.muted}>
                  {space}
                </Text>
              </Vertical>
            ))}
          </Horizontal>

          <Horizontal gap={12} flexWrap="wrap">
            {config.tokens.radii.slice(0, 6).map((radius) => (
              <Vertical key={radius} gap={8} alignItems="center">
                <View
                  width={64}
                  height={64}
                  borderRadius={radius}
                  borderWidth={1}
                  borderStyle="solid"
                  backgroundColor={config.theme.surface}
                  borderColor={config.theme.border}
                />
                <Text fontSize={11} color={config.theme.muted}>
                  {radius}
                </Text>
              </Vertical>
            ))}
          </Horizontal>

          <View
            width="100%"
            maxWidth="100%"
            overflowX="auto"
            style={{
              WebkitOverflowScrolling: 'touch',
              color: config.theme.text,
            }}
          >
            <Table views={(config.components as any)?.table?.views}>
              <Table.Template
                caption="First extracted color tokens"
                columns={tableColumns}
                data={tableData}
              />
            </Table>
          </View>
        </Vertical>
      </Section>
    </Vertical>
  );
};

const PricingCardSample = ({ palette }: { palette: SurfacePalette }) => (
  <Card
    width="min(100%, 420px)"
    views={{
      container: {
        backgroundColor: palette.surface,
        color: palette.text,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.border,
      },
      header: { color: palette.text, borderColor: palette.border },
      content: { color: palette.text },
      footer: { borderColor: palette.border },
    }}
  >
    <Card.Header>
      <Horizontal
        alignItems="center"
        justifyContent="space-between"
        gap={12}
        flexWrap="wrap"
      >
        <Horizontal alignItems="baseline" gap={6}>
          <Text fontSize={24} fontWeight="800" color={palette.text}>
            $182
          </Text>
          <Text fontSize={14} color={palette.muted}>
            night
          </Text>
        </Horizontal>
        <Badge variant="filled" content="Best value" />
      </Horizontal>
    </Card.Header>
    <Card.Content>
      <Vertical gap={12}>
        <Horizontal
          gap={0}
          borderRadius={10}
          borderWidth={1}
          borderStyle="solid"
          borderColor={palette.border}
          overflow="hidden"
        >
          <Vertical
            flex={1}
            padding={10}
            gap={2}
            borderRightWidth={1}
            borderRightStyle="solid"
            borderColor={palette.border}
          >
            <Text
              fontSize={10}
              fontWeight="700"
              letterSpacing="0.06em"
              color={palette.text}
            >
              CHECK-IN
            </Text>
            <Text fontSize={14} color={palette.text}>
              Mar 12, 2026
            </Text>
          </Vertical>
          <Vertical flex={1} padding={10} gap={2}>
            <Text
              fontSize={10}
              fontWeight="700"
              letterSpacing="0.06em"
              color={palette.text}
            >
              CHECKOUT
            </Text>
            <Text fontSize={14} color={palette.text}>
              Mar 18, 2026
            </Text>
          </Vertical>
        </Horizontal>
        <Vertical
          padding={10}
          gap={2}
          borderRadius={10}
          borderWidth={1}
          borderStyle="solid"
          borderColor={palette.border}
        >
          <Text
            fontSize={10}
            fontWeight="700"
            letterSpacing="0.06em"
            color={palette.text}
          >
            GUESTS
          </Text>
          <Text fontSize={14} color={palette.text}>
            2 adults
          </Text>
        </Vertical>
        <Button isFilled size="lg">
          Reserve
        </Button>
        <Separator />
        <Vertical gap={6}>
          <Horizontal justifyContent="space-between">
            <Text fontSize={14} color={palette.text}>
              $182 × 6 nights
            </Text>
            <Text fontSize={14} color={palette.text}>
              $1,092
            </Text>
          </Horizontal>
          <Horizontal justifyContent="space-between">
            <Text fontSize={14} color={palette.text}>
              Cleaning fee
            </Text>
            <Text fontSize={14} color={palette.text}>
              $48
            </Text>
          </Horizontal>
          <Horizontal justifyContent="space-between">
            <Text fontSize={14} color={palette.text}>
              Service fee
            </Text>
            <Text fontSize={14} color={palette.text}>
              $165
            </Text>
          </Horizontal>
        </Vertical>
        <Separator />
        <Horizontal justifyContent="space-between">
          <Text fontSize={15} fontWeight="700" color={palette.text}>
            Total before taxes
          </Text>
          <Text fontSize={15} fontWeight="700" color={palette.text}>
            $1,305
          </Text>
        </Horizontal>
      </Vertical>
    </Card.Content>
  </Card>
);

type PricingTier = {
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  ctaLabel: string;
  featured?: boolean;
};

const tierPricingPlans: PricingTier[] = [
  {
    name: 'Starter',
    tagline: 'For solo makers shipping their first project.',
    price: '$0',
    period: '/ month',
    features: ['1 workspace', 'Up to 3 projects', 'Community support'],
    ctaLabel: 'Get started',
  },
  {
    name: 'Pro',
    tagline: 'For growing teams that need more room to build.',
    price: '$24',
    period: '/ month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority email support',
      'Custom domains',
    ],
    ctaLabel: 'Start free trial',
    featured: true,
  },
  {
    name: 'Enterprise',
    tagline: 'For organizations with security and scale needs.',
    price: 'Custom',
    period: '',
    features: [
      'SSO & SCIM',
      'Audit logs',
      'Dedicated success manager',
      '99.99% uptime SLA',
    ],
    ctaLabel: 'Contact sales',
  },
];

const TierPricingCardSample = ({
  palette,
  tier,
  personality,
}: {
  palette: SurfacePalette;
  tier: PricingTier;
  personality: BrandPersonality;
}) => {
  const density = personalityDensityScale(personality);
  const surface = personalitySurfaceStyle(personality, palette);
  const featuredBg = personalityAccentBackground(personality, palette);
  const featuredShadow = personalityAccentShadow(personality, palette);
  return (
    <View
      width="min(100%, 280px)"
      borderRadius={personality.cardRadius}
      overflow="hidden"
      borderWidth={tier.featured ? 0 : 1}
      borderStyle="solid"
      style={{
        ...(tier.featured
          ? { background: featuredBg, boxShadow: featuredShadow }
          : surface),
        borderColor: palette.border,
        color: tier.featured ? palette.onPrimary : palette.text,
      }}
    >
      <Vertical gap={density.gap} padding={density.padding}>
        <Vertical gap={6}>
          <Horizontal alignItems="center" justifyContent="space-between">
            <Text
              fontSize={13}
              color={tier.featured ? palette.onPrimary : palette.text}
              style={personalityLabelStyle(personality)}
            >
              {tier.name}
            </Text>
            {tier.featured ? (
              <View
                paddingHorizontal={10}
                paddingVertical={4}
                borderRadius={personality.badgeRadius}
                backgroundColor={softCss(palette.onPrimary, 22)}
              >
                <Horizontal gap={4} alignItems="center">
                  <Text
                    fontSize={11}
                    color={palette.onPrimary}
                    style={{ lineHeight: 1 }}
                  >
                    {personality.signatureMotif}
                  </Text>
                  <Text
                    fontSize={10}
                    color={palette.onPrimary}
                    style={personalityLabelStyle(personality)}
                  >
                    {personality.voice.includes('mission')
                      ? 'PRIORITY'
                      : 'POPULAR'}
                  </Text>
                </Horizontal>
              </View>
            ) : null}
          </Horizontal>
          <Text
            fontSize={13}
            lineHeight="18px"
            color={
              tier.featured ? softCss(palette.onPrimary, 85) : palette.muted
            }
            style={{ fontStyle: personality.typeStyle }}
          >
            {tier.tagline}
          </Text>
        </Vertical>
        <Horizontal alignItems="baseline" gap={4}>
          <Text
            fontSize={density.large + 8}
            color={tier.featured ? palette.onPrimary : palette.text}
            style={personalityHeadingStyle(personality)}
          >
            {tier.price}
          </Text>
          {tier.period ? (
            <Text
              fontSize={14}
              color={
                tier.featured ? softCss(palette.onPrimary, 85) : palette.muted
              }
              style={{ fontStyle: personality.typeStyle }}
            >
              {tier.period}
            </Text>
          ) : null}
        </Horizontal>
        <Vertical gap={8}>
          {tier.features.map((feature) => (
            <Horizontal key={feature} gap={8} alignItems="center">
              <View
                width={18}
                height={18}
                borderRadius={personality.cornerStyle === 'sharp' ? 2 : 9999}
                backgroundColor={
                  tier.featured
                    ? softCss(palette.onPrimary, 22)
                    : palette.primary
                }
                alignItems="center"
                justifyContent="center"
                style={{ display: 'flex', flexShrink: 0 }}
              >
                <Text
                  fontSize={11}
                  color={palette.onPrimary}
                  style={{
                    lineHeight: 1,
                    fontWeight: personalityFontWeight(personality, 'heavy'),
                  }}
                >
                  {personality.cornerStyle === 'sharp' ? '+' : '✓'}
                </Text>
              </View>
              <Text
                fontSize={13}
                color={tier.featured ? palette.onPrimary : palette.text}
                style={{
                  textTransform:
                    personality.typeCase === 'uppercase' ? 'uppercase' : 'none',
                  letterSpacing:
                    personality.typeCase === 'uppercase' ? '0.04em' : 'normal',
                  fontStyle: personality.typeStyle,
                }}
              >
                {feature}
              </Text>
            </Horizontal>
          ))}
        </Vertical>
        <View
          alignSelf="stretch"
          paddingHorizontal={20}
          paddingVertical={12}
          borderRadius={personality.pillRadius}
          alignItems="center"
          justifyContent="center"
          style={{
            display: 'flex',
            cursor: 'pointer',
            // Featured card sits on `primary`, so its CTA is the inverse chip
            // (`onPrimary` ground, `primary` ink). Both flip together with the
            // card, so contrast holds in light AND dark with no branching.
            backgroundColor: tier.featured ? palette.onPrimary : palette.text,
          }}
        >
          <Text
            fontSize={14}
            color={tier.featured ? palette.primary : palette.canvas}
            style={{
              ...personalityLabelStyle(personality),
              letterSpacing:
                personality.typeCase === 'uppercase' ? '0.08em' : '0.02em',
            }}
          >
            {tier.ctaLabel}
          </Text>
        </View>
      </Vertical>
    </View>
  );
};

const ProductPricingCardSample = ({
  palette,
  personality,
}: {
  palette: SurfacePalette;
  personality: BrandPersonality;
}) => {
  const density = personalityDensityScale(personality);
  const surface = personalitySurfaceStyle(personality, palette);
  const productName =
    personality.voice.includes('athletic') ||
    personality.voice.includes('motion')
      ? 'Aero Runner GT'
      : personality.voice.includes('mission') ||
        personality.voice.includes('futurist')
      ? 'Module-04 Insulated Jacket'
      : 'Linen Throw Pillow';
  const productMeta =
    personality.voice.includes('athletic') ||
    personality.voice.includes('motion')
      ? 'Court Black · Mens'
      : personality.voice.includes('mission') ||
        personality.voice.includes('futurist')
      ? 'Carbon · Standard fit'
      : 'Stonewashed · Sand';
  return (
    <View
      width="min(100%, 320px)"
      borderRadius={personality.cardRadius}
      overflow="hidden"
      borderWidth={1}
      borderStyle="solid"
      style={{ ...surface, borderColor: palette.border, color: palette.text }}
    >
      <Vertical gap={density.gap} padding={density.padding}>
        <View
          height={120}
          borderRadius={personality.cardRadius}
          style={{
            background:
              personality.accentTreatment === 'gradient'
                ? `linear-gradient(135deg, ${softCss(
                    palette.primary,
                    20
                  )} 0%, ${softCss(
                    palette.secondary || palette.primary,
                    20
                  )} 100%)`
                : palette.appearance === 'dark'
                ? 'rgba(255,255,255,0.06)'
                : 'rgba(0,0,0,0.04)',
          }}
        />
        <Vertical gap={4}>
          <Horizontal alignItems="center" justifyContent="space-between">
            <Text
              fontSize={15}
              color={palette.text}
              style={personalityHeadingStyle(personality)}
            >
              {productName}
            </Text>
            <View
              paddingHorizontal={10}
              paddingVertical={3}
              borderRadius={personality.badgeRadius}
              style={{
                backgroundColor:
                  palette.appearance === 'dark'
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.06)',
              }}
            >
              <Text
                fontSize={10}
                color={palette.text}
                style={personalityLabelStyle(personality)}
              >
                IN STOCK
              </Text>
            </View>
          </Horizontal>
          <Text
            fontSize={12}
            color={palette.muted}
            style={{
              fontStyle: personality.typeStyle,
              textTransform:
                personality.typeCase === 'uppercase' ? 'uppercase' : 'none',
              letterSpacing:
                personality.typeCase === 'uppercase' ? '0.04em' : 'normal',
            }}
          >
            {productMeta}
          </Text>
        </Vertical>
        <Horizontal alignItems="baseline" justifyContent="space-between">
          <Horizontal alignItems="baseline" gap={6}>
            <Text
              fontSize={24}
              color={palette.text}
              style={personalityHeadingStyle(personality)}
            >
              $42
            </Text>
            <Text
              fontSize={13}
              color={palette.muted}
              style={{ textDecoration: 'line-through' }}
            >
              $56
            </Text>
          </Horizontal>
          <Text
            fontSize={12}
            color={palette.success || palette.muted}
            style={personalityLabelStyle(personality)}
          >
            FREE SHIPPING
          </Text>
        </Horizontal>
        <View
          alignSelf="stretch"
          paddingHorizontal={20}
          paddingVertical={12}
          borderRadius={personality.pillRadius}
          alignItems="center"
          justifyContent="center"
          style={{
            display: 'flex',
            cursor: 'pointer',
            background: personalityAccentBackground(personality, palette),
            boxShadow: personalityAccentShadow(personality, palette),
          }}
        >
          <Text
            fontSize={14}
            color={palette.onPrimary}
            style={{
              ...personalityLabelStyle(personality),
              letterSpacing:
                personality.typeCase === 'uppercase' ? '0.08em' : '0.02em',
            }}
          >
            Add to cart
          </Text>
        </View>
      </Vertical>
    </View>
  );
};

const FeaturedPricingCardSample = ({
  palette,
  personality,
}: {
  palette: SurfacePalette;
  personality: BrandPersonality;
}) => {
  const density = personalityDensityScale(personality);
  const surface = personalitySurfaceStyle(personality, palette);
  const motif = personality.signatureMotif;
  const favoriteIcon = personality.voice.includes('athletic')
    ? '★'
    : personality.voice.includes('mission') ||
      personality.voice.includes('futurist')
    ? '◉'
    : '♥';
  const productName = personality.voice.includes('athletic')
    ? 'Velocity AirFlow 7'
    : personality.voice.includes('mission') ||
      personality.voice.includes('futurist')
    ? 'Sentinel Pro Headset'
    : personality.voice.includes('refined')
    ? 'Pulse Studio Monitor'
    : 'Aurora Wireless Headphones';
  const productMeta = personality.voice.includes('athletic')
    ? 'Lightweight knit · 280g'
    : personality.voice.includes('mission') ||
      personality.voice.includes('futurist')
    ? 'Mil-spec audio · 60h endurance'
    : 'Active noise cancelling · 40h battery';
  const bestSellerLabel = personality.voice.includes('mission')
    ? 'MISSION PICK'
    : personality.voice.includes('athletic')
    ? 'TEAM PICK'
    : personality.voice.includes('futurist')
    ? 'SIGNATURE'
    : 'BEST SELLER';

  return (
    <View position="relative" width="min(100%, 320px)">
      <View
        position="absolute"
        top={-10}
        left={16}
        paddingHorizontal={12}
        paddingVertical={6}
        borderRadius={personality.badgeRadius}
        zIndex={2}
        style={{
          background: personalityAccentBackground(personality, palette),
          boxShadow:
            personalityAccentShadow(personality, palette) ||
            (palette.appearance === 'dark'
              ? '0 6px 14px rgba(0,0,0,0.5)'
              : '0 6px 14px rgba(0,0,0,0.12)'),
        }}
      >
        <Horizontal gap={6} alignItems="center">
          <Text
            fontSize={11}
            color={palette.onPrimary}
            style={{
              lineHeight: 1,
              fontWeight: personalityFontWeight(personality, 'heavy'),
            }}
          >
            {motif}
          </Text>
          <Text
            fontSize={10}
            color={palette.onPrimary}
            style={personalityLabelStyle(personality)}
          >
            {bestSellerLabel}
          </Text>
        </Horizontal>
      </View>
      <View
        position="absolute"
        top={12}
        right={12}
        width={36}
        height={36}
        borderRadius={personality.cornerStyle === 'sharp' ? 4 : 9999}
        borderWidth={1}
        borderStyle="solid"
        zIndex={2}
        alignItems="center"
        justifyContent="center"
        style={{
          display: 'flex',
          cursor: 'pointer',
          backgroundColor:
            palette.appearance === 'dark'
              ? 'rgba(0,0,0,0.45)'
              : 'rgba(255,255,255,0.92)',
          borderColor: palette.border,
          backdropFilter: 'blur(6px)',
        }}
      >
        <Text
          fontSize={16}
          color={
            favoriteIcon === '♥'
              ? palette.error || palette.primary
              : palette.primary
          }
          style={{ lineHeight: 1 }}
        >
          {favoriteIcon}
        </Text>
      </View>
      <View
        width="100%"
        borderRadius={personality.cardRadius}
        overflow="hidden"
        borderWidth={1}
        borderStyle="solid"
        style={{ ...surface, borderColor: palette.border, color: palette.text }}
      >
        <Vertical gap={density.gap} padding={density.padding}>
          <View
            height={140}
            borderRadius={personality.cardRadius}
            style={{
              background:
                personality.accentTreatment === 'gradient'
                  ? `linear-gradient(135deg, ${softCss(
                      palette.primary,
                      20
                    )} 0%, ${softCss(
                      palette.secondary || palette.primary,
                      20
                    )} 100%)`
                  : palette.appearance === 'dark'
                  ? 'rgba(255,255,255,0.06)'
                  : 'rgba(0,0,0,0.04)',
            }}
          />
          <Vertical gap={6}>
            <Horizontal gap={6} alignItems="center">
              <Text
                fontSize={13}
                color={palette.warning || palette.primary}
                style={{ lineHeight: 1 }}
              >
                ★★★★★
              </Text>
              <Text fontSize={12} color={palette.muted}>
                4.9 · 1,284 reviews
              </Text>
            </Horizontal>
            <Text
              fontSize={18}
              color={palette.text}
              style={personalityHeadingStyle(personality)}
            >
              {productName}
            </Text>
            <Text
              fontSize={12}
              color={palette.muted}
              style={{
                fontStyle: personality.typeStyle,
                textTransform:
                  personality.typeCase === 'uppercase' ? 'uppercase' : 'none',
                letterSpacing:
                  personality.typeCase === 'uppercase' ? '0.04em' : 'normal',
              }}
            >
              {productMeta}
            </Text>
          </Vertical>
          <Horizontal alignItems="baseline" justifyContent="space-between">
            <Horizontal alignItems="baseline" gap={6}>
              <Text
                fontSize={26}
                color={palette.text}
                style={personalityHeadingStyle(personality)}
              >
                $189
              </Text>
              <Text
                fontSize={13}
                color={palette.muted}
                style={{ textDecoration: 'line-through' }}
              >
                $249
              </Text>
            </Horizontal>
            <View
              paddingHorizontal={8}
              paddingVertical={3}
              borderRadius={personality.badgeRadius}
              style={{
                backgroundColor:
                  palette.appearance === 'dark'
                    ? 'rgba(255,255,255,0.08)'
                    : 'rgba(0,0,0,0.06)',
              }}
            >
              <Text
                fontSize={10}
                color={palette.text}
                style={personalityLabelStyle(personality)}
              >
                –24%
              </Text>
            </View>
          </Horizontal>
          <Horizontal gap={8}>
            <View
              flex={1}
              paddingHorizontal={16}
              paddingVertical={12}
              borderRadius={personality.pillRadius}
              alignItems="center"
              justifyContent="center"
              style={{
                display: 'flex',
                cursor: 'pointer',
                background: personalityAccentBackground(personality, palette),
                boxShadow: personalityAccentShadow(personality, palette),
              }}
            >
              <Text
                fontSize={13}
                color={palette.onPrimary}
                style={{
                  ...personalityLabelStyle(personality),
                  letterSpacing:
                    personality.typeCase === 'uppercase' ? '0.08em' : '0.02em',
                }}
              >
                Buy now
              </Text>
            </View>
            <View
              paddingHorizontal={16}
              paddingVertical={12}
              borderRadius={personality.pillRadius}
              borderWidth={1}
              borderStyle="solid"
              alignItems="center"
              justifyContent="center"
              style={{
                display: 'flex',
                cursor: 'pointer',
                borderColor: palette.border,
              }}
            >
              <Text
                fontSize={13}
                color={palette.text}
                style={{
                  ...personalityLabelStyle(personality),
                  letterSpacing:
                    personality.typeCase === 'uppercase' ? '0.08em' : '0.02em',
                }}
              >
                Add to cart
              </Text>
            </View>
          </Horizontal>
        </Vertical>
      </View>
    </View>
  );
};

type ColorBlock = {
  slug: string;
  source: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ink';
  intensity: 'tint' | 'solid' | 'inverted';
  heading: string;
  body: string;
  cta: string;
};

const colorBlockContent: ColorBlock[] = [
  {
    slug: 'PRIMARY-TINT',
    source: 'primary',
    intensity: 'tint',
    heading: 'Bring everyone together with systems that scale',
    body: 'Signature primary ground for systems, FAQ, and the contact form.',
    cta: 'Get started',
  },
  {
    slug: 'SECONDARY-TINT',
    source: 'secondary',
    intensity: 'tint',
    heading: 'A faster, more efficient way of working',
    body: 'Secondary ground for hero moments and supporting narrative.',
    cta: 'Explore',
  },
  {
    slug: 'WARNING-TINT',
    source: 'warning',
    intensity: 'tint',
    heading: 'Designed for the way ideas actually move',
    body: 'Warm tint for product storytelling and brand moments.',
    cta: 'See the story',
  },
  {
    slug: 'SUCCESS-TINT',
    source: 'success',
    intensity: 'tint',
    heading: 'Ship with confidence, every single release',
    body: 'Cool tint for changelogs, releases, and reliability notes.',
    cta: 'Read changelog',
  },
  {
    slug: 'ERROR-TINT',
    source: 'error',
    intensity: 'tint',
    heading: 'Built for teams who care about the details',
    body: 'Saturated tint for community stories and testimonials.',
    cta: 'Meet the makers',
  },
  {
    slug: 'INK-INVERTED',
    source: 'ink',
    intensity: 'inverted',
    heading: 'Go deeper. Go further. Go all-in.',
    body: 'Inverted ground for premium tiers and developer surfaces.',
    cta: 'Open the docs',
  },
];

const hexToRgba = (hex: string, alpha: number): string => {
  const normalized = hex.replace('#', '').padEnd(6, '0').slice(0, 6);
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return hex;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const isHexColor = (value: string): boolean =>
  typeof value === 'string' && /^#([0-9a-f]{3}){1,2}$/i.test(value);

const tintColor = (
  color: string,
  alpha: number,
  appearance: 'light' | 'dark'
): string => {
  if (isHexColor(color)) return hexToRgba(color, alpha);
  if (color.startsWith('rgba') || color.startsWith('rgb')) {
    return color.replace(/rgba?\(([^)]+)\)/, (_, inside) => {
      const parts = inside
        .split(',')
        .slice(0, 3)
        .map((s: string) => s.trim());
      return `rgba(${parts.join(', ')}, ${alpha})`;
    });
  }
  return appearance === 'dark'
    ? `rgba(255,255,255,${alpha})`
    : `rgba(0,0,0,${alpha})`;
};

const ColorBlockContentCardSample = ({
  block,
  palette,
  personality,
}: {
  block: ColorBlock;
  palette: SurfacePalette;
  personality: BrandPersonality;
}) => {
  const density = personalityDensityScale(personality);
  let background: string;
  let ink: string;

  if (block.source === 'ink') {
    // Inverted card: always flips the canvas — dark card with light ink on light
    // brands, light card with dark ink on dark brands.
    background = palette.text;
    ink = palette.canvas;
  } else {
    const sourceHex = palette[block.source] || palette.primary;
    if (block.intensity === 'solid') {
      background = sourceHex;
      ink = palette.onPrimary;
    } else {
      background = tintColor(sourceHex, 0.32, palette.appearance);
      ink = palette.appearance === 'dark' ? palette.text : palette.text;
    }
  }

  if (
    personality.accentTreatment === 'gradient' &&
    block.intensity === 'tint'
  ) {
    const a = palette[block.source as keyof SurfacePalette] as string;
    const b = palette.secondary;
    if (isHexColor(a) && isHexColor(b)) {
      background = `linear-gradient(135deg, ${hexToRgba(
        a,
        0.32
      )} 0%, ${hexToRgba(b, 0.32)} 100%)`;
    }
  }
  if (personality.accentTreatment === 'stripe' && block.intensity === 'tint') {
    const a = tintColor(
      palette[block.source as keyof SurfacePalette] as string,
      0.32,
      palette.appearance
    );
    const b = tintColor(palette.secondary, 0.18, palette.appearance);
    background = `repeating-linear-gradient(135deg, ${a} 0 18px, ${b} 18px 36px)`;
  }

  const inkSoft = tintColor(ink, 0.72, palette.appearance);
  const inkMuted = tintColor(ink, 0.55, palette.appearance);
  // Button uses the card ink color as its background, and the card background's
  // counterpart as its text — guarantees contrast on every brand.
  const buttonBg = ink;
  const buttonInk = ink === palette.canvas ? palette.text : palette.canvas;

  return (
    <View
      width="min(100%, 460px)"
      borderRadius={personality.cardRadius * 2}
      padding={density.large}
      style={{ background }}
    >
      <Vertical gap={density.gap + 6}>
        <Text
          fontSize={11}
          color={inkMuted}
          style={{
            ...personalityLabelStyle(personality),
            letterSpacing: '0.12em',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
          }}
        >
          {personality.signatureMotif} {block.slug}
        </Text>
        <Vertical gap={14}>
          <Text
            fontSize={32}
            lineHeight="36px"
            color={ink}
            style={personalityHeadingStyle(personality)}
          >
            {block.heading}
          </Text>
          <Text
            fontSize={16}
            lineHeight="22px"
            color={inkSoft}
            style={{ fontStyle: personality.typeStyle }}
          >
            {block.body}
          </Text>
        </Vertical>
        <View
          alignSelf="flex-start"
          paddingHorizontal={28}
          paddingVertical={14}
          borderRadius={personality.pillRadius}
          style={{ backgroundColor: buttonBg, cursor: 'pointer' }}
        >
          <Text
            fontSize={15}
            color={buttonInk}
            style={{
              ...personalityLabelStyle(personality),
              letterSpacing:
                personality.typeCase === 'uppercase' ? '0.08em' : '0.01em',
              textTransform:
                personality.typeCase === 'uppercase' ? 'uppercase' : 'none',
            }}
          >
            {block.cta}
          </Text>
        </View>
      </Vertical>
    </View>
  );
};

type ContentArticle = {
  id: string;
  badge: string;
  badgeTone: 'primary' | 'success' | 'warning' | 'error';
  favorite: '♥' | '★' | '⛉';
  category: string;
  title: string;
  excerpt: string;
  author: string;
  meta: string;
  imageTone: 'warm' | 'cool' | 'mono';
};

const contentArticles: ContentArticle[] = [
  {
    id: 'design-tokens',
    badge: 'NEW',
    badgeTone: 'success',
    favorite: '♥',
    category: 'Design systems',
    title: 'Design tokens that survive a redesign',
    excerpt:
      'Why semantic naming beats raw values — and how to migrate a token set without breaking every consumer.',
    author: 'Léa Martin',
    meta: '6 min read · Mar 10',
    imageTone: 'warm',
  },
  {
    id: 'shipping-faster',
    badge: 'FEATURED',
    badgeTone: 'primary',
    favorite: '★',
    category: 'Engineering',
    title: 'Shipping faster without skipping review',
    excerpt:
      'Three async patterns we use to keep PR cycle time under 24h while still catching the regressions that matter.',
    author: 'Jordan Reyes',
    meta: '9 min read · Mar 04',
    imageTone: 'cool',
  },
  {
    id: 'a11y-audit',
    badge: 'TRENDING',
    badgeTone: 'warning',
    favorite: '⛉',
    category: 'Accessibility',
    title: 'The accessibility audit nobody asked for',
    excerpt:
      'A walkthrough of the 12 issues we found on our own marketing site — and the four-week fix plan that followed.',
    author: 'Ines Okafor',
    meta: '12 min read · Feb 27',
    imageTone: 'mono',
  },
];

const ContentCardWithBadgeSample = ({
  palette,
  article,
  personality,
}: {
  palette: SurfacePalette;
  article: ContentArticle;
  personality: BrandPersonality;
}) => {
  const density = personalityDensityScale(personality);
  const surface = personalitySurfaceStyle(personality, palette);
  const accent = palette[article.badgeTone] || palette.primary;
  const secondary = palette.secondary || palette.primary;
  const imageBg =
    personality.accentTreatment === 'gradient'
      ? `linear-gradient(135deg, ${tintColor(
          accent,
          0.55,
          palette.appearance
        )} 0%, ${tintColor(secondary, 0.55, palette.appearance)} 100%)`
      : personality.accentTreatment === 'stripe'
      ? `repeating-linear-gradient(45deg, ${tintColor(
          accent,
          0.45,
          palette.appearance
        )} 0 16px, ${tintColor(secondary, 0.25, palette.appearance)} 16px 32px)`
      : personality.accentTreatment === 'halftone'
      ? `radial-gradient(circle at 30% 30%, ${tintColor(
          accent,
          0.55,
          palette.appearance
        )} 0%, ${tintColor(secondary, 0.35, palette.appearance)} 70%)`
      : personality.accentTreatment === 'glow'
      ? `radial-gradient(circle at 50% 60%, ${tintColor(
          accent,
          0.45,
          palette.appearance
        )} 0%, ${palette.appearance === 'dark' ? '#050505' : '#0a0a0a'} 100%)`
      : tintColor(accent, 0.32, palette.appearance);

  const favoriteSymbol =
    personality.voice.includes('mission') ||
    personality.voice.includes('futurist')
      ? '◉'
      : article.favorite;
  const favoriteColor =
    favoriteSymbol === '♥'
      ? palette.error || palette.primary
      : favoriteSymbol === '★'
      ? palette.warning || palette.primary
      : palette.primary;

  return (
    <View
      width="min(100%, 320px)"
      borderRadius={personality.cardRadius}
      overflow="hidden"
      borderWidth={1}
      borderStyle="solid"
      style={{ ...surface, borderColor: palette.border, color: palette.text }}
    >
      <Vertical gap={density.gap} padding={density.padding}>
        <View
          position="relative"
          height={160}
          borderRadius={personality.cardRadius}
          overflow="hidden"
          style={{ background: imageBg }}
        >
          <View
            position="absolute"
            top={12}
            left={12}
            paddingHorizontal={10}
            paddingVertical={4}
            borderRadius={personality.badgeRadius}
            style={{
              background: personalityAccentBackground(personality, {
                ...palette,
                primary: accent,
              }),
              boxShadow: personalityAccentShadow(personality, palette),
            }}
          >
            <Horizontal gap={4} alignItems="center">
              <Text
                fontSize={10}
                color={palette.onPrimary}
                style={{
                  lineHeight: 1,
                  fontWeight: personalityFontWeight(personality, 'heavy'),
                }}
              >
                {personality.signatureMotif}
              </Text>
              <Text
                fontSize={10}
                color={palette.onPrimary}
                style={personalityLabelStyle(personality)}
              >
                {article.badge}
              </Text>
            </Horizontal>
          </View>
          <View
            position="absolute"
            top={10}
            right={10}
            width={36}
            height={36}
            borderRadius={personality.cornerStyle === 'sharp' ? 4 : 9999}
            borderWidth={1}
            borderStyle="solid"
            alignItems="center"
            justifyContent="center"
            style={{
              display: 'flex',
              cursor: 'pointer',
              backgroundColor:
                palette.appearance === 'dark'
                  ? 'rgba(0,0,0,0.45)'
                  : 'rgba(255,255,255,0.92)',
              borderColor: palette.border,
              backdropFilter: 'blur(6px)',
            }}
          >
            <Text fontSize={16} color={favoriteColor} style={{ lineHeight: 1 }}>
              {favoriteSymbol}
            </Text>
          </View>
        </View>
        <Vertical gap={8}>
          <Text
            fontSize={11}
            color={palette.muted}
            style={personalityLabelStyle(personality)}
          >
            {article.category}
          </Text>
          <Text
            fontSize={18}
            lineHeight="24px"
            color={palette.text}
            style={personalityHeadingStyle(personality)}
          >
            {article.title}
          </Text>
          <Text
            fontSize={13}
            lineHeight="18px"
            color={palette.muted}
            style={{ fontStyle: personality.typeStyle }}
          >
            {article.excerpt}
          </Text>
        </Vertical>
        <Horizontal gap={10} alignItems="center">
          <View
            width={28}
            height={28}
            borderRadius={personality.cornerStyle === 'sharp' ? 4 : 9999}
            style={{
              backgroundColor:
                palette.appearance === 'dark'
                  ? 'rgba(255,255,255,0.12)'
                  : 'rgba(0,0,0,0.08)',
            }}
          />
          <Vertical gap={0}>
            <Text
              fontSize={12}
              color={palette.text}
              style={{
                fontWeight: personalityFontWeight(personality, 'normal'),
                fontStyle: personality.typeStyle,
              }}
            >
              {article.author}
            </Text>
            <Text fontSize={11} color={palette.muted}>
              {article.meta}
            </Text>
          </Vertical>
        </Horizontal>
      </Vertical>
    </View>
  );
};

const BrandSnapshotSample = ({
  palette,
  personality,
  config,
}: {
  palette: SurfacePalette;
  personality: BrandPersonality;
  config: DesignSystemConfig;
}) => {
  const motif = personality.signatureMotif;
  const accent = palette.primary;
  const accentBg = personalityAccentBackground(personality, palette);
  const accentShadow = personalityAccentShadow(personality, palette);
  const brandFont =
    (config.tokens?.typography?.fontFamily as string) ||
    (config.tokens?.rawCssVars as any)?.display ||
    'inherit';

  const heroTagline = personality.voice.includes('mission')
    ? 'MAKING LIFE MULTIPLANETARY'
    : personality.voice.includes('athletic')
    ? 'JUST DO IT'
    : personality.voice.includes('refined')
    ? 'A new standard in payments'
    : personality.voice.includes('speed')
    ? 'Built for the makers'
    : personality.voice.includes('rhythmic')
    ? 'Music for everyone'
    : personality.voice.includes('thoughtful')
    ? 'The connected workspace'
    : personality.voice.includes('warm')
    ? 'Belong anywhere'
    : personality.voice.includes('minimal')
    ? 'Think different'
    : personality.voice.includes('commerce')
    ? 'The platform commerce is built on'
    : personality.voice.includes('bold-fintech')
    ? 'Money for the next generation'
    : personality.voice.includes('trustworthy')
    ? 'The future of money'
    : personality.voice.includes('playful')
    ? 'Nothing great is made alone'
    : personality.voice.includes('motion')
    ? 'Get there'
    : personality.voice.includes('deploy')
    ? 'Develop. Preview. Ship.'
    : personality.voice.includes('futurist')
    ? 'Accelerating the world to sustainable energy'
    : `${config.metadata.label}`;

  const ctaPrimary =
    personality.typeCase === 'uppercase' ? 'EXPLORE' : 'Get started';
  const ctaSecondary =
    personality.typeCase === 'uppercase' ? 'LEARN MORE' : 'Learn more';

  return (
    <View
      width="100%"
      borderRadius={personality.cardRadius * 2}
      padding={
        personality.density === 'spacious'
          ? 56
          : personality.density === 'tight'
          ? 28
          : 40
      }
      style={{
        backgroundColor: palette.canvas,
        color: palette.text,
        fontFamily: brandFont,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {personality.accentTreatment === 'glow' && (
        <View
          position="absolute"
          top={-120}
          right={-80}
          width={360}
          height={360}
          borderRadius={9999}
          style={{
            background: `radial-gradient(circle, ${accent}40 0%, transparent 70%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {personality.accentTreatment === 'halftone' && (
        <View
          position="absolute"
          top={0}
          right={0}
          width={300}
          height={300}
          style={{
            background: `radial-gradient(circle at 70% 30%, ${accent}30 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      <Vertical gap={24} style={{ position: 'relative' }}>
        <Horizontal gap={10} alignItems="center">
          <View
            width={32}
            height={32}
            borderRadius={
              personality.cornerStyle === 'pill'
                ? 9999
                : personality.cornerStyle === 'sharp'
                ? 0
                : 8
            }
            alignItems="center"
            justifyContent="center"
            style={{
              display: 'flex',
              background: accentBg,
              boxShadow: accentShadow,
            }}
          >
            <Text
              fontSize={16}
              color={palette.onPrimary}
              style={{
                lineHeight: 1,
                fontWeight: personalityFontWeight(personality, 'heavy'),
              }}
            >
              {motif}
            </Text>
          </View>
          <Text
            fontSize={13}
            color={palette.muted}
            style={{
              ...personalityLabelStyle(personality),
              letterSpacing:
                personality.typeCase === 'uppercase' ? '0.18em' : '0.06em',
            }}
          >
            {config.metadata.label}
          </Text>
        </Horizontal>
        <Text
          fontSize={
            personality.density === 'spacious'
              ? 56
              : personality.density === 'tight'
              ? 40
              : 48
          }
          lineHeight={
            personality.density === 'spacious'
              ? '60px'
              : personality.density === 'tight'
              ? '44px'
              : '52px'
          }
          color={palette.text}
          style={{
            ...personalityHeadingStyle(personality),
            letterSpacing:
              personality.typeCase === 'uppercase'
                ? '0.06em'
                : personality.letterSpacing,
            maxWidth: 580,
            fontFamily: brandFont,
          }}
        >
          {heroTagline}
        </Text>
        <Horizontal gap={12} flexWrap="wrap" alignItems="center">
          <View
            paddingHorizontal={personality.density === 'spacious' ? 32 : 24}
            paddingVertical={personality.density === 'spacious' ? 16 : 14}
            borderRadius={personality.pillRadius}
            style={{
              display: 'flex',
              cursor: 'pointer',
              background: accentBg,
              boxShadow: accentShadow,
            }}
          >
            <Text
              fontSize={15}
              color={palette.onPrimary}
              style={{
                ...personalityLabelStyle(personality),
                letterSpacing:
                  personality.typeCase === 'uppercase' ? '0.14em' : '0.02em',
                fontWeight: personalityFontWeight(personality, 'heavy'),
                fontFamily: brandFont,
              }}
            >
              {ctaPrimary}
            </Text>
          </View>
          <View
            paddingHorizontal={24}
            paddingVertical={14}
            borderRadius={personality.pillRadius}
            borderWidth={1}
            borderStyle="solid"
            style={{
              display: 'flex',
              cursor: 'pointer',
              borderColor: palette.text,
            }}
          >
            <Text
              fontSize={15}
              color={palette.text}
              style={{
                ...personalityLabelStyle(personality),
                letterSpacing:
                  personality.typeCase === 'uppercase' ? '0.14em' : '0.02em',
                fontWeight: personalityFontWeight(personality, 'heavy'),
                fontFamily: brandFont,
              }}
            >
              {ctaSecondary}
            </Text>
          </View>
        </Horizontal>
        <Horizontal gap={20} flexWrap="wrap" alignItems="center" marginTop={8}>
          {[
            { label: 'Primary', value: palette.primary },
            { label: 'Surface', value: palette.surface },
            { label: 'Text', value: palette.text },
            { label: 'Success', value: palette.success },
          ].map((swatch) => (
            <Horizontal key={swatch.label} gap={8} alignItems="center">
              <View
                width={20}
                height={20}
                borderRadius={
                  personality.cornerStyle === 'sharp'
                    ? 0
                    : personality.cornerStyle === 'pill'
                    ? 9999
                    : 4
                }
                borderWidth={1}
                borderStyle="solid"
                style={{
                  backgroundColor: swatch.value,
                  borderColor: palette.border,
                }}
              />
              <Vertical gap={0}>
                <Text
                  fontSize={11}
                  color={palette.muted}
                  style={personalityLabelStyle(personality)}
                >
                  {swatch.label}
                </Text>
                <Text
                  fontSize={11}
                  color={palette.text}
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, Menlo, monospace',
                  }}
                >
                  {tokenLabel(swatch.value)}
                </Text>
              </Vertical>
            </Horizontal>
          ))}
        </Horizontal>
      </Vertical>
    </View>
  );
};

const CTACardSample = ({
  palette,
  config,
}: {
  palette: SurfacePalette;
  config: DesignSystemConfig;
}) => (
  <Vertical
    gap={20}
    padding={36}
    alignItems="center"
    borderRadius={16}
    style={{ backgroundColor: palette.surface }}
  >
    <Badge variant="outline" content="New release" />
    <Vertical gap={8} alignItems="center">
      <Text
        fontSize={36}
        lineHeight="40px"
        fontWeight="800"
        textAlign="center"
        color={palette.text}
      >
        {config.metadata.label} Pro
      </Text>
      <Text
        fontSize={18}
        lineHeight="24px"
        color={palette.muted}
        textAlign="center"
      >
        Pro. Beyond.
      </Text>
    </Vertical>
    <Horizontal gap={12} flexWrap="wrap" justifyContent="center">
      <Button shape="pill" size="md">
        Learn more
      </Button>
      <Button shape="pill" size="md" variant="outline">
        Buy
      </Button>
    </Horizontal>
    <View
      width={220}
      height={140}
      borderRadius={20}
      backgroundColor={
        palette.appearance === 'dark' ? palette.canvas : palette.text
      }
      opacity={0.85}
    />
  </Vertical>
);

const ProductCardSample = ({
  palette,
  config,
}: {
  palette: SurfacePalette;
  config: DesignSystemConfig;
}) => (
  <Card
    width="min(100%, 320px)"
    views={{
      container: {
        backgroundColor: palette.surface,
        color: palette.text,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: palette.border,
      },
      header: { color: palette.text, borderColor: palette.border },
      content: { color: palette.text },
      footer: { borderColor: palette.border },
    }}
  >
    <Card.Header>
      <Horizontal
        alignItems="center"
        justifyContent="space-between"
        gap={12}
        flexWrap="wrap"
      >
        <Text color={palette.text} fontWeight="700">
          {config.metadata.id === 'spacex' ? 'Falcon 9' : 'Product Card'}
        </Text>
        <Badge variant="filled" content="New" />
      </Horizontal>
    </Card.Header>
    <Card.Content>
      <Text fontSize={14} lineHeight="20px" color={palette.text}>
        {config.metadata.id === 'spacex'
          ? "The world's first orbital-class reusable rocket. Designed for reliable and safe transport of people and payloads."
          : 'Card surfaces, borders, typography, and shadows come from the active JSON config.'}
      </Text>
    </Card.Content>
    <Card.Footer>
      <Button size="sm">
        {config.metadata.id === 'spacex' ? 'Explore' : 'Review'}
      </Button>
    </Card.Footer>
  </Card>
);

const ButtonsSample = ({ palette }: { palette: SurfacePalette }) => (
  <Vertical gap={14}>
    <Horizontal gap={12} flexWrap="wrap" alignItems="center">
      <Button colorScheme="primary">Primary</Button>
      <Button colorScheme="secondary">Secondary</Button>
      <Button colorScheme="black">Black</Button>
      <Button colorScheme="white">White</Button>
    </Horizontal>
    <Horizontal gap={12} flexWrap="wrap" alignItems="center">
      <Button variant="outline" colorScheme="primary">
        Primary
      </Button>
      <Button variant="outline" colorScheme="secondary">
        Secondary
      </Button>
      <Button variant="outline" colorScheme="black">
        Black
      </Button>
      <Button variant="outline" colorScheme="white">
        White
      </Button>
    </Horizontal>
    <Horizontal gap={12} flexWrap="wrap" alignItems="center">
      <Button variant="ghost" views={{ container: { color: palette.text } }}>
        Ghost
      </Button>
      <Button variant="link" views={{ container: { color: palette.primary } }}>
        Link
      </Button>
      <Button isDisabled>Disabled</Button>
      <Button isLoading>Loading</Button>
    </Horizontal>
  </Vertical>
);

const StatusFeedbackSample = ({
  palette,
  config,
}: {
  palette: SurfacePalette;
  config: DesignSystemConfig;
}) => (
  <View style={{ color: palette.text }}>
    <Vertical gap={14}>
      <Horizontal gap={10} flexWrap="wrap" alignItems="center">
        <Badge content="Badge" />
        <Badge variant="outline" content="Outline" />
        <Badge
          content="Primary"
          views={{
            container: {
              backgroundColor: palette.primary,
              color: palette.onPrimary,
              borderColor: palette.primary,
            },
          }}
        />
        <Badge
          content="Success"
          views={{
            container: {
              backgroundColor: palette.success,
              color: palette.onPrimary,
              borderColor: palette.success,
            },
          }}
        />
        <Badge
          content="Warning"
          views={{
            container: {
              backgroundColor: palette.warning,
              color: palette.onPrimary,
              borderColor: palette.warning,
            },
          }}
        />
        <Badge
          content="Error"
          views={{
            container: {
              backgroundColor: palette.error,
              color: palette.onPrimary,
              borderColor: palette.error,
            },
          }}
        />
      </Horizontal>
      <Horizontal gap={16} flexWrap="wrap" alignItems="center">
        <StatusIndicator status="success" label="Operational" />
        <StatusIndicator status="warning" label="Degraded" />
        <StatusIndicator status="error" label="Outage" />
        <Loader size="sm" loaderColor={config.theme.primary} />
      </Horizontal>
      <Alert
        title="Heads up"
        description="Brand styling cascades through every alert."
        variant="info"
        views={{
          container: {
            backgroundColor: palette.surface,
            borderColor: palette.border,
            color: palette.text,
          },
          title: { color: palette.text },
          description: { color: palette.muted },
        }}
      />
      <ProgressBar
        value={64}
        height={10}
        showLabel
        color={palette.primary}
        backgroundColor={palette.border}
        views={{
          container: { backgroundColor: palette.border },
          bar: { backgroundColor: palette.primary },
        }}
      />
    </Vertical>
  </View>
);

const FormsSample = ({
  palette,
  config,
  mode,
}: {
  palette: SurfacePalette;
  config: DesignSystemConfig;
  mode: 'light' | 'dark';
}) => {
  // Only override container surface/border + field text. Labels and helper text
  // inherit the surrounding ink (via PaletteFrame), with the component's built-in
  // opacity dimming them naturally on both light and dark.
  const fieldViews = {
    container: {
      backgroundColor: palette.surface,
      borderColor: palette.border,
      color: palette.text,
    },
    field: { color: palette.text },
  };
  return (
    <View style={{ color: palette.text }}>
      <Vertical gap={16}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
          gap={16}
          alignItems="start"
        >
          <TextField
            size="md"
            label="Name"
            placeholder="Ada Lovelace"
            views={fieldViews}
          />
          <Select
            id={`forms-${config.metadata.id}-${mode}`}
            size="md"
            label="Plan"
            placeholder="Select plan"
            options={[
              { label: 'Starter', value: 'starter' },
              { label: 'Team', value: 'team' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
            views={{
              container: fieldViews.container,
              field: { fontSize: 14, lineHeight: '20px', color: palette.text },
              text: { fontSize: 14, lineHeight: '20px', color: palette.text },
            }}
          />
          <TextArea
            label="Notes"
            placeholder="Add implementation notes"
            views={fieldViews as any}
          />
        </View>
        <Horizontal gap={16} flexWrap="wrap" alignItems="center">
          <Checkbox label="Email updates" defaultIsSelected />
          <Radio label="Standard" value="standard" defaultIsSelected />
          <Switch label="Enabled" isChecked />
        </Horizontal>
      </Vertical>
    </View>
  );
};

const ComponentPreview = ({ config }: { config: DesignSystemConfig }) => {
  const [page, setPage] = useState(1);
  const lightPalette = getLightPalette(config);
  const darkPalette = getDarkPalette(config);
  const personality = getPersonality(config);

  return (
    <Vertical gap={24}>
      <Section title="Brand Snapshot (Light & Dark)" config={config}>
        <Vertical gap={20}>
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <BrandSnapshotSample
              palette={lightPalette}
              personality={personality}
              config={config}
            />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <BrandSnapshotSample
              palette={darkPalette}
              personality={personality}
              config={config}
            />
          </PaletteFrame>
        </Vertical>
      </Section>

      <Section title="Buttons — Light & Dark" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <ButtonsSample palette={lightPalette} />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <ButtonsSample palette={darkPalette} />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Status & Feedback — Light & Dark" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <StatusFeedbackSample palette={lightPalette} config={config} />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <StatusFeedbackSample palette={darkPalette} config={config} />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Forms — Light & Dark" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <FormsSample palette={lightPalette} config={config} mode="light" />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <FormsSample palette={darkPalette} config={config} mode="dark" />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Forms (legacy preview)" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
          alignItems="start"
          gap={16}
        >
          <TextField size="md" label="Name" placeholder="Ada Lovelace" />
          <Select
            id={`design-system-select-${config.metadata.id}`}
            size="md"
            label="Plan"
            placeholder="Select plan"
            options={[
              { label: 'Starter', value: 'starter' },
              { label: 'Team', value: 'team' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
            views={{
              field: { fontSize: 14, lineHeight: '20px' },
              text: { fontSize: 14, lineHeight: '20px' },
            }}
          />
          <TextArea label="Notes" placeholder="Add implementation notes" />
          <Vertical gap={12}>
            <Checkbox label="Email updates" defaultIsSelected />
            <Radio label="Standard" value="standard" defaultIsSelected />
            <Switch label="Enabled" isChecked />
            <Slider defaultValue={58} showValue />
            <OTPInput length={6} label="Verification Code" />
          </Vertical>
        </View>
      </Section>

      <Section title="Form States" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
          gap={16}
          alignItems="start"
        >
          <TextField
            size="md"
            label="Default"
            placeholder="Type here"
            helperText="Resting state"
          />
          <TextField
            size="md"
            label="Filled"
            defaultValue="Ada Lovelace"
            helperText="Has value"
          />
          <TextField
            size="md"
            label="With helper"
            placeholder="user@example.com"
            helperText="We'll never share your email"
          />
          <TextField
            size="md"
            label="Error"
            defaultValue="invalid@"
            error="Please enter a valid email"
          />
          <TextField
            size="md"
            label="Disabled"
            isDisabled
            defaultValue="Cannot edit"
            helperText="Field locked"
          />
          <TextField
            size="md"
            label="Read only"
            defaultValue="Read-only value"
            isReadOnly
            helperText="View only"
          />
          <Select
            id={`design-system-select-error-${config.metadata.id}`}
            size="md"
            label="Select error"
            placeholder="Pick one"
            error
            helperText="Selection required"
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
            ]}
            views={{
              field: { fontSize: 14, lineHeight: '20px' },
              text: { fontSize: 14, lineHeight: '20px' },
            }}
          />
          <Select
            id={`design-system-select-disabled-${config.metadata.id}`}
            size="md"
            label="Select disabled"
            placeholder="Disabled"
            isDisabled
            options={[
              { label: 'Option A', value: 'a' },
              { label: 'Option B', value: 'b' },
            ]}
            views={{
              field: { fontSize: 14, lineHeight: '20px' },
              text: { fontSize: 14, lineHeight: '20px' },
            }}
          />
        </View>
      </Section>

      <Section title="Elevation & Depth" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
          gap={20}
        >
          {getElevationLevels(config).map((level) => (
            <Vertical key={level.name} gap={12}>
              <View
                height={120}
                borderRadius={12}
                backgroundColor={config.theme.canvas}
                style={{ boxShadow: level.shadow }}
              />
              <Vertical gap={4}>
                <Horizontal gap={8} alignItems="baseline" flexWrap="wrap">
                  <Text fontSize={12} fontWeight="700">
                    {level.name}
                  </Text>
                  <Text
                    fontSize={11}
                    fontWeight="600"
                    color={config.theme.primary}
                  >
                    {level.label}
                  </Text>
                </Horizontal>
                <Text fontSize={11} color={config.theme.muted}>
                  {level.description}
                </Text>
                <Text
                  fontSize={10}
                  color={config.theme.muted}
                  style={{ wordBreak: 'break-word', opacity: 0.8 }}
                >
                  {level.shadow}
                </Text>
              </Vertical>
            </Vertical>
          ))}
        </View>
      </Section>

      <Section title="Color Blocks" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(160px, 1fr))"
          gap={12}
        >
          {(
            [
              ['primary', 'Primary', config.theme.onPrimary],
              ['secondary', 'Secondary', config.theme.onPrimary],
              ['success', 'Success', '#ffffff'],
              ['warning', 'Warning', '#ffffff'],
              ['error', 'Error', '#ffffff'],
              ['canvas', 'Canvas', config.theme.text],
              ['surface', 'Surface', config.theme.text],
              ['text', 'Text', config.theme.canvas],
              ['muted', 'Muted', config.theme.canvas],
              ['border', 'Border', config.theme.text],
              ['onPrimary', 'On primary', config.theme.text],
            ] as const
          ).map(([key, label, ink]) => {
            const value = (config.theme as any)[key] as string;
            return (
              <Vertical
                key={key}
                gap={0}
                borderRadius={12}
                overflow="hidden"
                borderWidth={1}
                borderStyle="solid"
                borderColor={config.theme.border}
              >
                <View height={88} backgroundColor={value} />
                <Vertical
                  gap={4}
                  padding={12}
                  backgroundColor={config.theme.surface}
                >
                  <Text fontSize={13} fontWeight="700">
                    {label}
                  </Text>
                  <Text fontSize={11} color={config.theme.muted}>
                    theme.{key}
                  </Text>
                  <Text fontSize={11} color={config.theme.muted}>
                    {value}
                  </Text>
                </Vertical>
              </Vertical>
            );
          })}
        </View>
      </Section>

      <Section title="Pricing — Booking (Light & Dark)" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <PricingCardSample palette={lightPalette} />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <PricingCardSample palette={darkPalette} />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Pricing — SaaS Tiers (Light & Dark)" config={config}>
        <Vertical gap={20}>
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
              {tierPricingPlans.map((tier) => (
                <TierPricingCardSample
                  key={tier.name}
                  palette={lightPalette}
                  tier={tier}
                  personality={personality}
                />
              ))}
            </Horizontal>
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
              {tierPricingPlans.map((tier) => (
                <TierPricingCardSample
                  key={tier.name}
                  palette={darkPalette}
                  tier={tier}
                  personality={personality}
                />
              ))}
            </Horizontal>
          </PaletteFrame>
        </Vertical>
      </Section>

      <Section title="Pricing — Product (Light & Dark)" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <ProductPricingCardSample
              palette={lightPalette}
              personality={personality}
            />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <ProductPricingCardSample
              palette={darkPalette}
              personality={personality}
            />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section
        title="Pricing — Featured w/ Badge & Favorite (Light & Dark)"
        config={config}
      >
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <FeaturedPricingCardSample
              palette={lightPalette}
              personality={personality}
            />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <FeaturedPricingCardSample
              palette={darkPalette}
              personality={personality}
            />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Content — Color Block Cards" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          {colorBlockContent.map((block) => (
            <ColorBlockContentCardSample
              key={block.slug}
              block={block}
              palette={lightPalette}
              personality={personality}
            />
          ))}
        </Horizontal>
      </Section>

      <Section
        title="Content — Article Cards w/ Badge & Favorite (Light & Dark)"
        config={config}
      >
        <Vertical gap={20}>
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
              {contentArticles.map((article) => (
                <ContentCardWithBadgeSample
                  key={article.id}
                  palette={lightPalette}
                  article={article}
                  personality={personality}
                />
              ))}
            </Horizontal>
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
              {contentArticles.map((article) => (
                <ContentCardWithBadgeSample
                  key={article.id}
                  palette={darkPalette}
                  article={article}
                  personality={personality}
                />
              ))}
            </Horizontal>
          </PaletteFrame>
        </Vertical>
      </Section>

      <Section title="CTA Card — Light & Dark" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <CTACardSample palette={lightPalette} config={config} />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <CTACardSample palette={darkPalette} config={config} />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Product Card — Light & Dark" config={config}>
        <Horizontal gap={20} flexWrap="wrap" alignItems="flex-start">
          <PaletteFrame
            config={config}
            palette={lightPalette}
            label="On light surface"
          >
            <ProductCardSample palette={lightPalette} config={config} />
          </PaletteFrame>
          <PaletteFrame
            config={config}
            palette={darkPalette}
            label="On dark surface"
          >
            <ProductCardSample palette={darkPalette} config={config} />
          </PaletteFrame>
        </Horizontal>
      </Section>

      <Section title="Content & Layout" config={config}>
        <Vertical gap={24}>
          <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
            <Card width="min(100%, 320px)">
              <Card.Header>
                <Horizontal
                  alignItems="center"
                  justifyContent="space-between"
                  gap={12}
                  flexWrap="wrap"
                >
                  <Text fontWeight="700">
                    {config.metadata.id === 'spacex'
                      ? 'Falcon 9'
                      : 'Product Card'}
                  </Text>
                  <Badge variant="filled" content="New" />
                </Horizontal>
              </Card.Header>
              <Card.Content>
                <Text fontSize={14} lineHeight="20px">
                  {config.metadata.id === 'spacex'
                    ? "The world's first orbital-class reusable rocket. Designed for reliable and safe transport of people and payloads."
                    : 'Card surfaces, borders, typography, and shadows come from the active JSON config.'}
                </Text>
              </Card.Content>
              <Card.Footer>
                <Button size="sm">
                  {config.metadata.id === 'spacex' ? 'Explore' : 'Review'}
                </Button>
              </Card.Footer>
            </Card>

            <Card width="min(100%, 320px)">
              <Card.Header>
                <Horizontal
                  gap={12}
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                >
                  <Horizontal gap={12} alignItems="center">
                    <Avatar fallback={config.metadata.label.slice(0, 2)} />
                    <Vertical gap={2}>
                      <Text fontWeight="700">
                        {config.metadata.id === 'spacex'
                          ? 'Starship'
                          : config.metadata.label}
                      </Text>
                      <Text fontSize={12} color={config.theme.muted}>
                        {config.metadata.id === 'spacex'
                          ? 'Multiplanetary mission'
                          : 'Config-driven preview'}
                      </Text>
                    </Vertical>
                  </Horizontal>
                  <Badge variant="outline" content="Active" />
                </Horizontal>
              </Card.Header>
              <Card.Content>
                {config.metadata.id === 'spacex' ? (
                  <Text fontSize={14} lineHeight="20px">
                    The most powerful launch vehicle ever developed. Designed to
                    carry crew and cargo to Mars and beyond.
                  </Text>
                ) : (
                  <Alert
                    variant="info"
                    title="Config active"
                    description="This alert is rendered by the shared component."
                  />
                )}
              </Card.Content>
            </Card>
          </Horizontal>

          <HeroSection config={config} />

          <AspectRatio ratio={16 / 9} borderRadius={12} overflow="hidden">
            <View
              width="100%"
              height="100%"
              backgroundColor={config.theme.primary}
            >
              <Vertical
                height="100%"
                alignItems="center"
                justifyContent="center"
                gap={8}
              >
                <Text fontWeight="700" color={config.theme.onPrimary}>
                  16:9 Aspect Ratio
                </Text>
                <Badge content="Config primary color" />
              </Vertical>
            </View>
          </AspectRatio>

          <Carousel>
            <Carousel.Content>
              {[1, 2, 3].map((i) => (
                <Carousel.Item key={i}>
                  <View
                    height={200}
                    borderRadius={12}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor={config.theme.surface}
                    borderColor={config.theme.border}
                    borderWidth={1}
                    borderStyle="solid"
                  >
                    <Text fontSize={24} fontWeight="700">
                      Slide {i}
                    </Text>
                  </View>
                </Carousel.Item>
              ))}
            </Carousel.Content>
            <Horizontal gap={12} marginTop={12} justifyContent="center">
              <Carousel.Previous />
              <Carousel.Next />
            </Horizontal>
          </Carousel>
        </Vertical>
      </Section>

      <Section title="Navigation & Interactive" config={config}>
        <Vertical gap={18}>
          <Vertical gap={20}>
            <Vertical gap={8}>
              <Text fontSize={12} fontWeight="700" color={config.theme.muted}>
                With icons
              </Text>
              <Tabs
                tabs={sampleTabs}
                defaultValue="homes"
                views={{
                  tab: { borderRadius: componentRadius(config, 'tabs') },
                  activeTab: { borderRadius: componentRadius(config, 'tabs') },
                }}
              />
            </Vertical>
            <Vertical gap={8}>
              <Text fontSize={12} fontWeight="700" color={config.theme.muted}>
                Without icons
              </Text>
              <Tabs
                defaultValue="overview"
                views={{
                  tab: { borderRadius: componentRadius(config, 'tabs') },
                  activeTab: { borderRadius: componentRadius(config, 'tabs') },
                }}
                tabs={[
                  {
                    title: 'Overview',
                    value: 'overview',
                    content: (
                      <Text fontSize={14} lineHeight="20px">
                        Tokens and components share the active config.
                      </Text>
                    ),
                  },
                  {
                    title: 'Usage',
                    value: 'usage',
                    content: (
                      <Text fontSize={14} lineHeight="20px">
                        Explicit props still override the config defaults.
                      </Text>
                    ),
                  },
                  {
                    title: 'Audit',
                    value: 'audit',
                    content: (
                      <Text fontSize={14} lineHeight="20px">
                        Plain text tabs without icons.
                      </Text>
                    ),
                  },
                ]}
              />
            </Vertical>
          </Vertical>

          <NavigationMenu
            items={navigationItems}
            orientation="horizontal"
            defaultActiveItemId="components"
          />

          {(() => {
            const accordionRadius = componentRadius(config, 'accordion');
            const flatItem = {
              borderWidth: 0,
              borderTopWidth: 0,
              borderBottomWidth: 0,
              borderLeftWidth: 0,
              borderRightWidth: 0,
              marginBottom: 0,
              borderRadius: 0,
            };
            const flatItemWithSeparator = {
              ...flatItem,
              borderTopWidth: 1,
              borderTopStyle: 'solid' as const,
              borderTopColor: config.theme.border,
            };
            return (
              <Accordion
                defaultValue="tokens"
                collapsible
                shape="rounded"
                views={{
                  container: {
                    borderRadius: accordionRadius,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderStyle: 'solid',
                    borderColor: config.theme.border,
                  },
                }}
              >
                <Accordion.Item
                  value="tokens"
                  {...flatItem}
                  views={{
                    item: flatItem,
                    trigger: { borderRadius: 0 },
                  }}
                >
                  <Accordion.Trigger>Token extraction</Accordion.Trigger>
                  <Accordion.Content>
                    <Text color={config.theme.muted}>
                      {Object.keys(config.tokens.rawCssVars).length} raw CSS
                      variables were extracted from {config.metadata.sourcePath}
                      .
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
                <Accordion.Item
                  value="overrides"
                  {...flatItemWithSeparator}
                  views={{
                    item: flatItemWithSeparator,
                    trigger: { borderRadius: 0 },
                  }}
                >
                  <Accordion.Trigger>Override behavior</Accordion.Trigger>
                  <Accordion.Content>
                    <Text color={config.theme.muted}>
                      Props passed directly to components override the
                      design-system defaults.
                    </Text>
                  </Accordion.Content>
                </Accordion.Item>
              </Accordion>
            );
          })()}

          <Separator label="advanced tools" />

          <Horizontal gap={16} flexWrap="wrap" alignItems="center">
            <Toggle color={config.theme.primary}>Toggle Button</Toggle>

            <ToggleGroup
              color={config.theme.primary}
              items={[
                { id: 'left', value: 'Left' },
                { id: 'center', value: 'Center' },
                { id: 'right', value: 'Right' },
              ]}
            />

            <Tooltip content="Tooltip message">
              <Button variant="outline">Hover for Tooltip</Button>
            </Tooltip>

            <HoverCard>
              <HoverCard.Trigger>
                <Button variant="ghost">Hover Card</Button>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <Vertical gap={4} padding={12}>
                  <Text fontWeight="700">Detailed Info</Text>
                  <Text fontSize={12} opacity={0.8}>
                    Hover cards provide more context.
                  </Text>
                </Vertical>
              </HoverCard.Content>
            </HoverCard>

            <ColorPicker value={config.theme.primary} />
            <ShareButton
              shareData={{ url: 'https://example.com', title: 'Example' }}
            />
            <Link to="#">Inline Link component</Link>
          </Horizontal>

          <Horizontal gap={16} flexWrap="wrap" alignItems="center">
            <Pagination
              currentPage={page}
              totalPages={10}
              onPageChange={setPage}
            />
          </Horizontal>
        </Vertical>
      </Section>
    </Vertical>
  );
};

export const DesignSystem = ({ config }: { config: DesignSystemConfig }) => {
  return (
    <DesignSystemProvider config={config}>
      <Helmet>
        {config.metadata.googleFontLinks?.map((link) => (
          <link key={link} rel="stylesheet" href={link} />
        ))}
      </Helmet>
      <View
        minHeight="100vh"
        padding={28}
        fontFamily={config.tokens.typography.fontFamily}
        backgroundColor={config.theme.canvas}
        color={config.theme.text}
        style={{
          textTransform: config.metadata.id === 'spacex' ? 'uppercase' : 'none',
        }}
      >
        <Vertical gap={28}>
          <Vertical gap={12} maxWidth={900}>
            <Text
              as="h1"
              fontSize={44}
              lineHeight="48px"
              fontWeight="800"
              fontFamily={config.tokens.typography.fontFamily}
            >
              {config.metadata.label} Design System
            </Text>
            <Text
              fontSize={16}
              lineHeight="24px"
              color={config.theme.muted}
              fontFamily={config.tokens.typography.fontFamily}
            >
              Live App Studio components rendered with the{' '}
              {config.metadata.label} config defaults.
            </Text>
          </Vertical>

          <Vertical gap={28}>
            <FoundationPreview config={config} />
            <ComponentPreview config={config} />
          </Vertical>
        </Vertical>
      </View>
    </DesignSystemProvider>
  );
};

type PageViewMode = 'components' | 'source' | 'compare';

const DesignSystemPage = () => {
  const [activeConfigId, setActiveConfigId] =
    useState<DesignSystemConfigId>('airbnb');
  const [viewMode, setViewMode] = useState<PageViewMode>('components');
  const activeConfig = designSystemConfigs[activeConfigId];
  const sourceHref = `/${activeConfig.metadata.sourcePath}`;

  const groupedConfigs = useMemo(
    () =>
      designSystemConfigList.map((config) => ({
        id: config.metadata.id as DesignSystemConfigId,
        label: config.metadata.label,
        appearance: config.metadata.defaultAppearance,
      })),
    []
  );

  const viewModes: { value: PageViewMode; label: string }[] = [
    { value: 'components', label: 'Components' },
    { value: 'source', label: 'Source HTML' },
    { value: 'compare', label: 'Compare' },
  ];

  const renderViewContent = () => {
    if (viewMode === 'source') {
      return (
        <View
          width="100%"
          height="100vh"
          style={{ backgroundColor: activeConfig.theme.canvas }}
        >
          <iframe
            src={sourceHref}
            title={`${activeConfig.metadata.label} Source`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#fff',
            }}
          />
        </View>
      );
    }
    if (viewMode === 'compare') {
      return (
        <Horizontal
          width="100%"
          height="100vh"
          alignItems="stretch"
          flexWrap="nowrap"
        >
          <View flex={1} minWidth={0} height="100%" overflow="auto">
            <DesignSystem key={activeConfigId} config={activeConfig} />
          </View>
          <View
            flex={1}
            minWidth={0}
            height="100%"
            style={{
              borderLeft: `1px solid ${activeConfig.theme.border}`,
            }}
          >
            <iframe
              src={sourceHref}
              title={`${activeConfig.metadata.label} Source`}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#fff',
              }}
            />
          </View>
        </Horizontal>
      );
    }
    return (
      <View width="100%" height="100vh" overflow="auto">
        <DesignSystem key={activeConfigId} config={activeConfig} />
      </View>
    );
  };

  return (
    <Horizontal
      minHeight="100vh"
      alignItems="stretch"
      flexWrap="nowrap"
      backgroundColor={activeConfig.theme.canvas}
    >
      <Vertical
        width={280}
        minWidth={240}
        maxWidth={320}
        height="100vh"
        overflow="auto"
        padding={18}
        gap={18}
        backgroundColor={activeConfig.theme.surface}
        style={{
          borderRight: `1px solid ${activeConfig.theme.border}`,
        }}
      >
        <Vertical gap={4}>
          <Text fontSize={18} lineHeight="24px" fontWeight="800">
            Design Systems
          </Text>
          <Text
            fontSize={12}
            lineHeight="16px"
            color={activeConfig.theme.muted}
          >
            {groupedConfigs.length} HTML-derived configs
          </Text>
        </Vertical>

        <Vertical gap={6}>
          <Text
            fontSize={11}
            fontWeight="700"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color={activeConfig.theme.muted}
          >
            View
          </Text>
          {viewModes.map((mode) => {
            const isActive = mode.value === viewMode;
            return (
              <Button
                key={mode.value}
                variant={isActive ? 'filled' : 'ghost'}
                isFilled
                onClick={() => setViewMode(mode.value)}
                views={{
                  container: {
                    justifyContent: 'flex-start',
                    borderRadius: 8,
                  },
                }}
              >
                {mode.label}
              </Button>
            );
          })}
        </Vertical>

        <Vertical gap={8}>
          <Text
            fontSize={11}
            fontWeight="700"
            letterSpacing="0.08em"
            textTransform="uppercase"
            color={activeConfig.theme.muted}
          >
            Brand
          </Text>
          {groupedConfigs.map((item) => {
            const isActive = item.id === activeConfigId;
            return (
              <Button
                key={item.id}
                variant={isActive ? 'filled' : 'ghost'}
                isFilled
                onClick={() => setActiveConfigId(item.id)}
                views={{
                  container: {
                    justifyContent: 'space-between',
                    borderRadius: 8,
                  },
                }}
              >
                <Horizontal
                  width="100%"
                  justifyContent="space-between"
                  alignItems="center"
                  gap={12}
                >
                  <Text as="span">{item.label}</Text>
                  <Text as="span" fontSize={11} opacity={0.72}>
                    {item.appearance}
                  </Text>
                </Horizontal>
              </Button>
            );
          })}
        </Vertical>
      </Vertical>

      <View flex={1} minWidth={0} height="100vh">
        {renderViewContent()}
      </View>
    </Horizontal>
  );
};

export default DesignSystemPage;
