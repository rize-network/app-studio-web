import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { BlockEditorView } from '../components/BlockEditor/BlockEditor/BlockEditor.view.native';
import { useBlockEditorState } from '../components/BlockEditor/BlockEditor/BlockEditor.state';
import { BlockEditorProps } from '../components/BlockEditor/BlockEditor/BlockEditor.props';

// This host verifies the native adapter's event contract, not device keyboard behavior.
vi.mock('react-native', () => ({ Platform: { OS: 'ios' } }));
vi.mock('app-studio', () => {
  const View = ({ children, onPress, accessibilityLabel }: any) => (
    <div aria-label={accessibilityLabel} onClick={onPress}>
      {children}
    </div>
  );
  return {
    View,
    Vertical: View,
    Horizontal: View,
    Text: ({ children }: any) => <span>{children}</span>,
  };
});
vi.mock('../components/Button/Button', () => ({
  Button: ({ children, isDisabled, onClick }: any) => (
    <button disabled={isDisabled} onClick={onClick}>
      {children}
    </button>
  ),
}));
vi.mock('../components/ActionSheet/ActionSheet', () => ({
  ActionSheet: ({ isOpen, children, items, onSelect }: any) =>
    isOpen ? (
      <div>
        {children}
        {items?.map((item: any) => (
          <button key={item.value} onClick={() => onSelect(item.value, item)}>
            {item.label}
          </button>
        ))}
      </div>
    ) : null,
}));
vi.mock('../components/BlockEditor/BlockEditor/BlockEditor.controls', () => ({
  BlockEditorControls: ({ state }: any) => (
    <>
      <button onClick={() => state.format('bold')}>Bold</button>
      <button onClick={state.openMedia}>Media</button>
    </>
  ),
  BlockEditorPanels: ({ uploadEnabled }: any) => (
    <span data-testid="native-upload-policy">
      {uploadEnabled ? 'enabled' : 'hidden'}
    </span>
  ),
}));
vi.mock('../components/BlockEditor/BlockEditor/BlockEditor.content', () => ({
  BlockContent: ({ block }: any) => <span>{block.body}</span>,
}));
vi.mock('../components/Form/TextArea/TextArea', () => ({
  TextArea: ({
    value,
    label,
    onChange,
    onSelectionChange,
    onKeyPress,
    inputRef,
    isDisabled,
    isReadOnly,
    views,
  }: any) => (
    <textarea
      ref={inputRef}
      aria-label={label}
      value={value}
      disabled={isDisabled}
      readOnly={isReadOnly}
      style={{ fontFamily: views?.field?.fontFamily }}
      onChange={(event) => onChange(event.target.value)}
      onKeyDown={(event) => onKeyPress?.({ nativeEvent: { key: event.key } })}
      onSelect={(event) =>
        onSelectionChange({
          nativeEvent: {
            selection: {
              start: event.currentTarget.selectionStart,
              end: event.currentTarget.selectionEnd,
            },
          },
        })
      }
    />
  ),
}));

afterEach(cleanup);
function NativeHost(props: BlockEditorProps) {
  return <BlockEditorView {...props} state={useBlockEditorState(props)} />;
}

test('native activation edits only its block and tracks source selection for formatting', () => {
  const onChange = vi.fn();
  render(<NativeHost defaultValue={'# Title\n\nBody'} onChange={onChange} />);
  fireEvent.click(screen.getByText('Body'));
  const input = screen.getByRole('textbox', {
    name: 'Paragraph',
  }) as HTMLTextAreaElement;
  input.setSelectionRange(0, 4);
  fireEvent.select(input);
  fireEvent.click(screen.getAllByText('Bold')[0]);
  expect(onChange).toHaveBeenLastCalledWith('# Title\n\n**Body**');
  expect(screen.getByRole('textbox', { name: 'Paragraph' })).toHaveValue(
    '**Body**'
  );
});

test('native block menus transform the chosen block without changing others', () => {
  const onChange = vi.fn();
  render(<NativeHost defaultValue={'First\n\nSecond'} onChange={onChange} />);
  fireEvent.click(screen.getAllByText('Blocks /')[1]);
  fireEvent.click(screen.getByText('Heading 2'));
  expect(onChange).toHaveBeenLastCalledWith('First\n\n## Second');
});

test('native read-only documents render without editing controls or active inputs', () => {
  render(<NativeHost value="# Title" isReadOnly />);
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.queryByRole('textbox')).toBeNull();
  expect(screen.queryByText('Blocks /')).toBeNull();
});

test('native slash opens commands without emitting a temporary Markdown change', () => {
  const onChange = vi.fn();
  render(<NativeHost defaultValue="" onChange={onChange} />);
  fireEvent.click(screen.getByLabelText('Paragraph'));
  fireEvent.change(screen.getByRole('textbox', { name: 'Paragraph' }), {
    target: { value: '/' },
  });
  expect(onChange).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText('Heading 1'));
  expect(onChange).toHaveBeenCalledOnce();
  expect(onChange).toHaveBeenCalledWith('# ');
});

test('native iOS code editing uses an available monospace font', () => {
  render(<NativeHost defaultValue={'```ts\nconst x = 1;\n```'} />);
  fireEvent.click(screen.getByText('const x = 1;'));
  expect(screen.getByRole('textbox', { name: 'Code block' })).toHaveStyle({
    fontFamily: 'Menlo',
  });
});

test('native Enter splits prose and Backspace at the start merges it in one transaction', () => {
  const change = vi.fn();
  render(<NativeHost defaultValue="Hello world" onChange={change} />);
  fireEvent.click(screen.getByText('Hello world'));
  fireEvent.change(screen.getByRole('textbox', { name: 'Paragraph' }), {
    target: { value: 'Hello\n world' },
  });
  expect(change).toHaveBeenCalledExactlyOnceWith('Hello\n\n world');
  const second = screen.getByRole('textbox', {
    name: 'Paragraph',
  }) as HTMLTextAreaElement;
  expect(second).toHaveValue(' world');
  second.setSelectionRange(0, 0);
  fireEvent.select(second);
  fireEvent.keyDown(second, { key: 'Backspace' });
  expect(change).toHaveBeenLastCalledWith('Hello world');
  expect(change).toHaveBeenCalledTimes(2);
});

test('native upload action requires both an uploader and a real picker adapter', () => {
  const uploadMedia = vi.fn();
  const { rerender } = render(
    <NativeHost defaultValue="Keep" uploadMedia={uploadMedia} />
  );
  fireEvent.click(screen.getAllByText('Media')[0]);
  expect(screen.getByTestId('native-upload-policy')).toHaveTextContent(
    'hidden'
  );
  rerender(
    <NativeHost
      defaultValue="Keep"
      uploadMedia={uploadMedia}
      pickMedia={async () => null}
    />
  );
  expect(screen.getByTestId('native-upload-policy')).toHaveTextContent(
    'enabled'
  );
  expect(document.querySelector('input[type="file"]')).toBeNull();
  expect(uploadMedia).not.toHaveBeenCalled();
});
