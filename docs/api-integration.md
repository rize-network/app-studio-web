# API Integration Guide

This guide explains how to integrate with backend APIs in the Front-Starter project. The project uses OpenAPI-generated services for type-safe API calls.

## API Service Structure

API services are generated from OpenAPI/Swagger specifications and stored in the `src/services/api` directory. These services provide type-safe methods for interacting with the backend API.

Each service in the `src/services/api` directory contains:

1. **Base API functions** - Direct functions that return CancelablePromise objects
2. **Generated hooks** - React hooks that wrap the base functions with the `useRequest` hook from `@app-studio/react-request`

For example, a typical service like `UserService` contains functions like:

```typescript
// Base API function
export const userControllerRead = (id: string): CancelablePromise<any> => {
  return __request({
    method: 'GET',
    path: `/users/${id}`,
    errors: {
      404: `User not found`,
    },
  });
};

// Generated hook that wraps the base function
export const useUserControllerReadService = ({ method = 'GET', ...options }: UseRequestOption = {}): {
  run: (id: string) => void;
  data: any;
} & UseRequestProperties => {
  return useRequest(userControllerRead, { method, ...options });
};
```

These generated hooks provide a consistent interface for making API requests with built-in loading, error, and success states.

## Generating API Services

The project includes scripts to generate API services from OpenAPI/Swagger specifications:

```bash
# Generate API services from local Swagger docs
npm run api:local
# or
yarn api:local

# Generate API services from remote Swagger docs
npm run api
# or
yarn api
```

These scripts generate TypeScript files in the `src/services/api` directory based on the API specification.

### How API Services Are Generated

The API services are automatically generated using the `react-api` tool with the following command:

```bash
react-api --useUnionTypes --input http://localhost:3000/docs/swagger.json --output ./src/services/api && prettier --write ./src/services/api
```

This command:
1. Uses the `react-api` tool from the `@app-studio/react-api` package
2. Enables union types with the `--useUnionTypes` flag for better TypeScript type safety
3. Reads the OpenAPI/Swagger specification from `http://localhost:3000/docs/swagger.json`
4. Outputs the generated TypeScript files to the `./src/services/api` directory
5. Formats the generated code with Prettier

The generated services include both the base API functions and React hooks that wrap these functions with the `useRequest` hook from `@app-studio/react-request`.

## API Configuration

The API base URL is configured in `src/configs/AppConfig.ts`:

```typescript
export const API_URL = env.REACT_APP_API_URL ? env.REACT_APP_API_URL : 'http://localhost:3000';
```

The OpenAPI configuration is set up in `src/utils/request.ts`:

```typescript
import { OpenAPI } from 'src/services/api';

// Set the base URL for API requests
OpenAPI.BASE = API_URL;
OpenAPI.CORS = 'cors';
```

## Authentication

Authentication tokens are managed in the `AuthStore` and set in the OpenAPI configuration:

```typescript
// Set the authentication token for API requests
export async function setToken(token: string) {
  access_token = token;
  OpenAPI.TOKEN = token;
}
```

### Using Auth Hooks

The project provides several authentication-related hooks in the API services:

```typescript
// Login example
import { AuthService } from 'src/services/api';
import { useAuthStore } from 'src/stores/AuthStore';

const LoginForm = () => {
  const { setUser, setToken } = useAuthStore();

  const loginRequest = AuthService.useAuthControllerLoginService({
    onSuccess: (data) => {
      // Store the token and user data
      setToken(data.token);
      setUser(data.user);

      // Redirect to dashboard
      navigate('/dashboard');
    },
    onError: (error) => {
      showToast('error', 'Login Failed', error.message);
    },
  });

  const handleSubmit = (values) => {
    loginRequest.run({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
};
```

### Handling Expired Tokens

To handle expired tokens, you can set up a global error handler in the request configuration:

```typescript
// In src/utils/request.ts
import { OpenAPI, ApiError } from 'src/services/api';
import { useAuthStore } from 'src/stores/AuthStore';

// Set up global error handler
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  try {
    const response = await originalFetch(...args);

    // Handle 401 Unauthorized errors
    if (response.status === 401) {
      const { logout } = useAuthStore.getState();
      logout();
      window.location.href = '/login?expired=true';
    }

    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};
```

## Making API Requests

### Request Hooks

The recommended way to make API requests is to create request hooks in `.request.ts` files. These hooks wrap the API services and provide loading, error, and success states.

#### Using Generated Hooks

The simplest approach is to use the generated hooks directly from the API services:

