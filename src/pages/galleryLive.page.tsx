import React, { useMemo, useState } from 'react';
import { Horizontal, Text, Vertical, View } from 'app-studio';
import {
  Alert,
  AudioInput,
  AspectRatio,
  AttachmentGroup,
  Avatar,
  Badge,
  Button,
  Card,
  ChatInput,
  ColorPicker,
  Icon,
  Link,
  Loader,
  MediaPreview,
  OTPInput,
  ProgressBar,
  Separator,
  ShareButton,
  Slider,
  StatusIndicator,
  Tabs,
  TextArea,
  TextField,
  Title,
  Toggle,
  ToggleGroup,
  Tooltip,
} from 'src/components';
import { Checkbox } from 'src/components/Form/Checkbox/Checkbox';
import { Radio } from 'src/components/Form/Radio/Radio';

const cardShell = {
  backgroundColor: 'color-white',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: '#E5E7EB',
  borderRadius: '16px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(15, 23, 42, 0.04)',
};

const CARD_ROUTES: Record<string, string | undefined> = {
  'Aspect Ratio': '/aspectratio',
  Separator: '/separator',
  Gradient: '/gradient',
  Background: '/background',
  Resizable: '/resizable',
  Icons: '/icon',
  'Icon Picker': '/iconpicker',
  'Buttons Variants': '/button',
  'Buttons Sizes': '/button',
  'Buttons Shapes': '/button',
  'Buttons Icon': '/button',
  Toggle: '/toggle',
  'Share Button': '/button',
  Inputs: '/textfield',
  'Checkbox Radio': '/checkbox',
  Otp: '/otpinput',
  Slider: '/slider',
  Form: '/formik',
  'Color Picker': '/colorpicker',
  'Audio Input': '/audio-input',
  'Chat Input': '/chat',
  'Emoji Picker': '/emojipicker',
  'Drop Zone': '/dropZone',
  'Edit Component': '/editComponent',
  Alerts: '/alert',
  Badges: '/badge',
  Toast: '/toast',
  Loader: '/loader',
  Progress: '/progressbar',
  'Status Indicator': '/statusindicator',
  'Cookie Consent': '/cookieConsent',
  Modal: '/modal',
  Drawer: '/drawer',
  Tooltip: '/tooltip',
  'Hover Card': '/hovercard',
  Command: '/command',
  'Context Menu': '/contextMenu',
  'Dropdown Menu': '/dropdownMenu',
  Accordion: '/accordion',
  Tabs: '/tabs',
  Pagination: '/pagination',
  Sidebar: '/sidebar',
  Menubar: '/menubar',
  'Navigation Menu': '/navigationMenu',
  Cards: '/card',
  Table: '/table',
  Chart: '/chart',
  Carousel: '/carousel',
  Avatars: '/avatar',
  Link: '/link',
  Title: '/title',
  Message: '/message',
  'Chat Widget': '/chatwidget',
  'Attachment Group': '/attachmentGroup',
};

const GALLERY_SECTIONS = [
  {
    title: 'Foundations',
    items: [
      'Brand',
      'Colors Brand',
      'Colors Semantic',
      'Colors Neutrals',
      'Colors Palette',
      'Type Display',
      'Type Headings',
      'Type Body',
      'Type Weights',
      'Type Mono',
      'Spacing',
      'Radii',
      'Shadows',
      'Breakpoints',
      'Focus Ring',
      'Animation',
    ],
  },
  {
    title: 'Layout & Inputs',
    items: [
      'Aspect Ratio',
      'Separator',
      'Gradient',
      'Background',
      'Resizable',
      'Icons',
      'Icon Picker',
      'Buttons Variants',
      'Buttons Sizes',
      'Buttons Shapes',
      'Buttons Icon',
      'Toggle',
      'Share Button',
      'Inputs',
      'Checkbox Radio',
      'Otp',
      'Slider',
      'Form',
      'Color Picker',
      'Audio Input',
      'Chat Input',
      'Emoji Picker',
      'Drop Zone',
      'Edit Component',
    ],
  },
  {
    title: 'Feedback & Overlays',
    items: [
      'Alerts',
      'Badges',
      'Toast',
      'Loader',
      'Progress',
      'Status Indicator',
      'Cookie Consent',
      'Modal',
      'Drawer',
      'Tooltip',
      'Hover Card',
      'Command',
      'Context Menu',
      'Dropdown Menu',
      'Accordion',
    ],
  },
  {
    title: 'Navigation',
    items: ['Tabs', 'Pagination', 'Sidebar', 'Menubar', 'Navigation Menu'],
  },
  {
    title: 'Data Display & Messaging',
    items: [
      'Cards',
      'Table',
      'Chart',
      'Carousel',
      'Avatars',
      'Link',
      'Title',
      'Message',
      'Chat Widget',
      'File',
      'Media Preview',
      'Attachment Group',
    ],
  },
];

