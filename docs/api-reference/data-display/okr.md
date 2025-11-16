# OKR

The OKR (Objectives and Key Results) component is used for displaying and tracking organizational objectives and their associated key results. It provides a comprehensive view of progress, status, and ownership for strategic goals.

## Import

```jsx
import { OKR } from '@app-studio/web';
```

## Props

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| objectives | OKRObjective[] | **required** | Array of objectives to display |
| themeMode | 'light' \| 'dark' | 'light' | Theme mode for the component |
| views | OKRViews | undefined | Custom styling for different parts of the component |
| onKeyResultClick | (keyResult: OKRKeyResult, objective: OKRObjective) => void | undefined | Callback when a key result is clicked |
| renderObjectiveFooter | (objective: OKRObjective) => ReactNode | undefined | Custom footer renderer for objectives |
| renderKeyResultFooter | (keyResult: OKRKeyResult, objective: OKRObjective) => ReactNode | undefined | Custom footer renderer for key results |

## Type Definitions

### OKRStatus

```tsx
type OKRStatus =
  | 'notStarted'   // No progress made (0%)
  | 'onTrack'      // Good progress (70-99%)
  | 'atRisk'       // Moderate progress (40-69%)
  | 'offTrack'     // Poor progress (1-39%)
  | 'achieved';    // Goal completed (100%)
```

### OKRObjective

```tsx
interface OKRObjective {
  id: string;                    // Unique identifier
  title: string;                 // Objective title
  description?: string;          // Objective description
  owner?: string;                // Person responsible
  timeframe?: string;            // Time period (e.g., "Q4 2025")
  tags?: string[];               // Category tags
  progress?: number;             // Overall progress (0-100)
  status?: OKRStatus;            // Current status
  keyResults: OKRKeyResult[];    // Associated key results
}
```

### OKRKeyResult

```tsx
interface OKRKeyResult {
  id: string;                              // Unique identifier
  title: string;                           // Key result title
  description?: string;                    // Key result description
  progress?: number;                       // Progress percentage (0-100)
  metric?: string;                         // Measurement metric
  target?: string;                         // Target value
  current?: string;                        // Current value
  owner?: string;                          // Person responsible
  status?: OKRStatus;                      // Current status
  confidence?: 'low' | 'medium' | 'high';  // Confidence level
  lastUpdated?: string;                    // Last update timestamp
  tags?: string[];                         // Category tags
}
```

## Examples

### Basic Usage

```jsx
import React from 'react';
import { OKR } from '@app-studio/web';

export const BasicOKR = () => {
  const objectives = [
    {
      id: '1',
      title: 'Launch New Feature',
      description: 'Successfully launch the new feature to all users.',
      owner: 'John Doe',
      timeframe: 'Q4 2025',
      tags: ['new-feature', 'launch'],
      progress: 50,
      status: 'onTrack',
      keyResults: [
        {
          id: '1.1',
          title: 'Complete development',
          progress: 80,
          status: 'onTrack',
        },
        {
          id: '1.2',
          title: 'Complete QA testing',
          progress: 40,
          status: 'atRisk',
        },
        {
          id: '1.3',
          title: 'Reach 10,000 active users',
          progress: 10,
          status: 'offTrack',
        },
      ],
    },
  ];

  return <OKR objectives={objectives} />;
};
```

### With Detailed Key Results

```jsx
import React from 'react';
import { OKR } from '@app-studio/web';

export const DetailedOKR = () => {
  const objectives = [
    {
      id: '2',
      title: 'Improve Customer Satisfaction',
      description: 'Increase customer satisfaction scores by 20%',
      owner: 'Jane Smith',
      timeframe: 'Q1 2026',
      tags: ['customer-experience', 'support'],
      keyResults: [
        {
          id: '2.1',
          title: 'Reduce support ticket response time',
          description: 'Decrease average response time from 4h to 2h',
          progress: 65,
          metric: 'Average Response Time',
          current: '2.5h',
          target: '2h',
          owner: 'Support Team',
          status: 'onTrack',
          confidence: 'high',
          lastUpdated: '2 days ago',
          tags: ['support', 'efficiency'],
        },
        {
          id: '2.2',
          title: 'Increase NPS score',
          description: 'Improve Net Promoter Score from 40 to 50',
          progress: 30,
          metric: 'NPS Score',
          current: '43',
          target: '50',
          owner: 'Customer Success',
          status: 'atRisk',
          confidence: 'medium',
          lastUpdated: '1 week ago',
          tags: ['nps', 'metrics'],
        },
      ],
    },
  ];

  return <OKR objectives={objectives} themeMode="dark" />;
};
```

