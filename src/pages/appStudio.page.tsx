import React, { useState } from 'react';
import { Animation, Text, Vertical } from 'app-studio';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Layers,
  Monitor,
  Moon,
  Move,
  Palette,
  Smartphone,
  Sparkles,
  Sun,
} from 'lucide-react';
import { Button } from 'src/components/Button/Button';
import {
  CodeWindow,
  DeveloperResources,
  FinalCallout,
  MarketingLayout,
  Questions,
  QuickStart,
  SectionHeading,
} from './marketing/MarketingLayout';

const starter = `import { ThemeProvider, ResponsiveProvider,
  Vertical, Text, Animation } from 'app-studio';

export default function App() {
  return (
    <ThemeProvider theme={{ primary: 'color-blue-900' }}>
      <ResponsiveProvider>
        <Vertical
          gap={16}
          padding={32}
          media={{ mobile: { padding: 16 } }}
          animate={Animation.fadeIn()}
        >
          <Text color="theme-primary" fontSize={28}>
            Make room for your ideas.
          </Text>
        </Vertical>
      </ResponsiveProvider>
    </ThemeProvider>
  );
}`;

export function StylePlayground() {
  const [dark, setDark] = useState(false);
  const [compact, setCompact] = useState(false);
  const [color, setColor] = useState('blue');
  const [animation, setAnimation] = useState(0);
  const colors = { blue: '#1e3a8a', violet: '#6d28d9', orange: '#c2410c' };
  const sample = `<Vertical\n  padding={${
    compact ? 12 : 24
  }} gap={12}\n  borderRadius={16}\n  backgroundColor="${
    dark ? 'color-gray-900' : 'color-white'
  }"\n  animate={Animation.fadeIn()}\n>\n  <Text color="color-${color}-${
    dark ? 200 : 900
  }">Make it yours.</Text>\n</Vertical>`;
  return (
    <div className="m-playground">
      <CodeWindow code={sample} filename="YourComponent.tsx">
        <div className="m-playground-toolbar">
          <span>
            <span className="m-status-dot" /> LIVE PREVIEW
          </span>
          <div>
            <Button
              variant="ghost"
              size="sm"
              ariaLabel="Toggle preview theme"
              aria-pressed={dark}
              onClick={() => setDark(!dark)}
            >
              {dark ? <Sun size={16} /> : <Moon size={16} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              ariaLabel="Toggle compact spacing"
              aria-pressed={compact}
              onClick={() => setCompact(!compact)}
            >
              <Move size={16} />
            </Button>
          </div>
        </div>
        <div className={`m-playground-preview ${dark ? 'is-dark' : ''}`}>
          <Vertical
            key={animation}
            padding={compact ? 12 : 24}
            gap={12}
            borderRadius={16}
            backgroundColor={dark ? 'color-gray-900' : 'color-white'}
            animate={Animation.fadeIn({ duration: '0.5s' })}
            width="100%"
          >
            <div
              className="m-preview-icon"
              style={{
                color: dark ? '#cbd5e1' : colors[color as keyof typeof colors],
              }}
            >
              <Sparkles size={23} />
            </div>
            <Text
              as="h3"
              fontSize={22}
              fontWeight={650}
              color={`color-${color}-${dark ? 200 : 900}`}
              margin={0}
            >
              Make it yours.
            </Text>
            <Text
              fontSize={12}
              color={dark ? 'color-gray-300' : 'color-gray-600'}
              lineHeight="1.6"
            >
              Typed styles, rendered live.
            </Text>
            <Button
              size="sm"
              backgroundColor={colors[color as keyof typeof colors]}
              textColor="#fff"
              rightIcon={<ArrowRight size={15} />}
              onClick={() => setAnimation(animation + 1)}
            >
              Replay animation
            </Button>
          </Vertical>
        </div>
        <div className="m-playground-swatches">
          <span className="m-mono">YOUR PALETTE</span>
          <div>
            {Object.entries(colors).map(([name, hex]) => (
              <Button
                key={name}
                size="sm"
                variant="ghost"
                ariaLabel={`Use ${name} palette`}
                aria-pressed={color === name}
                onClick={() => setColor(name)}
              >
                <span className="m-swatch" style={{ backgroundColor: hex }}>
                  {color === name && <Check size={12} />}
                </span>
              </Button>
            ))}
          </div>
          <span className="m-mono">PROPS → PIXELS</span>
        </div>
      </CodeWindow>
    </div>
  );
}

export default function AppStudioPage() {
  return (
    <MarketingLayout product="studio">
      <section className="m-container m-hero m-studio-hero">
        <div className="m-hero-copy">
          <a className="m-announcement" href="/docs/AppStudio">
            <span className="m-status-dot" /> APP-STUDIO / STYLING FRAMEWORK{' '}
            <ArrowUpRight size={14} />
          </a>
          <h1>
            Your styles.
            <br />
            Your components.
            <br />
            <span className="m-highlight">One API.</span>
          </h1>
          <p>
            Style React with the props you already understand. Layout, themes,
            responsive design, and motion — together in your component.
          </p>
          <div className="m-actions">
            <a className="m-link-button" href="#get-started">
              Get started <ArrowRight size={17} />
            </a>
            <a className="m-text-link" href="/docs/AppStudio">
              Read the docs <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="m-hero-notes">
            <span>
              <Check size={14} /> Typed style props
            </span>
            <span>
              <Check size={14} /> Web + Native
            </span>
            <span>
              <Check size={14} /> MIT licensed
            </span>
          </div>
        </div>
        <StylePlayground />
      </section>
      <div className="m-container m-tech-strip">
        <span className="m-mono">ONE CONNECTED STYLING SYSTEM</span>
        <span>
          <Braces size={19} /> Style props
        </span>
        <span>
          <Palette size={19} /> Theme tokens
        </span>
        <span>
          <Monitor size={19} /> Responsive
        </span>
        <span>
          <Move size={19} /> Animation
        </span>
      </div>
      <section className="m-section m-container">
        <div className="m-split-heading">
          <SectionHeading
            eyebrow="CLOSE TO YOUR COMPONENT. OUT OF YOUR WAY."
            title="Less context switching. More clarity."
          />
          <p>
            Read the structure and the styling in the same place. A View for
            your layout. Tokens for your colors. Props for the details.
          </p>
        </div>
        <div className="m-feature-grid">
          {[
            {
              icon: Braces,
              title: 'CSS you already know.',
              text: 'Use padding, gap, borderRadius, and other typed style props directly. Compose layouts with View, Horizontal, and Vertical.',
            },
            {
              icon: Palette,
              title: 'Tokens that connect the dots.',
              text: 'Define your theme once. Use theme-primary and color tokens throughout your interface, with light and dark palettes.',
            },
            {
              icon: Move,
              title: 'Made to respond and move.',
              text: 'Adapt layouts with the media prop. Add Animation presets on web, and use Reanimated for supported native motion.',
            },
          ].map(({ icon: Icon, title, text }) => (
            <article className="m-feature" key={title}>
              <div className="m-feature-icon">
                <Icon size={25} strokeWidth={1.6} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <a href="/docs/AppStudio">
                See it in the guide <ArrowUpRight size={14} />
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="m-engine-section">
        <div className="m-container m-engine-grid">
          <div>
            <span className="m-eyebrow">TWO PACKAGES. CLEAR ROLES.</span>
            <h2>
              Start at the layer
              <br />
              that works for you.
            </h2>
            <p>
              App Studio gives you the primitives. The component library builds
              on them. Use either starting point without learning a second
              styling language.
            </p>
            <a className="m-text-link" href="/components">
              Discover the component library <ArrowRight size={16} />
            </a>
          </div>
          <div className="m-layer-stack">
            <a href="/components">
              <span className="m-layer-number">02 / THE BUILDING BLOCKS</span>
              <h3>
                <Layers size={24} /> @app-studio/components{' '}
                <ArrowUpRight size={19} />
              </h3>
              <p>Buttons, inputs, dialogs, navigation, and more.</p>
            </a>
            <div className="m-layer-connector" aria-hidden="true">
              built on ↓
            </div>
            <a href="/docs/AppStudio" className="m-layer-core">
              <span className="m-layer-number">01 / THE FOUNDATION</span>
              <h3>
                <Braces size={24} /> app-studio <ArrowUpRight size={19} />
              </h3>
              <p>Layout primitives · style props · tokens · motion</p>
            </a>
            <div className="m-layer-platforms">
              <span>
                <Monitor size={16} /> React DOM
              </span>
              <span>
                <Smartphone size={16} /> React Native
              </span>
            </div>
          </div>
        </div>
      </section>
      <QuickStart studio code={starter} />
      <DeveloperResources studio />
      <Questions studio />
      <FinalCallout studio />
    </MarketingLayout>
  );
}
