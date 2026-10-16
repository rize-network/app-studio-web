import React from 'react';
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import { BlockEditor } from '../components/BlockEditor/BlockEditor';

let frames = new Map<number, FrameRequestCallback>();
beforeEach(() => {
  frames = new Map();
  let id = 0;
  vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
    frames.set(++id, callback);
    return id;
  });
  vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
});
const paint = () =>
  act(() => {
    const callbacks = Array.from(frames.values());
    frames.clear();
    callbacks.forEach((callback) => callback(0));
  });

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

function dragSurface(label: string, heights: number[] = [], gap = 20) {
  const root = screen
    .getAllByLabelText(label)
    .find((element) => element.querySelector('[data-editor-row]'))!;
  const rows = () =>
    Array.from(root.querySelectorAll<HTMLElement>('[data-editor-row]'));
  const animate = vi.fn(
    (_frames: Keyframe[], _options: KeyframeAnimationOptions) => ({
      cancel: vi.fn(),
    })
  );
  const rowHeights = new Map(
    rows().map((row, index) => [row, heights[index] ?? 40])
  );
  const layoutTop = (row: HTMLElement) =>
    rows()
      .slice(0, rows().indexOf(row))
      .reduce((top, previous) => top + rowHeights.get(previous)! + gap, 0);
  rows().forEach((row) => {
    Object.defineProperty(row, 'offsetTop', { get: () => layoutTop(row) });
    Object.defineProperty(row, 'offsetHeight', {
      get: () => rowHeights.get(row)!,
    });
    row.getBoundingClientRect = () => {
      const top =
        layoutTop(row) +
        Number(
          /translateY\((-?[\d.]+)px\)/.exec(row.style.transform)?.[1] || 0
        );
      const height = rowHeights.get(row)!;
      return {
        top,
        bottom: top + height,
        left: 0,
        right: 300,
        width: 300,
        height,
        x: 0,
        y: top,
        toJSON: () => ({}),
      };
    };
    row.animate = animate as unknown as HTMLElement['animate'];
  });
  const transfer = {
    setData: vi.fn(),
    setDragImage: vi.fn(),
    effectAllowed: '',
    dropEffect: '',
  };
  const event = (element: Element, type: string, y: number) => {
    const native = new Event(type, { bubbles: true, cancelable: true });
    Object.assign(native, { clientX: 16, clientY: y, dataTransfer: transfer });
    fireEvent(element, native);
  };
  const start = (index = 0, shouldPaint = true) => {
    event(
      rows()[index].querySelector('button')!,
      'dragstart',
      rows()[index].offsetTop + 8
    );
    if (shouldPaint) paint();
  };
  return { root, rows, animate, transfer, event, start };
}

test('drag opens a stable live gap and shifts neighboring blocks before one undoable move', () => {
  const value = '# Alpha é 👩🏽‍💻\n\n## Beta\n\n> Gamma';
  const onChange = vi.fn();
  render(<BlockEditor label="Drag" defaultValue={value} onChange={onChange} />);
  const surface = dragSurface('Drag');
  surface.start();
  expect(surface.transfer.setDragImage.mock.calls[0][0]).toHaveTextContent(
    'Alpha é 👩🏽‍💻'
  );
  expect(surface.rows()[0]).toHaveStyle({ opacity: '0' });
  surface.event(surface.root, 'dragover', 122);
  const placeholder = () =>
    surface.root.querySelector('[data-editor-drop-placeholder]')!;
  expect(placeholder()).toHaveAttribute('data-editor-drop-placeholder', '1');
  expect(placeholder()).toHaveStyle({
    height: '40px',
    transform: 'translateY(60px)',
  });
  expect(surface.rows()[1]).toHaveStyle({
    transform: 'translateY(-60px)',
    transition: 'transform 180ms cubic-bezier(0.2, 0, 0, 1)',
  });
  expect(surface.rows()[2]).toHaveStyle({ transform: 'translateY(0px)' });
  surface.event(surface.root, 'dragover', 95);
  expect(placeholder()).toHaveAttribute('data-editor-drop-placeholder', '1');
  expect(onChange).not.toHaveBeenCalled();
  surface.event(surface.root, 'drop', 95);
  expect(onChange).toHaveBeenCalledExactlyOnceWith(
    '## Beta\n\n# Alpha é 👩🏽‍💻\n\n> Gamma'
  );
  expect(surface.animate).not.toHaveBeenCalled();
  expect(screen.getAllByRole('textbox', { name: 'Drag' })[1]).toHaveFocus();
  expect(document.querySelector('[data-editor-drag-preview]')).toBeNull();
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Undo' }));
  expect(onChange).toHaveBeenLastCalledWith(value);
});

test('cancelled drags clear feedback and cannot reorder another editor', () => {
  const first = vi.fn();
  const second = vi.fn();
  render(
    <>
      <BlockEditor label="First" defaultValue={'A\n\nB'} onChange={first} />
      <BlockEditor label="Second" defaultValue={'C\n\nD'} onChange={second} />
    </>
  );
  const surface = dragSurface('First');
  const other = dragSurface('Second');
  surface.start();
  surface.event(surface.root, 'dragover', 95);
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder="1"]')
  ).not.toBeNull();
  surface.event(other.root, 'dragover', 95);
  surface.event(other.root, 'drop', 95);
  surface.event(surface.rows()[0].querySelector('button')!, 'dragend', 95);
  expect(first).not.toHaveBeenCalled();
  expect(second).not.toHaveBeenCalled();
  expect(document.querySelector('[data-editor-drag-preview]')).toBeNull();
  expect(surface.rows()[0]).toHaveStyle({ opacity: '1' });
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toBeNull();
  expect(surface.rows()[1].style.transform).toBe('');
});

