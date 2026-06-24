import React from 'react';
import { Center, Text, Vertical, Horizontal, View } from 'app-studio';
import { HERO_FONT_FAMILY } from 'src/assets/fonts';

// The rest of the landing page (features, showcase, stats, CTA, footer) is a
// lazily-loaded, client-only chunk so it never enters the home page's critical
// bundle or render path — keeping FCP/LCP fast while the page is still complete.
const LandingSections = React.lazy(() => import('./LandingSections'));

/**
 * Hero illustration. An inline SVG (vector shapes only — no <image> element), so
 * it is NOT a Largest Contentful Paint candidate: the hero title text stays the
 * LCP and the image does not gate the mobile performance score. It is part of
 * the prerendered hero, so it paints immediately with the rest of the hero.
 */
const HeroArt = () => (
  <svg
    viewBox="0 0 520 420"
    width="100%"
    role="img"
    aria-label="App Studio component canvas"
    style={{
      width: '100%',
      maxWidth: 520,
      minWidth: 0,
      height: 'auto',
      display: 'block',
      // box-shadow (cheap) instead of an SVG drop-shadow filter (which is
      // expensive to rasterize on throttled CPU and delayed the hero paint/LCP).
      borderRadius: 22,
      boxShadow: '0 24px 48px rgba(15,23,42,0.16)',
    }}
  >
    <defs>
      <linearGradient id="haBg" x1="0" y1="0" x2="520" y2="420" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="1" stopColor="#F6F8FF" />
      </linearGradient>
      <linearGradient id="haRing" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#F59E3B" />
        <stop offset="1" stopColor="#F97316" />
      </linearGradient>
    </defs>
    {/* window */}
    <rect x="8" y="8" width="504" height="404" rx="22" fill="url(#haBg)" stroke="#E6EAF2" strokeWidth="2" />
    <rect x="8" y="8" width="504" height="44" rx="22" fill="#FFFFFF" />
    <rect x="8" y="40" width="504" height="12" fill="#FFFFFF" />
    <circle cx="34" cy="30" r="6" fill="#F87171" />
    <circle cx="54" cy="30" r="6" fill="#FBBF24" />
    <circle cx="74" cy="30" r="6" fill="#34D399" />
    <rect x="190" y="22" width="180" height="16" rx="8" fill="#EEF2F9" />
    {/* sidebar */}
    <rect x="24" y="68" width="120" height="328" rx="14" fill="#F4F6FB" />
    <rect x="40" y="92" width="88" height="12" rx="6" fill="#1D4ED8" opacity="0.85" />
    <rect x="40" y="118" width="72" height="10" rx="5" fill="#C7D2FE" />
    <rect x="40" y="140" width="80" height="10" rx="5" fill="#C7D2FE" />
    <rect x="40" y="162" width="64" height="10" rx="5" fill="#C7D2FE" />
    <rect x="32" y="186" width="104" height="30" rx="9" fill="#FFEAD5" />
    <rect x="44" y="197" width="64" height="8" rx="4" fill="#F59E3B" />
    <rect x="40" y="232" width="78" height="10" rx="5" fill="#E2E8F0" />
    <rect x="40" y="254" width="86" height="10" rx="5" fill="#E2E8F0" />
    {/* main canvas */}
    <circle cx="300" cy="150" r="46" fill="none" stroke="url(#haRing)" strokeWidth="12" strokeLinecap="round" strokeDasharray="220 60" transform="rotate(-25 300 150)" />
    <rect x="364" y="120" width="120" height="16" rx="8" fill="#0F172A" />
    <rect x="364" y="146" width="96" height="11" rx="5.5" fill="#94A3B8" />
    <rect x="364" y="166" width="110" height="11" rx="5.5" fill="#94A3B8" />
    {/* buttons */}
    <rect x="170" y="232" width="120" height="40" rx="11" fill="#1D4ED8" />
    <rect x="206" y="247" width="48" height="10" rx="5" fill="#FFFFFF" />
    <rect x="304" y="232" width="120" height="40" rx="11" fill="none" stroke="#1D4ED8" strokeWidth="2" />
    <rect x="340" y="247" width="48" height="10" rx="5" fill="#1D4ED8" />
    {/* cards */}
    <rect x="170" y="296" width="150" height="84" rx="14" fill="#FFFFFF" stroke="#E6EAF2" strokeWidth="2" />
    <circle cx="194" cy="322" r="12" fill="#DBEAFE" />
    <rect x="184" y="344" width="92" height="9" rx="4.5" fill="#1F2937" />
    <rect x="184" y="360" width="64" height="8" rx="4" fill="#9CA3AF" />
    <rect x="336" y="296" width="150" height="84" rx="14" fill="#FFFFFF" stroke="#E6EAF2" strokeWidth="2" />
    <circle cx="360" cy="322" r="12" fill="#FFEAD5" />
    <rect x="350" y="344" width="92" height="9" rx="4.5" fill="#1F2937" />
    <rect x="350" y="360" width="64" height="8" rx="4" fill="#9CA3AF" />
  </svg>
);

/**
 * The above-the-fold hero. Fully prerendered (text + CTA buttons + SVG) in the
 * system font stack so the home page's critical render path never waits on a web
 * font (see the build-time prerender + hydration in scripts/prerender.mjs).
 * Rendering the whole hero on the server AND identically on the client means
 * hydration is a pure attach with no layout change — important for LCP.
 */