```typescript
// example.component.tsx
import { UserService } from 'src/services/api';

export const UserProfile = ({ userId }) => {
  const getUserRequest = UserService.useUserControllerReadService({
    onSuccess: (data) => {
      console.log('User data fetched:', data);
    },
    onError: (error) => {
      console.error('Error fetching user:', error);
    },
  });

  useEffect(() => {
    getUserRequest.run(userId);
  }, [userId]);

  return (
    <div>
      {getUserRequest.loading ? (
        <p>Loading...</p>
      ) : getUserRequest.data ? (
        <div>
          <h2>{getUserRequest.data.name}</h2>
          <p>{getUserRequest.data.email}</p>
        </div>
      ) : null}
    </div>
  );
};
```

#### Creating Custom Request Hooks

For more complex scenarios, create custom request hooks in `.request.ts` files that combine multiple API services:

```typescript
// example.request.ts
import { useRequest } from '@app-studio/react-request';
import { ExampleService } from 'src/services/api';

export const useExampleRequests = (callbacks = {}) => {
  const fetchDataRequest = useRequest({
    request: ExampleService.exampleControllerFindAll,
    onSuccess: callbacks.onFetchDataSuccess,
    onError: callbacks.onFetchDataError,
    onFetch: (params) => {
      // This runs when the request is made
      console.log('Fetching data with params:', params);
    },
  });

  const createItemRequest = useRequest({
    request: ExampleService.exampleControllerCreate,
    onSuccess: (data) => {
      // You can refresh the data list after creating a new item
      fetchDataRequest.run();

      // And call the provided callback
      if (callbacks.onCreateItemSuccess) {
        callbacks.onCreateItemSuccess(data);
      }
    },
    onError: callbacks.onCreateItemError,
  });

  return {
    fetchDataRequest,
    createItemRequest,
  };
};
```

#### useRequest Options

The `useRequest` hook and the generated service hooks accept several options:

- `method`: HTTP method to use (GET, POST, etc.)
- `onSuccess`: Callback function that runs when the request succeeds
- `onError`: Callback function that runs when the request fails
- `onFetch`: Callback function that runs when the request is made
- `initialData`: Initial data to use before the request completes
- `manual`: Whether to run the request manually (default: true)
- `debounce`: Debounce time in milliseconds
- `throttle`: Throttle time in milliseconds

### Using Request Hooks in Components

Request hooks can be used in components to make API calls and handle responses:

```typescript
// example.component.tsx
import React, { useEffect } from 'react';
import { useExampleRequests } from './example.request';

export const ExampleComponent = () => {
  const { fetchDataRequest, createItemRequest } = useExampleRequests({
    onFetchDataSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onFetchDataError: (error) => {
      console.error('Error fetching data:', error);
    },
  });

  useEffect(() => {
    // Fetch data when the component mounts
    fetchDataRequest.run();
  }, []);

  const handleCreateItem = () => {
    createItemRequest.run({
      name: 'New Item',
      description: 'This is a new item',
    });
  };

  return (
    <div>
      {fetchDataRequest.loading ? (
        <p>Loading...</p>
      ) : fetchDataRequest.error ? (
        <p>Error: {fetchDataRequest.error.message}</p>
      ) : (
        <ul>
          {fetchDataRequest.data?.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}

      <button onClick={handleCreateItem} disabled={createItemRequest.loading}>
        Create Item
      </button>
    </div>
  );
};
```

## Error Handling

Error handling is an important part of API integration. The request hooks provide error states that can be used to display error messages to the user.

### Basic Error Handling

```typescript
// Error handling in a component
if (fetchDataRequest.error) {
  return (
    <div>
      <p>Error: {fetchDataRequest.error.message}</p>
      <button onClick={() => fetchDataRequest.run()}>Retry</button>
    </div>
  );
}
```

### Using showToast for User Feedback

You can use the `showToast` function from `@app-studio/web` to display error messages:

```typescript
import { showToast } from '@app-studio/web';

// In the onError callback
onError: (error) => {
  showToast('error', 'Error', error.message || 'An error occurred');
}
```

### Centralized Error Handling

For consistent error handling across your application, create a centralized error handler:

