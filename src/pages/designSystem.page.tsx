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
import { Radio } from 'src/components/Form/Radio/Radio';
import { Helmet } from 'react-helmet';

const sampleTabs = [
  {
    title: 'Overview',
    value: 'overview',
    content: (
      <Text fontSize={14} lineHeight="20px">
        Tokens, inputs, and feedback components share the active config.
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
        This tab confirms navigation styles are also config-aware.
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
    style={{
      backgroundColor: config.theme.canvas,
      borderColor: config.theme.border,
    }}
  >
    <Text fontSize={18} lineHeight="24px" fontWeight="700" color={config.theme.text}>
      {title}
    </Text>
    {children}
  </Vertical>
);

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

          <Table>
            <Table.Template
              caption="First extracted color tokens"
              columns={tableColumns}
              data={tableData}
            />
          </Table>
        </Vertical>
      </Section>
    </Vertical>
  );
};

const ComponentPreview = ({ config }: { config: DesignSystemConfig }) => {
  const [page, setPage] = useState(1);

  return (
    <Vertical gap={24}>
      <Section title="Actions & Status" config={config}>
        <Vertical gap={18}>
          <Horizontal gap={12} flexWrap="wrap" alignItems="center">
            <Button>Config Default</Button>
            <Button variant="filled">Filled</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </Horizontal>
          <Horizontal gap={12} flexWrap="wrap" alignItems="center">
            <Badge content="Badge" />
            <Badge variant="outline" content="Outline" />
            <StatusIndicator status="success" label="Operational" />
            <Loader size="sm" loaderColor={config.theme.primary} />
          </Horizontal>
          <ProgressBar value={64} height={12} showLabel />
        </Vertical>
      </Section>

      <Section title="Forms" config={config}>
        <View
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(220px, 1fr))"
          alignItems="start"
          gap={16}
        >
          <TextField label="Name" placeholder="Ada Lovelace" />
          <Select
            id={`design-system-select-${config.metadata.id}`}
            label="Plan"
            placeholder="Select plan"
            options={[
              { label: 'Starter', value: 'starter' },
              { label: 'Team', value: 'team' },
              { label: 'Enterprise', value: 'enterprise' },
            ]}
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

      <Section title="Content & Layout" config={config}>
        <Vertical gap={24}>
          <Horizontal gap={16} flexWrap="wrap" alignItems="stretch">
            <Card width="min(100%, 320px)">
              <Card.Header>
                {config.metadata.id === 'spacex' ? 'Falcon 9' : 'Product Card'}
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

          <Vertical gap={12}>
            <Title size="lg">Headline Title</Title>
            <Text color={config.theme.muted}>
              Title components use theme typography by default.
            </Text>
          </Vertical>

          <AspectRatio ratio={16 / 9} borderRadius={12} overflow="hidden">
            <View width="100%" height="100%" backgroundColor={config.theme.primary}>
              <Vertical height="100%" alignItems="center" justifyContent="center" gap={8}>
                <Text fontWeight="700" color={config.theme.onPrimary}>16:9 Aspect Ratio</Text>
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
                    <Text fontSize={24} fontWeight="700">Slide {i}</Text>
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
          <Tabs tabs={sampleTabs} defaultValue="overview" />

          <NavigationMenu
            items={navigationItems}
            orientation="horizontal"
            defaultActiveItemId="components"
          />

          <Accordion defaultValue="tokens" collapsible>
            <Accordion.Item value="tokens">
              <Accordion.Trigger>Token extraction</Accordion.Trigger>
              <Accordion.Content>
                <Text color={config.theme.muted}>
                  {Object.keys(config.tokens.rawCssVars).length} raw CSS
                  variables were extracted from {config.metadata.sourcePath}.
                </Text>
              </Accordion.Content>
            </Accordion.Item>
            <Accordion.Item value="overrides">
              <Accordion.Trigger>Override behavior</Accordion.Trigger>
              <Accordion.Content>
                <Text color={config.theme.muted}>
                  Props passed directly to components override the design-system
                  defaults.
                </Text>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion>

          <Separator label="advanced tools" />

          <Horizontal gap={16} flexWrap="wrap" alignItems="center">
            <Toggle>Toggle Button</Toggle>

            <ToggleGroup
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
                  <Text fontSize={12} opacity={0.8}>Hover cards provide more context.</Text>
                </Vertical>
              </HoverCard.Content>
            </HoverCard>

            <ColorPicker value={config.theme.primary} />
            <ShareButton shareData={{ url: "https://example.com", title: "Example" }} />
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

const Showcase = ({ config }: { config: DesignSystemConfig }) => {
  const sourceHref = `/${config.metadata.sourcePath}`;

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
        style={{
          backgroundColor: config.theme.canvas,
          color: config.theme.text,
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
              Live App Studio components rendered with config defaults from{' '}
              <a
                href={sourceHref}
                target="_blank"
                rel="noreferrer"
                style={{ color: config.theme.primary, fontWeight: 700 }}
              >
                {config.metadata.sourcePath}
              </a>
              .
            </Text>
          </Vertical>

          <Tabs
            defaultValue="components"
            tabs={[
              {
                title: 'Components',
                value: 'components',
                content: (
                  <Vertical gap={28} marginTop={24}>
                    <FoundationPreview config={config} />
                    <ComponentPreview config={config} />
                  </Vertical>
                ),
              },
              {
                title: 'Source HTML',
                value: 'source',
                content: (
                  <View
                    width="100%"
                    height="calc(100vh - 180px)"
                    borderWidth={1}
                    borderStyle="solid"
                    borderRadius={12}
                    overflow="hidden"
                    marginTop={24}
                    borderColor={config.theme.border}
                  >
                    <iframe
                      src={sourceHref}
                      title={`${config.metadata.label} Source`}
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        backgroundColor: '#fff',
                      }}
                    />
                  </View>
                ),
              },
              {
                title: 'Compare',
                value: 'compare',
                content: (
                  <Horizontal gap={24} alignItems="flex-start" marginTop={24}>
                    <View flex={1} minWidth={0}>
                      <Vertical gap={28}>
                        <FoundationPreview config={config} />
                        <ComponentPreview config={config} />
                      </Vertical>
                    </View>
                    <View flex={1} minWidth={0} height="calc(100vh - 180px)" style={{ position: 'sticky', top: 28 }}>
                      <View
                        width="100%"
                        height="100%"
                        borderWidth={1}
                        borderStyle="solid"
                        borderRadius={12}
                        overflow="hidden"
                        borderColor={config.theme.border}
                      >
                        <iframe
                          src={sourceHref}
                          title={`${config.metadata.label} Source`}
                          style={{
                            width: '100%',
                            height: '100%',
                            border: 'none',
                            backgroundColor: '#fff',
                          }}
                        />
                      </View>
                    </View>
                  </Horizontal>
                ),
              },
            ]}
          />
        </Vertical>
      </View>
    </DesignSystemProvider>
  );
};

const DesignSystemPage = () => {
  const [activeConfigId, setActiveConfigId] =
    useState<DesignSystemConfigId>('airbnb');
  const activeConfig = designSystemConfigs[activeConfigId];

  const groupedConfigs = useMemo(
    () =>
      designSystemConfigList.map((config) => ({
        id: config.metadata.id as DesignSystemConfigId,
        label: config.metadata.label,
        appearance: config.metadata.defaultAppearance,
      })),
    []
  );

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
          <Text
            fontSize={18}
            lineHeight="24px"
            fontWeight="800"
          >
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

        <Vertical gap={8}>
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

      <View flex={1} minWidth={0} height="100vh" overflow="auto">
        <Showcase config={activeConfig} />
      </View>
    </Horizontal>
  );
};

export default DesignSystemPage;
