import React from 'react';
import {
  IconButtons,
  VariantButtons,
  ShadowButton,
  ButtonSizes,
  DisabledButton,
  LoaderButtons,
  BorderMovingButtons,
  AnimatedStrokeButtons,
  ShareButtons,
  SubtleButtons,
} from 'src/components/Button/examples';
import { View } from 'app-studio';

export const ButtonPage = () => {
  return (
    <View padding={20}>
      <View marginBottom={20}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Button Component
        </h1>
      </View>

      <View gap={20} display="flex" flexDirection="column">
        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            Schemes & Variants
          </h2>
          <VariantButtons />
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>States</h2>
          <View display="flex" gap={10}>
            <DisabledButton />
          </View>
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Sizes</h2>
          <ButtonSizes />
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Shadows</h2>
          <ShadowButton />
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Loaders</h2>
          <LoaderButtons />
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Icons</h2>
          <IconButtons />
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>Effects</h2>
          <View display="flex" flexDirection="column" gap={10}>
            <BorderMovingButtons />
            <AnimatedStrokeButtons />
          </View>
        </View>

        <View>
          <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>
            Social & Subtle
          </h2>
          <View display="flex" gap={10} flexDirection="column">
            <ShareButtons />
            <SubtleButtons />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ButtonPage;