### With Click Handlers

```jsx
import React from 'react';
import { OKR } from '@app-studio/web';

export const InteractiveOKR = () => {
  const objectives = [
    {
      id: '3',
      title: 'Increase Revenue',
      owner: 'Sales Team',
      timeframe: 'Q2 2026',
      keyResults: [
        {
          id: '3.1',
          title: 'Close 50 new enterprise deals',
          progress: 40,
          current: '20',
          target: '50',
        },
      ],
    },
  ];

  const handleKeyResultClick = (keyResult, objective) => {
    console.log('Clicked key result:', keyResult.title);
    console.log('From objective:', objective.title);
    // Navigate to detail view, open modal, etc.
  };

  return (
    <OKR
      objectives={objectives}
      onKeyResultClick={handleKeyResultClick}
    />
  );
};
```

### With Custom Footers

```jsx
import React from 'react';
import { OKR, Button, Horizontal } from '@app-studio/web';

export const OKRWithFooters = () => {
  const objectives = [
    {
      id: '4',
      title: 'Expand Market Presence',
      owner: 'Marketing',
      timeframe: 'Q3 2026',
      keyResults: [
        {
          id: '4.1',
          title: 'Launch in 3 new regions',
          progress: 33,
        },
      ],
    },
  ];

  return (
    <OKR
      objectives={objectives}
      renderObjectiveFooter={(objective) => (
        <Horizontal gap={8}>
          <Button size="sm" variant="outline">View Details</Button>
          <Button size="sm" variant="ghost">Edit</Button>
        </Horizontal>
      )}
      renderKeyResultFooter={(keyResult, objective) => (
        <Horizontal gap={8}>
          <Button size="sm" variant="link">Update Progress</Button>
          <Button size="sm" variant="link">Add Comment</Button>
        </Horizontal>
      )}
    />
  );
};
```

### Auto-calculated Progress

If you don't specify an objective's progress, it will be automatically calculated as the average of its key results:

```jsx
import React from 'react';
import { OKR } from '@app-studio/web';

export const AutoProgressOKR = () => {
  const objectives = [
    {
      id: '5',
      title: 'Improve Engineering Efficiency',
      // No progress specified - will be auto-calculated
      keyResults: [
        { id: '5.1', title: 'Reduce build time by 50%', progress: 70 },
        { id: '5.2', title: 'Increase test coverage to 90%', progress: 60 },
        { id: '5.3', title: 'Automate deployment process', progress: 80 },
      ],
      // Objective progress will be: (70 + 60 + 80) / 3 = 70%
    },
  ];

  return <OKR objectives={objectives} />;
};
```

## Customization

The OKR component can be extensively customized using the `views` prop:

```jsx
<OKR
  objectives={objectives}
  views={{
    // Main container
    container: { /* ViewProps */ },

    // Objective card styling
    objectiveCard: { /* ViewProps */ },
    objectiveHeader: { /* ViewProps */ },
    objectiveTitle: { /* TextProps */ },
    objectiveDescription: { /* TextProps */ },
    objectiveMeta: { /* ViewProps */ },
    objectiveOwner: { /* TextProps */ },
    objectiveTimeframe: { /* TextProps */ },
    objectiveTags: { /* ViewProps */ },
    objectiveProgressSection: { /* ViewProps */ },
    objectiveProgressLabel: { /* TextProps */ },
    objectiveProgressValue: { /* TextProps */ },
    objectiveProgressBar: { /* ProgressBarStyles */ },
    objectiveStatus: { /* StatusIndicatorStyles */ },

    // Tag styling
    tag: { /* ViewProps */ },
    tagText: { /* TextProps */ },

    // Key result styling
    keyResultList: { /* ViewProps */ },
    keyResultItem: { /* ViewProps */ },
    keyResultHeader: { /* ViewProps */ },
    keyResultTitle: { /* TextProps */ },
    keyResultDescription: { /* TextProps */ },
    keyResultMeta: { /* ViewProps */ },
    keyResultOwner: { /* TextProps */ },
    keyResultStatus: { /* StatusIndicatorStyles */ },
    keyResultTags: { /* ViewProps */ },
    keyResultTag: { /* ViewProps */ },
    keyResultTagText: { /* TextProps */ },
    keyResultProgressSection: { /* ViewProps */ },
    keyResultProgressValue: { /* TextProps */ },
    keyResultProgressBar: { /* ProgressBarStyles */ },

    // Footer styling
    footer: { /* ViewProps */ },
  }}
/>
```

