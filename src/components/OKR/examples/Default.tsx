import React from 'react';
import { OKR } from '../OKR';
import type { OKRObjective } from '../OKR/OKR.props';

const objectives: OKRObjective[] = [
  {
    id: 'obj-1',
    title: 'Launch the new onboarding experience',
    description:
      'Deliver a streamlined onboarding journey that helps teams activate within their first session.',
    owner: 'Product Team',
    timeframe: 'Q2 2024',
    keyResults: [
      {
        id: 'kr-1',
        title: 'Increase activation rate to 65%',
        progress: 52,
        confidence: 'high',
        owner: 'Growth',
      },
      {
        id: 'kr-2',
        title: 'Reduce time-to-value to under 10 minutes',
        description:
          'Measure from sign-up to first successful project creation.',
        progress: 40,
        confidence: 'medium',
        owner: 'Product Design',
      },
      {
        id: 'kr-3',
        title: 'Achieve NPS of 45 for onboarding flow',
        target: 'NPS 45',
        progress: 20,
        confidence: 'medium',
        owner: 'Research',
      },
    ],
  },
  {
    id: 'obj-2',
    title: 'Expand enterprise footprint',
    description:
      'Grow enterprise accounts through strategic partnerships and enablement.',
    owner: 'Sales',
    timeframe: 'Q2 2024',
    keyResults: [
      {
        id: 'kr-4',
        title: 'Close 8 net-new enterprise deals',
        progress: 30,
        confidence: 'medium',
        owner: 'Enterprise Sales',
      },
      {
        id: 'kr-5',
        title: 'Increase average contract value by 20%',
        progress: 10,
        confidence: 'low',
        owner: 'Revenue Operations',
      },
    ],
  },
];

const DefaultOKRExample = () => {
  return <OKR objectives={objectives} />;
};

export default DefaultOKRExample;
