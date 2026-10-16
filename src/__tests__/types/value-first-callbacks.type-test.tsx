/**
 * Type-level regression test for the value-first callback contract shared by
 * every form control in this package.
 *
 * This file is not run by vitest — it is checked by `npm run typecheck` and
 * `npm run typecheck:native` (the latter gates `npm run build:package`). Every
 * `@ts-expect-error` below asserts that a piece of code MUST NOT compile; if
 * one of them ever starts compiling, TypeScript reports "Unused
 * '@ts-expect-error' directive" and the typecheck fails.
 *
 * Background: these callbacks used to be typed `(value: any) => void` while
 * the rest of the API (`id`, `name`, `placeholder`, `value`, a real `<input>`
 * underneath) said "this is a DOM input". Consumers wrote the only thing that
 * shape suggests — `onChange={(e) => setX(e.target.value)}` — and got a
 * controlled input that silently reset on every keystroke, with no compile
 * error and no runtime error. `any` turned an API mistake into a silent
 * outage. These assertions keep it a compile error.
 */

import React from 'react';

import { TextField } from '../../components/Form/TextField/TextField';
import { Password } from '../../components/Form/Password/Password';
import { TextArea } from '../../components/Form/TextArea/TextArea';
import { Select } from '../../components/Form/Select/Select';
import { Selector } from '../../components/Form/Selector/Selector';
import { DatePicker } from '../../components/Form/DatePicker/DatePicker';
import { CountryPicker } from '../../components/Form/CountryPicker/CountryPicker';
import { Checkbox } from '../../components/Form/Checkbox/Checkbox';
import { TextFieldProps } from '../../components/Form/TextField/TextField/TextField.props';
import { TextAreaProps } from '../../components/Form/TextArea/TextArea/TextArea.props';

/* ------------------------------------------------------------------ *
 * The regression: a DOM-shaped handler must not compile.
 * ------------------------------------------------------------------ */

export const RejectsChangeEventHandler = () => {
  const [query, setQuery] = React.useState('');
  return (
    <TextField
      value={query}
      // @ts-expect-error onChange receives the value (string), not a ChangeEvent.
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setQuery(e.target.value)
      }
    />
  );
};

// Password extends TextFieldProps, so it inherits the same contract.
export const PasswordRejectsChangeEventHandler = () => {
  const [secret, setSecret] = React.useState('');
  return (
    <Password
      value={secret}
      // @ts-expect-error onChange receives the value (string), not a ChangeEvent.
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setSecret(e.target.value)
      }
    />
  );
};

// Same assertion at the props level, independent of JSX inference.
export const rejectsEventHandlerAssignment = () => {
  const props: TextFieldProps = {
    // @ts-expect-error onChange receives the value (string), not a FormEvent.
    onChange: (e: React.FormEvent<HTMLInputElement>) => void e,
  };
  return props;
};

// A handler asking for anything that is not a string is rejected too.
export const rejectsNonStringParameter = () => {
  const props: TextFieldProps = {
    // @ts-expect-error onChange receives a string, not a number.
    onChange: (value: number) => void value,
  };
  return props;
};

// TextArea carries the same value-first contract as TextField.
export const TextAreaRejectsChangeEventHandler = () => {
  const [body, setBody] = React.useState('');
  return (
    <TextArea
      value={body}
      // @ts-expect-error onChange receives the value (string), not a ChangeEvent.
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setBody(e.target.value)
      }
    />
  );
};

export const textAreaRejectsEventHandlerAssignment = () => {
  const props: TextAreaProps = {
    // @ts-expect-error onChange receives the value (string), not a FormEvent.
    onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void e,
  };
  return props;
};

/* ------------------------------------------------------------------ *
 * The contract that must keep compiling.
 * ------------------------------------------------------------------ */

export const AcceptsValueHandler = () => {
  const [query, setQuery] = React.useState('');
  return (
    <TextField
      value={query}
      onChange={(value) => setQuery(value)}
      onChangeText={(value) => setQuery(value)}
    />
  );
};

