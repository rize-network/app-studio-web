import React from 'react';
import { View, Horizontal, Text } from 'app-studio';
import { TraceEvent, TraceSpan } from './AgentTrace.props';
import { DefaultAgentTraceStyles, EventTypeColors } from './AgentTrace.style';

export interface TraceTimelineProps {
  events: TraceEvent[];
  spans: TraceSpan[];
  selectedEvent?: TraceEvent | null;
  selectedSpan?: TraceSpan | null;
  onEventSelect: (eventId: string) => void;
  onSpanSelect: (spanId: string) => void;
  views?: {
    container?: any;
  };
}

/**
 * TraceTimeline Component
 *
 * Renders a timeline visualization of trace events and spans
 */
export const TraceTimeline: React.FC<TraceTimelineProps> = ({
  events,
  spans,
  selectedEvent,
  selectedSpan,
  onEventSelect,
  onSpanSelect,
  views = {},
}) => {
  // Calculate timeline bounds
  const allTimestamps = events.map((e) => e.timestamp);
  const minTime = Math.min(...allTimestamps);
  const maxTime = Math.max(...allTimestamps);
  const timeRange = maxTime - minTime || 1000; // Fallback to 1 second

  /**
   * Convert timestamp to timeline position (0-100%)
   */
  const getTimelinePosition = (timestamp: number) => {
    return ((timestamp - minTime) / timeRange) * 100;
  };

  /**
   * Get event color based on type
   */
  const getEventColor = (type: string) => {
    return (
      EventTypeColors[type as keyof typeof EventTypeColors] || 'color.gray.500'
    );
  };

  /**
   * Format time for display
   */
  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3,
    } as Intl.DateTimeFormatOptions);
  };

  /**
   * Generate time axis labels
   */
  const generateTimeLabels = () => {
    const labelCount = 5;
    const labels: Array<{
      timestamp: number;
      position: number;
      label: string;
    }> = [];

    for (let i = 0; i <= labelCount; i++) {
      const timestamp = minTime + (timeRange * i) / labelCount;
      const position = (i / labelCount) * 100;
      labels.push({
        timestamp,
        position,
        label: formatTime(timestamp),
      });
    }

    return labels;
  };

  const timeLabels = generateTimeLabels();

  return (
    <View {...DefaultAgentTraceStyles.timeline} {...views.container}>
      <View {...DefaultAgentTraceStyles.timelineContainer}>
        {/* Spans */}
        {spans.map((span, index) => {
          const startPos = getTimelinePosition(span.startTime);
          const endPos = span.endTime ? getTimelinePosition(span.endTime) : 100;
          const width = Math.max(endPos - startPos, 2); // Minimum 2% width
          const top = 20 + index * 35; // Stack spans vertically

          return (
            <View
              key={span.id}
              {...DefaultAgentTraceStyles.timelineSpan}
              style={{
                left: `${startPos}%`,
                width: `${width}%`,
                top: `${top}px`,
                borderColor:
                  span.status === 'error' ? 'color.red.500' : 'color.blue.500',
                color:
                  span.status === 'error' ? 'color.red.700' : 'color.blue.700',
              }}
              onClick={() => onSpanSelect(span.id)}
              title={`${span.name} (${
                span.duration ? `${span.duration}ms` : 'running'
              })`}
            >
              <Text fontSize="10px" fontWeight="600">
                {span.name}
              </Text>
            </View>
          );
        })}

        {/* Events */}
        {events.map((event, index) => {
          const position = getTimelinePosition(event.timestamp);
          const isSelected = selectedEvent?.id === event.id;
          const color = getEventColor(event.type);

          // Calculate vertical position to avoid overlap
          const eventsAtSameTime = events.filter(
            (e) => Math.abs(e.timestamp - event.timestamp) < timeRange * 0.01
          );
          const eventIndex = eventsAtSameTime.findIndex(
            (e) => e.id === event.id
          );
          const top = 100 + spans.length * 35 + eventIndex * 25;

          return (
            <View
              key={event.id}
              {...DefaultAgentTraceStyles.timelineEvent}
              style={{
                left: `${Math.max(0, position - 1)}%`, // Center the event
                width: '20px',
                top: `${top}px`,
                backgroundColor: color,
                border: isSelected ? '2px solid white' : 'none',
                boxShadow: isSelected ? '0 0 0 2px #3b82f6' : 'none',
                zIndex: isSelected ? 20 : 10,
              }}
              onClick={() => onEventSelect(event.id)}
              title={`${event.type} - ${formatTime(event.timestamp)}`}
            >
              <Text fontSize="8px" color="white">
                {event.type.charAt(0).toUpperCase()}
              </Text>
            </View>
          );
        })}

        {/* Time Axis */}
        <View {...DefaultAgentTraceStyles.timelineAxis}>
          {timeLabels.map((label, index) => (
            <View
              key={index}
              position="absolute"
              left={`${label.position}%`}
              top="0"
              transform="translateX(-50%)"
            >
              <View
                width="1px"
                height="10px"
                backgroundColor="color.gray.400"
                marginBottom="4px"
              />
              <Text fontSize="9px" color="color.gray.600" textAlign="center">
                {label.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Legend */}
        <View
          position="absolute"
          top="10px"
          right="10px"
          padding="8px"
          backgroundColor="color.white"
          borderRadius="6px"
          border="1px solid"
          borderColor="color.gray.200"
          boxShadow="0 2px 4px rgba(0,0,0,0.1)"
        >
          <Text
            fontSize="10px"
            fontWeight="600"
            color="color.gray.700"
            marginBottom="4px"
          >
            Legend
          </Text>
          <View>
            {Object.entries(EventTypeColors).map(([type, color]) => {
              const eventCount = events.filter((e) => e.type === type).length;
              if (eventCount === 0) return null;

              return (
                <Horizontal
                  key={type}
                  gap={4}
                  alignItems="center"
                  marginBottom="2px"
                >
                  <View
                    width="8px"
                    height="8px"
                    borderRadius="2px"
                    backgroundColor={color}
                  />
                  <Text fontSize="9px" color="color.gray.600">
                    {type.replace('_', ' ')} ({eventCount})
                  </Text>
                </Horizontal>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};
