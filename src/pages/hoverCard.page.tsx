import React from 'react';
import { DefaultHoverCard } from 'src/components/HoverCard/examples';
import { Vertical } from 'src/components';

const HoverCardPage = () => {
  return (
    <Vertical gap={40}>
      <DefaultHoverCard />
    </Vertical>
  );
};

export default HoverCardPage;
