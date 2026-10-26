import React, { useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { Horizontal, Text } from 'app-studio';

export function ButtonExample() {
  const [count, setCount] = useState(0);
  return (
    <Horizontal gap={16} alignItems="center" flexWrap="wrap">
      <Button onClick={() => setCount(count + 1)}>Run action</Button>
      <Button variant="outline" onClick={() => setCount(0)}>
        Reset
      </Button>
      <Text role="status">{count} actions completed</Text>
    </Horizontal>
  );
}
