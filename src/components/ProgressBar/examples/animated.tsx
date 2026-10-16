import React, { useState, useEffect } from 'react';
import { View, Animation } from 'app-studio';
import { ProgressBar } from '../ProgressBar';

export const AnimatedDemo = () => {
  const [progress, setProgress] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 10));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View display="flex" flexDirection="column" gap={16} width="100%">
      <View>
        <ProgressBar
          value={progress}
          animated={true}
          animationDuration="0.8s"
          height={16}
          radius={8}
          color="color-blue-500"
          showLabel
        />
      </View>

      <View display="flex" gap={16}>
        <ProgressBar
          shape="circle"
          value={progress}
          animated={true}
          animationDuration="0.8s"
          showLabel
          size={60}
          color="color-purple-500"
        />
      </View>
    </View>
  );
};
