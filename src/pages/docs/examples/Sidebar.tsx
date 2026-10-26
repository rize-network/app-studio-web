import React, { useState } from 'react';
import { Sidebar } from 'src/components/Sidebar/Sidebar';
import { Button } from 'src/components/Button/Button';
import { Text, Vertical } from 'app-studio';

export function SidebarExample() {
  const [page, setPage] = useState('Overview');
  return (
    <Vertical height={280} width="100%" maxWidth={340} overflow="hidden">
      <Sidebar fixed={false} defaultExpanded>
        <Sidebar.Header>
          <Text fontWeight="bold">Workspace</Text>
        </Sidebar.Header>
        <Sidebar.Content>
          {['Overview', 'Projects', 'Settings'].map((item) => (
            <Button
              key={item}
              variant={page === item ? 'subtle' : 'ghost'}
              onClick={() => setPage(item)}
            >
              {item}
            </Button>
          ))}
        </Sidebar.Content>
        <Sidebar.Footer>
          <Text role="status">Current page: {page}</Text>
        </Sidebar.Footer>
      </Sidebar>
    </Vertical>
  );
}
