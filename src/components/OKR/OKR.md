# OKR Component

A comprehensive Objectives and Key Results (OKR) component for displaying organizational goals, progress tracking, and status management. Ideal for strategy communication, performance tracking, and team alignment.

## Features

- **Objectives & Key Results**: Display goals with measurable results
- **Progress Tracking**: Visual progress bars and percentage indicators
- **Status Management**: Track progress status (notStarted, onTrack, atRisk, offTrack, achieved)
- **Confidence Levels**: Indicate confidence in achieving key results (low, medium, high)
- **Metadata Display**: Show owner, timeframe, tags, and last updated information
- **Custom Rendering**: Custom footer renderers for objectives and key results
- **Theme Support**: Light and dark mode support
- **Comprehensive Styling**: Full control via `views` prop for every element
- **Click Handlers**: Interactive callbacks for objectives and key results

## Installation

The OKR component is part of the app-studio library.

```tsx
import { OKR } from 'app-studio';
```

## Basic Usage

### Simple OKR Display

```tsx
import { OKR } from 'app-studio';

export function BasicOKRDisplay() {
  const objectives = [
    {
      id: 'obj-1',
      title: 'Increase Customer Satisfaction',
      description: 'Improve overall customer satisfaction scores',
      timeframe: 'Q1 2024',
      progress: 75,
      status: 'onTrack',
      keyResults: [
        {
          id: 'kr-1',
          title: 'Achieve 90% NPS score',
          progress: 85,
          status: 'onTrack',
          confidence: 'high',
          current: '85',
          target: '90',
        },
        {
          id: 'kr-2',
          title: 'Reduce support ticket resolution time to <24hrs',
          progress: 70,
          status: 'atRisk',
          confidence: 'medium',
          current: '28 hours',
          target: '24 hours',
        },
      ],
    },
  ];

  return <OKR objectives={objectives} />;
}
```

### With Click Handlers

```tsx
<OKR
  objectives={objectives}
  onObjectiveClick={(objective) => {
    console.log('Objective clicked:', objective.title);
  }}
  onKeyResultClick={(keyResult, objective) => {
    console.log('Key result clicked:', keyResult.title);
    console.log('Parent objective:', objective.title);
  }}
/>
```

### With Theme Mode

```tsx
<OKR
  objectives={objectives}
  themeMode="dark"
/>
```

## API Reference

### OKR Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `objectives` | `OKRObjective[]` | **Required** | Array of objectives with key results |
| `themeMode` | `'light' \| 'dark'` | `'light'` | Color theme for the component |
| `views` | `OKRViews` | - | Styling configuration for all elements |
| `onObjectiveClick` | `(objective: OKRObjective) => void` | - | Called when objective is clicked |
| `onKeyResultClick` | `(keyResult: OKRKeyResult, objective: OKRObjective) => void` | - | Called when key result is clicked |
| `renderObjectiveFooter` | `(objective: OKRObjective) => ReactNode` | - | Custom objective footer renderer |
| `renderKeyResultFooter` | `(keyResult: OKRKeyResult, objective: OKRObjective) => ReactNode` | - | Custom key result footer renderer |

### Data Structures

#### OKRObjective

```typescript
interface OKRObjective {
  id: string;                    // Unique objective identifier
  title: string;                 // Objective title
  description?: string;          // Detailed description
  owner?: string;                // Person responsible for objective
  timeframe?: string;            // Timeline (e.g., "Q1 2024")
  tags?: string[];               // Category tags
  progress?: number;             // Progress percentage (0-100)
  status?: OKRStatus;            // Current status
  keyResults: OKRKeyResult[];    // Associated key results
}
```

#### OKRKeyResult

```typescript
interface OKRKeyResult {
  id: string;                    // Unique key result identifier
  title: string;                 // Key result title
  description?: string;          // Detailed description
  progress?: number;             // Progress percentage (0-100)
  metric?: string;               // Unit of measurement
  target?: string;               // Target value
  current?: string;              // Current value
  owner?: string;                // Person responsible
  status?: OKRStatus;            // Current status
  confidence?: 'low' | 'medium' | 'high';  // Confidence in achieving
  lastUpdated?: string;          // Last update timestamp
  tags?: string[];               // Category tags
}
```

#### OKRStatus

Status values indicate progress toward the objective/key result:

```typescript
type OKRStatus =
  | 'notStarted'   // Not yet started
  | 'onTrack'      // Progressing as expected
  | 'atRisk'       // At risk of missing target
  | 'offTrack'     // Significantly behind schedule
  | 'achieved';    // Successfully completed
```

### Views Configuration

The `views` prop allows comprehensive styling customization:

```typescript
interface OKRViews {
  // Container
  container?: ViewProps;

  // Objective card styling
  objectiveCard?: ViewProps;
  objectiveHeader?: ViewProps;
  objectiveTitle?: TextProps;
  objectiveDescription?: TextProps;
  objectiveMeta?: ViewProps;
  objectiveOwner?: TextProps;
  objectiveTimeframe?: TextProps;
  objectiveTags?: ViewProps;
  tag?: ViewProps;
  tagText?: TextProps;

  // Objective progress
  objectiveProgressSection?: ViewProps;
  objectiveProgressLabel?: TextProps;
  objectiveProgressValue?: TextProps;
  objectiveProgressBar?: ProgressBarStyles;
  objectiveStatus?: StatusIndicatorStyles;

  // Key results
  keyResultList?: ViewProps;
  keyResultItem?: ViewProps;
  keyResultHeader?: ViewProps;
  keyResultTitle?: TextProps;
  keyResultDescription?: TextProps;
  keyResultMeta?: ViewProps;
  keyResultOwner?: TextProps;
  keyResultStatus?: StatusIndicatorStyles;
  keyResultTags?: ViewProps;
  keyResultTag?: ViewProps;
  keyResultTagText?: TextProps;

  // Key result progress
  keyResultProgressSection?: ViewProps;
  keyResultProgressValue?: TextProps;
  keyResultProgressBar?: ProgressBarStyles;

  // Footer
  footer?: ViewProps;
}
```

## Common Patterns

### Full Quarterly OKR Review

```tsx
export function QuarterlyOKRReview() {
  const objectives = [
    {
      id: 'obj-1',
      title: 'Product Excellence',
      description: 'Deliver a world-class product experience',
      owner: 'Jane Doe',
      timeframe: 'Q1 2024',
      tags: ['product', 'engineering'],
      progress: 80,
      status: 'onTrack',
      keyResults: [
        {
          id: 'kr-1',
          title: 'Reduce app crash rate by 50%',
          progress: 90,
          status: 'onTrack',
          confidence: 'high',
          metric: 'crash rate',
          current: '0.5%',
          target: '0.1%',
          owner: 'Alice Smith',
          lastUpdated: '2024-01-15',
          tags: ['reliability'],
        },
        {
          id: 'kr-2',
          title: 'Achieve 99.9% API uptime',
          progress: 75,
          status: 'atRisk',
          confidence: 'medium',
          metric: 'uptime percentage',
          current: '99.85%',
          target: '99.9%',
          owner: 'Bob Johnson',
          lastUpdated: '2024-01-14',
          tags: ['infrastructure'],
        },
      ],
    },
    {
      id: 'obj-2',
      title: 'Revenue Growth',
      description: 'Accelerate revenue while maintaining margins',
      owner: 'John Smith',
      timeframe: 'Q1 2024',
      tags: ['business', 'sales'],
      progress: 60,
      status: 'atRisk',
      keyResults: [
        {
          id: 'kr-3',
          title: 'Increase ARR by $5M',
          progress: 55,
          status: 'atRisk',
          confidence: 'medium',
          metric: 'ARR',
          current: '$2.8M',
          target: '$5M',
          owner: 'Carol Davis',
          lastUpdated: '2024-01-13',
        },
        {
          id: 'kr-4',
          title: 'Achieve 95% net retention rate',
          progress: 65,
          status: 'onTrack',
          confidence: 'high',
          metric: 'NRR percentage',
          current: '92%',
          target: '95%',
          owner: 'Diana Wilson',
          lastUpdated: '2024-01-15',
        },
      ],
    },
  ];

  return (
    <OKR
      objectives={objectives}
      themeMode="light"
      onObjectiveClick={(objective) => {
        console.log('View details for:', objective.title);
      }}
      onKeyResultClick={(kr, obj) => {
        console.log(`View updates for: ${kr.title} (${obj.title})`);
      }}
    />
  );
}
```

### With Custom Footer Renderers

```tsx
<OKR
  objectives={objectives}
  renderObjectiveFooter={(objective) => (
    <div className="objective-footer">
      <button className="view-details">View Details</button>
      <button className="edit-okr">Edit</button>
      <span className="last-updated">
        Last updated: {new Date().toLocaleDateString()}
      </span>
    </div>
  )}
  renderKeyResultFooter={(keyResult, objective) => (
    <div className="kr-footer">
      <span className="confidence">
        Confidence: {keyResult.confidence?.toUpperCase()}
      </span>
      <button className="update">Add Update</button>
    </div>
  )}
/>
```

### With Custom Styling

