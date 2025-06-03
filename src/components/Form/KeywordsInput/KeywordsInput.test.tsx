import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { KeywordsInput } from './KeywordsInput';

describe('KeywordsInput', () => {
  it('renders with default props', () => {
    render(<KeywordsInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays initial keywords', () => {
    render(<KeywordsInput defaultValue={['react', 'typescript']} />);
    expect(screen.getByText('react')).toBeInTheDocument();
    expect(screen.getByText('typescript')).toBeInTheDocument();
  });

  it('adds keyword on Enter key', async () => {
    const onChange = jest.fn();

    render(<KeywordsInput onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'javascript');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onChange).toHaveBeenCalledWith(['javascript']);
  });

  it('adds keyword on comma', async () => {
    const onChange = jest.fn();

    render(<KeywordsInput onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'vue,');

    expect(onChange).toHaveBeenCalledWith(['vue']);
  });

  it('removes keyword when X button is clicked', async () => {
    const onChange = jest.fn();

    render(<KeywordsInput value={['react', 'vue']} onChange={onChange} />);

    const removeButtons = screen.getAllByRole('button');
    await userEvent.click(removeButtons[0]);

    expect(onChange).toHaveBeenCalledWith(['vue']);
  });

  it('removes last keyword on backspace when input is empty', async () => {
    const onChange = jest.fn();

    render(<KeywordsInput value={['react', 'vue']} onChange={onChange} />);

    const input = screen.getByRole('textbox');
    await userEvent.click(input);
    fireEvent.keyDown(input, { key: 'Backspace', code: 'Backspace' });

    expect(onChange).toHaveBeenCalledWith(['react']);
  });

  it('respects maxKeywords limit', async () => {
    const onChange = jest.fn();

    render(
      <KeywordsInput
        value={['react', 'vue']}
        maxKeywords={2}
        onChange={onChange}
      />
    );

    const input = screen.queryByRole('textbox');
    expect(input).not.toBeInTheDocument(); // Input should be hidden when max reached
    expect(screen.getByText('Maximum 2 keywords reached')).toBeInTheDocument();
  });

  it('prevents duplicate keywords when allowDuplicates is false', async () => {
    const onChange = jest.fn();

    render(
      <KeywordsInput
        value={['react']}
        allowDuplicates={false}
        onChange={onChange}
      />
    );

    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'react');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(onChange).not.toHaveBeenCalled();
  });

  it('validates keyword length', async () => {
    const onChange = jest.fn();

    render(
      <KeywordsInput
        minKeywordLength={3}
        maxKeywordLength={10}
        onChange={onChange}
      />
    );

    const input = screen.getByRole('textbox');

    // Too short
    await userEvent.type(input, 'ab');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();

    // Too long
    await userEvent.clear(input);
    await userEvent.type(input, 'verylongkeyword');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChange).not.toHaveBeenCalled();

    // Just right
    await userEvent.clear(input);
    await userEvent.type(input, 'perfect');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onChange).toHaveBeenCalledWith(['perfect']);
  });

  it('displays label and helper text', () => {
    render(
      <KeywordsInput label="Skills" helperText="Add your technical skills" />
    );

    expect(screen.getByText('Skills')).toBeInTheDocument();
    expect(screen.getByText('Add your technical skills')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<KeywordsInput isDisabled={true} defaultValue={['react']} />);

    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('handles read-only state', () => {
    render(<KeywordsInput isReadOnly={true} defaultValue={['react']} />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('calls onAdd and onRemove callbacks', async () => {
    const onAdd = jest.fn();
    const onRemove = jest.fn();

    render(
      <KeywordsInput value={['react']} onAdd={onAdd} onRemove={onRemove} />
    );

    // Test onAdd
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'vue');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onAdd).toHaveBeenCalledWith('vue');

    // Test onRemove
    const removeButton = screen.getByRole('button');
    await userEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalledWith('react', 0);
  });
});
