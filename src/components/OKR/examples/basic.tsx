import React from 'react';
import { OKR } from '../OKR';

const sampleObjectives = [
  {
    id: 'obj-1',
    title: 'Launch self-serve onboarding for enterprise accounts',
    description:
      'Reduce activation friction and provide tailored onboarding paths for enterprise evaluators.',
    owner: 'Charlotte Nguyen',
    status: 'onTrack' as const,
    progress: 62,
    dueDate: 'Q3 2024',
    keyResults: [
      {
        id: 'kr-1',
        title: 'Ship interactive onboarding checklist in-product',
        owner: 'Max Cooper',
        status: 'completed',
        progress: 100,
      },
      {
        id: 'kr-2',
        title: 'Achieve 45% activation within the first 7 days',
        owner: 'Riya Das',
        status: 'atRisk',
        progress: 38,
        currentValue: 32,
        targetValue: 45,
        metric: '%',
      },
      {
        id: 'kr-3',
        title: 'Publish enterprise onboarding playbook with CS',
        owner: 'Diego Martinez',
        status: 'onTrack',
        progress: 55,
      },
    ],
  },
  {
    id: 'obj-2',
    title: 'Grow annual recurring revenue from ecosystem partners',
    owner: 'Imani Patel',
    status: 'atRisk' as const,
    dueDate: 'Q4 2024',
    keyResults: [
      {
        id: 'kr-4',
        title: 'Sign 5 new strategic partners',
        owner: 'Priya Malhotra',
        status: 'onTrack',
        progress: 60,
        currentValue: 3,
        targetValue: 5,
      },
      {
        id: 'kr-5',
        title: 'Generate $3M in influenced pipeline',
        owner: 'Aaron Chen',
        status: 'offTrack',
        progress: 20,
        currentValue: '$750k',
        targetValue: '$3M',
      },
      {
        id: 'kr-6',
        title: 'Launch new co-marketing toolkit',
        owner: 'Mira Shah',
        status: 'notStarted',
      },
    ],
  },
];

export const BasicOKR = () => <OKR objectives={sampleObjectives} />;