// The inferred parameter is `string` — assigning it to a string binding must
// compile without a cast. If `onChange` ever regresses to `any` this stays
// green, which is why the `@ts-expect-error` assertions above carry the test.
export const InfersStringParameter = () => (
  <TextField
    onChange={(value) => {
      const asString: string = value;
      return void asString;
    }}
  />
);

/* ------------------------------------------------------------------ *
 * The rest of the form family carries the same contract.
 * ------------------------------------------------------------------ */

export const SelectRejectsChangeEventHandler = () => (
  <Select
    options={[{ label: 'One', value: '1' }]}
    // @ts-expect-error onChange receives the selected value, not a ChangeEvent.
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => void e.target.value}
  />
);

// A single-select caller may still use a plain string handler: arrays only
// occur when `isMulti`, which is why `onChange` uses bivariant method syntax.
// (A bare `setValue` reference is the one thing this does not cover —
// `Dispatch<SetStateAction<string>>` takes `string | ((prev: string) => string)`,
// which is unrelated to `string | string[]` in both directions.)
export const SelectAcceptsStringHandler = () => {
  const [value, setValue] = React.useState('1');
  return (
    <Select
      options={[{ label: 'One', value: '1' }]}
      value={value}
      onChange={(next: string) => setValue(next)}
    />
  );
};

// Multi-select receives the whole array.
export const SelectAcceptsArrayHandler = () => {
  const [values, setValues] = React.useState<string[]>([]);
  return (
    <Select
      isMulti
      options={[{ label: 'One', value: '1' }]}
      value={values}
      onChange={(next: string[]) => setValues(next)}
    />
  );
};

export const SelectorRejectsChangeEventHandler = () => (
  <Selector
    options={[{ label: 'One', value: '1' }]}
    // @ts-expect-error onChange receives the option's value, not a ChangeEvent.
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => void e.target.value}
  />
);

export const DatePickerRejectsChangeEventHandler = () => (
  <DatePicker
    // @ts-expect-error onChange receives the date string, not a ChangeEvent.
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => void e.target.value}
  />
);

export const CountryPickerRejectsChangeEventHandler = () => (
  <CountryPicker
    // @ts-expect-error onChange receives the country value, not a ChangeEvent.
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => void e.target.value}
  />
);

// Checkbox reports its next checked state; it used to be typed `Function`,
// which accepted literally any callable.
export const CheckboxRejectsChangeEventHandler = () => (
  <Checkbox
    // @ts-expect-error onChange receives the next checked state, not an event.
    onChange={(e: React.ChangeEvent<HTMLInputElement>) => void e.target.checked}
  />
);

export const CheckboxAcceptsBooleanHandler = () => {
  const [checked, setChecked] = React.useState(false);
  return <Checkbox isChecked={checked} onChange={setChecked} />;
};

export const TextAreaAcceptsValueHandler = () => {
  const [body, setBody] = React.useState('');
  return (
    <TextArea
      value={body}
      onChange={(value) => setBody(value)}
      onChangeText={(value) => setBody(value)}
    />
  );
};

/* ------------------------------------------------------------------ *
 * Props that were declared but never read must not come back.
 * ------------------------------------------------------------------ */

// `isWorkerRunning` and a value-first `onSubmit` were copied onto TextAreaProps
// from ChatInput and never implemented on either platform — passing them did
// nothing at all. Accepting a prop and ignoring it is the same silent failure
// as mistyping one, so they are gone rather than inert.
export const textAreaRejectsUnimplementedProps = () => {
  const props: TextAreaProps = {
    // @ts-expect-error TextArea has no isWorkerRunning prop.
    isWorkerRunning: true,
  };
  return props;
};

export const textAreaRejectsValueFirstOnSubmit = () => {
  const props: TextAreaProps = {
    // @ts-expect-error onSubmit is the inherited DOM handler, not (value: string).
    onSubmit: (input: string) => void input,
  };
  return props;
};

// `onBlur` is the one callback that really does receive an event-shaped
// argument, and it stays permissive on purpose (web FocusEvent, the RN blur
// event, and the synthetic `{ target: { name } }` from the clear button).
export const AcceptsBlurEvent = () => (
  <TextField onBlur={(event) => void event} />
);