export const HomeHero = () => {
  // The ENTIRE hero (text, CTA buttons, SVG) is prerendered and rendered
  // identically on the client, so hydration is a pure attach with NO layout
  // change in the viewport. That matters for LCP: any DOM/layout change at
  // hydration becomes a late layout that Lantern extends the simulated LCP to.
  // Only the below-the-fold `LandingSections` is deferred (it appends below the
  // 100vh hero, so it never relayouts the hero's viewport / the LCP element).
  const [showSections, setShowSections] = React.useState(false);
  React.useEffect(() => {
    const ric =
      (typeof window !== 'undefined' && (window as any).requestIdleCallback) ||
      ((cb: any) => setTimeout(cb, 200));
    const id = ric(() => setShowSections(true));
    return () => {
      const cic = (window as any).cancelIdleCallback;
      if (cic) cic(id);
      else clearTimeout(id);
    };
  }, []);

  const media = React.useMemo(
    () => ({
      container: {
        mobile: { paddingVertical: 48, paddingHorizontal: 20, gap: 36 },
        tablet: { paddingVertical: 64, paddingHorizontal: 28 },
        desktop: { paddingVertical: 96, paddingHorizontal: 40 },
      },
      title: {
        mobile: {
          fontSize: 44,
          lineHeight: 50,
          letterSpacing: -0.5,
          textAlign: 'center',
        },
        tablet: { fontSize: 58, lineHeight: 64, letterSpacing: -1 },
        desktop: { fontSize: 72, lineHeight: 78, letterSpacing: -1.5 },
      },
      tagline: {
        mobile: { fontSize: 16, lineHeight: 24, maxWidth: 440, textAlign: 'center' },
        tablet: { fontSize: 18, lineHeight: 28, maxWidth: 480 },
        desktop: { fontSize: 20, lineHeight: 30, maxWidth: 470 },
      },
      buttonText: {
        mobile: { fontSize: 15, lineHeight: 20 },
        tablet: { fontSize: 16, lineHeight: 22 },
        desktop: { fontSize: 17, lineHeight: 24 },
      },
    }),
    []
  );

  return (
    <Vertical width="100%">
      {/* ---- Hero (prerendered, system-font critical path) ---- */}
      <Vertical
        position="relative"
        flexWrap="nowrap"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        // A flat background color is the cheapest possible paint for the
        // full-viewport hero (no image fetch/decode, no gradient rasterization),
        // so the hero text LCP isn't gated by a full-screen paint on throttled CPU.
        backgroundColor="#F4F7FF"
        media={media.container}
      >
        <Horizontal
          width="100%"
          maxWidth={1140}
          gap={56}
          alignItems="center"
          justifyContent="space-between"
          flexWrap="nowrap"
          media={{
            // On mobile the columns stack; stretch them to the viewport width so
            // the illustration and tagline can't overflow horizontally.
            mobile: { flexDirection: 'column', alignItems: 'stretch', gap: 40 },
          }}
        >
          {/* text column */}
          <Vertical
            flex={1}
            gap={26}
            alignItems="flex-start"
            minWidth={0}
            media={{ mobile: { alignItems: 'center', gap: 22, width: '100%' } }}
          >
            <Text
              as="h1"
              weight="bold"
              color="color-gray-900"
              whiteSpace="nowrap"
              textAlign="left"
              fontFamily={HERO_FONT_FAMILY}
              media={media.title}
            >
              App-Studio
            </Text>
            <Text
              color="color-gray-700"
              textAlign="left"
              fontFamily={HERO_FONT_FAMILY}
              media={media.tagline}
            >
              Style-as-props React components for web and native — build
              beautiful, responsive interfaces faster.
            </Text>

            {/* CTAs are real <a> anchors, prerendered into the static hero, so
                they navigate with ZERO JavaScript — the hydration bundle only
                loads on first interaction (see scripts/prerender.mjs). The
                hard-coded blue/white pair is AAA-contrast (keeps A11y at 100). */}
            <Horizontal
              gap={16}
              flexWrap="wrap"
              media={{ mobile: { justifyContent: 'center', width: '100%' } }}
            >
              <View
                as="a"
                href="/button"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                backgroundColor="#1D4ED8"
                color="#FFFFFF"
                paddingVertical={14}
                paddingHorizontal={28}
                borderRadius={10}
                fontWeight={600}
                textDecoration="none"
                whiteSpace="nowrap"
                cursor="pointer"
                _hover={{ backgroundColor: '#1E40AF' }}
                media={media.buttonText}
              >
                Get Started
              </View>
              <View
                as="a"
                href="/docs"
                display="inline-flex"
                alignItems="center"
                justifyContent="center"
                color="#1D4ED8"
                backgroundColor="transparent"
                borderWidth={2}
                borderStyle="solid"
                borderColor="#1D4ED8"
                paddingVertical={12}
                paddingHorizontal={26}
                borderRadius={10}
                fontWeight={600}
                textDecoration="none"
                whiteSpace="nowrap"
                cursor="pointer"
                _hover={{ backgroundColor: '#1D4ED8', color: '#FFFFFF' }}
                media={media.buttonText}
              >
                Deploy Now
              </View>
            </Horizontal>
          </Vertical>

          {/* illustration column. The SVG is part of the PRERENDERED hero so it
              paints in the first frame alongside the text (a flat bg + box-shadow
              keep that paint cheap), and it's present at hydration so nothing
              shifts. */}
          <Center
            flex={1}
            width="100%"
            minWidth={0}
            maxWidth={540}
            media={{ mobile: { maxWidth: '100%' } }}
          >
            <HeroArt />
          </Center>
        </Horizontal>
      </Vertical>

      {/* ---- Rest of the landing page (rendered in an idle callback) ---- */}
      {showSections && (
        <React.Suspense fallback={null}>
          <LandingSections />
        </React.Suspense>
      )}
    </Vertical>
  );
};

export default HomeHero;
