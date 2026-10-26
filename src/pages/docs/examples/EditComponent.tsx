import React, { useState } from 'react';
import { EditComponent } from 'src/components/EditComponent/EditComponent';
import { Vertical } from 'app-studio';

export function EditComponentExample() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  return (
    <Vertical gap={16}>
      <button type="button" onClick={(event) => setTarget(event.currentTarget)}>
        Select this element to edit it
      </button>
      {target && (
        <EditComponent targetElement={target} onClose={() => setTarget(null)} />
      )}
    </Vertical>
  );
}
