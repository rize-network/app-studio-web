import React from 'react';
import { MessageView } from 'src/components/Message/Message';

export function MessagePlayground() {
  return (
    <MessageView
      variant="info"
      title="Project saved"
      subtitle="Your changes are ready."
      showIcon
      isClosable
      hide={() => {}}
    />
  );
}
