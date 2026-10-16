import React from 'react';
import renderer from './actRenderer.test-utils';
import {
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react';
import { vi } from 'vitest';
import { Formik } from 'formik';
import { EmojiPicker } from '../components/EmojiPicker/EmojiPicker';
import { FormikEmojiPicker } from '../components/Formik/Formik.EmojiPicker';
import {
  DefaultEmojiData,
  QuickReactionEmojis,
} from '../components/EmojiPicker/EmojiPicker/EmojiPicker.data';
import { useEmojiPickerState } from '../components/EmojiPicker/EmojiPicker/EmojiPicker.state';

afterEach(() => {
  cleanup();
});

test('renders EmojiPicker component', () => {
  render(<div>Emoji Picker</div>);
});

test('EmojiPicker matches snapshot', () => {
  const tree = renderer.create(<div>Emoji Picker</div>).toJSON();
  expect(tree).toMatchSnapshot();
});

test('shared catalogue is unique and contains the editor and reaction palettes', () => {
  expect(new Set(DefaultEmojiData.map((emoji) => emoji.emoji)).size).toBe(
    DefaultEmojiData.length
  );
  ['❤️‍🔥', '❤️‍🩹', '🥹', '📁', '📊', '🤖', '🌱', ...QuickReactionEmojis].forEach(
    (symbol) =>
      expect(DefaultEmojiData.some((emoji) => emoji.emoji === symbol)).toBe(
        true
      )
  );
});

test('search crosses categories and accepts French words without accents', () => {
  const { result } = renderHook(() =>
    useEmojiPickerState({ showRecentEmojis: false })
  );
  act(() => result.current.handleSearchChange('coeur'));
  expect(
    result.current.filteredEmojis.some((emoji) => emoji.emoji === '❤️')
  ).toBe(true);
  act(() => result.current.handleSearchChange('fusee'));
  expect(
    result.current.filteredEmojis.some((emoji) => emoji.emoji === '🚀')
  ).toBe(true);
});

test('reaction mode exposes selected quick reactions and calls callbacks once', () => {
  const onChange = vi.fn();
  const onEmojiSelect = vi.fn();
  render(
    <EmojiPicker
      mode="reaction"
      selectedEmojis={['👍']}
      onChange={onChange}
      onEmojiSelect={onEmojiSelect}
    />
  );
  fireEvent.click(screen.getByRole('button', { name: 'Add reaction' }));
  const option = screen.getByRole('button', { name: 'thumbs up' });
  expect(option).toHaveFocus();
  expect(option).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(option);
  expect(onChange).toHaveBeenCalledExactlyOnceWith('👍');
  expect(onEmojiSelect).toHaveBeenCalledTimes(1);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('controlled open state waits for the owner and disabled selections are inert', () => {
  const onClose = vi.fn();
  const onChange = vi.fn();
  const { result } = renderHook(() =>
    useEmojiPickerState({ isOpen: true, isDisabled: true, onClose, onChange })
  );
  act(() => result.current.handleEmojiSelect(DefaultEmojiData[0]));
  expect(onChange).not.toHaveBeenCalled();
  expect(onClose).not.toHaveBeenCalled();
  expect(result.current.isOpen).toBe(true);
});

test('malformed or unavailable recent storage cannot break selection', () => {
  localStorage.setItem('emojiPicker-recentEmojis', '[null,{"emoji":"x"}]');
  const { result } = renderHook(() => useEmojiPickerState({}));
  expect(result.current.recentEmojis).toEqual([]);
  const storage = vi
    .spyOn(Storage.prototype, 'setItem')
    .mockImplementation(() => {
      throw new Error('disabled');
    });
  act(() => result.current.handleEmojiSelect(DefaultEmojiData[0]));
  expect(result.current.selectedEmoji).toBe('😀');
  storage.mockRestore();
  localStorage.clear();
});

test('Formik updates the value and each consumer callback once', async () => {
  const onChange = vi.fn();
  const onEmojiSelect = vi.fn();
  render(
    <Formik initialValues={{ emoji: '' }} onSubmit={() => {}}>
      <FormikEmojiPicker
        name="emoji"
        label="Formik emoji"
        onChange={onChange}
        onEmojiSelect={onEmojiSelect}
        showRecentEmojis={false}
      />
    </Formik>
  );
  fireEvent.click(screen.getByRole('button', { name: 'Formik emoji' }));
  await act(async () => {
    fireEvent.click(screen.getByRole('button', { name: 'grinning face' }));
  });
  expect(onChange).toHaveBeenCalledExactlyOnceWith('😀');
  expect(onEmojiSelect).toHaveBeenCalledTimes(1);
  expect(
    screen.getByRole('button', { name: 'Formik emoji' })
  ).toHaveTextContent('😀');
});
