export const APP_NAME = 'App Studio Component';

export const DEV = window.location.host.indexOf('localhost') >= 0;

export const API_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.REACT_APP_API_URL ||
  'http://localhost:3000';

export const DEFAULT_LANGUAGE = 'en';
