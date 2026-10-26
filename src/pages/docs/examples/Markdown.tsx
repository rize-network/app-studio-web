import React, { useState } from 'react';
import { Markdown } from 'src/components/Markdown/Markdown';
import { Button } from 'src/components/Button/Button';
import { Vertical } from 'app-studio';

export function MarkdownExample() {
  const [expanded, setExpanded] = useState(false);
  return (
    <Vertical gap={16}>
      <Button variant="outline" onClick={() => setExpanded(!expanded)}>
        Toggle content
      </Button>
      <Markdown
        value={
          expanded
            ? '## Ready to build\n\nUse **components**, `tokens`, and your own state.\n\n- Install\n- Compose\n- Ship'
            : 'A **small** Markdown preview.'
        }
      />
    </Vertical>
  );
}
