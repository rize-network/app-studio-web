import React, { useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { Horizontal } from 'app-studio';

export function ButtonStatesExample() {
  const [loading, setLoading] = useState(false);
  return (
    <Horizontal gap={12} flexWrap="wrap">
      <Button isLoading={loading}>Save changes</Button>
      <Button variant="outline" onClick={() => setLoading(!loading)}>
        {loading ? 'Stop loading' : 'Show loading'}
      </Button>
      <Button isDisabled>Disabled</Button>
    </Horizontal>
  );
}
