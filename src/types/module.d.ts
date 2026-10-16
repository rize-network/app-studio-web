declare module '@emotion/unitless';

// Vite `?inline` asset imports resolve to a base64 data URI string.
declare module '*?inline' {
  const src: string;
  export default src;
}
