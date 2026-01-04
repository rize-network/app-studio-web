import React from 'react';
import { Button } from '../Button';
import { Vertical } from 'app-studio';

import { Variant } from '../Button/Button.type';

export const VariantButtons = () => (
  <Vertical gap={15}>
    <Vertical gap={10}>
      <h3 style={{ fontSize: '14px', fontWeight: 600 }}>Schemes</h3>
      <Vertical gap={5}>
        <Button scheme="theme.primary">Primary Scheme</Button>
        <Button scheme="theme.secondary">Secondary Scheme</Button>
        <Button scheme="color.black">Black Scheme</Button>
        <Button scheme="color.white">White Scheme</Button>
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
        <Button reversed variant="filled" scheme="primary">
          Filled Reversed
        </Button>
        <Button reversed variant="outline" scheme="primary">
          Outline Reversed
        </Button>
        <Button reversed variant="ghost" scheme="primary">
          Ghost Reversed
        </Button>
      </div>
    </Vertical>
  </Vertical>
);
