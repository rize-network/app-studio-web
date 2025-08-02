import React from 'react';
import { View, Horizontal, Vertical, Text } from 'app-studio';
import { TraceEvent, TraceSpan, VisualizationType } from './AgentTrace.props';
import { DefaultAgentTraceStyles } from './AgentTrace.style';
import { Select } from '../../../Form/Form';

export interface TraceVisualizationProps {
  events: TraceEvent[];
  spans: TraceSpan[];
  selectedEvent?: TraceEvent | null;
  visualizationType: VisualizationType;
  onVisualizationChange: (type: VisualizationType) => void;
  onEventSelect: (eventId: string) => void;
  views?: {
    container?: any;
  };
}

/**
 * TraceVisualization Component
 *
 * Renders different visualization types for trace data
 */
export const TraceVisualization: React.FC<TraceVisualizationProps> = ({
  events,
  spans,
  selectedEvent,
  visualizationType,
  onVisualizationChange,
  onEventSelect,
  views = {},
}) => {
  /**
   * Build tree structure from events
   */
  const buildEventTree = () => {
    const eventMap = new Map(
      events.map((e) => [e.id, { ...e, children: [] as TraceEvent[] }])
    );
    const roots: TraceEvent[] = [];

    events.forEach((event) => {
      const eventWithChildren = eventMap.get(event.id)!;
      if (event.parentId && eventMap.has(event.parentId)) {
        eventMap.get(event.parentId)!.children.push(eventWithChildren);
      } else {
        roots.push(eventWithChildren);
      }
    });

    return roots;
  };

  /**
   * Render tree visualization
   */
  const renderTreeVisualization = () => {
    const tree = buildEventTree();

    const renderTreeNode = (event: TraceEvent, depth = 0) => {
      const isSelected = selectedEvent?.id === event.id;
      const indent = depth * 20;

      return (
        <View key={event.id}>
          <View
            padding="8px"
            marginLeft={`${indent}px`}
            backgroundColor={isSelected ? 'color.blue.50' : 'color.white'}
            border={isSelected ? '1px solid' : 'none'}
            borderColor={isSelected ? 'color.blue.300' : 'transparent'}
            borderRadius="4px"
            cursor="pointer"
            onClick={() => onEventSelect(event.id)}
          >
            <Horizontal gap={8} alignItems="center">
              <Text fontSize="12px">
                {event.type === 'llm_request'
                  ? '🤖'
                  : event.type === 'llm_response'
                  ? '💬'
                  : event.type === 'function_call'
                  ? '🔧'
                  : event.type === 'function_response'
                  ? '✅'
                  : event.type === 'error'
                  ? '❌'
                  : '📝'}
              </Text>
              <Text fontSize="sm" fontWeight="500">
                {event.metadata?.title || event.type}
              </Text>
              {event.duration && (
                <Text fontSize="xs" color="color.gray.500">
                  ({event.duration}ms)
                </Text>
              )}
            </Horizontal>
          </View>
          {event.children &&
            event.children.map((child) => renderTreeNode(child, depth + 1))}
        </View>
      );
    };

    return (
      <Vertical gap={4}>{tree.map((root) => renderTreeNode(root))}</Vertical>
    );
  };

  /**
   * Render table visualization
   */
  const renderTableVisualization = () => {
    return (
      <View overflowX="auto">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr
              style={{
                backgroundColor: '#f9fafb',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Type
              </th>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Timestamp
              </th>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Duration
              </th>
              <th
                style={{
                  padding: '8px',
                  textAlign: 'left',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
              >
                Level
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => {
              const isSelected = selectedEvent?.id === event.id;
              return (
                <tr
                  key={event.id}
                  style={{
                    backgroundColor: isSelected ? '#eff6ff' : 'white',
                    borderBottom: '1px solid #f3f4f6',
                    cursor: 'pointer',
                  }}
                  onClick={() => onEventSelect(event.id)}
                >
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    <Horizontal gap={4} alignItems="center">
                      <Text fontSize="12px">
                        {event.type === 'llm_request'
                          ? '🤖'
                          : event.type === 'llm_response'
                          ? '💬'
                          : event.type === 'function_call'
                          ? '🔧'
                          : event.type === 'function_response'
                          ? '✅'
                          : event.type === 'error'
                          ? '❌'
                          : '📝'}
                      </Text>
                      <Text fontSize="12px">{event.type}</Text>
                    </Horizontal>
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {event.metadata?.title || '-'}
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      fontSize: '12px',
                      fontFamily: 'Monaco, Consolas, monospace',
                    }}
                  >
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </td>
                  <td
                    style={{
                      padding: '8px',
                      fontSize: '12px',
                      fontFamily: 'Monaco, Consolas, monospace',
                    }}
                  >
                    {event.duration ? `${event.duration}ms` : '-'}
                  </td>
                  <td style={{ padding: '8px', fontSize: '12px' }}>
                    {event.metadata?.level ? (
                      <View
                        padding="2px 6px"
                        borderRadius="4px"
                        backgroundColor={
                          event.metadata.level === 'error'
                            ? 'color.red.100'
                            : event.metadata.level === 'warning'
                            ? 'color.yellow.100'
                            : 'color.blue.100'
                        }
                        color={
                          event.metadata.level === 'error'
                            ? 'color.red.800'
                            : event.metadata.level === 'warning'
                            ? 'color.yellow.800'
                            : 'color.blue.800'
                        }
                        display="inline-block"
                      >
                        <Text
                          fontSize="10px"
                          fontWeight="600"
                          textTransform="uppercase"
                        >
                          {event.metadata.level}
                        </Text>
                      </View>
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </View>
    );
  };

  /**
   * Render flamegraph visualization (simplified)
   */
  const renderFlamegraphVisualization = () => {
    const sortedEvents = [...events].sort((a, b) => a.timestamp - b.timestamp);
    const maxDuration = Math.max(
      ...events.filter((e) => e.duration).map((e) => e.duration!)
    );

    return (
      <Vertical gap={2}>
        {sortedEvents.map((event, index) => {
          const width = event.duration
            ? (event.duration / maxDuration) * 100
            : 10;
          const isSelected = selectedEvent?.id === event.id;

          return (
            <View
              key={event.id}
              height="24px"
              width={`${width}%`}
              backgroundColor={
                event.type === 'llm_request'
                  ? 'color.blue.500'
                  : event.type === 'llm_response'
                  ? 'color.green.500'
                  : event.type === 'function_call'
                  ? 'color.purple.500'
                  : event.type === 'error'
                  ? 'color.red.500'
                  : 'color.gray.500'
              }
              borderRadius="2px"
              cursor="pointer"
              display="flex"
              alignItems="center"
              paddingLeft="8px"
              border={isSelected ? '2px solid white' : 'none'}
              boxShadow={isSelected ? '0 0 0 2px #3b82f6' : 'none'}
              onClick={() => onEventSelect(event.id)}
              title={`${event.type} - ${event.duration || 0}ms`}
            >
              <Text fontSize="10px" color="white" fontWeight="600">
                {event.metadata?.title || event.type} ({event.duration || 0}ms)
              </Text>
            </View>
          );
        })}
      </Vertical>
    );
  };

  /**
   * Render current visualization
   */
  const renderVisualization = () => {
    switch (visualizationType) {
      case 'tree':
        return renderTreeVisualization();
      case 'table':
        return renderTableVisualization();
      case 'flamegraph':
        return renderFlamegraphVisualization();
      case 'graph':
        return (
          <View padding={32} textAlign="center">
            <Text color="color.gray.500">
              Graph visualization coming soon...
            </Text>
          </View>
        );
      default:
        return renderTreeVisualization();
    }
  };

  return (
    <View {...DefaultAgentTraceStyles.visualization} {...views.container}>
      <Vertical gap={16}>
        {/* Visualization Type Selector */}
        <Horizontal justifyContent="space-between" alignItems="center">
          <Text fontSize="sm" fontWeight="600" color="color.gray.700">
            Visualization Type
          </Text>
          <Select
            value={visualizationType}
            onChange={onVisualizationChange}
            options={[
              { value: 'tree', label: 'Tree View' },
              { value: 'table', label: 'Table View' },
              { value: 'flamegraph', label: 'Flamegraph' },
              { value: 'graph', label: 'Graph (Coming Soon)' },
            ]}
          />
        </Horizontal>

        {/* Visualization Content */}
        <View flex={1} overflowY="auto">
          {renderVisualization()}
        </View>
      </Vertical>
    </View>
  );
};
