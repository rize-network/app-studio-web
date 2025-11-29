import React, { useState, useMemo, useRef, useCallback } from 'react';
import { View, Horizontal, Text } from 'app-studio';
import {
  GanttProps,
  GanttViewType,
  GanttMilestone,
  GanttTask,
  TaskColor,
} from './Gantt.props';
import {
  containerStyles,
  headerStyles,
  filterBarStyles,
  filterButtonStyles,
  filterButtonActiveStyles,
  contentStyles,
  leftPanelStyles,
  leftPanelHeaderStyles,
  rightPanelStyles,
  timelineHeaderStyles,
  timelineHeaderRowStyles,
  timelineDateCellStyles,
  timelineDateCellWeekendStyles,
  timelineDateCellTodayStyles,
  timelineBodyStyles,
  milestoneRowStyles,
  milestoneToggleStyles,
  taskRowStyles,
  taskCheckboxStyles,
  taskIconStyles,
  taskIdStyles,
  taskTitleStyles,
  taskProgressStyles,
  taskProgressBarStyles,
  timelineRowStyles,
  timelineCellStyles,
  timelineCellWeekendStyles,
  taskBarStyles,
  todayLineStyles,
  todayLineDotStyles,
  emptyStateStyles,
  TASK_COLORS,
  CELL_WIDTHS,
} from './Gantt.style';
import {
  getToday,
  calculateDateRange,
  generateTimelineDates,
  formatDateHeader,
  getDayLabel,
  isWeekendDate,
  isToday,
  calculateTaskPosition,
  calculateTodayPosition,
  calculateTimelineWidth,
  flattenMilestones,
  groupDatesByMonth,
  FlatRow,
} from './Gantt.utils';