### Custom Styling Example

```jsx
import React from 'react';
import { OKR } from '@app-studio/web';

export const CustomStyledOKR = () => {
  const objectives = [
    {
      id: '6',
      title: 'Custom Styled Objective',
      keyResults: [
        { id: '6.1', title: 'Key Result 1', progress: 75 },
      ],
    },
  ];

  return (
    <OKR
      objectives={objectives}
      views={{
        objectiveCard: {
          backgroundColor: 'color.blue.50',
          borderColor: 'color.blue.300',
          borderRadius: 20,
        },
        objectiveTitle: {
          color: 'color.blue.800',
          size: 'xl',
        },
        keyResultItem: {
          backgroundColor: 'color.blue.100',
          borderRadius: 16,
        },
      }}
    />
  );
};
```

## Status Derivation

If a status is not explicitly provided, it will be automatically derived from the progress value:

| Progress | Derived Status |
| -------- | -------------- |
| 0% | `notStarted` |
| 1-39% | `offTrack` |
| 40-69% | `atRisk` |
| 70-99% | `onTrack` |
| 100% | `achieved` |

## Status Indicators

Each status is displayed with a corresponding visual indicator:

| Status | Indicator | Label |
| ------ | --------- | ----- |
| `notStarted` | Info (blue) | "Not started" |
| `onTrack` | Success (green) | "On track" |
| `atRisk` | Warning (yellow) | "At risk" |
| `offTrack` | Error (red) | "Off track" |
| `achieved` | Success (green) | "Achieved" |

## Theme Support

The OKR component fully supports both light and dark themes:

```jsx
// Light theme (default)
<OKR objectives={objectives} themeMode="light" />

// Dark theme
<OKR objectives={objectives} themeMode="dark" />

// Auto-detect from theme context
<OKR objectives={objectives} />
```

## Accessibility

The OKR component implements the following accessibility features:

- Proper semantic HTML structure
- Keyboard navigation support for interactive elements
- ARIA attributes for status indicators
- High contrast colors for text and backgrounds in both themes
- Proper focus states for clickable key results
- Screen reader friendly progress indicators

## Best Practices

### Data Structure

- Always provide unique `id` values for objectives and key results
- Use descriptive titles that clearly communicate the goal
- Include descriptions for complex objectives or key results
- Specify owners to establish accountability
- Add tags for easy categorization and filtering

### Progress Tracking

- Keep progress values between 0-100 (they will be clamped automatically)
- Update progress regularly to maintain accuracy
- Use the `lastUpdated` field to show recency of data
- Consider using confidence levels to indicate certainty
- Provide both `current` and `target` values for transparency

### Status Management

- Let the component auto-derive status from progress when possible
- Only override status when you have specific business logic
- Use appropriate statuses to drive action and attention
- Review `atRisk` and `offTrack` items regularly

### User Experience

- Use `onKeyResultClick` to provide drill-down functionality
- Implement custom footers for actions like updating progress or adding comments
- Group related objectives using tags
- Keep the number of key results per objective manageable (3-5 is ideal)
- Use consistent timeframes across related objectives

### Performance

- For large datasets, consider pagination or filtering
- Memoize event handlers to prevent unnecessary re-renders
- Use virtualization if displaying many objectives simultaneously

## Related Components

- [ProgressBar](../utility/progress-bar.md) - Used internally for progress visualization
- [StatusIndicator](../feedback/status-indicator.md) - Used internally for status display
- [Card](./card.md) - Similar container component for content display
- [Badge](./badge.md) - Can be used in custom footers for additional metadata

## Common Use Cases

- Strategic planning and goal tracking
- Team performance dashboards
- Product roadmap visualization
- Project milestone tracking
- KPI monitoring and reporting
- Quarterly business reviews (QBRs)
