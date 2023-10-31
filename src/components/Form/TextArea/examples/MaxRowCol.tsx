import React from 'react';

import { TextArea } from '../TextArea';

export const MaxArea = () => {
  return <TextArea name="max" value="Enter your thought" maxRows={5} maxCols={20} />;
};
