import React from 'react';
import { Uploader } from '../Uploader';

export const UploaderWithProgress = () => (
  <Uploader text="Uploading…" isLoading progress={64} />
);
