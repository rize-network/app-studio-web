import React from 'react';
import { Label } from 'src/components/Form/Label/Label';
import { Vertical } from 'app-studio';

export function LabelExample() {
  return (
    <Vertical gap={8}>
      <Label htmlFor="docs-label-input">Workspace</Label>
      <input id="docs-label-input" placeholder="Your workspace" />
    </Vertical>
  );
}
