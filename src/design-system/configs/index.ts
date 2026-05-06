import airbnb from './airbnb.json';
import apple from './apple.json';
import coinbase from './coinbase.json';
import figma from './figma.json';
import linear from './linear.json';
import nike from './nike.json';
import notion from './notion.json';
import revolut from './revolut.json';
import shopify from './shopify.json';
import spacex from './spacex.json';
import spotify from './spotify.json';
import stripe from './stripe.json';
import tesla from './tesla.json';
import uber from './uber.json';
import vercel from './vercel.json';
import { DesignSystemConfig } from '../types';

export const designSystemConfigs = {
  airbnb: airbnb as DesignSystemConfig,
  apple: apple as DesignSystemConfig,
  coinbase: coinbase as DesignSystemConfig,
  figma: figma as DesignSystemConfig,
  linear: linear as DesignSystemConfig,
  nike: nike as DesignSystemConfig,
  notion: notion as DesignSystemConfig,
  revolut: revolut as DesignSystemConfig,
  shopify: shopify as DesignSystemConfig,
  spacex: spacex as DesignSystemConfig,
  spotify: spotify as DesignSystemConfig,
  stripe: stripe as DesignSystemConfig,
  tesla: tesla as DesignSystemConfig,
  uber: uber as DesignSystemConfig,
  vercel: vercel as DesignSystemConfig,
};

export type DesignSystemConfigId = keyof typeof designSystemConfigs;

export const designSystemConfigList = Object.values(designSystemConfigs);

export const defaultDesignSystemConfig = designSystemConfigs.airbnb;
