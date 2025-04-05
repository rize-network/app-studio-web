import React from 'react';
import type { ViewProps } from 'app-studio';
import { View as $View } from 'app-studio';

export const Top = (props: ViewProps) => (
  <$View marginBottom="auto" {...props} />
);
export const Bottom = (props: ViewProps) => (
  <$View marginTop="auto" {...props} />
);

export const Left = (props: ViewProps) => (
  <$View marginRight="auto" {...props} />
);
export const Right = (props: ViewProps) => (
  <$View marginLeft="auto" {...props} />
);

export const Inline = (props: ViewProps) => (
  <$View display={'inline-flex'} wordBreak="break-word" {...props} />
);

export const View = $View;