const PreviewCard = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const route = CARD_ROUTES[title];
  const tag = title.toLowerCase().replace(/\s+/g, '-');
  const showFooter = Boolean(route);

  return (
    <View {...cardShell}>
      <Horizontal
        alignItems="center"
        justifyContent="space-between"
        padding="12px 14px"
        borderBottom="1px solid #F3F4F6"
      >
        <Text fontSize={13} lineHeight="18px" fontWeight="700" color="#0F172A">
          {title}
        </Text>
        <Text
          fontSize={11}
          lineHeight="16px"
          color="#6B7280"
          textTransform="uppercase"
          letterSpacing="0.08em"
        >
          {tag}
        </Text>
      </Horizontal>

      <Vertical gap={12} padding="14px">
        {children}

        {showFooter && (
          <Horizontal
            alignItems="center"
            justifyContent="space-between"
            paddingTop="12px"
            borderTop="1px solid #F3F4F6"
            gap={12}
            flexWrap="wrap"
          >
            <Text fontSize={11} lineHeight="16px" color="#6B7280">
              Mapped to the live library page for exact follow-up inspection.
            </Text>

            <a
              href={route}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                minHeight: 30,
                padding: '6px 10px',
                borderRadius: 999,
                border: '1px solid #E5E7EB',
                background: '#FFFFFF',
                color: '#1D4ED8',
                fontSize: 12,
                fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Open live page
            </a>
          </Horizontal>
        )}
      </Vertical>
    </View>
  );
};

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Vertical gap={14}>
    <Text
      fontSize={18}
      lineHeight="24px"
      fontWeight="700"
      letterSpacing="-0.02em"
      color="#111827"
    >
      {title}
    </Text>

    <View
      display="grid"
      gap="14px"
      style={{
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      }}
    >
      {children}
    </View>
  </Vertical>
);

const Swatch = ({ color, label }: { color: string; label: string }) => (
  <Vertical gap={6} width="72px">
    <View
      height="44px"
      borderRadius="10px"
      backgroundColor={color}
      border="1px solid rgba(15, 23, 42, 0.08)"
    />
    <Text fontSize={11} lineHeight="14px" color="#4B5563">
      {label}
    </Text>
  </Vertical>
);

const EmptyTabContent = () => <View minHeight="1px" />;

const NotMirroredYet = () => (
  <Vertical gap={8}>
    <Text fontSize={13} lineHeight="19px" color="#374151">
      This card is now mapped one-to-one, but its inline mirror is still being
      tightened. Use the linked live page below to inspect the shipped component
      directly.
    </Text>
  </Vertical>
);