export const Gantt: React.FC<GanttProps> = ({
  milestones,
  startDate,
  endDate,
  today = getToday(),
  initialView = 'week',
  onTaskClick,
  onTaskDoubleClick,
  onTaskCheck,
  onMilestoneClick,
  onMilestoneToggle,
  onViewChange,
  width = '100%',
  height = 600,
  leftPanelWidth = 300,
  rowHeight = 40,
  views,
  showProgress = true,
  showCheckboxes = true,
  showTodayLine = true,
  allowCollapse = true,
}) => {
  const [currentView, setCurrentView] = useState<GanttViewType>(initialView);
  const [collapsedMilestones, setCollapsedMilestones] = useState<Set<string>>(
    new Set(milestones.filter((m) => m.collapsed).map((m) => m.id))
  );
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);

  // Calculate date range
  const dateRange = useMemo(
    () => calculateDateRange(milestones, startDate, endDate),
    [milestones, startDate, endDate]
  );

  // Generate timeline dates
  const timelineDates = useMemo(
    () => generateTimelineDates(dateRange.start, dateRange.end, currentView),
    [dateRange, currentView]
  );

  // Group dates by month for header
  const dateGroups = useMemo(
    () => (currentView === 'day' ? groupDatesByMonth(timelineDates) : null),
    [timelineDates, currentView]
  );

  // Flatten milestones for rendering
  const flatRows = useMemo(() => {
    const milestonesWithCollapse = milestones.map((m) => ({
      ...m,
      collapsed: collapsedMilestones.has(m.id),
    }));
    return flattenMilestones(milestonesWithCollapse);
  }, [milestones, collapsedMilestones]);

  // Calculate timeline width
  const timelineWidth = useMemo(
    () => calculateTimelineWidth(timelineDates, currentView),
    [timelineDates, currentView]
  );

  // Calculate today line position
  const todayPosition = useMemo(
    () => calculateTodayPosition(today, dateRange.start, currentView),
    [today, dateRange.start, currentView]
  );

  // Handle view change
  const handleViewChange = useCallback(
    (view: GanttViewType) => {
      setCurrentView(view);
      onViewChange?.(view);
    },
    [onViewChange]
  );

  // Handle milestone toggle
  const handleMilestoneToggle = useCallback(
    (milestone: GanttMilestone) => {
      if (!allowCollapse) return;

      setCollapsedMilestones((prev) => {
        const next = new Set(prev);
        if (next.has(milestone.id)) {
          next.delete(milestone.id);
        } else {
          next.add(milestone.id);
        }
        onMilestoneToggle?.(milestone, next.has(milestone.id));
        return next;
      });
    },
    [allowCollapse, onMilestoneToggle]
  );

  // Handle task checkbox
  const handleTaskCheck = useCallback(
    (
      task: GanttTask,
      milestone: GanttMilestone,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      e.stopPropagation();
      onTaskCheck?.(task, e.target.checked, milestone);
    },
    [onTaskCheck]
  );

  // Sync scroll between panels
  const handleRightPanelScroll = useCallback(() => {
    if (rightPanelRef.current && leftPanelRef.current) {
      leftPanelRef.current.scrollTop = rightPanelRef.current.scrollTop;
    }
  }, []);

  const handleLeftPanelScroll = useCallback(() => {
    if (rightPanelRef.current && leftPanelRef.current) {
      rightPanelRef.current.scrollTop = leftPanelRef.current.scrollTop;
    }
  }, []);

  // Render filter buttons
  const renderFilterButtons = () => (
    <View {...filterBarStyles} {...views?.filterBar}>
      {(['day', 'week', 'month'] as GanttViewType[]).map((view) => (
        <button
          key={view}
          onClick={() => handleViewChange(view)}
          style={
            currentView === view ? filterButtonActiveStyles : filterButtonStyles
          }
        >
          {view.charAt(0).toUpperCase() + view.slice(1)}
        </button>
      ))}
    </View>
  );

  // Render left panel header
  const renderLeftPanelHeader = () => (
    <View
      {...leftPanelHeaderStyles}
      style={{ height: currentView === 'day' ? 64 : 40 }}
    >
      Tasks
    </View>
  );

  // Render milestone row in left panel
  const renderMilestoneRowLeft = (milestone: GanttMilestone) => {
    const isCollapsed = collapsedMilestones.has(milestone.id);

    return (
      <View
        key={`left-${milestone.id}`}
        {...milestoneRowStyles}
        {...views?.milestoneRow}
        style={{ height: rowHeight }}
        onClick={() => {
          handleMilestoneToggle(milestone);
          onMilestoneClick?.(milestone);
        }}
      >
        {allowCollapse && (
          <Text
            {...milestoneToggleStyles}
            style={{
              transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
            }}
          >
            ▼
          </Text>
        )}
        {milestone.icon && (
          <Text style={{ marginRight: 8, fontSize: 14 }}>
            {typeof milestone.icon === 'string'
              ? milestone.icon
              : milestone.icon}
          </Text>
        )}
        <Text>{milestone.title}</Text>
      </View>
    );
  };

  // Render task row in left panel
  const renderTaskRowLeft = (task: GanttTask, milestone: GanttMilestone) => (
    <View
      key={`left-${milestone.id}-${task.id}`}
      {...taskRowStyles}
      {...views?.taskRow}
      style={{ height: rowHeight }}
      onClick={() => onTaskClick?.(task, milestone)}
      onDoubleClick={() => onTaskDoubleClick?.(task, milestone)}
    >
      {showCheckboxes && (
        <input
          type="checkbox"
          checked={task.checked || false}
          onChange={(e) => handleTaskCheck(task, milestone, e)}
          style={taskCheckboxStyles}
        />
      )}
      {task.icon && (
        <Text {...taskIconStyles}>
          {typeof task.icon === 'string' ? task.icon : task.icon}
        </Text>
      )}
      <Text {...taskIdStyles}>{task.id}</Text>
      <Text {...taskTitleStyles}>{task.title}</Text>
      {showProgress && task.progress !== undefined && (
        <View {...taskProgressStyles}>
          <View
            {...taskProgressBarStyles}
            style={{ width: `${task.progress}%` }}
          />
        </View>
      )}
    </View>
  );

  // Render timeline header
  const renderTimelineHeader = () => {
    const cellWidth = CELL_WIDTHS[currentView];

    if (currentView === 'day' && dateGroups) {
      return (
        <View {...timelineHeaderStyles} {...views?.timelineHeader}>
          {/* Month row */}
          <View {...timelineHeaderRowStyles}>
            {dateGroups.map((group) => (
              <View
                key={group.month}
                style={{
                  width: group.dates.length * cellWidth,
                  padding: 8,
                  textAlign: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'var(--color-gray-700)',
                  borderRight: '1px solid var(--color-gray-200)',
                }}
              >
                {group.month}
              </View>
            ))}
          </View>
          {/* Day row */}
          <View {...timelineHeaderRowStyles}>
            {timelineDates.map((date) => {
              const isWeekend = isWeekendDate(date);
              const isTodayDate = isToday(date, today);
              const cellStyle = isTodayDate
                ? timelineDateCellTodayStyles
                : isWeekend
                ? timelineDateCellWeekendStyles
                : timelineDateCellStyles;

              return (
                <View
                  key={date}
                  {...cellStyle}
                  style={{ width: cellWidth, flexShrink: 0 }}
                >
                  <Text
                    style={{ fontSize: 10, color: 'var(--color-gray-400)' }}
                  >
                    {getDayLabel(date)}
                  </Text>
                  <Text>{formatDateHeader(date, currentView)}</Text>
                </View>
              );
            })}
          </View>
        </View>
      );
    }

    return (
      <View {...timelineHeaderStyles} {...views?.timelineHeader}>
        <View {...timelineHeaderRowStyles}>
          {timelineDates.map((date) => (
            <View
              key={date}
              {...timelineDateCellStyles}
              style={{ width: cellWidth, flexShrink: 0 }}
            >
              {formatDateHeader(date, currentView)}
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Render timeline row for milestone
  const renderMilestoneRowRight = (milestone: GanttMilestone) => {
    const cellWidth = CELL_WIDTHS[currentView];

    return (
      <View
        key={`right-${milestone.id}`}
        {...timelineRowStyles}
        style={{ height: rowHeight, backgroundColor: 'var(--color-gray-50)' }}
      >
        {timelineDates.map((date) => (
          <View
            key={date}
            {...timelineCellStyles}
            style={{ width: cellWidth, height: '100%' }}
          />
        ))}
        {/* Milestone bar if it has dates */}
        {milestone.startDate &&
          milestone.endDate &&
          renderTaskBar(
            {
              id: milestone.id,
              title: milestone.title,
              startDate: milestone.startDate,
              endDate: milestone.endDate,
              color: milestone.color,
            },
            true
          )}
      </View>
    );
  };

  // Render timeline row for task
  const renderTaskRowRight = (task: GanttTask, milestone: GanttMilestone) => {
    const cellWidth = CELL_WIDTHS[currentView];

    return (
      <View
        key={`right-${milestone.id}-${task.id}`}
        {...timelineRowStyles}
        style={{ height: rowHeight }}
      >
        {timelineDates.map((date) => {
          const isWeekend = isWeekendDate(date);
          return (
            <View
              key={date}
              {...(isWeekend ? timelineCellWeekendStyles : timelineCellStyles)}
              style={{ width: cellWidth, height: '100%' }}
            />
          );
        })}
        {/* Task bar */}
        {task.startDate && task.endDate && renderTaskBar(task)}
      </View>
    );
  };

  // Render task bar on timeline
  const renderTaskBar = (task: GanttTask, isMilestone = false) => {
    if (!task.startDate || !task.endDate) return null;

    const position = calculateTaskPosition(
      task.startDate,
      task.endDate,
      dateRange.start,
      currentView
    );

    if (!position) return null;

    const color = task.color || 'blue';
    const colors = TASK_COLORS[color as TaskColor] || TASK_COLORS.blue;

    return (
      <View
        {...taskBarStyles}
        {...views?.taskBar}
        style={{
          left: position.left + 2,
          width: position.width,
          backgroundColor: `var(--${colors.background.replace('color.', '')})`,
          borderLeft: `3px solid var(--${colors.border.replace('color.', '')})`,
          color: `var(--${colors.text.replace('color.', '')})`,
          height: isMilestone ? 20 : 24,
        }}
      >
        {position.width > 60 && <Text>{task.title}</Text>}
      </View>
    );
  };

  // Render today line
  const renderTodayLine = () => {
    if (!showTodayLine || todayPosition === null) return null;

    return (
      <View
        {...todayLineStyles}
        {...views?.todayLine}
        style={{ left: todayPosition }}
      >
        <View {...todayLineDotStyles} />
      </View>
    );
  };

  // Main render
  if (milestones.length === 0) {
    return (
      <View
        {...containerStyles}
        {...views?.container}
        style={{ width, height }}
      >
        <View {...emptyStateStyles}>No milestones to display</View>
      </View>
    );
  }

  return (
    <View {...containerStyles} {...views?.container} style={{ width, height }}>
      {/* Header with filters */}
      <Horizontal {...headerStyles} {...views?.header}>
        <Text style={{ fontWeight: 600, fontSize: 14 }}>Project Timeline</Text>
        {renderFilterButtons()}
      </Horizontal>

      {/* Main content */}
      <View {...contentStyles}>
        {/* Left panel - Task list */}
        <View
          {...leftPanelStyles}
          {...views?.leftPanel}
          style={{ width: leftPanelWidth }}
          ref={leftPanelRef as any}
          onScroll={handleLeftPanelScroll}
        >
          {renderLeftPanelHeader()}
          <View>
            {flatRows.map((row: FlatRow) =>
              row.type === 'milestone'
                ? renderMilestoneRowLeft(row.milestone)
                : renderTaskRowLeft(row.task!, row.milestone)
            )}
          </View>
        </View>

        {/* Right panel - Timeline */}
        <View
          {...rightPanelStyles}
          {...views?.rightPanel}
          ref={rightPanelRef as any}
          onScroll={handleRightPanelScroll}
        >
          {renderTimelineHeader()}
          <View {...timelineBodyStyles} style={{ width: timelineWidth }}>
            {flatRows.map((row: FlatRow) =>
              row.type === 'milestone'
                ? renderMilestoneRowRight(row.milestone)
                : renderTaskRowRight(row.task!, row.milestone)
            )}
            {renderTodayLine()}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Gantt;