```typescript
// utils/errorHandler.ts
import { showToast } from '@app-studio/web';
import { ApiError } from 'src/services/api';

export const handleApiError = (error: any, title = 'Error') => {
  if (error instanceof ApiError) {
    // Handle specific API error codes
    switch (error.status) {
      case 400:
        showToast('error', title, 'Invalid request. Please check your input.');
        break;
      case 401:
        showToast('error', title, 'Authentication required. Please log in again.');
        // Redirect to login page
        window.location.href = '/login';
        break;
      case 403:
        showToast('error', title, 'You do not have permission to perform this action.');
        break;
      case 404:
        showToast('error', title, 'The requested resource was not found.');
        break;
      case 500:
        showToast('error', title, 'Server error. Please try again later.');
        break;
      default:
        showToast('error', title, error.message || 'An unexpected error occurred.');
    }
  } else {
    // Handle non-API errors
    showToast('error', title, error.message || 'An unexpected error occurred.');
  }

  // Log the error for debugging
  console.error('API Error:', error);
};

// Using the centralized error handler in your request hooks
const fetchDataRequest = useRequest({
  request: ExampleService.exampleControllerFindAll,
  onSuccess: (data) => {
    // Handle success
  },
  onError: (error) => {
    handleApiError(error, 'Data Fetch Failed');
  },
});
```

### Error Boundaries for React Components

Use React Error Boundaries to catch and handle errors in your components:

```typescript
// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Component error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>Try again</button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Using the error boundary in your components
const DataComponent = () => (
  <ErrorBoundary>
    <UserList />
  </ErrorBoundary>
);
```

## Pagination and Filtering

For paginated API endpoints, you can pass pagination parameters to the request:

```typescript
// Fetch paginated data
fetchDataRequest.run({
  take: 10,
  skip: (currentPage - 1) * 10,
  filter: searchTerm,
  sortBy: 'createdAt',
  sortOrder: 'desc',
});
```

## Caching and Data Persistence

The request hooks do not include built-in caching. If you need to cache API responses, you can store the data in a Zustand store:

```typescript
// stores/DataStore.ts
import { create } from 'zustand';

interface DataState {
  items: any[];
  setItems: (items: any[]) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  error: Error | null;
  setError: (error: Error | null) => void;
  fetchItems: () => Promise<void>;
}

export const useDataStore = create<DataState>((set, get) => ({
  items: [],
  setItems: (items) => set({ items }),
  isLoading: false,
  setLoading: (isLoading) => set({ isLoading }),
  error: null,
  setError: (error) => set({ error }),

  // Fetch items from the API
  fetchItems: async () => {
    try {
      set({ isLoading: true, error: null });

      // Import the API service directly in the action
      const { ExampleService } = await import('src/services/api');

      // Call the API directly (not using hooks in stores)
      const data = await ExampleService.exampleControllerFindAll();

      set({ items: data, isLoading: false });
      return data;
    } catch (error) {
      set({ error: error as Error, isLoading: false });
      throw error;
    }
  },
}));

// In your component
import { useDataStore } from 'src/stores/DataStore';
import { useEffect } from 'react';

const ExampleComponent = () => {
  const { items, isLoading, error, fetchItems } = useDataStore();

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Integrating API Hooks with Zustand Stores

For more complex state management, you can combine API hooks with Zustand stores:

```typescript
// Component using both API hooks and Zustand store
import { useEffect } from 'react';
import { UserService } from 'src/services/api';
import { useDataStore } from 'src/stores/DataStore';

