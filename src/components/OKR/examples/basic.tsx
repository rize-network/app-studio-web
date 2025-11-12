import React from 'react';
import { OKR } from '../OKR';

export const BasicOKR = () => (
  <OKR
    objective="Increase product activation"
    description="Focus the onboarding journey to help new users reach their first success moment faster."
    owner="Growth team"
    timeframe="Q1 2025"
    confidence={0.72}
    keyResults={[
      {
        id: 'kr-1',
        title: 'Boost new user activation rate',
        description:
          'Improve the onboarding checklist and nudge emails to guide users to activation.',
        owner: 'Product',
        metric: 'Activation rate',
        target: '60%',
        progress: 54,
        status: 'onTrack',
        confidence: 0.68,
      },
      {
        id: 'kr-2',
        title: 'Reduce time-to-value for new teams',
        description:
          'Launch quick-start templates and guided tours for collaborative workspaces.',
        owner: 'Design',
        metric: 'Median time to first project',
        target: '< 3 days',
        progress: 41,
        status: 'atRisk',
        confidence: 0.42,
      },
      {
        id: 'kr-3',
        title: 'Launch activation success playbook',
        description:
          'Enable customer success to run structured onboarding for strategic accounts.',
        owner: 'Customer success',
        metric: 'Playbook adoption',
        target: '75% of new accounts',
        progress: 68,
        status: 'onTrack',
        confidence: 0.76,
      },
    ]}
  />
);
