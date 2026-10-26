import React, { createContext, useContext, useMemo, useState } from 'react';
import * as ReactModule from 'react';
import * as AppStudio from 'app-studio';
import * as Components from 'src/components';
import * as Formik from 'formik';
import { Label } from 'src/components/Form/Label/Label';
import { EditComponent } from 'src/components/EditComponent/EditComponent';
import { Button } from 'src/components/Button/Button';
import { TextField } from 'src/components/Form/TextField/TextField';
import { TextArea } from 'src/components/Form/TextArea/TextArea';
import { Select } from 'src/components/Form/Select/Select';
import { Switch } from 'src/components/Form/Switch/Switch';
import { RotateCcw } from 'lucide-react';
import CustomLiveCode, { ExampleBoundary } from './CustomLiveCode.component';
import {
  parseControlValue,
  playgroundCopyCode,
  playgroundPreviewCode,
  PlaygroundControl,
  PlaygroundDefinition,
  PlaygroundValues,
} from './playground.utils';

const modules: Record<string, any> = {
  react: ReactModule,
  'app-studio': AppStudio,
  '@app-studio/components': Components,
  formik: Formik,
  'src/components/Form/Label/Label': { Label },
  'src/components/EditComponent/EditComponent': { EditComponent },
};
const ValuesContext = createContext<PlaygroundValues>({});

export default function ComponentPlayground({
  definition,
}: {
  definition: PlaygroundDefinition;
}) {
  const [values, setValues] = useState<PlaygroundValues>({});
  const [drafts, setDrafts] = useState<Record<string, string | boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const scope = useMemo(() => {
    const Target = definition.exportPath.reduce(
      (module, name) => module?.[name],
      modules[definition.module]
    ) as React.ComponentType<any>;
    if (!Target)
      throw new Error(
        `Playground component ${definition.name} is unavailable.`
      );
    return {
      __PlaygroundTarget: function PlaygroundTarget(props: any) {
        const overrides = useContext(ValuesContext);
        return (
          <ExampleBoundary resetKey={overrides}>
            <Target {...props} {...overrides} />
          </ExampleBoundary>
        );
      },
    };
  }, [definition]);
  const previewCode = useMemo(
    () => playgroundPreviewCode(definition),
    [definition]
  );
  const code = playgroundCopyCode(definition, values);
  const change = (control: PlaygroundControl, raw: string | boolean) => {
    setDrafts((current) => ({ ...current, [control.name]: raw }));
    if (
      raw === '' &&
      ['number', 'length', 'json', 'enum'].includes(control.kind)
    ) {
      setValues((current) => {
        const next = { ...current };
        delete next[control.name];
        return next;
      });
      setErrors((current) => ({ ...current, [control.name]: '' }));
      return;
    }
    try {
      const value = parseControlValue(control, raw);
      setValues((current) => ({ ...current, [control.name]: value }));
      setErrors((current) => ({ ...current, [control.name]: '' }));
    } catch {
      setErrors((current) => ({
        ...current,
        [control.name]:
          control.kind === 'json'
            ? 'Enter a JSON object. Preview and code keep the last valid value.'
            : 'Enter a valid value. Preview and code keep the last valid value.',
      }));
    }
  };
  const renderControl = (control: PlaygroundControl) => {
    const draft = drafts[control.name] ?? control.initial;
    if (control.kind === 'boolean')
      return (
        <div className="docs-playground-toggle" key={control.name}>
          <Switch
            label={control.name}
            isChecked={Boolean(draft)}
            onChange={(value) => change(control, value)}
            description={
              Object.prototype.hasOwnProperty.call(values, control.name)
                ? String(draft)
                : 'Example default'
            }
            size="sm"
          />
        </div>
      );
    if (control.kind === 'enum')
      return (
        <Select
          key={control.name}
          label={control.name}
          size="sm"
          value={
            draft === undefined
              ? ''
              : typeof draft === 'string' &&
                Object.prototype.hasOwnProperty.call(drafts, control.name)
              ? draft
              : JSON.stringify(draft)
          }
          onChange={(value: string) => change(control, value)}
          options={[
            { label: 'Use example', value: '' },
            ...control.options!.map((value) => ({
              label: String(value),
              value: JSON.stringify(value),
            })),
          ]}
        />
      );
    const props = {
      label: control.name,
      'aria-label': `Playground ${control.name}`,
      value:
        draft === undefined
          ? ''
          : typeof draft === 'object'
          ? JSON.stringify(draft, null, 2)
          : String(draft),
      onChange: (value: string) => change(control, value),
      placeholder:
        control.kind === 'json' ? 'Enter a JSON object' : 'Example default',
      size: 'sm' as const,
      error: Boolean(errors[control.name]),
      'aria-invalid': Boolean(errors[control.name]),
      'aria-describedby': errors[control.name]
        ? `playground-${control.name}-error`
        : undefined,
    };
    return (
      <div key={control.name}>
        {control.kind === 'json' ? (
          <TextArea {...props} />
        ) : (
          <TextField
            {...props}
            type="text"
            inputMode={control.kind === 'number' ? 'decimal' : undefined}
          />
        )}
        {errors[control.name] && (
          <p
            className="docs-playground-error"
            id={`playground-${control.name}-error`}
            role="alert"
          >
            {errors[control.name]}
          </p>
        )}
      </div>
    );
  };
  return (
    <div
      className="docs-playground"
      role="region"
      aria-label="Component playground"
    >
      <div className="docs-playground-header">
        <div>
          <strong>Playground</strong>
          <span>
            Editing <code>{definition.name}</code>
          </span>
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setValues({});
            setDrafts({});
            setErrors({});
          }}
          ariaLabel="Reset playground"
        >
          <RotateCcw size={13} /> Reset
        </Button>
      </div>
      <p className="docs-playground-hint">
        Changes apply to this component instance. State and callbacks stay in
        the example; Code shows your current props.
      </p>
      <div className="docs-playground-grid">
        <div
          className="docs-playground-controls"
          role="group"
          aria-label="Playground props"
        >
          {definition.controls.slice(0, 6).map(renderControl)}
          {definition.controls.length > 6 && (
            <details>
              <summary>More props ({definition.controls.length - 6})</summary>
              <div>{definition.controls.slice(6).map(renderControl)}</div>
            </details>
          )}
        </div>
        <ValuesContext.Provider value={values}>
          <CustomLiveCode
            code={previewCode}
            originalCode={code}
            mainComponentName={definition.example.exportName}
            scope={scope}
            modules={modules}
          />
        </ValuesContext.Provider>
      </div>
    </div>
  );
}