const UserList = () => {
  // API hook for fetching users
  const getUsersRequest = UserService.useUserControllerFindService({
    onSuccess: (data) => {
      // Update the store with the fetched data
      setItems(data);
    },
  });

  // Zustand store for caching the data
  const { items, setItems } = useDataStore();

  useEffect(() => {
    // If we already have cached data, don't fetch again
    if (items.length === 0) {
      getUsersRequest.run();
    }
  }, []);

  return (
    <div>
      {getUsersRequest.loading ? (
        <p>Loading...</p>
      ) : getUsersRequest.error ? (
        <p>Error: {getUsersRequest.error.message}</p>
      ) : (
        <ul>
          {items.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

## File Uploads

For file uploads, you can use the `MediaUploader` component:

```typescript
import { MediaUploader } from 'src/components/MediaUploader';

<MediaUploader
  onUpload={(file) => {
    uploadFileRequest.run({
      file,
      type: 'image',
    });
  }}
  accept="image/*"
/>
```

## Websockets and Real-time Data

For real-time data, you can use the `multimodalLiveClient` utility:

```typescript
import { LiveClientSetup } from 'src/lib/multimodalLiveClient';

// Set up a real-time connection
const client = new LiveClientSetup({
  url: 'wss://api.example.com/ws',
  token: authToken,
});

// Listen for messages
client.on('message', (message) => {
  console.log('Received message:', message);
});

// Send a message
client.send({
  type: 'chat',
  content: 'Hello, world!',
});
```

## Advanced API Integration Patterns

### Request Orchestration

For complex pages that require multiple API calls, it's recommended to create a centralized request module like `editor.request.ts`. This approach provides several benefits:

1. **Centralized API logic**: All API calls are defined in one place
2. **Coordinated data fetching**: Easily chain and coordinate multiple API calls
3. **Reusable request hooks**: Create custom hooks that can be used across components
4. **Consistent error handling**: Implement consistent error handling for all API calls

Here's an example based on the pattern used in `src/pages/editor/editor.request.ts`:

```typescript
// page.request.ts
import {
  UserService,
  ContentService,
  CommentService
} from 'src/services/api';

const usePageRequests = ({
  // Callbacks for different operations
  getUserCallback = (data) => {},
  getContentCallback = (data) => {},
  getCommentsCallback = (data) => {},
  onError = () => {},
}) => {
  // Get user data
  const getUserRequest = UserService.useUserControllerReadService({
    onSuccess: (data) => {
      getUserCallback(data);

      // After getting user data, fetch their content
      if (data?.id) {
        getContentRequest.run({ userId: data.id });
      }
    },
    onError,
  });

  // Get content data
  const getContentRequest = ContentService.useContentControllerFindService({
    onSuccess: (data) => {
      getContentCallback(data);

      // After getting content, fetch comments for each content item
      if (data?.items?.length) {
        data.items.forEach(item => {
          getCommentsRequest.run({ contentId: item.id });
        });
      }
    },
    onError,
  });

  // Get comments
  const getCommentsRequest = CommentService.useCommentControllerFindService({
    onSuccess: getCommentsCallback,
    onError,
  });

  // Create comment
  const createCommentRequest = CommentService.useCommentControllerCreateService({
    onSuccess: (data) => {
      // Refresh comments after creating a new one
      getCommentsRequest.run({ contentId: data.contentId });
    },
    onError,
  });

  return {
    getUserRequest,
    getContentRequest,
    getCommentsRequest,
    createCommentRequest,
  };
};

export default usePageRequests;
```

### Composing Multiple API Requests

When working with complex data flows, you often need to chain API requests together. Here are some common patterns:

#### Sequential Requests

Use the `onSuccess` callback to trigger dependent requests:

```typescript
const getPageRequest = PageService.usePageControllerReadService({
  onSuccess: (data) => {
    // Store the page data
    getPageCallback(data);

    // If the page has a workflow, fetch it
    if (data?.workflowId) {
      getWorkflowRequest.run(data.workflowId);
    }
  },
});
```

#### Refreshing Data After Mutations

After creating, updating, or deleting data, refresh the relevant data:

```typescript
const deleteComponentRequest = ComponentService.useComponentControllerDeleteService({
  onSuccess: () => {
    // Refresh the page data after deleting a component
    getPageRequest.run(id);
  },
});
```

#### Handling Request Dependencies

When one request depends on the result of another:

```typescript
// First, get the user
getUserRequest.run(userId);

// In the onSuccess callback of getUserRequest
onSuccess: (userData) => {
  // Then get the user's content
  getContentRequest.run({ userId: userData.id });

  // In the onSuccess callback of getContentRequest
  onSuccess: (contentData) => {
    // Finally, get comments for each content item
    contentData.items.forEach(item => {
      getCommentsRequest.run({ contentId: item.id });
    });
  }
}
```

## Best Practices

1. **Use Generated API Hooks**: Leverage the hooks from `@src/services/api/` for type-safe API calls
2. **Create Request Modules**: For complex pages, create dedicated `.request.ts` files that orchestrate multiple API calls
3. **Chain Requests Properly**: Use `onSuccess` callbacks to chain dependent requests
4. **Handle Loading States**: Always show loading indicators when requests are in progress
5. **Implement Error Handling**: Use `onError` callbacks to handle errors consistently
6. **Refresh Data After Mutations**: Update relevant data after create, update, or delete operations
7. **Use Callbacks for Component Communication**: Pass callback functions to request hooks to communicate with components
8. **Type Safety**: Use the generated TypeScript types for request parameters and responses
9. **Pagination**: Implement pagination for large data sets
10. **Caching**: Consider using Zustand stores to cache frequently accessed data
11. **Authentication**: Ensure authentication tokens are properly managed in the AuthStore
12. **Validation**: Validate user input before sending it to the API
13. **Testing**: Write tests for API integration to ensure it works as expected

By following these guidelines and leveraging the patterns from the codebase, you can create robust and maintainable API integration in your Front-Starter project.
