import React from 'react';
import fs from 'fs';
import path from 'path';
import { fireEvent, render, screen } from '@testing-library/react';
import DesignSystemPage from 'src/pages/designSystem.page';
import {
  designSystemConfigList,
  getDesignSystemComponentProps,
  mergeDesignSystemComponentProps,
} from 'src/design-system';

const requiredComponentKeys = [
  'accordion',
  'alert',
  'avatar',
  'badge',
  'button',
  'card',
  'checkbox',
  'hero',
  'input',
  'loader',
  'navigation',
  'page',
  'progress',
  'radio',
  'select',
  'separator',
  'slider',
  'status',
  'switch',
  'table',
  'tabs',
  'textarea',
];

describe('config colors stay under the variants, never above them', () => {
  test('no shipped config carries colors in components.button.views', () => {
    const colorKeys = ['backgroundColor', 'background', 'borderColor', 'color'];
    // A color here sits above every variant and flattens ghost/outline/subtle
    // into solid blocks; colors belong in config.variants.<variant>.
    const offenders: string[] = [];
    designSystemConfigList.forEach((config: any) => {
      const views = config?.components?.button?.views ?? {};
      Object.entries(views).forEach(([viewKey, viewValue]) => {
        colorKeys.forEach((key) => {
          if ((viewValue as Record<string, unknown>)?.[key] != null) {
            offenders.push(
              `${config?.metadata?.id}: components.button.views.${viewKey}.${key}`
            );
          }
        });
      });
    });
    expect(offenders).toEqual([]);
  });

  test('a config with colors in button views triggers the dev warning', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    getDesignSystemComponentProps('button', {
      metadata: { id: 'test' },
      components: {
        button: { views: { container: { backgroundColor: 'color-gray-50' } } },
      },
    } as any);
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining('config.variants')
    );
    warn.mockRestore();
  });
});

describe('design system configs', () => {
  test('loads all HTML-derived configs with unique ids', () => {
    expect(designSystemConfigList).toHaveLength(15);

    const ids = designSystemConfigList.map((config) => config.metadata.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  test('points every config to an existing source HTML file', () => {
    designSystemConfigList.forEach((config) => {
      expect(config.metadata.sourcePath).toMatch(
        /^design\.md\/html\/.+\.html$/
      );
      expect(fs.existsSync(path.resolve(config.metadata.sourcePath))).toBe(
        true
      );
    });
  });

  test('includes required theme, token, and component sections', () => {
    designSystemConfigList.forEach((config) => {
      expect(config.theme.primary).toBeTruthy();
      expect(config.theme.canvas).toBeTruthy();
      expect(config.tokens.colors.length).toBeGreaterThan(0);
      expect(config.tokens.typography.fontFamily).toBeTruthy();

      requiredComponentKeys.forEach((key) => {
        expect(config.components).toHaveProperty(key);
      });
    });
  });
});

describe('design system adapters', () => {
  const linear = designSystemConfigList.find(
    (config) => config.metadata.id === 'linear'
  );

  test('returns component defaults from the selected config', () => {
    const buttonProps = getDesignSystemComponentProps('button', linear);
    const buttonConfig = linear?.components.button as any;

    // Defaults come through as the config's own values. Compare against the
    // config rather than hardcoded literals — this test used to assert the raw
    // hex `#5e6ad2` and `'8px'`, and broke the moment the config moved to
    // semantic tokens and a new radius scale.
    expect(buttonProps.color).toBe(buttonConfig.color);
    expect(buttonProps.views?.container?.borderRadius).toBe(
      buttonConfig.views.container.borderRadius
    );

    // Colours must stay semantic tokens, not resolved hex: the token is what
    // lets a light/dark switch re-resolve them.
    expect(buttonProps.color).toMatch(/^theme-/);

    // `backgroundColor: null` in the config means "leave it to the variant",
    // and stripNullsDeep must keep it from reaching the merged props.
    expect(buttonProps.views?.container).not.toHaveProperty('backgroundColor');
  });

  test('keeps explicit props and nested views ahead of config defaults', () => {
    const merged = mergeDesignSystemComponentProps(
      'card',
      {
        variant: 'elevated',
        views: {
          container: {
            borderRadius: '32px',
          },
        },
      },
      linear
    );

    expect(merged.variant).toBe('elevated');
    // Config defaults survive where the caller said nothing. (This read
    // `container.style.backgroundColor` — a nesting level the config does not
    // have — so it threw rather than asserting anything.)
    expect((merged.views as any).container.backgroundColor).toBe(
      (linear?.components.card as any).views.container.backgroundColor
    );
    // ...and the caller's explicit value wins over the config default.
    expect((merged.views as any).container.borderRadius).toBe('32px');
  });
});

describe('DesignSystemPage', () => {
  test('renders and switches active design-system config', () => {
    render(<DesignSystemPage />);

    expect(screen.getByText('Airbnb Design System')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Stripe/ }));

    expect(screen.getByText('Stripe Design System')).toBeInTheDocument();
  });
});
