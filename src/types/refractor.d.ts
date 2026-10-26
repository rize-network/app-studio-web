// Resolve the site's ESM highlighter types with this package's legacy TS resolver.
declare module 'refractor/core' {
  export { refractor } from 'refractor/lib/core.js';
}
declare module 'refractor/tsx' {
  export { default } from 'refractor/lang/tsx.js';
}
declare module 'refractor/css' {
  export { default } from 'refractor/lang/css.js';
}
declare module 'refractor/json' {
  export { default } from 'refractor/lang/json.js';
}
declare module 'refractor/bash' {
  export { default } from 'refractor/lang/bash.js';
}
