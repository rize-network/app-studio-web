import React from 'react';
export type { ViewProps } from 'app-studio';
import { View as $View } from 'app-studio';

export const Top = (props: any) => <$View marginBottom="auto" {...props} />;
export const Bottom = (props: any) => <$View marginTop="auto" {...props} />;

export const Left = (props: any) => <$View marginRight="auto" {...props} />;
export const Right = (props: any) => <$View marginLeft="auto" {...props} />;

export const Inline = (props: any) => (
  <$View display={'inline-flex'} wordBreak="break-word" {...props} />
);

export const View = $View;
