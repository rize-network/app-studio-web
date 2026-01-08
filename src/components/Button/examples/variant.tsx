import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

import { Variant } from '../Button/Button.type';

export const VariantButtons = () => (
  <Vertical gap={15}>
    <Vertical gap={10}>
      <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Colors</h3>
      <Vertical gap={5}>
        <Button color="theme.primary">Primary</Button>
        <Button color="theme.secondary">Secondary</Button>
        <Button color="color.black">Black</Button>
        <Button color="color.white" textColor="color.black">
          White
        </Button>
      </Vertical>
    </Vertical>

    <Vertical gap={10}>
      <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Variants</h3>
      {['filled', 'outline', 'empty', 'ghost', 'link', 'subtle'].map(
        (variant) => (
          <Button key={variant} variant={variant as Variant}>
            {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
          </Button>
        )
      )}
    </Vertical>

    <Vertical gap={10}>
      <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Reversed</h3>
      <div
        style={{
          padding: 20,
          backgroundColor: '#333',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <Button reversed variant="filled" color="theme.primary">
          Filled Reversed
        </Button>
        <Button reversed variant="outline" color="theme.primary">
          Outline Reversed
        </Button>
        <Button reversed variant="ghost" color="theme.primary">
          Ghost Reversed
        </Button>
      </div>
    </Vertical>
  </Vertical>
);