test('external content changes invalidate an in-progress drag', () => {
  const onChange = vi.fn();
  const { rerender } = render(
    <BlockEditor label="Controlled drag" value={'A\n\nB'} onChange={onChange} />
  );
  const surface = dragSurface('Controlled drag');
  surface.start();
  rerender(
    <BlockEditor
      label="Controlled drag"
      value={'Replacement\n\nDocument'}
      onChange={onChange}
    />
  );
  surface.event(surface.root, 'drop', 95);
  expect(onChange).not.toHaveBeenCalled();
  expect(document.querySelector('[data-editor-drag-preview]')).toBeNull();
  expect(
    screen.getAllByRole('textbox', { name: 'Controlled drag' })[0]
  ).toHaveTextContent('Replacement');
});

test('reduced motion disables the drop animation without disabling movement', () => {
  vi.stubGlobal('matchMedia', () => ({ matches: true }));
  const onChange = vi.fn();
  render(
    <BlockEditor label="Reduced" defaultValue={'A\n\nB'} onChange={onChange} />
  );
  const surface = dragSurface('Reduced');
  surface.start();
  surface.event(surface.root, 'dragover', 95);
  expect(surface.rows()[1]).toHaveStyle({
    transform: 'translateY(-60px)',
    transition: 'none',
  });
  surface.event(surface.root, 'drop', 95);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('B\n\nA');
  expect(surface.animate).not.toHaveBeenCalled();
});

test('a tall block reserves its full height without oscillating inside the moving gap', () => {
  const onChange = vi.fn();
  const code = '```ts\nconst ready = true;\n```';
  render(
    <BlockEditor
      label="Tall"
      defaultValue={`${code}\n\nB\n\nC`}
      onChange={onChange}
    />
  );
  const surface = dragSurface('Tall', [120, 24, 48], 12);
  surface.start();
  surface.event(surface.root, 'dragover', 148);
  const placeholder = () =>
    surface.root.querySelector('[data-editor-drop-placeholder]')!;
  expect(placeholder()).toHaveStyle({
    height: '120px',
    transform: 'translateY(36px)',
  });
  expect(surface.rows()[1]).toHaveStyle({ transform: 'translateY(-132px)' });
  surface.event(surface.root, 'dragover', 148);
  expect(placeholder()).toHaveAttribute('data-editor-drop-placeholder', '1');
  surface.event(surface.root, 'dragover', 208);
  expect(placeholder()).toHaveStyle({ transform: 'translateY(96px)' });
  expect(surface.rows()[2]).toHaveStyle({ transform: 'translateY(-132px)' });
  expect(onChange).not.toHaveBeenCalled();
  surface.event(surface.root, 'drop', 208);
  expect(onChange).toHaveBeenCalledExactlyOnceWith(`B\n\nC\n\n${code}`);
});

test('dragging upward closes the old gap and opens it before an earlier block', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor
      label="Upward"
      defaultValue={'A\n\nB\n\nC'}
      onChange={onChange}
    />
  );
  const surface = dragSurface('Upward');
  surface.start(2);
  surface.event(surface.root, 'dragover', 8);
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toHaveStyle({ transform: 'translateY(0px)' });
  expect(surface.rows()[0]).toHaveStyle({ transform: 'translateY(60px)' });
  expect(surface.rows()[1]).toHaveStyle({ transform: 'translateY(60px)' });
  surface.event(surface.root, 'drop', 8);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('C\n\nA\n\nB');
});

test('a viewport resize cancels the preview without committing outdated geometry', () => {
  const onChange = vi.fn();
  render(
    <BlockEditor label="Resize" defaultValue={'A\n\nB'} onChange={onChange} />
  );
  const surface = dragSurface('Resize');
  surface.start();
  surface.event(surface.root, 'dragover', 95);
  fireEvent(window, new Event('resize'));
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toBeNull();
  expect(surface.rows()[1].style.transform).toBe('');
  surface.event(surface.root, 'drop', 95);
  expect(onChange).not.toHaveBeenCalled();
});

test('the source remains visible for drag-image capture and cancelled frames cannot reopen a gap', () => {
  render(<BlockEditor label="Capture" defaultValue={'A\n\nB'} />);
  const surface = dragSurface('Capture');
  surface.start(0, false);
  expect(surface.rows()[0]).toHaveStyle({ opacity: '1' });
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toBeNull();
  surface.event(surface.rows()[0].querySelector('button')!, 'dragend', 95);
  paint();
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).toBeNull();
  surface.start(0, false);
  paint();
  expect(surface.rows()[0]).toHaveStyle({ opacity: '0' });
  expect(
    surface.root.querySelector('[data-editor-drop-placeholder]')
  ).not.toBeNull();
});
