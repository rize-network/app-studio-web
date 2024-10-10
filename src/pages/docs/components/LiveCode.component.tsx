import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import { View } from 'app-studio';

const LiveCode = ({ code, language = 'jsx', scope }: any) => {
  return (
    <LiveProvider code={code.trim()} scope={scope} language={language}>
      <View>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </View>
    </LiveProvider>
  );
};

export default LiveCode;
