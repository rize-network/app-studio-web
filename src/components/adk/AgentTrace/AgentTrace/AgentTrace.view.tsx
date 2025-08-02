import React from 'react';
import { View, Vertical, Horizontal, Text, Button } from 'app-studio';
import { AgentTraceProps } from './AgentTrace.props';
import { useAgentTrace } from './AgentTrace.state';
import { DefaultAgentTraceStyles } from './AgentTrace.style';
import { TraceTimeline } from './TraceTimeline';
import { TraceEventList } from './TraceEventList';
import { TraceMetrics } from './TraceMetrics';
import { TraceFilters } from './TraceFilters';
import { TraceVisualization } from './TraceVisualization';
import { Alert } from 'src/components/Alert/Alert';
import { Tabs } from 'src/components/Tabs/Tabs';
import { Loader } from 'src/components/Loader/Loader';
import { TextField } from 'src/components/Form/Form';

export interface AgentTraceViewProps
  extends Omit<AgentTraceProps, 'filter'>,
    ReturnType<typeof useAgentTrace> {}

/**
 * AgentTrace View Component
 *
 * Renders the complete trace visualization interface with timeline, events, and metrics
 */
const AgentTraceView: React.FC<AgentTraceViewProps> = ({
  // Props
  showTimeline = true,
  showMetrics = true,
  showVisualization = true,
  enableFiltering = true,
  enableExport = true,
  enableSearch = true,
  showEventDetails = true,
  showPerformanceMetrics = true,
  compactMode = false,
  views,
  ariaLabel = 'Agent Trace Visualization',
  ariaDescribedBy,

  // State from hook
  events,
  spans,
  selectedEvent,
  selectedSpan,
  metrics,
  isLoading,
  error,
  filter,
  searchQuery,
  currentVisualization,
  fetchTraceEvents,
  selectEvent,
  selectSpan,
  updateFilter,
  exportTrace,
  setSearchQuery,
  setCurrentVisualization,
  setError,

  ...props
}) => {
  /**
   * Handle event selection
   */
  const handleEventSelect = (eventId: string) => {
    selectEvent(eventId);
  };

  /**
   * Handle span selection
   */
  const handleSpanSelect = (spanId: string) => {
    selectSpan(spanId);
  };

  /**
   * Handle export
   */
  const handleExport = (format: 'json' | 'csv' | 'svg') => {
    exportTrace({
      format,
      includeMetadata: true,
      includeMetrics: true,
    });
  };

  /**
   * Handle refresh
   */
  const handleRefresh = () => {
    fetchTraceEvents();
  };

  return (
    <View
      {...DefaultAgentTraceStyles.container}
      {...views?.container}
      {...props}
      aria-label={ariaLabel}
      aria-describedby={ariaDescribedBy}
    >
      {/* Header */}
      <View {...DefaultAgentTraceStyles.header} {...views?.header}>
        <Horizontal justifyContent="space-between" alignItems="center">
          <Vertical gap={4}>
            <Text fontSize="lg" fontWeight="600">
              Agent Trace
            </Text>
            <Text fontSize="sm" color="color.gray.600">
              {events.length} event{events.length !== 1 ? 's' : ''} • Session:{' '}
              {props.sessionId.slice(0, 8)}...
            </Text>
          </Vertical>

          <Horizontal gap={8}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              aria-label="Refresh trace data"
            >
              {isLoading ? <Loader size="xs" /> : '🔄'}
            </Button>

            {enableExport && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleExport('json')}
                aria-label="Export trace data"
              >
                📤 Export
              </Button>
            )}
          </Horizontal>
        </Horizontal>
      </View>

      {/* Error Display */}
      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Search and Filters */}
      {enableSearch && (
        <View
          padding={16}
          borderBottom="1px solid"
          borderBottomColor="color.gray.200"
        >
          <Vertical gap={12}>
            <TextField
              placeholder="Search events..."
              value={searchQuery}
              onChange={setSearchQuery}
              views={{
                container: views?.searchInput,
              }}
            />

            {enableFiltering && (
              <TraceFilters
                filter={filter}
                onFilterChange={updateFilter}
                eventTypes={Array.from(new Set(events.map((e) => e.type)))}
              />
            )}
          </Vertical>
        </View>
      )}

      {/* Metrics */}
      {showMetrics && metrics && (
        <TraceMetrics
          metrics={metrics}
          showPerformanceMetrics={showPerformanceMetrics}
          compactMode={compactMode}
          views={{
            container: views?.metrics,
          }}
        />
      )}

      {/* Main Content */}
      <View flex={1} display="flex" flexDirection="column">
        {compactMode ? (
          // Compact mode - single view
          <TraceEventList
            events={events}
            selectedEvent={selectedEvent}
            onEventSelect={handleEventSelect}
            showDetails={showEventDetails}
            compactMode={true}
            views={{
              container: views?.eventList,
              eventItem: views?.eventItem,
              selectedEventItem: views?.selectedEventItem,
            }}
          />
        ) : (
          // Full mode - tabbed interface
          <Tabs defaultValue="timeline">
            <Tabs.List>
              {showTimeline && (
                <Tabs.Trigger value="timeline">Timeline</Tabs.Trigger>
              )}
              <Tabs.Trigger value="events">Events</Tabs.Trigger>
              {showVisualization && (
                <Tabs.Trigger value="visualization">Visualization</Tabs.Trigger>
              )}
            </Tabs.List>

            {showTimeline && (
              <Tabs.Content value="timeline">
                <TraceTimeline
                  events={events}
                  spans={spans}
                  selectedEvent={selectedEvent}
                  selectedSpan={selectedSpan}
                  onEventSelect={handleEventSelect}
                  onSpanSelect={handleSpanSelect}
                  views={{
                    container: views?.timeline,
                  }}
                />
              </Tabs.Content>
            )}

            <Tabs.Content value="events">
              <TraceEventList
                events={events}
                selectedEvent={selectedEvent}
                onEventSelect={handleEventSelect}
                showDetails={showEventDetails}
                compactMode={false}
                views={{
                  container: views?.eventList,
                  eventItem: views?.eventItem,
                  selectedEventItem: views?.selectedEventItem,
                }}
              />
            </Tabs.Content>

            {showVisualization && (
              <Tabs.Content value="visualization">
                <TraceVisualization
                  events={events}
                  spans={spans}
                  selectedEvent={selectedEvent}
                  visualizationType={currentVisualization}
                  onVisualizationChange={setCurrentVisualization}
                  onEventSelect={handleEventSelect}
                  views={{
                    container: views?.visualization,
                  }}
                />
              </Tabs.Content>
            )}
          </Tabs>
        )}
      </View>

      {/* Loading State */}
      {isLoading && events.length === 0 && (
        <View
          {...DefaultAgentTraceStyles.loadingState}
          {...views?.loadingState}
        >
          <Loader size="md" />
          <Text color="color.gray.600">Loading trace data...</Text>
        </View>
      )}

      {/* Empty State */}
      {!isLoading && events.length === 0 && (
        <View {...DefaultAgentTraceStyles.emptyState} {...views?.emptyState}>
          <Text fontSize="lg" color="color.gray.500" textAlign="center">
            No trace events found
          </Text>
          <Text fontSize="sm" color="color.gray.400" textAlign="center">
            Start interacting with the agent to see trace data
          </Text>
        </View>
      )}
    </View>
  );
};

export default AgentTraceView;
