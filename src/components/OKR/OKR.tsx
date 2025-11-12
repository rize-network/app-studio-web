import React, { useMemo } from 'react';
import { OKRProps } from './OKR/OKR.props';
import OKRView from './OKR/OKR.view';

const OKRComponent: React.FC<OKRProps> = (props) => {
  const { progress, keyResults } = props;

  const computedProgress = useMemo(() => {
    if (typeof progress === 'number' && !Number.isNaN(progress)) {
      return progress;
    }

    if (!keyResults || keyResults.length === 0) {
      return 0;
    }

    const sum = keyResults.reduce((acc, item) => {
      if (typeof item.progress !== 'number' || Number.isNaN(item.progress)) {
        return acc;
      }
      return acc + item.progress;
    }, 0);

    return sum / keyResults.length;
  }, [progress, keyResults]);

  return <OKRView {...props} computedProgress={computedProgress} />;
};

export const OKR = OKRComponent;
export default OKRComponent;
