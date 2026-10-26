import React from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  Component,
  Keyboard,
  Monitor,
  Palette,
  Smartphone,
} from 'lucide-react';
import { ComponentShowcase } from './marketing/ComponentShowcase';
import {
  DeveloperResources,
  FinalCallout,
  MarketingLayout,
  Questions,
  QuickStart,
  SectionHeading,
} from './marketing/MarketingLayout';

const starter = `import { ThemeProvider, ResponsiveProvider,
  Vertical } from 'app-studio';
import { Button, Text } from '@app-studio/components';

export default function App() {
  return (
    <ThemeProvider theme={{ primary: 'color-blue-900' }}>
      <ResponsiveProvider>
        <Vertical gap={16} padding={24}>
          <Text fontSize={24}>Hello, possibility.</Text>
          <Button onClick={() => console.log('Let’s go')}>
            Start something good
          </Button>
        </Vertical>
      </ResponsiveProvider>
    </ThemeProvider>
  );
}`;

export const HomeHero = () => (
  <MarketingLayout product="components">
    <section className="m-container m-hero">
      <div className="m-hero-copy">
        <a className="m-announcement" href="/docs/GettingStarted">
          <span className="m-status-dot" /> @APP-STUDIO/COMPONENTS{' '}
          <ArrowUpRight size={14} />
        </a>
        <h1>
          React UI.
          <br />
          Built to
          <br />
          <span className="m-highlight">compose.</span>
        </h1>
        <p>
          A TypeScript component library for React and React Native. Build
          consistent interfaces with shared themes, style props, and documented
          APIs.
        </p>
        <div className="m-actions">
          <a className="m-link-button" href="#get-started">
            Start building <ArrowRight size={17} />
          </a>
          <a className="m-text-link" href="/button">
            Explore components <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="m-hero-notes">
          <span>
            <Check size={14} /> TypeScript first
          </span>
          <span>
            <Check size={14} /> Source available
          </span>
          <span>
            <Check size={14} /> Web + Native
          </span>
        </div>
      </div>
      <ComponentShowcase />
    </section>
    <div className="m-container m-tech-strip">
      <span className="m-mono">FAMILIAR TOOLS. A FRESH START.</span>
      <span>
        <Component size={20} /> React
      </span>
      <span>
        <Smartphone size={18} /> React Native
      </span>
      <span>
        <Braces size={20} /> TypeScript
      </span>
      <a href="/">
        <span className="m-small-logo">a.</span> Powered by App Studio{' '}
        <ArrowUpRight size={13} />
      </a>
    </div>
    <section id="why-components" className="m-section m-container">
      <div className="m-split-heading">
        <SectionHeading
          eyebrow="THE REPETITIVE PART? ALREADY DONE."
          title="Your ideas deserve more of your time."
        />
        <p>
          Spend less time rebuilding the same controls. Start with a consistent
          foundation, then bring your own point of view.
        </p>
      </div>
      <div className="m-feature-grid">
        {[
          {
            icon: Component,
            title: 'Compose. Don’t compromise.',
            text: 'From buttons and inputs to dialogs and navigation. Start small, combine freely, and keep control of the result.',
            link: '/docs/Button',
            label: 'Meet the components',
          },
          {
            icon: Palette,
            title: 'Your brand belongs here.',
            text: 'Theme tokens, variants, and internal view overrides make a shared foundation feel like your own product.',
            link: '/design-system',
            label: 'Explore the design system',
          },
          {
            icon: Keyboard,
            title: 'Details that make a difference.',
            text: 'Controls with labels, focus states, and keyboard interactions. Check each component’s examples for its supported behavior.',
            link: '/docs/Checkbox',
            label: 'Try an interactive control',
          },
        ].map(({ icon: Icon, title, text, link, label }) => (
          <article className="m-feature" key={title}>
            <div className="m-feature-icon">
              <Icon size={25} strokeWidth={1.6} />
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
            <a href={link}>
              {label} <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </section>
    <section className="m-platform-section">
      <div className="m-container m-platform-grid">
        <div>
          <span className="m-eyebrow">
            DIFFERENT SCREENS. SHARED FOUNDATIONS.
          </span>
          <h2>
            One familiar API.
            <br />
            More places to go.
          </h2>
          <p>
            Use the same imports and component patterns on web and React Native.
            Each platform gets a dedicated implementation.
          </p>
          <ul className="m-check-list">
            <li>
              <Check size={16} /> Shared theme tokens and styling conventions
            </li>
            <li>
              <Check size={16} /> Platform-aware package exports
            </li>
            <li>
              <Check size={16} /> Native compatibility documented per component
            </li>
          </ul>
          <a
            className="m-text-link"
            href="https://github.com/rize-network/app-studio-components/blob/main/docs/getting-started/react-native.md"
          >
            Read the native compatibility guide <ArrowUpRight size={15} />
          </a>
          <p className="m-fine-print">
            Some components are web-only. Native animations, icons, and
            gradients can require additional peers.
          </p>
        </div>
        <div className="m-platform-art">
          <div className="m-browser-art">
            <div className="m-browser-bar">
              <span className="m-window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>your-next-app.dev</span>
            </div>
            <div className="m-browser-content">
              <div className="m-art-sidebar">
                <span className="m-art-brand">a.</span>
                <span />
                <span />
                <span />
              </div>
              <div className="m-art-main">
                <span className="m-mono">A SHARED FOUNDATION</span>
                <h3>
                  Good morning,
                  <br />
                  possibility.
                </h3>
                <div className="m-art-stat">
                  <span>Ready to build</span>
                  <strong>
                    Something great <span>↗</span>
                  </strong>
                </div>
                <div className="m-art-bars">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <span className="m-art-platform">
              <Monitor size={14} /> REACT DOM
            </span>
          </div>
          <div className="m-phone-art">
            <div className="m-phone-notch" />
            <span className="m-art-brand">a.</span>
            <span className="m-mono">YOUR NEXT APP</span>
            <h3>
              Same idea.
              <br />
              New screen.
            </h3>
            <div className="m-phone-tile">
              <Check size={20} />
              <span>Made for here.</span>
            </div>
            <span className="m-art-platform">
              <Smartphone size={13} /> REACT NATIVE
            </span>
          </div>
          <span className="m-platform-note m-mono">
            ILLUSTRATIVE LAYOUT · PLATFORM-SPECIFIC RENDERING
          </span>
        </div>
      </div>
    </section>
    <section className="m-section m-container m-catalog">
      <SectionHeading
        eyebrow="FIND YOUR BUILDING BLOCKS"
        title="Small pieces. Whole experiences."
      >
        A library that grows with your interface, from the first input to the
        finishing touch.
      </SectionHeading>
      <div className="m-catalog-grid">
        {[
          [
            '01',
            'Actions & inputs',
            'Button, TextField, Checkbox, Switch',
            '/button',
          ],
          [
            '02',
            'Structure & navigation',
            'Tabs, Sidebar, Accordion, NavigationMenu',
            '/tabs',
          ],
          [
            '03',
            'Feedback & overlays',
            'Alert, Modal, Toast, Tooltip',
            '/modal',
          ],
          ['04', 'Content & data', 'Card, Avatar, Badge, Table', '/card'],
        ].map(([n, name, text, href]) => (
          <a href={href} key={n}>
            <span className="m-mono">{n}</span>
            <div>
              <h3>{name}</h3>
              <p>{text}</p>
            </div>
            <ArrowUpRight size={20} />
          </a>
        ))}
      </div>
    </section>
    <QuickStart code={starter} />
    <DeveloperResources />
    <Questions />
    <FinalCallout />
  </MarketingLayout>
);

export default HomeHero;