```tsx
<OKR
  objectives={objectives}
  views={{
    container: {
      backgroundColor: '#f8f9fa',
      padding: '24px',
      borderRadius: '8px',
    },
    objectiveCard: {
      backgroundColor: '#ffffff',
      borderRadius: '6px',
      padding: '16px',
      border: '1px solid #e0e0e0',
      marginBottom: '20px',
    },
    objectiveTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#1a1a1a',
    },
    objectiveProgressBar: {
      height: '8px',
      backgroundColor: '#e0e0e0',
    },
    keyResultItem: {
      padding: '12px',
      backgroundColor: '#fafafa',
      borderRadius: '4px',
      marginBottom: '8px',
    },
    keyResultTitle: {
      fontSize: '14px',
      fontWeight: '500',
      color: '#333333',
    },
  }}
/>
```

### Interactive OKR Tracker

```tsx
export function InteractiveOKRTracker() {
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [selectedKR, setSelectedKR] = useState(null);

  const objectives = [
    // ... your objectives
  ];

  return (
    <div className="okr-tracker">
      <div className="okr-list">
        <OKR
          objectives={objectives}
          onObjectiveClick={(obj) => {
            setSelectedObjective(obj);
            setSelectedKR(null);
          }}
          onKeyResultClick={(kr, obj) => {
            setSelectedObjective(obj);
            setSelectedKR(kr);
          }}
        />
      </div>

      {selectedKR && (
        <div className="kr-detail-panel">
          <h3>{selectedKR.title}</h3>
          <p>Progress: {selectedKR.progress}%</p>
          <p>Status: {selectedKR.status}</p>
          <p>Confidence: {selectedKR.confidence}</p>
          <p>Current: {selectedKR.current} / Target: {selectedKR.target}</p>
          <button onClick={() => setSelectedKR(null)}>Close</button>
        </div>
      )}
    </div>
  );
}
```

## Status Color Mapping

The component automatically styles status indicators based on status:

| Status | Typical Color | Meaning |
|--------|---------------|---------|
| `notStarted` | Gray | Work not yet initiated |
| `onTrack` | Green | Progressing as planned |
| `atRisk` | Yellow/Orange | May miss target without intervention |
| `offTrack` | Red | Significantly behind schedule |
| `achieved` | Blue/Green | Goal successfully completed |

## Confidence Levels

Key result confidence indicates the likelihood of achievement:

| Level | Description |
|-------|-------------|
| `low` | Uncertain about achieving the target |
| `medium` | Moderately confident in achievement |
| `high` | Very confident in achieving the target |

## Best Practices

1. **Clear Objectives**: Make objectives inspiring and understandable
2. **Measurable Key Results**: Use quantifiable metrics and targets
3. **Ownership**: Assign clear owners to objectives and key results
4. **Regular Updates**: Keep `lastUpdated` current with progress
5. **Realistic Timeframes**: Set achievable quarterly goals
6. **Limited Scope**: Typically 3-5 objectives per quarter
7. **Tags for Organization**: Use tags for filtering and categorization
8. **Progress Tracking**: Update `progress` percentage regularly
9. **Status Management**: Keep status updated to reflect reality
10. **Communication**: Use custom renderers to add links to updates and resources

## Progress Calculation

Progress values should be 0-100 (percentages):
- 0%: Not started
- 1-49%: In progress, early stage
- 50%: Midway through quarter
- 51-99%: Late stage, nearly complete
- 100%: Achieved

The component automatically clamps values between 0-100.

## Examples

Check out the example implementations:
- Full Example: `src/pages/okr.page.tsx`

## Styling & Customization

The component respects the `app-studio` theme and provides extensive customization:

1. **Theme Mode**: Switch between light and dark mode
2. **Views Prop**: Customize every visual element
3. **Custom Renderers**: Override footer content
4. **Click Handlers**: Add interactivity

## Accessibility

- Proper semantic HTML structure
- ARIA labels for status indicators
- Keyboard navigable (with click handlers)
- Color-independent status indication
- Clear text contrast ratios

## Browser Support

Works in all modern browsers that support CSS Flexbox and Grid.

## Performance Notes

- Component efficiently renders even with 50+ objectives
- Each objective can have 10+ key results
- For 100+ objectives, consider pagination or virtualization
- Memoize custom render functions to prevent unnecessary re-renders

## Related Components

- **ProgressBar**: Used for progress visualization
- **StatusIndicator**: Used for status badges
- **Text**: Used for typography

## Tips

1. **Filtering**: Create tabs to filter by owner, tag, or status
2. **Search**: Add search functionality for finding objectives
3. **History**: Track OKR changes over time
4. **Comments**: Add discussion threads on key results
5. **Metrics Export**: Export OKR data to spreadsheets
6. **Alignment View**: Show how objectives connect across teams
7. **Archive**: Archive completed objectives for reference
