import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { TraceFilter } from './AgentTrace.props';
import { DefaultAgentTraceStyles } from './AgentTrace.style';
import { Checkbox, TextField } from 'src/components/Form/Form';

export interface TraceFiltersProps {
  filter: TraceFilter;
  onFilterChange: (filter: TraceFilter) => void;
  eventTypes: string[];
}

/**
 * TraceFilters Component
 *
 * Renders filter controls for trace events
 */
export const TraceFilters: React.FC<TraceFiltersProps> = ({
  filter,
  onFilterChange,
  eventTypes,
}) => {
  const handleEventTypesChange = (selectedTypes: string[]) => {
    onFilterChange({
      ...filter,
      eventTypes: selectedTypes.length > 0 ? selectedTypes : undefined,
    });
  };

  const handleLevelChange = (selectedLevels: string[]) => {
    onFilterChange({
      ...filter,
      level: selectedLevels.length > 0 ? (selectedLevels as any) : undefined,
    });
  };

  const handleMinDurationChange = (value: string) => {
    const minDuration = parseFloat(value) || undefined;
    onFilterChange({
      ...filter,
      minDuration,
    });
  };

  const handleMaxDurationChange = (value: string) => {
    const maxDuration = parseFloat(value) || undefined;
    onFilterChange({
      ...filter,
      maxDuration,
    });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onFilterChange({
      ...filter,
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  const handleTimeRangeStartChange = (value: string) => {
    const start = value ? new Date(value) : undefined;
    onFilterChange({
      ...filter,
      timeRange: start
        ? {
            start,
            end: filter.timeRange?.end || new Date(),
          }
        : undefined,
    });
  };

  const handleTimeRangeEndChange = (value: string) => {
    const end = value ? new Date(value) : undefined;
    onFilterChange({
      ...filter,
      timeRange: end
        ? {
            start: filter.timeRange?.start || new Date(0),
            end,
          }
        : undefined,
    });
  };

  return (
    <View {...DefaultAgentTraceStyles.filters}>
      <Vertical gap={12}>
        {/* Event Types Filter */}
        <View {...DefaultAgentTraceStyles.filterGroup}>
          <Text {...DefaultAgentTraceStyles.filterLabel}>Event Types</Text>
          <Horizontal gap={8} flexWrap="wrap">
            {eventTypes.map((type) => (
              <Checkbox
                key={type}
                checked={filter.eventTypes?.includes(type) || false}
                onChange={(checked) => {
                  const currentTypes = filter.eventTypes || [];
                  const newTypes = checked
                    ? [...currentTypes, type]
                    : currentTypes.filter((t) => t !== type);
                  handleEventTypesChange(newTypes);
                }}
                label={type.replace('_', ' ')}
              />
            ))}
          </Horizontal>
        </View>

        {/* Level Filter */}
        <View {...DefaultAgentTraceStyles.filterGroup}>
          <Text {...DefaultAgentTraceStyles.filterLabel}>Log Levels</Text>
          <Horizontal gap={8}>
            {['info', 'warning', 'error', 'debug'].map((level) => (
              <Checkbox
                key={level}
                checked={filter.level?.includes(level as any) || false}
                onChange={(checked) => {
                  const currentLevels = filter.level || [];
                  const newLevels = checked
                    ? [...currentLevels, level]
                    : currentLevels.filter((l) => l !== level);
                  handleLevelChange(newLevels);
                }}
                label={level}
              />
            ))}
          </Horizontal>
        </View>

        {/* Duration Filter */}
        <View {...DefaultAgentTraceStyles.filterGroup}>
          <Text {...DefaultAgentTraceStyles.filterLabel}>
            Duration Range (ms)
          </Text>
          <Horizontal gap={8} alignItems="center">
            <TextField
              placeholder="Min"
              type="number"
              value={filter.minDuration?.toString() || ''}
              onChange={handleMinDurationChange}
              style={{ width: '100px' }}
            />
            <Text fontSize="sm" color="color.gray.600">
              to
            </Text>
            <TextField
              placeholder="Max"
              type="number"
              value={filter.maxDuration?.toString() || ''}
              onChange={handleMaxDurationChange}
              style={{ width: '100px' }}
            />
          </Horizontal>
        </View>

        {/* Tags Filter */}
        <View {...DefaultAgentTraceStyles.filterGroup}>
          <Text {...DefaultAgentTraceStyles.filterLabel}>Filter by Tags</Text>
          <TextField
            placeholder="Enter tags separated by commas"
            value={filter.tags?.join(', ') || ''}
            onChange={handleTagsChange}
          />
        </View>

        {/* Time Range Filter */}
        <View {...DefaultAgentTraceStyles.filterGroup}>
          <Text {...DefaultAgentTraceStyles.filterLabel}>Time Range</Text>
          <Horizontal gap={8} alignItems="center">
            <input
              type="datetime-local"
              value={
                filter.timeRange?.start
                  ? new Date(
                      filter.timeRange.start.getTime() -
                        filter.timeRange.start.getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) => handleTimeRangeStartChange(e.target.value)}
              style={{
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            />
            <Text fontSize="sm" color="color.gray.600">
              to
            </Text>
            <input
              type="datetime-local"
              value={
                filter.timeRange?.end
                  ? new Date(
                      filter.timeRange.end.getTime() -
                        filter.timeRange.end.getTimezoneOffset() * 60000
                    )
                      .toISOString()
                      .slice(0, 16)
                  : ''
              }
              onChange={(e) => handleTimeRangeEndChange(e.target.value)}
              style={{
                padding: '6px 8px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            />
          </Horizontal>
        </View>

        {/* Clear Filters */}
        {(filter.eventTypes ||
          filter.level ||
          filter.timeRange ||
          filter.tags ||
          filter.minDuration !== undefined ||
          filter.maxDuration !== undefined) && (
          <Horizontal justifyContent="flex-end">
            <button
              onClick={() => onFilterChange({})}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                color: '#6b7280',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Clear all filters
            </button>
          </Horizontal>
        )}
      </Vertical>
    </View>
  );
};
