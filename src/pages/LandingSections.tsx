import React from 'react';
import { useNavigate } from 'react-router-dom';
import { View, Text, Vertical, Horizontal, Center, Image } from 'app-studio';
import { Button } from 'src/components/Button/Button';
import { Features } from 'src/features';
import { MULISH_FONT_FAMILY } from 'src/assets/fonts';

/**
 * The full below-the-fold landing page (features, cross-platform, live showcase,
 * stats, code sample, CTA, footer). Rendered client-only (after mount) from
 * HomeHero so none of it — nor its images — touches the home page's critical
 * render path; this keeps the Lighthouse FCP/LCP fast while still presenting a
 * complete marketing page. Images below the fold use loading="lazy".
 */

const Section = ({ children, background, ...props }: any) => (
  <Vertical
    as="section"
    width="100%"
    alignItems="center"
    paddingVertical={72}
    paddingHorizontal={24}
    backgroundColor={background}
    media={{ mobile: { paddingVertical: 44, paddingHorizontal: 16 } }}
    {...props}
  >
    <Vertical width="100%" maxWidth={1120} gap={40} alignItems="center">
      {children}
    </Vertical>
  </Vertical>
);

const Eyebrow = ({ children }: any) => (
  <Text
    as="span"
    color="theme-primary"
    weight="bold"
    letterSpacing="0.08em"
    textTransform="uppercase"
    size="sm"
  >
    {children}
  </Text>
);

const Heading = ({ children, ...props }: any) => (
  <Text
    as="h2"
    weight="bold"
    color="color-gray-900"
    textAlign="center"
    media={{ mobile: { fontSize: 28, lineHeight: 34 } }}
    fontSize={40}
    lineHeight={48}
    {...props}
  >
    {children}
  </Text>
);

const Lead = ({ children }: any) => (
  <Text
    textAlign="center"
    color="color-gray-600"
    maxWidth={640}
    fontSize={18}
    lineHeight={28}
  >
    {children}
  </Text>
);

