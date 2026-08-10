/**
 * No invented ARIA roles.
 *
 * Badge and StatusIndicator used to put their styling hooks in `role` —
 * role="badge", "badgeText", "status-indicator", "status-dot" and friends.
 * None of those is an ARIA role, so every consumer page failed axe's
 * `aria-roles` rule (critical) on every screen showing a badge or a status.
 * Measured 2026-08-10 in mvp/todo: 5–17 offending nodes per screen.
 *
 * The contract now:
 * - A badge is styled text. It carries NO role at all; the machine-readable
 *   hook is `data-role`, which ARIA ignores.
 * - A status indicator IS a status: `role="status"` on the container (a real
 *   ARIA role), the dot is decoration (`aria-hidden`, no role), the label is
 *   plain text.
 */
import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { ThemeProvider } from 'app-studio';
import { Badge } from 'src/components/Badge/Badge';
import { Avatar, StatusIndicator } from 'src/components';

afterEach(cleanup);

const renderWithTheme = (component: React.ReactElement) =>
  render(<ThemeProvider>{component}</ThemeProvider>);

test('Badge and all its parts carry no ARIA role', () => {
  const { container } = renderWithTheme(
    <Badge
      pastilContent="New"
      content="Agency Growth Platform"
      action="Try now ›"
    />
  );
  const carriers = container.querySelectorAll('[role]');
  expect(Array.from(carriers).map((el) => el.getAttribute('role'))).toEqual([]);
  // The styling/test hook survives where the role used to be.
  expect(container.querySelector('[data-role="badge"]')).not.toBeNull();
});

test('Avatar carries no invented role', () => {
  const { container } = renderWithTheme(<Avatar fallback="AD" />);
  expect(container.querySelector('[role="avatar"]')).toBeNull();
  expect(container.querySelector('[data-role="avatar"]')).not.toBeNull();
});

test('StatusIndicator is a status, its dot is decoration', () => {
  const { container } = render(
    <StatusIndicator label="Active" status="success" />
  );
  expect(screen.getByRole('status')).toBeInTheDocument();

  const dot = container.querySelector(
    '[data-role="status-dot"]'
  ) as HTMLElement;
  expect(dot).not.toBeNull();
  expect(dot.getAttribute('role')).toBeNull();
  expect(dot.getAttribute('aria-hidden')).toBe('true');

  // Exactly one role in the whole tree: the container's `status`.
  const roles = Array.from(container.querySelectorAll('[role]')).map((el) =>
    el.getAttribute('role')
  );
  expect(roles).toEqual(['status']);
});