export const GalleryLivePage = () => {
  const [otp, setOtp] = useState('317942');
  const [sliderValue, setSliderValue] = useState(68);
  const [chatValue, setChatValue] = useState('');
  const [attachments, setAttachments] = useState<File[]>([
    {
      name: 'proposal.pdf',
      size: 1_200_000,
      type: 'application/pdf',
    } as File,
    {
      name: 'brand.zip',
      size: 8_400_000,
      type: 'application/zip',
    } as File,
    {
      name: 'mulish.ttf',
      size: 128_000,
      type: 'font/ttf',
    } as File,
  ]);

  const topTabs = useMemo(
    () => [
      { title: 'Overview', value: 'overview', content: <EmptyTabContent /> },
      { title: 'Activity', value: 'activity', content: <EmptyTabContent /> },
      { title: 'Files', value: 'files', content: <EmptyTabContent /> },
      { title: 'Settings', value: 'settings', content: <EmptyTabContent /> },
    ],
    []
  );

  const periodTabs = useMemo(
    () => [
      { title: 'Day', value: 'day', content: <EmptyTabContent /> },
      { title: 'Week', value: 'week', content: <EmptyTabContent /> },
      { title: 'Month', value: 'month', content: <EmptyTabContent /> },
      { title: 'Year', value: 'year', content: <EmptyTabContent /> },
    ],
    []
  );

  const categoryTabs = useMemo(
    () => [
      { title: 'All', value: 'all', content: <EmptyTabContent /> },
      { title: 'Buttons', value: 'buttons', content: <EmptyTabContent /> },
      { title: 'Forms', value: 'forms', content: <EmptyTabContent /> },
      { title: 'Overlays', value: 'overlays', content: <EmptyTabContent /> },
      { title: 'Feedback', value: 'feedback', content: <EmptyTabContent /> },
    ],
    []
  );

  const toggleItems = useMemo(
    () => [
      {
        id: 'left',
        value: <Icon name="align-left" widthHeight={15} color="currentColor" />,
      },
      {
        id: 'center',
        value: (
          <Icon name="align-center" widthHeight={15} color="currentColor" />
        ),
        isActive: true,
      },
      {
        id: 'right',
        value: (
          <Icon name="align-right" widthHeight={15} color="currentColor" />
        ),
      },
      {
        id: 'justify',
        value: (
          <Icon name="align-justify" widthHeight={15} color="currentColor" />
        ),
      },
    ],
    []
  );

  const renderPreview = (title: string) => {
    switch (title) {
      case 'Brand':
        return (
          <View
            height="140px"
            borderRadius="20px"
            backgroundColor="#0A0A0A"
            position="relative"
            overflow="hidden"
          >
            <Text
              position="absolute"
              left="22px"
              top="26px"
              color="color-white"
              fontSize={42}
              lineHeight="42px"
              fontWeight="900"
              letterSpacing="-0.06em"
            >
              A
            </Text>
            <Text
              position="absolute"
              left="48px"
              top="72px"
              color="rgba(255,255,255,0.62)"
              fontSize={42}
              lineHeight="42px"
              fontWeight="900"
              letterSpacing="-0.06em"
            >
              S
            </Text>
          </View>
        );

      case 'Colors Brand':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Swatch color="#F97316" label="orange-500" />
            <Swatch color="#EA6A0D" label="orange-hover" />
            <Swatch color="#C2580B" label="orange-press" />
            <Swatch color="#FFEDD5" label="orange-soft" />
          </Horizontal>
        );

      case 'Colors Semantic':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Swatch color="#1D4ED8" label="theme-primary" />
            <Swatch color="#A855F7" label="theme-secondary" />
            <Swatch color="#FFFFFF" label="surface" />
            <Swatch color="#E5E7EB" label="border" />
            <Swatch color="#0A0A0A" label="text" />
          </Horizontal>
        );

      case 'Colors Neutrals':
        return (
          <Horizontal gap={8} flexWrap="wrap">
            {[
              ['#F9FAFB', '50'],
              ['#F3F4F6', '100'],
              ['#E5E7EB', '200'],
              ['#D1D5DB', '300'],
              ['#9CA3AF', '400'],
              ['#6B7280', '500'],
              ['#4B5563', '600'],
              ['#374151', '700'],
              ['#1F2937', '800'],
            ].map(([color, label]) => (
              <Swatch key={label} color={color} label={label} />
            ))}
          </Horizontal>
        );

      case 'Colors Palette':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Swatch color="#1D4ED8" label="blue-700" />
            <Swatch color="#6366F1" label="indigo-500" />
            <Swatch color="#A855F7" label="purple-500" />
            <Swatch color="#EC4899" label="pink-500" />
            <Swatch color="#EF4444" label="red-500" />
            <Swatch color="#22C55E" label="green-500" />
          </Horizontal>
        );

      case 'Type Display':
        return (
          <Vertical gap={10}>
            <Text
              fontSize={72}
              lineHeight="76px"
              fontWeight="700"
              letterSpacing="-1.5px"
            >
              App-Studio
            </Text>
            <Horizontal justifyContent="space-between" gap={12} flexWrap="wrap">
              <Text fontSize={11} lineHeight="16px" color="#6B7280">
                Mulish 700 · 110/112 · -1.5px (desktop)
              </Text>
              <Text fontSize={11} lineHeight="16px" color="#6B7280">
                Hero title
              </Text>
            </Horizontal>
          </Vertical>
        );

      case 'Type Headings':
        return (
          <Vertical gap={8}>
            <Text
              fontSize={32}
              lineHeight="38px"
              fontWeight="700"
              letterSpacing="-0.01em"
            >
              H1 · 32/38 bold
            </Text>
            <Text
              fontSize={28}
              lineHeight="34px"
              fontWeight="600"
              letterSpacing="-0.01em"
            >
              H2 · 28/34 semibold
            </Text>
            <Text fontSize={24} lineHeight="30px" fontWeight="600">
              H3 · 24/30 semibold
            </Text>
            <Text fontSize={20} lineHeight="28px" fontWeight="600">
              H4 · 20/28 semibold
            </Text>
          </Vertical>
        );

      case 'Type Body':
        return (
          <Vertical gap={10}>
            <Text fontSize={20} lineHeight="28px">
              xl · The quick brown fox jumps
            </Text>
            <Text fontSize={16} lineHeight="24px">
              lg · The quick brown fox jumps
            </Text>
            <Text fontSize={14} lineHeight="20px">
              md · The quick brown fox jumps over the lazy dog
            </Text>
            <Text fontSize={12} lineHeight="16px" color="#4B5563">
              sm · The quick brown fox jumps over the lazy dog
            </Text>
            <Text
              fontSize={10}
              lineHeight="12px"
              color="#6B7280"
              textTransform="uppercase"
            >
              xs · The quick brown fox jumps over the lazy dog
            </Text>
          </Vertical>
        );

      case 'Type Weights':
        return (
          <Vertical gap={6}>
            {[
              [400, 'Regular'],
              [500, 'Medium'],
              [600, 'Semibold'],
              [700, 'Bold'],
              [800, 'Extrabold'],
            ].map(([weight, label]) => (
              <Text
                key={weight}
                fontSize={18}
                lineHeight="24px"
                fontWeight={String(weight)}
              >
                {weight} {label} — Make something wonderful
              </Text>
            ))}
            <Text fontSize={11} lineHeight="16px" color="#6B7280">
              Mulish · buttons default 500 · headings 600 · hero 700.
            </Text>
          </Vertical>
        );

      case 'Type Mono':
        return (
          <Vertical gap={10}>
            <View
              backgroundColor="#F9FAFB"
              border="1px solid #E5E7EB"
              borderRadius="8px"
              padding="14px 16px"
            >
              <Text fontFamily="monospace" fontSize={13} lineHeight="20px">
                <Text as="span" color="#9333EA" fontFamily="monospace">
                  import
                </Text>{' '}
                {'{ '}
                <Text as="span" color="#1D4ED8" fontFamily="monospace">
                  Button
                </Text>{' '}
                {'} '}
                <Text as="span" color="#9333EA" fontFamily="monospace">
                  from
                </Text>{' '}
                <Text as="span" color="#C2580B" fontFamily="monospace">
                  '@app-studio/web'
                </Text>
                ;
              </Text>
              <Text fontFamily="monospace" fontSize={13} lineHeight="20px">
                {'<'}
                <Text as="span" color="#1D4ED8" fontFamily="monospace">
                  Button
                </Text>{' '}
                variant=
                <Text as="span" color="#C2580B" fontFamily="monospace">
                  "filled"
                </Text>
                {'>'}Get Started{'</'}
                <Text as="span" color="#1D4ED8" fontFamily="monospace">
                  Button
                </Text>
                {'>'}
              </Text>
            </View>
            <Text fontSize={11} lineHeight="16px" color="#6B7280">
              ui-monospace / SF Mono stack — used in docs, code blocks, token
              labels.
            </Text>
          </Vertical>
        );

      case 'Spacing':
        return (
          <Horizontal alignItems="flex-end" gap={10}>
            {[
              ['4', '16px'],
              ['8', '24px'],
              ['12', '32px'],
              ['16', '40px'],
            ].map(([label, height]) => (
              <Vertical key={label} gap={6} alignItems="center">
                <View
                  width="32px"
                  height={height}
                  borderRadius="8px"
                  backgroundColor="rgba(29, 78, 216, 0.14)"
                  border="1px solid rgba(29, 78, 216, 0.16)"
                />
                <Text fontSize={11} color="#6B7280">
                  {label}
                </Text>
              </Vertical>
            ))}
          </Horizontal>
        );

      case 'Radii':
        return (
          <Horizontal gap={12} flexWrap="wrap">
            {[
              ['4px', '4px'],
              ['8px', '8px'],
              ['12px', '12px'],
              ['pill', '999px'],
            ].map(([label, radius]) => (
              <Vertical key={label} gap={6} alignItems="center">
                <View
                  width="58px"
                  height="40px"
                  backgroundColor="#EFF6FF"
                  border="1px solid #BFDBFE"
                  borderRadius={radius}
                />
                <Text fontSize={11} color="#6B7280">
                  {label}
                </Text>
              </Vertical>
            ))}
          </Horizontal>
        );

      case 'Shadows':
        return (
          <Horizontal gap={12} flexWrap="wrap">
            {[
              ['sm', '0 1px 2px rgba(0,0,0,.05)'],
              ['md', '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06)'],
              ['lg', '0 4px 6px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.06)'],
            ].map(([label, shadow]) => (
              <Vertical key={label} gap={6} alignItems="center">
                <View
                  width="72px"
                  height="52px"
                  backgroundColor="color-white"
                  borderRadius="12px"
                  boxShadow={shadow}
                />
                <Text fontSize={11} color="#6B7280">
                  {label}
                </Text>
              </Vertical>
            ))}
          </Horizontal>
        );

      case 'Breakpoints':
        return (
          <Vertical gap={6}>
            <Text fontSize={12} color="#4B5563">
              mobile: 0–559
            </Text>
            <Text fontSize={12} color="#4B5563">
              tablet: 560–1079
            </Text>
            <Text fontSize={12} color="#4B5563">
              desktop: 1080+
            </Text>
          </Vertical>
        );

      case 'Focus Ring':
        return (
          <View
            width="100%"
            maxWidth="220px"
            padding="12px 14px"
            borderRadius="10px"
            backgroundColor="color-white"
            border="1px solid #D1D5DB"
            boxShadow="0 0 0 2px #FFFFFF, 0 0 0 4px #1D4ED8"
          >
            <Text fontSize={13} lineHeight="18px" color="#111827">
              Focused field shell
            </Text>
          </View>
        );

      case 'Animation':
        return (
          <Horizontal gap={12}>
            <View
              width="44px"
              height="44px"
              borderRadius="999px"
              backgroundColor="#DBEAFE"
              style={{
                animation: 'gallery-pulse 1.8s ease-in-out infinite',
              }}
            />
            <Text fontSize={12} lineHeight="18px" color="#4B5563">
              200ms transitions and soft motion tokens.
            </Text>
          </Horizontal>
        );

      case 'Aspect Ratio':
        return (
          <AspectRatio ratio={16 / 9}>
            <View
              width="100%"
              height="100%"
              borderRadius="12px"
              background="linear-gradient(135deg,#1D4ED8,#A855F7)"
            />
          </AspectRatio>
        );

      case 'Separator':
        return (
          <Vertical gap={12}>
            <Text fontSize={12} color="#6B7280">
              Top content
            </Text>
            <Separator />
            <Text fontSize={12} color="#6B7280">
              Bottom content
            </Text>
          </Vertical>
        );

      case 'Icons':
        return (
          <Horizontal gap={12} flexWrap="wrap">
            {['sparkles', 'message-circle', 'file-text', 'settings'].map(
              (name) => (
                <View
                  key={name}
                  width="40px"
                  height="40px"
                  borderRadius="10px"
                  backgroundColor="#F9FAFB"
                  border="1px solid #E5E7EB"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Icon name={name} widthHeight={18} color="#1F2937" />
                </View>
              )
            )}
          </Horizontal>
        );

      case 'Buttons Variants':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Button variant="filled">Filled</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="subtle">Subtle</Button>
            <Button variant="link">Link</Button>
          </Horizontal>
        );

      case 'Buttons Sizes':
        return (
          <Horizontal gap={10} flexWrap="wrap" alignItems="flex-end">
            <Button size="xs">xs</Button>
            <Button size="sm">sm</Button>
            <Button size="md">md</Button>
            <Button size="lg">lg</Button>
            <Button size="xl">xl</Button>
          </Horizontal>
        );

      case 'Buttons Shapes':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Button shape="square">Square</Button>
            <Button shape="rounded">Rounded</Button>
            <Button shape="pill">Pill</Button>
          </Horizontal>
        );

      case 'Buttons Icon':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <Button>
              <Horizontal gap={8} alignItems="center">
                <Icon name="plus" widthHeight={14} color="currentColor" />
                <Text color="inherit" fontSize={13}>
                  Add item
                </Text>
              </Horizontal>
            </Button>
            <Button variant="outline" isIcon>
              <Icon name="download" widthHeight={16} color="currentColor" />
            </Button>
          </Horizontal>
        );

      case 'Toggle':
        return (
          <Vertical gap={12}>
            <Horizontal gap={12} alignItems="center">
              <Toggle
                variant="outline"
                views={{
                  container: {
                    width: '36px',
                    height: '36px',
                    padding: 0,
                    justifyContent: 'center',
                  },
                }}
              >
                <Icon name="bold" widthHeight={15} color="currentColor" />
              </Toggle>

              <Toggle
                isToggled
                variant="outline"
                views={{
                  container: {
                    width: '36px',
                    height: '36px',
                    padding: 0,
                    justifyContent: 'center',
                  },
                }}
              >
                <Icon name="italic" widthHeight={15} color="currentColor" />
              </Toggle>
            </Horizontal>

            <ToggleGroup
              items={toggleItems}
              variant="outline"
              views={{
                container: { gap: 8 },
              }}
            />
          </Vertical>
        );

      case 'Share Button':
        return (
          <ShareButton
            label="Share this page"
            shareData={{
              title: 'App Studio',
              text: 'App Studio component gallery preview.',
              url: 'https://appstudio.example.com',
            }}
            onUnsupported={() => {}}
          />
        );

      case 'Inputs':
        return (
          <Vertical gap={10}>
            <TextField label="Email" placeholder="you@app-studio.dev" />
            <TextArea label="Bio" placeholder="Tell us a little more..." />
          </Vertical>
        );

      case 'Checkbox Radio':
        return (
          <Vertical gap={10}>
            <Checkbox label="Email me updates" />
            <Radio label="Weekly digest" />
          </Vertical>
        );

      case 'Otp':
        return (
          <OTPInput
            name="gallery-live-otp"
            value={otp}
            onChange={setOtp}
            isAutoFocus
          />
        );

      case 'Slider':
        return (
          <Slider
            label="Project completion"
            value={sliderValue}
            onChange={setSliderValue}
            showValue
          />
        );

      case 'Form':
        return (
          <Vertical gap={10}>
            <TextField label="Name" placeholder="Jane Doe" />
            <TextField label="Email" placeholder="jane@app-studio.dev" />
            <TextArea label="Message" placeholder="Write your message..." />
          </Vertical>
        );

      case 'Color Picker':
        return (
          <ColorPicker
            defaultValue="#1D4ED8"
            placeholder="Select a color"
            showRecentColors={false}
            views={{
              container: { maxWidth: '320px' },
            }}
          />
        );

      case 'Audio Input':
        return <AudioInput onAudio={() => {}} />;

      case 'Chat Input':
        return (
          <ChatInput
            value={chatValue}
            onChange={setChatValue}
            onSubmit={() => {}}
            getPendingFiles={() => []}
            clearPendingFiles={() => {}}
            placeholder="Type a message"
            hideAttachments
          />
        );

      case 'Alerts':
        return (
          <Vertical gap={10}>
            <Alert
              variant="info"
              title="Information"
              description="Helpful context for the current user action."
            />
            <Alert
              variant="success"
              title="Success"
              description="The operation was completed successfully."
            />
          </Vertical>
        );

      case 'Badges':
        return (
          <Horizontal gap={10} alignItems="center" flexWrap="wrap">
            <Badge content="NEW" size="sm" />
            <Badge content="Outline" size="sm" variant="outline" />
            <Badge content="Ghost" size="sm" variant="ghost" />
            <Badge content="Pill" size="sm" shape="pill" />
          </Horizontal>
        );

      case 'Loader':
        return (
          <Horizontal gap={18} alignItems="center">
            <Loader />
            <Text fontSize={12} lineHeight="18px" color="#6B7280">
              Default loading indicator.
            </Text>
          </Horizontal>
        );

      case 'Progress':
        return <ProgressBar value={67} />;

      case 'Status Indicator':
        return (
          <Horizontal gap={12} flexWrap="wrap">
            <StatusIndicator label="Active" status="success" />
            <StatusIndicator label="Queued" status="warning" />
            <StatusIndicator label="Offline" status="error" />
          </Horizontal>
        );

      case 'Tooltip':
        return (
          <Tooltip content="This is a tooltip">
            <Button size="sm">Hover me</Button>
          </Tooltip>
        );

      case 'Tabs':
        return (
          <Vertical gap={14}>
            <Tabs
              tabs={topTabs}
              defaultValue="overview"
              variant="underline"
              views={{
                headerTabs: { gap: 4 },
                tab: { padding: '8px 14px', minHeight: 0 },
                content: { display: 'none' },
              }}
            />
            <Tabs
              tabs={periodTabs}
              defaultValue="week"
              variant="segmented"
              views={{
                headerTabs: { gap: 2, padding: 3, borderRadius: 8 },
                tab: { padding: '5px 12px', minHeight: 0, borderRadius: 5 },
                content: { display: 'none' },
              }}
            />
            <Tabs
              tabs={categoryTabs}
              defaultValue="all"
              variant="pill"
              views={{
                headerTabs: { gap: 6 },
                tab: { padding: '6px 12px', minHeight: 0 },
                content: { display: 'none' },
              }}
            />
          </Vertical>
        );

      case 'Cards':
        return (
          <View
            display="grid"
            gap="12px"
            style={{
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            }}
          >
            <Card variant="outlined" size="sm">
              <Text fontWeight="600" fontSize={14} marginBottom={4}>
                Outlined
              </Text>
              <Text fontSize={12} lineHeight="18px" color="color-gray-600">
                1px border, no shadow.
              </Text>
            </Card>
            <Card variant="elevated" size="sm">
              <Text fontWeight="600" fontSize={14} marginBottom={4}>
                Elevated
              </Text>
              <Text fontSize={12} lineHeight="18px" color="color-gray-600">
                Shadow-md resting.
              </Text>
            </Card>
          </View>
        );

      case 'Avatars':
        return (
          <Vertical gap={14}>
            <Horizontal gap={14} alignItems="center" flexWrap="wrap">
              <Avatar src="" fallback="AS" size="xs" />
              <Avatar src="" fallback="MK" size="sm" />
              <Avatar src="" fallback="JL" size="md" />
              <Avatar src="" fallback="SC" size="lg" />
            </Horizontal>
            <Horizontal gap={0} alignItems="center">
              {['KT', 'RA', 'NH', '+4'].map((label, index) => (
                <View
                  key={label}
                  marginLeft={index === 0 ? 0 : '-10px'}
                  zIndex={10 - index}
                >
                  <Avatar
                    src=""
                    fallback={label}
                    size="sm"
                    views={{
                      container: {
                        borderWidth: '2px',
                        borderColor: 'color-white',
                      },
                    }}
                  />
                </View>
              ))}
            </Horizontal>
          </Vertical>
        );

      case 'Link':
        return (
          <Vertical gap={8}>
            <Link to="/docs" underline="underline">
              Default link to docs
            </Link>
            <Link to="https://app-studio.dev" isExternal>
              With icon
            </Link>
            <Text
              as="span"
              fontSize={14}
              lineHeight="20px"
              color="color-gray-500"
              textDecoration="line-through"
            >
              Disabled link
            </Text>
            <Link to="/docs" underline="underline" fontWeight="600">
              Bold emphasis
            </Link>
          </Vertical>
        );

      case 'Title':
        return (
          <Vertical gap={14}>
            <Title
              size="lg"
              highlightText="beautifully"
              highlightStyle="gradient"
            >
              Build beautifully, ship faster.
            </Title>
            <Title
              size="md"
              highlightText="in one place"
              highlightStyle="solid"
              highlightColor="#FEF3C7"
            >
              Everything you need, in one place.
            </Title>
          </Vertical>
        );

      case 'Media Preview':
        return (
          <Horizontal gap={10} flexWrap="wrap">
            <MediaPreview
              url="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 110 82'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%231D4ED8'/%3E%3Cstop offset='1' stop-color='%23A855F7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='110' height='82' rx='8' fill='url(%23g)'/%3E%3C/svg%3E"
              type="image/svg+xml"
              name="gradient-cover.svg"
            />
            <MediaPreview
              url="data:text/plain,preview"
              type="application/pdf"
              name="proposal.pdf"
            />
            <View
              width="60px"
              height="60px"
              borderRadius="8px"
              backgroundColor="#F9FAFB"
              border="1px dashed #E5E7EB"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon name="plus" widthHeight={16} color="#9CA3AF" />
            </View>
          </Horizontal>
        );

      case 'Attachment Group':
        return (
          <AttachmentGroup
            files={attachments}
            showPreviews={false}
            onRemove={(index) =>
              setAttachments((current) =>
                current.filter((_, currentIndex) => currentIndex !== index)
              )
            }
          />
        );

      default:
        return <NotMirroredYet />;
    }
  };

  const previewCount = GALLERY_SECTIONS.reduce(
    (count, section) => count + section.items.length,
    0
  );

  return (
    <View
      backgroundColor="#FAFAFA"
      minHeight="100vh"
      padding="24px"
      style={{
        fontFamily: 'Mulish, system-ui, sans-serif',
      }}
    >
      <style>
        {`
          @keyframes gallery-pulse {
            0%, 100% { transform: scale(1); opacity: 0.72; }
            50% { transform: scale(1.08); opacity: 1; }
          }
        `}
      </style>

      <Vertical gap={20}>
        <Vertical gap={8}>
          <Text
            fontSize={28}
            lineHeight="32px"
            fontWeight="800"
            letterSpacing="-0.03em"
            color="#0F172A"
          >
            Live Gallery Mirror
          </Text>
          <Text
            fontSize={14}
            lineHeight="20px"
            color="#4B5563"
            maxWidth="860px"
          >
            This page mirrors the same gallery card inventory as `gallery.html`.
            High-signal cards are rendered inline with the live library, and
            every mapped component card links to its shipped demo page for
            direct inspection.
          </Text>
          <Text fontSize={12} lineHeight="18px" color="#6B7280">
            {previewCount} mirrored cards
          </Text>
        </Vertical>

        {GALLERY_SECTIONS.map((section) => (
          <Section key={section.title} title={section.title}>
            {section.items.map((item) => (
              <PreviewCard key={item} title={item}>
                {renderPreview(item)}
              </PreviewCard>
            ))}
          </Section>
        ))}
      </Vertical>
    </View>
  );
};

export default GalleryLivePage;
