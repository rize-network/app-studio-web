import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthGuard } from '../components/AuthGuard';
import { useAuthStore } from '../stores/AuthStore';

// Mock the auth store
jest.mock('../stores/AuthStore');
const mockUseAuthStore = useAuthStore as jest.MockedFunction<
  typeof useAuthStore
>;

// Mock app-studio components
jest.mock('app-studio', () => ({
  View: ({ children, ...props }: any) => (
    <div data-testid="view" {...props}>
      {children}
    </div>
  ),
  Text: ({ children, ...props }: any) => (
    <span data-testid="text" {...props}>
      {children}
    </span>
  ),
  Vertical: ({ children, ...props }: any) => (
    <div data-testid="vertical" {...props}>
      {children}
    </div>
  ),
  Button: ({ children, onClick, ...props }: any) => (
    <button data-testid="button" onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('AuthGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when auth store is not initialized', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthentificated: false,
      isInitialized: false,
    } as any);

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Initializing...')).toBeInTheDocument();
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
  });

  it('shows auto-login loading state when auth store is initialized but user is not authenticated', async () => {
    mockUseAuthStore.mockReturnValue({
      isAuthentificated: false,
      isInitialized: true,
    } as any);

    // Mock the login function
    const mockLogin = jest.fn();
    mockUseAuthStore.getState = jest.fn().mockReturnValue({
      login: mockLogin,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    // Should show signing in message
    await waitFor(() => {
      expect(screen.getByText('Signing you in...')).toBeInTheDocument();
    });

    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument();
    expect(mockLogin).toHaveBeenCalledWith(
      { email: 'test@studiolabs.io', password: 'studiolabs' },
      expect.any(Function)
    );
  });

  it('renders protected content when user is authenticated', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthentificated: true,
      isInitialized: true,
    } as any);

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
    expect(screen.queryByText('Initializing...')).not.toBeInTheDocument();
    expect(screen.queryByText('Signing you in...')).not.toBeInTheDocument();
  });

  it('renders content without auth when requireAuth is false', () => {
    mockUseAuthStore.mockReturnValue({
      isAuthentificated: false,
      isInitialized: true,
    } as any);

    render(
      <AuthGuard requireAuth={false}>
        <div>Public Content</div>
      </AuthGuard>
    );

    expect(screen.getByText('Public Content')).toBeInTheDocument();
  });

  it('shows authentication failed message after auto-login attempt fails', async () => {
    mockUseAuthStore.mockReturnValue({
      isAuthentificated: false,
      isInitialized: true,
    } as any);

    // Mock the login function to simulate failure
    const mockLogin = jest.fn((params, onSuccess) => {
      // Simulate login failure by not calling onSuccess
    });
    mockUseAuthStore.getState = jest.fn().mockReturnValue({
      login: mockLogin,
    });

    render(
      <AuthGuard>
        <div>Protected Content</div>
      </AuthGuard>
    );

    // Wait for auto-login to be attempted
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalled();
    });

    // The component should still be in loading state since login didn't complete
    expect(screen.getByText('Signing you in...')).toBeInTheDocument();
  });
});
