import React, { useRef, useState } from 'react';
import { vi } from 'vitest';
import { act, cleanup, render, screen } from '@testing-library/react';
import { ChatInput } from 'src/components';
import type { ChatInputHandle } from 'src/components';

afterEach(() => {
  cleanup();
});

// jsdom ships no object-URL implementation; the attachment previews call it
// once a file lands in the upload pipeline.
beforeAll(() => {
  if (typeof URL.createObjectURL !== 'function') {
    URL.createObjectURL = () => 'blob:mock';
  }
  if (typeof URL.revokeObjectURL !== 'function') {
    URL.revokeObjectURL = () => {};
  }
});

test('renders ChatInput component', () => {
  render(<ChatInput placeholder="Message" autoFocus={false} />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

/**
 * The visible field is a `contentEditable` div, which has no `value` property. These tests cover the
 * hidden mirror `<textarea>` and the imperative handle that make the value reachable from outside React
 * (automation, replay engines, draft restoration, native form submission).
 */
describe('ChatInput value access', () => {
  const getMirror = (container: HTMLElement) =>
    container.querySelector(
      '[data-editable-input-mirror]'
    ) as HTMLTextAreaElement;

  const getEditable = (container: HTMLElement) =>
    container.querySelector(
      '[contenteditable][role="textbox"]'
    ) as HTMLDivElement;

  const Controlled = ({
    handleRef,
    onChange,
    ...props
  }: {
    handleRef?: React.MutableRefObject<ChatInputHandle | null>;
    onChange?: (value: string) => void;
    [key: string]: any;
  }) => {
    const ref = useRef<ChatInputHandle>(null);
    const [value, setValue] = useState('');
    if (handleRef) handleRef.current = ref.current;
    return (
      <ChatInput
        ref={(instance: ChatInputHandle | null) => {
          (ref as any).current = instance;
          if (handleRef) handleRef.current = instance;
        }}
        name="message"
        autoFocus={false}
        value={value}
        onChange={(next: string) => {
          setValue(next);
          onChange?.(next);
        }}
        {...props}
      />
    );
  };

  it('renders a hidden textarea mirroring the editable area', () => {
    const { container } = render(<Controlled />);
    const mirror = getMirror(container);

    expect(mirror).toBeTruthy();
    expect(mirror.tagName).toBe('TEXTAREA');
    expect(mirror.name).toBe('message');
    // Only the contentEditable is exposed to assistive technology.
    expect(mirror.getAttribute('aria-hidden')).toBe('true');
    expect(mirror.tabIndex).toBe(-1);
    expect(getEditable(container)).toBeTruthy();
  });

  it('keeps element.value in sync while the user types', () => {
    const { container } = render(<Controlled />);
    const editable = getEditable(container);

    act(() => {
      editable.textContent = 'hello';
      editable.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(getMirror(container).value).toBe('hello');
  });

  it('accepts an external write to element.value followed by an input event', () => {
    const changes: string[] = [];
    const { container } = render(
      <Controlled onChange={(next: string) => changes.push(next)} />
    );
    const mirror = getMirror(container);

    act(() => {
      mirror.value = 'restored draft';
      mirror.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(changes).toContain('restored draft');
    expect(getEditable(container).textContent).toBe('restored draft');
  });

  it('accepts a write made through the prototype value setter', () => {
    const { container } = render(<Controlled />);
    const mirror = getMirror(container);
    const setter = Object.getOwnPropertyDescriptor(
      HTMLTextAreaElement.prototype,
      'value'
    )!.set!;

    act(() => {
      setter.call(mirror, 'via prototype setter');
      mirror.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(getEditable(container).textContent).toBe('via prototype setter');
  });

  it('exposes getValue / setValue / clear on the ref', () => {
    const handleRef = {
      current: null,
    } as React.MutableRefObject<ChatInputHandle | null>;
    const { container } = render(<Controlled handleRef={handleRef} />);

    act(() => {
      handleRef.current!.setValue('set imperatively');
    });

    expect(handleRef.current!.getValue()).toBe('set imperatively');
    expect(getMirror(container).value).toBe('set imperatively');
    expect(getEditable(container).textContent).toBe('set imperatively');
    expect(handleRef.current!.getElement()).toBe(getEditable(container));
    expect(handleRef.current!.getInputElement()).toBe(getMirror(container));

    act(() => {
      handleRef.current!.clear();
    });

    expect(getMirror(container).value).toBe('');
    expect(getEditable(container).textContent).toBe('');
  });

  it('submits the value with the surrounding native form', () => {
    const handleRef = {
      current: null,
    } as React.MutableRefObject<ChatInputHandle | null>;
    const { container } = render(<Controlled handleRef={handleRef} />);

    act(() => {
      handleRef.current!.setValue('submitted text');
    });

    const form = getMirror(container).closest('form') as HTMLFormElement;
    expect(form).toBeTruthy();
    expect(new FormData(form).get('message')).toBe('submitted text');
  });

  it('still exposes the value on an uncontrolled ChatInput', () => {
    const Uncontrolled = ({ handleRef }: any) => (
      <ChatInput ref={handleRef} name="uncontrolled" autoFocus={false} />
    );
    const handleRef = {
      current: null,
    } as React.MutableRefObject<ChatInputHandle | null>;
    const { container } = render(<Uncontrolled handleRef={handleRef} />);

    act(() => {
      const mirror = getMirror(container);
      mirror.value = 'typed by a robot';
      mirror.dispatchEvent(new Event('input', { bubbles: true }));
    });

    expect(handleRef.current!.getValue()).toBe('typed by a robot');
    expect(getEditable(container).textContent).toBe('typed by a robot');
  });

  it('drops the mirror on hiddenInput={false} but keeps the imperative API working', () => {
    const handleRef = {
      current: null,
    } as React.MutableRefObject<ChatInputHandle | null>;
    const { container } = render(
      <Controlled handleRef={handleRef} hiddenInput={false} />
    );

    expect(getMirror(container)).toBeNull();

    act(() => {
      handleRef.current!.setValue('no mirror here');
    });

    expect(handleRef.current!.getValue()).toBe('no mirror here');
    expect(getEditable(container).textContent).toBe('no mirror here');
  });
});

test('isDisabled disables the editable input and the send button', () => {
  const { container } = render(
    <ChatInput isDisabled autoFocus={false} value="draft" onChange={() => {}} />
  );

  const editable = container.querySelector(
    '[role="textbox"]'
  ) as HTMLDivElement;
  expect(editable.getAttribute('contenteditable')).toBe('false');

  // The send button is the last button in the input row.
  const buttons = screen.getAllByRole('button');
  expect(buttons[buttons.length - 1]).toBeDisabled();
});

test('the upload pipeline reports progress and success around onFileUpload', async () => {
  // The state hook hands each queued file to the consumer-provided
  // `onFileUpload` service; mock it and observe the callbacks fired around it.
  const onFileUpload = vi.fn();
  const onUploadProgress = vi.fn();
  const onUploadSuccess = vi.fn();
  const { container } = render(
    <ChatInput
      autoFocus={false}
      onFileUpload={onFileUpload}
      onUploadProgress={onUploadProgress}
      onUploadSuccess={onUploadSuccess}
    />
  );

  const file = new File(['hello'], 'hello.txt', { type: 'text/plain' });
  const fileInput = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  await act(async () => {
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
  });

  expect(onFileUpload).toHaveBeenCalledWith(file);
  expect(onUploadSuccess).toHaveBeenCalledWith({ file });
  expect(onUploadProgress).toHaveBeenCalledWith(0);
  expect(onUploadProgress).toHaveBeenCalledWith(100);
}, 30000);

test('the upload pipeline reports onUploadError when the upload service throws', async () => {
  const failure = new Error('service down');
  const onFileUpload = vi.fn(() => {
    throw failure;
  });
  const onUploadError = vi.fn();
  const onUploadSuccess = vi.fn();
  const { container } = render(
    <ChatInput
      autoFocus={false}
      onFileUpload={onFileUpload}
      onUploadError={onUploadError}
      onUploadSuccess={onUploadSuccess}
    />
  );

  const file = new File(['x'], 'x.txt', { type: 'text/plain' });
  const fileInput = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  await act(async () => {
    Object.defineProperty(fileInput, 'files', { value: [file] });
    fileInput.dispatchEvent(new Event('change', { bubbles: true }));
  });

  expect(onUploadError).toHaveBeenCalledWith(failure);
  expect(onUploadSuccess).not.toHaveBeenCalled();
}, 30000);

test('onFileBrowse fires when the attach affordance is activated', () => {
  const onFileBrowse = vi.fn();
  const { container } = render(
    <ChatInput autoFocus={false} onFileBrowse={onFileBrowse} />
  );

  const fileInput = container.querySelector(
    'input[type="file"]'
  ) as HTMLInputElement;
  const attachButton = fileInput.parentElement as HTMLElement;
  act(() => {
    attachButton.click();
  });

  expect(onFileBrowse).toHaveBeenCalledTimes(1);
});

test('rightElement renders in the input row', () => {
  render(
    <ChatInput
      autoFocus={false}
      rightElement={<span data-testid="right-element" />}
    />
  );
  expect(screen.getByTestId('right-element')).toBeInTheDocument();
});

test('onKeyDown is forwarded to the editable input', () => {
  const onKeyDown = vi.fn();
  const { container } = render(
    <ChatInput autoFocus={false} onKeyDown={onKeyDown} />
  );
  const editable = container.querySelector(
    '[role="textbox"]'
  ) as HTMLDivElement;
  act(() => {
    editable.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
    );
  });
  expect(onKeyDown).toHaveBeenCalled();
});

test('the isWorkerRunning / onStopWorker aliases reach the agent props', () => {
  // Both are documented as aliases of isAgentRunning / onStopAgent, but nothing
  // resolved them, so passing the worker-named prop was a no-op.
  const onStopWorker = vi.fn();
  const { container } = render(
    <ChatInput
      isWorkerRunning
      onStopWorker={onStopWorker}
      onSubmit={() => {}}
    />
  );

  // The control is only enabled once there is text to act on.
  const editable = container.querySelector('[contenteditable]') as HTMLElement;
  act(() => {
    editable.textContent = 'hello';
    editable.dispatchEvent(new Event('input', { bubbles: true }));
  });

  // With an agent running the submit control becomes a stop control. It is
  // icon-only, so target it positionally rather than by accessible name.
  const buttons = screen.getAllByRole('button');
  act(() => {
    buttons[buttons.length - 1].click();
  });

  expect(onStopWorker).toHaveBeenCalled();
}, 30000);
