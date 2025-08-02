import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import {
  SessionFilters as SessionFiltersType,
  SessionSortOptions,
} from './AgentSession.props';
import { DefaultAgentSessionStyles } from './AgentSession.style';
import { Select, TextField } from 'src/components/Form/Form';

export interface SessionFiltersProps {
  filters: SessionFiltersType;
  sortOptions: SessionSortOptions;
  onFiltersChange: (filters: SessionFiltersType) => void;
  onSortChange: (sortOptions: SessionSortOptions) => void;
}

/**
 * SessionFilters Component
 *
 * Renders filter and sort controls for the session list
 */
export const SessionFilters: React.FC<SessionFiltersProps> = ({
  filters,
  sortOptions,
  onFiltersChange,
  onSortChange,
}) => {
  const handleSortFieldChange = (field: string) => {
    onSortChange({
      ...sortOptions,
      field: field as SessionSortOptions['field'],
    });
  };

  const handleSortDirectionChange = (direction: string) => {
    onSortChange({
      ...sortOptions,
      direction: direction as SessionSortOptions['direction'],
    });
  };

  const handleTagsChange = (tagsString: string) => {
    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);
    onFiltersChange({
      ...filters,
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  const handleMessageCountMinChange = (value: string) => {
    const min = parseInt(value) || 0;
    onFiltersChange({
      ...filters,
      messageCountRange: {
        min,
        max: filters.messageCountRange?.max || 1000,
      },
    });
  };

  const handleMessageCountMaxChange = (value: string) => {
    const max = parseInt(value) || 1000;
    onFiltersChange({
      ...filters,
      messageCountRange: {
        min: filters.messageCountRange?.min || 0,
        max,
      },
    });
  };

  return (
    <View {...DefaultAgentSessionStyles.filterContainer}>
      <Vertical gap={12}>
        {/* Sort Options */}
        <View {...DefaultAgentSessionStyles.filterGroup}>
          <Text {...DefaultAgentSessionStyles.filterLabel}>Sort By</Text>
          <Horizontal gap={8}>
            <Select
              value={sortOptions.field}
              onChange={handleSortFieldChange}
              options={[
                { value: 'updatedAt', label: 'Last Updated' },
                { value: 'createdAt', label: 'Created Date' },
                { value: 'title', label: 'Title' },
                { value: 'messageCount', label: 'Message Count' },
              ]}
              placeholder="Sort field"
            />
            <Select
              value={sortOptions.direction}
              onChange={handleSortDirectionChange}
              options={[
                { value: 'desc', label: 'Descending' },
                { value: 'asc', label: 'Ascending' },
              ]}
              placeholder="Sort direction"
            />
          </Horizontal>
        </View>

        {/* Tag Filter */}
        <View {...DefaultAgentSessionStyles.filterGroup}>
          <Text {...DefaultAgentSessionStyles.filterLabel}>Filter by Tags</Text>
          <TextField
            placeholder="Enter tags separated by commas"
            value={filters.tags?.join(', ') || ''}
            onChange={handleTagsChange}
          />
        </View>

        {/* Message Count Range */}
        <View {...DefaultAgentSessionStyles.filterGroup}>
          <Text {...DefaultAgentSessionStyles.filterLabel}>
            Message Count Range
          </Text>
          <Horizontal gap={8} alignItems="center">
            <TextField
              placeholder="Min"
              type="number"
              value={filters.messageCountRange?.min?.toString() || ''}
              onChange={handleMessageCountMinChange}
              style={{ width: '80px' }}
            />
            <Text fontSize="sm" color="color.gray.600">
              to
            </Text>
            <TextField
              placeholder="Max"
              type="number"
              value={filters.messageCountRange?.max?.toString() || ''}
              onChange={handleMessageCountMaxChange}
              style={{ width: '80px' }}
            />
          </Horizontal>
        </View>

        {/* Date Range Filter */}
        <View {...DefaultAgentSessionStyles.filterGroup}>
          <Text {...DefaultAgentSessionStyles.filterLabel}>Date Range</Text>
          <Horizontal gap={8} alignItems="center">
            <input
              type="date"
              value={
                filters.dateRange?.start
                  ? filters.dateRange.start.toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) => {
                const start = e.target.value
                  ? new Date(e.target.value)
                  : undefined;
                onFiltersChange({
                  ...filters,
                  dateRange: start
                    ? {
                        start,
                        end: filters.dateRange?.end || new Date(),
                      }
                    : undefined,
                });
              }}
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
              type="date"
              value={
                filters.dateRange?.end
                  ? filters.dateRange.end.toISOString().split('T')[0]
                  : ''
              }
              onChange={(e) => {
                const end = e.target.value
                  ? new Date(e.target.value)
                  : undefined;
                onFiltersChange({
                  ...filters,
                  dateRange: end
                    ? {
                        start: filters.dateRange?.start || new Date(0),
                        end,
                      }
                    : undefined,
                });
              }}
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
        {(filters.tags || filters.dateRange || filters.messageCountRange) && (
          <Horizontal justifyContent="flex-end">
            <button
              onClick={() => onFiltersChange({})}
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
