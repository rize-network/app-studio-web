import React, { useEffect, useState, ReactNode } from 'react';
import { useAuthStore } from '../../stores/AuthStore';
import { View, Text, Vertical, Button } from 'app-studio';

/**
 * Authentication guard props
 */
interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
  autoLogin?: boolean;
}

/**
 * Auto-login function for ADK pages using the existing auth store
 */
const performAutoLogin = (onComplete: () => void, onError: () => void) => {
  try {
    const { login } = useAuthStore.getState();

    const loginParams = {
      email: 'test@studiolabs.io',
      password: 'studiolabs',
    };

    // Use the existing auth store login method
    login(loginParams, () => {
      console.log('Auto-login successful');
      // The auth store will handle token storage and API configuration
      onComplete();
    });
  } catch (error) {
    console.error('Auto-login failed:', error);
    // Show error message instead of redirect since there's no login page
    console.warn('Auto-login failed, but no login page available');
    onError();
  }
};

/**
 * Authentication guard component
 *
 * Protects routes by checking authentication status and auto-logging in for ADK pages
 */
export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  fallback,
  requireAuth = true,
  autoLogin = true,
}) => {
  const { isAuthentificated, isInitialized } = useAuthStore();
  const [isAutoLogging, setIsAutoLogging] = useState(false);
  const [autoLoginAttempted, setAutoLoginAttempted] = useState(false);

  useEffect(() => {
    // Auto-login for ADK pages if not authenticated, but only after auth store is initialized
    if (
      requireAuth &&
      isInitialized &&
      !isAuthentificated &&
      autoLogin &&
      !isAutoLogging &&
      !autoLoginAttempted
    ) {
      setIsAutoLogging(true);
      performAutoLogin(
        () => {
          // Success callback - authentication state will update automatically
          setIsAutoLogging(false);
          setAutoLoginAttempted(true);
        },
        () => {
          // Error callback
          setIsAutoLogging(false);
          setAutoLoginAttempted(true);
        }
      );
    }
  }, [
    requireAuth,
    isInitialized,
    isAuthentificated,
    autoLogin,
    isAutoLogging,
    autoLoginAttempted,
  ]);

  // Reset auto-login state when authentication changes
  useEffect(() => {
    if (isAuthentificated && isAutoLogging) {
      setIsAutoLogging(false);
    }
  }, [isAuthentificated, isAutoLogging]);

  // Show loading state while auth store is initializing or auto-logging in
  if (!isInitialized || isAutoLogging) {
    return (
      <View
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="color.gray.50"
      >
        <Vertical gap={16} alignItems="center">
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '3px solid #f3f3f3',
              borderTop: '3px solid #3498db',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
            }}
          />
          <Text fontSize="md" color="color.gray.600">
            {!isInitialized ? 'Initializing...' : 'Signing you in...'}
          </Text>
        </Vertical>
      </View>
    );
  }

  // If auth is required but user is not authenticated, show fallback or redirect
  if (requireAuth && !isAuthentificated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    // Show different messages based on auto-login state
    const title = autoLoginAttempted
      ? 'Authentication Failed'
      : 'Authentication Required';
    const message = autoLoginAttempted
      ? 'Auto-login failed. Please try again or contact support if the issue persists.'
      : 'You need to sign in to access ADK components. Auto-login will be attempted automatically.';

    return (
      <View
        height="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        backgroundColor="color.gray.50"
      >
        <Vertical gap={24} alignItems="center" maxWidth="400px" padding={32}>
          <Text fontSize="xl" fontWeight="600" textAlign="center">
            {title}
          </Text>
          <Text fontSize="md" color="color.gray.600" textAlign="center">
            {message}
          </Text>
          <Button
            variant="filled"
            onClick={() => {
              setAutoLoginAttempted(false);
              setIsAutoLogging(false);
            }}
          >
            Retry Auto-Login
          </Button>
        </Vertical>
      </View>
    );
  }

  // If auth is not required or user is authenticated, render children
  return <>{children}</>;
};

/**
 * HOC for protecting components with authentication
 */
export const withAuthGuard = <P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    requireAuth?: boolean;
    fallback?: ReactNode;
  }
) => {
  const WrappedComponent: React.FC<P> = (props) => {
    return (
      <AuthGuard
        requireAuth={options?.requireAuth}
        fallback={options?.fallback}
      >
        <Component {...props} />
      </AuthGuard>
    );
  };

  WrappedComponent.displayName = `withAuthGuard(${
    Component.displayName || Component.name
  })`;

  return WrappedComponent;
};

/**
 * Route-based authentication guard
 * Automatically determines if auth is required based on the current path
 */
export const RouteAuthGuard: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const currentPath = window.location.pathname;
  const authRequired =
    currentPath.startsWith('/adk') ||
    currentPath.startsWith('/agent-chat') ||
    currentPath.startsWith('/adk-components');

  return <AuthGuard requireAuth={authRequired}>{children}</AuthGuard>;
};

/**
 * Authentication status indicator component
 */
export const AuthStatus: React.FC = () => {
  const { isAuthentificated, user } = useAuthStore();

  if (isAuthentificated && user) {
    return (
      <View
        display="flex"
        alignItems="center"
        gap={8}
        padding="8px 12px"
        backgroundColor="color.green.50"
        border="1px solid"
        borderColor="color.green.200"
        borderRadius="6px"
      >
        <View
          width="8px"
          height="8px"
          backgroundColor="color.green.500"
          borderRadius="50%"
        />
        <Text fontSize="sm" color="color.green.700">
          Signed in as {user.email || user.name || 'User'}
        </Text>
      </View>
    );
  }

  return (
    <View
      display="flex"
      alignItems="center"
      gap={8}
      padding="8px 12px"
      backgroundColor="color.red.50"
      border="1px solid"
      borderColor="color.red.200"
      borderRadius="6px"
    >
      <View
        width="8px"
        height="8px"
        backgroundColor="color.red.500"
        borderRadius="50%"
      />
      <Text fontSize="sm" color="color.red.700">
        Not signed in
      </Text>
    </View>
  );
};