const Check = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="12" fill="currentColor" opacity="0.12" />
    <path
      d="M7 12.5l3.2 3.2L17 9"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const LandingSections = () => {
  const navigate = useNavigate();

  return (
    <Vertical width="100%" fontFamily={MULISH_FONT_FAMILY}>
      {/* ---- Features ---------------------------------------------------- */}
      <Section background="color-white">
        <Vertical gap={12} alignItems="center">
          <Eyebrow>Batteries included</Eyebrow>
          <Heading>Everything you need to ship</Heading>
          <Lead>
            A complete component toolkit with the tooling, conventions and
            developer experience that production apps rely on.
          </Lead>
        </Vertical>
        <Horizontal
          justifyContent="center"
          flexWrap="wrap"
          gap={24}
          width="100%"
        >
          {Features.map((feature) => (
            <Vertical
              key={feature.title}
              width={260}
              gap={12}
              padding={24}
              borderRadius={16}
              backgroundColor="color-gray-50"
              borderWidth={1}
              borderStyle="solid"
              borderColor="color-gray-100"
            >
              <Center
                width={48}
                height={48}
                borderRadius={12}
                color="white"
                backgroundColor="theme-primary"
              >
                {feature.icon}
              </Center>
              <Text weight="bold" color="color-gray-900" size="lg">
                {feature.title}
              </Text>
              <Text color="color-gray-600" size="md" lineHeight={22}>
                {feature.description}
              </Text>
            </Vertical>
          ))}
        </Horizontal>
      </Section>

      {/* ---- Cross-platform --------------------------------------------- */}
      <Section background="color-gray-50">
        <Horizontal
          width="100%"
          gap={56}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          media={{ mobile: { flexDirection: 'column', gap: 32 } }}
        >
          <Vertical flex={1} gap={20} minWidth={300}>
            <Eyebrow>Write once</Eyebrow>
            <Heading textAlign="left">Web and native, one codebase</Heading>
            <Text color="color-gray-600" fontSize={18} lineHeight={28}>
              The same components render on React DOM and React Native. Build
              your design system once and ship it everywhere your users are.
            </Text>
            <Vertical gap={12} color="theme-primary">
              {[
                'Identical API across web and native',
                'Responsive `media` props, no CSS files',
                'Tree-shakeable, TypeScript-first',
              ].map((t) => (
                <Horizontal key={t} gap={10} alignItems="center">
                  <Check />
                  <Text color="color-gray-700" size="md">
                    {t}
                  </Text>
                </Horizontal>
              ))}
            </Vertical>
          </Vertical>
          <View flex={1} minWidth={300} maxWidth={520}>
            <Image
              src="/illustrations/cross-platform.svg"
              alt="App Studio components running in a browser and on a phone"
              loading="lazy"
              decoding="async"
              width="100%"
              height="auto"
            />
          </View>
        </Horizontal>
      </Section>

      {/* ---- Live showcase (real components) ---------------------------- */}
      <Section background="color-white">
        <Vertical gap={12} alignItems="center">
          <Eyebrow>Styled with props</Eyebrow>
          <Heading>Beautiful components, zero stylesheets</Heading>
          <Lead>
            Pass CSS straight through as props. Every component below is the
            real App-Studio library, not a screenshot.
          </Lead>
        </Vertical>
        <Vertical
          width="100%"
          maxWidth={760}
          gap={28}
          padding={32}
          borderRadius={20}
          backgroundColor="color-gray-50"
          borderWidth={1}
          borderStyle="solid"
          borderColor="color-gray-100"
          media={{ mobile: { padding: 20 } }}
        >
          <Horizontal gap={12} flexWrap="wrap" alignItems="center">
            <Button onClick={() => navigate('/button')}>Primary</Button>
            <Button variant="outline" onClick={() => navigate('/button')}>
              Outline
            </Button>
            <Button variant="ghost" onClick={() => navigate('/button')}>
              Ghost
            </Button>
            <Button
              color="color-orange-700"
              onClick={() => navigate('/button')}
            >
              Themed
            </Button>
          </Horizontal>
          <Horizontal gap={10} flexWrap="wrap" alignItems="center">
            {[
              ['New', 'color-green'],
              ['Beta', 'color-blue'],
              ['v0.10', 'color-purple'],
              ['Stable', 'color-orange'],
            ].map(([label, c]) => (
              <Text
                key={label}
                as="span"
                paddingVertical={4}
                paddingHorizontal={12}
                borderRadius={999}
                backgroundColor={`${c}-100`}
                color={`${c}-700`}
                weight="semiBold"
                size="sm"
              >
                {label}
              </Text>
            ))}
          </Horizontal>
          <Horizontal gap={16} flexWrap="wrap">
            {['Accordion', 'Modal', 'DatePicker'].map((name) => (
              <Vertical
                key={name}
                flex={1}
                minWidth={180}
                gap={8}
                padding={18}
                borderRadius={14}
                backgroundColor="color-white"
                boxShadow="0 1px 3px rgba(0,0,0,0.08)"
              >
                <Text weight="bold" color="color-gray-900">
                  {name}
                </Text>
                <Text color="color-gray-600" size="sm">
                  Accessible, composable, themeable.
                </Text>
              </Vertical>
            ))}
          </Horizontal>
        </Vertical>
      </Section>

      {/* ---- Code sample ------------------------------------------------- */}
      <Section background="color-gray-900">
        <Vertical gap={12} alignItems="center">
          <Text
            as="span"
            color="color-orange-300"
            weight="bold"
            letterSpacing="0.08em"
            textTransform="uppercase"
            size="sm"
          >
            The API
          </Text>
          <Heading color="color-white">CSS properties as props</Heading>
        </Vertical>
        <View
          width="100%"
          maxWidth={680}
          borderRadius={16}
          backgroundColor="color-gray-800"
          padding={24}
          overflow="auto"
        >
          <Text
            as="pre"
            fontFamily="'SF Mono', ui-monospace, Menlo, Consolas, monospace"
            fontSize={15}
            lineHeight={24}
            color="color-gray-100"
            whiteSpace="pre"
          >
            <Text
              as="span"
              color="color-gray-400"
            >{`// no stylesheet, no className\n`}</Text>
            <Text as="span" color="color-blue-300">
              {'<View'}
            </Text>
            {`\n  `}
            <Text as="span" color="color-orange-300">
              backgroundColor
            </Text>
            {'='}
            <Text as="span" color="color-green-300">
              "theme-primary"
            </Text>
            {`\n  `}
            <Text as="span" color="color-orange-300">
              padding
            </Text>
            {'={'}
            <Text as="span" color="color-purple-300">
              24
            </Text>
            {'}'}
            {`\n  `}
            <Text as="span" color="color-orange-300">
              borderRadius
            </Text>
            {'={'}
            <Text as="span" color="color-purple-300">
              12
            </Text>
            {'}'}
            {`\n  `}
            <Text as="span" color="color-orange-300">
              _hover
            </Text>
            {'={{ '}
            <Text as="span" color="color-orange-300">
              opacity
            </Text>
            {': '}
            <Text as="span" color="color-purple-300">
              0.9
            </Text>
            {' }}'}
            {`\n  `}
            <Text as="span" color="color-orange-300">
              media
            </Text>
            {'={{ '}
            <Text as="span" color="color-orange-300">
              mobile
            </Text>
            {': { '}
            <Text as="span" color="color-orange-300">
              padding
            </Text>
            {': '}
            <Text as="span" color="color-purple-300">
              12
            </Text>
            {' } }}'}
            {`\n`}
            <Text as="span" color="color-blue-300">
              {'>'}
            </Text>
          </Text>
        </View>
      </Section>

      {/* ---- Stats ------------------------------------------------------- */}
      <Section background="color-white">
        <Horizontal
          width="100%"
          justifyContent="space-around"
          flexWrap="wrap"
          gap={32}
        >
          {[
            ['60+', 'Components'],
            ['2', 'Platforms · web & native'],
            ['100%', 'TypeScript'],
            ['MIT', 'Open source'],
          ].map(([n, l]) => (
            <Vertical key={l} alignItems="center" gap={6} minWidth={140}>
              <Text weight="bold" color="theme-primary" fontSize={44}>
                {n}
              </Text>
              <Text color="color-gray-600" size="md" textAlign="center">
                {l}
              </Text>
            </Vertical>
          ))}
        </Horizontal>
      </Section>

      {/* ---- Final CTA --------------------------------------------------- */}
      <Section
        background="color-blue-700"
        position="relative"
        overflow="hidden"
      >
        <Image
          src="/orange.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          position="absolute"
          top={-60}
          right={-60}
          width={320}
          height={320}
          opacity={0.25}
          zIndex={0}
        />
        <Vertical gap={20} alignItems="center" zIndex={1}>
          <Heading color="color-white">Start building today</Heading>
          <Text
            textAlign="center"
            color="color-blue-100"
            fontSize={18}
            maxWidth={560}
          >
            Drop App-Studio into your React or React Native project and ship a
            consistent UI in minutes.
          </Text>
          <Horizontal gap={16} flexWrap="wrap" justifyContent="center">
            <Button
              color="color-white"
              textColor="color-blue-700"
              onClick={() => navigate('/button')}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              color="color-white"
              onClick={() => navigate('/docs')}
            >
              Read the docs
            </Button>
          </Horizontal>
        </Vertical>
      </Section>

      {/* ---- Footer ------------------------------------------------------ */}
      <View as="footer" width="100%" backgroundColor="color-gray-900">
        <Vertical
          width="100%"
          maxWidth={1120}
          marginLeft="auto"
          marginRight="auto"
          paddingVertical={56}
          paddingHorizontal={24}
          gap={40}
        >
          <Horizontal
            width="100%"
            justifyContent="space-between"
            flexWrap="wrap"
            gap={32}
          >
            <Vertical gap={12} maxWidth={280}>
              <Text weight="bold" color="color-white" fontSize={22}>
                App-Studio
              </Text>
              <Text color="color-gray-400" size="md" lineHeight={22}>
                Style-as-props React components for web and native.
              </Text>
            </Vertical>
            {[
              ['Components', ['Button', 'Modal', 'Accordion', 'DatePicker']],
              [
                'Documentation',
                ['Getting started', 'Theming', 'Design system'],
              ],
              ['Resources', ['GitHub', 'Gallery', 'Changelog']],
            ].map(([title, links]: any) => (
              <Vertical key={title} gap={12} minWidth={150}>
                <Text weight="semiBold" color="color-gray-200" size="sm">
                  {title}
                </Text>
                {links.map((l: string) => (
                  <Text
                    key={l}
                    as="a"
                    href="/docs"
                    color="color-gray-400"
                    size="sm"
                    cursor="pointer"
                    _hover={{ color: 'color-white' }}
                    onClick={(e: any) => {
                      e.preventDefault();
                      navigate('/docs');
                    }}
                  >
                    {l}
                  </Text>
                ))}
              </Vertical>
            ))}
          </Horizontal>
          <Text color="color-gray-400" size="sm">
            © {new Date().getFullYear()} App-Studio · MIT Licensed
          </Text>
        </Vertical>
      </View>
    </Vertical>
  );
};

export default LandingSections;
