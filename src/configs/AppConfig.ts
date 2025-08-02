interface EnvVars {
  API_URL: string;
  REACT_APP_API_URL: string;
  REACT_APP_NODE_ENV: string;
  REACT_APP_PUBLIC_STRIPE_KEY: string;
}

const env: EnvVars = process.env as any;

export const APP_NAME = 'App Studio Component';

export const DEV = window.location.host.indexOf('localhost') >= 0;

export const API_URL = env.REACT_APP_API_URL
  ? env.REACT_APP_API_URL
  : 'http://localhost:3000';

export const DEFAULT_LANGUAGE = 'en';
