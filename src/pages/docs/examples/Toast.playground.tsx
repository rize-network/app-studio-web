import React from 'react';
import { Toast } from 'src/components/Toast/Toast';

export function ToastPlayground() {
  return (
    <Toast
      variant="success"
      title="Project saved"
      description="Your changes are ready."
      showIcon
      isVisible
      onClose={() => {}}
    />
  );
}
