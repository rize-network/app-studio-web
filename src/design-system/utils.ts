import {
  DesignSystemComponentConfig,
  DesignSystemComponentName,
  DesignSystemConfig,
  DesignSystemViewProps,
} from './types';

const isPlainObject = (value: unknown): value is Record<string, any> =>
  Boolean(value) &&
  typeof value === 'object' &&
  !Array.isArray(value) &&
  Object.prototype.toString.call(value) === '[object Object]';

export const normalizeDesignSystemComponentProps = <
  T extends Record<string, any>
>(
  props: T
): T => {
  return props;
};

export const deepMerge = <T extends Record<string, any> = Record<string, any>>(
  ...objects: Array<Record<string, any> | undefined>
): T => {
  const result: Record<string, any> = {};

  objects.forEach((object) => {
    if (!isPlainObject(object)) return;

    Object.entries(object).forEach(([key, value]) => {
      // Treat null the same as undefined: configs use null to declare a key
      // exists in the schema without overriding component defaults. Nested
      // nulls (e.g. `views.container.backgroundColor: null`) are pre-stripped
      // from configs at the boundary — see `stripNullsDeep` below — so this
      // top-level check is sufficient and we keep the cycle-safe shape that
      // assigns React-element props by reference rather than recursing.
      if (value === undefined || value === null) return;

      if (isPlainObject(value) && isPlainObject(result[key])) {
        result[key] = deepMerge(result[key], value);
        return;
      }

      result[key] = value;
    });
  });

  return result as T;
};

// Recursively remove keys whose value is `null` from plain-object trees.
// Only descends into plain objects: arrays and non-object values are returned
// as-is, so React elements / fibers / class instances are left alone. Used to
// scrub `views.container.backgroundColor: null` and friends from configs
// before they ever reach the merge pipeline.
const stripNullsDeep = <T>(value: T): T => {
  if (Array.isArray(value)) return value;
  if (!isPlainObject(value)) return value;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(value)) {
    if (v === null) continue;
    out[k] = isPlainObject(v) ? stripNullsDeep(v) : v;
  }
  return out as T;
};

// Components whose colors are computed per-variant. A config block's `views`
// sits ABOVE the variant palette, so a color there flattens every variant
// (ghost/outline/subtle all render as solid blocks). Colors for these
// components belong in `config.variants.<variant>` (merged UNDER each
// variant) or the top-level `color`/`textColor` keys.
const VARIANT_DRIVEN_COMPONENTS: ReadonlySet<string> = new Set(['button']);
const VIEW_COLOR_KEYS = [
  'backgroundColor',
  'background',
  'borderColor',
  'color',
] as const;
const warnedViewColorBlocks = new Set<string>();

const warnOnViewColors = (
  componentName: string,
  views: Record<string, Record<string, unknown>> | undefined
) => {
  if (process.env.NODE_ENV === 'production') return;
  if (!views || !VARIANT_DRIVEN_COMPONENTS.has(componentName)) return;
  if (warnedViewColorBlocks.has(componentName)) return;
  for (const [viewKey, viewValue] of Object.entries(views)) {
    if (!isPlainObject(viewValue)) continue;
    const offenders = VIEW_COLOR_KEYS.filter((k) => viewValue[k] != null);
    if (offenders.length > 0) {
      warnedViewColorBlocks.add(componentName);
      console.warn(
        `[design-system] components.${componentName}.views.${viewKey} sets ` +
          `${offenders.join(', ')} — view styles apply above every variant, ` +
          'so this flattens ghost/outline/subtle into solid blocks. Move ' +
          `colors to components.${componentName}.config.variants.<variant> ` +
          '(merged under each variant); keep views to shape and typography.'
      );
      return;
    }
  }
};

export const getDesignSystemComponentProps = (
  componentName: DesignSystemComponentName,
  config?: DesignSystemConfig
): DesignSystemComponentConfig => {
  if (!config) return {};
  const raw = config.components[componentName] || {};
  const cleaned = normalizeDesignSystemComponentProps(stripNullsDeep(raw));
  warnOnViewColors(componentName, cleaned.views);
  return cleaned;
};

export const mergeDesignSystemComponentProps = <T extends Record<string, any>>(
  componentName: DesignSystemComponentName,
  props: T,
  config?: DesignSystemConfig
): T => {
  const { config: localConfig, ...otherProps } = props;

  const globalConfig = getDesignSystemComponentProps(componentName, config);

  const mergedConfig = deepMerge(globalConfig, localConfig || {});

  return normalizeDesignSystemComponentProps(
    deepMerge<T>(mergedConfig as any, otherProps as any) as T
  );
};
