import React from 'react';
import { Select } from '../Select';

export const IsScrollableDemo = () => {
  const timeZones = [
    'Eastern Standard Time',
    'Central Standard Time',
    'Mountain Standard Time',
    'Pacific Standard Time',
    'Alaska Standard Time',
    'Hawaii Standard Time',
    'Greenwich Mean Time (GMT)',
    'Central European Time (CET)',
    'Eastern European Time (EET)',
    'Central Africa Time (CAT)',
    'East Africa Time (EAT',
  ];
  return <Select options={timeZones} label="Select a time zone" />;
};
