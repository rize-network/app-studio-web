import React, { useState, useRef, useMemo } from 'react';
import { View, Horizontal, Text, useTheme } from 'app-studio';
import {
  GanttProps,
  GanttTask,
  GanttMilestone,
  GanttViewMode
} from './Gantt.props';
import {
  containerStyles,
  toolbarStyles,
  mainContentStyles,
  leftPanelStyles,
  leftPanelHeaderStyles,
  taskListStyles,
  taskRowStyles,
  milestoneRowStyles,
  rightPanelStyles,
  timelineHeaderStyles,
  timelineBodyStyles,
  gridColumnStyles,
  todayLineStyles,
  taskBarStyles,
  viewModeButtonStyles
} from './Gantt.style';
import {
  parseDate,
  addDays,
  differenceInDays,
  getDateXPosition,
  PIXELS_PER_DAY
} from './Gantt.utils';
import { CheckIcon, FilterIcon } from '../../Icon/Icon';

export const GanttView: React.FC<GanttProps> = ({
  tasks,
  milestones,
  initialViewMode = 'week',
  onTaskClick,
  width = '100%',
  height = 600,
  leftPanelWidth = 300,
}) => {
  const { getColor } = useTheme();
  const [viewMode, setViewMode] = useState<GanttViewMode>(initialViewMode);

  // Refs for syncing scroll
  const timelineHeaderRef = useRef<HTMLDivElement>(null);
  const timelineBodyRef = useRef<HTMLDivElement>(null);
  const taskListRef = useRef<HTMLDivElement>(null);
  const verticalSyncRef = useRef<HTMLDivElement>(null); // Invisible element to sync vertical scroll

  // Calculate timeline range
  const range = useMemo(() => {
    if (tasks.length === 0) {
      const start = new Date();
      start.setDate(start.getDate() - 7);
      const end = new Date();
      end.setDate(end.getDate() + 30);
      return { start, end, totalDays: 37 };
    }

    const startDates = tasks.map(t => parseDate(t.start).getTime());
    const endDates = tasks.map(t => parseDate(t.end).getTime());

    const minDate = new Date(Math.min(...startDates));
    const maxDate = new Date(Math.max(...endDates));

    // Add padding
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 14);

    const totalDays = differenceInDays(maxDate, minDate);

    return { start: minDate, end: maxDate, totalDays };
  }, [tasks]);

  // Group tasks by milestone
  const groupedTasks = useMemo(() => {
    const groups: { milestone: GanttMilestone | undefined, tasks: GanttTask[] }[] = [];

    // Sort milestones if needed, or just iterate
    milestones.forEach(m => {
      const milestoneTasks = tasks.filter(t => t.milestoneId === m.id);
      if (milestoneTasks.length > 0) {
        groups.push({ milestone: m, tasks: milestoneTasks });
      }
    });

    // Tasks without milestone
    const orphanTasks = tasks.filter(t => !t.milestoneId);
    if (orphanTasks.length > 0) {
      groups.push({ milestone: undefined, tasks: orphanTasks });
    }

    return groups;
  }, [tasks, milestones]);

  // Handle scroll sync
  const handleBodyScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;

    if (timelineHeaderRef.current) {
      timelineHeaderRef.current.scrollLeft = target.scrollLeft;
    }

    if (taskListRef.current) {
      taskListRef.current.scrollTop = target.scrollTop;
    }
  };

  // Generate grid lines
  const gridLines = useMemo(() => {
    const lines: React.ReactNode[] = [];
    const totalWidth = range.totalDays * PIXELS_PER_DAY[viewMode];

    // Simple daily lines for now
    for (let i = 0; i <= range.totalDays; i++) {
      const left = i * PIXELS_PER_DAY[viewMode];
      const date = addDays(range.start, i);
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isStartOfMonth = date.getDate() === 1;

      lines.push(
        <View
          key={i}
          {...gridColumnStyles}
          left={left}
          width={PIXELS_PER_DAY[viewMode]}
          borderColor={isStartOfMonth ? 'color.gray.300' : 'color.gray.100'}
          backgroundColor={isWeekend ? 'color.gray.50' : 'transparent'}
        />
      );
    }
    return lines;
  }, [range, viewMode]);

  // Generate Header
  const headerContent = useMemo(() => {
    const days: React.ReactNode[] = [];
    for (let i = 0; i <= range.totalDays; i++) {
      const date = addDays(range.start, i);
      const left = i * PIXELS_PER_DAY[viewMode];
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      const dayNum = date.getDate();

      // Show differently based on zoom level
      if (viewMode === 'month') {
         if (date.getDate() === 1 || i === 0) {
            days.push(
              <View key={i} position="absolute" left={left} padding={4}>
                 <Text fontSize={10} fontWeight={600}>{date.toLocaleDateString('en-US', { month: 'short' })}</Text>
              </View>
            );
         }
      } else {
        days.push(
          <View
            key={i}
            position="absolute"
            left={left}
            width={PIXELS_PER_DAY[viewMode]}
            height="100%"
            borderRight="1px solid"
            borderColor="color.gray.200"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
             {viewMode === 'day' && <Text fontSize={10} color="color.gray.500">{dayName}</Text>}
             <Text fontSize={11} fontWeight={500}>{dayNum}</Text>
          </View>
        );
      }
    }
    return days;
  }, [range, viewMode]);

  // Month headers for upper row
  const monthHeaders = useMemo(() => {
     const months: React.ReactNode[] = [];
     let currentDate = new Date(range.start);

     while (currentDate <= range.end) {
       const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
       const daysInMonth = differenceInDays(nextMonth > range.end ? range.end : nextMonth, currentDate);

       if (daysInMonth > 0) {
         const left = getDateXPosition(currentDate, range.start, viewMode);
         const width = daysInMonth * PIXELS_PER_DAY[viewMode];

         months.push(
           <View
             key={currentDate.toISOString()}
             position="absolute"
             left={left}
             width={width}
             height={20}
             borderBottom="1px solid"
             borderColor="color.gray.200"
             borderRight="1px solid"
             backgroundColor="color.white"
             paddingLeft={8}
           >
             <Text fontSize={11} fontWeight={600}>
               {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
             </Text>
           </View>
         );
       }
       currentDate = nextMonth;
     }
     return months;
  }, [range, viewMode]);

  const todayX = useMemo(() => {
    const today = new Date();
    return getDateXPosition(today, range.start, viewMode);
  }, [range, viewMode]);

  // Calculate total height for content
  // let currentTop = 0;
  // We can use a simple flow layout in vertical column, but we need to sync the heights.
  // We'll render the same structure in left and right panels.

  const renderRow = (content: React.ReactNode, height: number, isHeader = false) => (
    <View height={height} width="100%" position="relative" display="flex" alignItems="center" borderBottom="1px solid" borderColor="color.gray.100">
      {content}
    </View>
  );

  return (
    <View {...containerStyles} width={width} height={height}>
      {/* Toolbar */}
      <View {...toolbarStyles}>
        <Horizontal gap={8} alignItems="center">
          <FilterIcon widthHeight={16} color="color.gray.500" />
          <Text fontSize={14} fontWeight={500} color="color.gray.700">Filter</Text>
        </Horizontal>

        <Horizontal backgroundColor="color.gray.100" padding={2} borderRadius={6}>
          {(['day', 'week', 'month'] as GanttViewMode[]).map(mode => (
            <View
              key={mode}
              {...viewModeButtonStyles}
              backgroundColor={viewMode === mode ? 'color.white' : 'transparent'}
              boxShadow={viewMode === mode ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}
              color={viewMode === mode ? 'color.gray.900' : 'color.gray.500'}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </View>
          ))}
        </Horizontal>
      </View>

      <View {...mainContentStyles}>
        {/* Left Panel: Task List */}
        <View {...leftPanelStyles} width={leftPanelWidth}>
          <View {...leftPanelHeaderStyles}>
            <Text>Task</Text>
          </View>

          <View {...taskListStyles} ref={taskListRef}>
             <View display="flex" flexDirection="column">
               {groupedTasks.map((group, i) => (
                 <React.Fragment key={group.milestone?.id || 'orphan'}>
                   {group.milestone && (
                     <View {...milestoneRowStyles}>
                       <Text>{group.milestone.title}</Text>
                     </View>
                   )}
                   {group.tasks.map(task => (
                     <View
                       key={task.id}
                       {...taskRowStyles}
                       onClick={() => onTaskClick?.(task.id)}
                     >
                       <Horizontal gap={8} alignItems="center" width="100%">
                         {task.icon && (
                           <View width={16} height={16} display="flex" alignItems="center" justifyContent="center">
                             {task.icon}
                           </View>
                         )}
                         <View
                           width={16}
                           height={16}
                           border="1px solid"
                           borderColor={task.completed ? 'color.green.500' : 'color.gray.300'}
                           borderRadius={4}
                           backgroundColor={task.completed ? 'color.green.500' : 'transparent'}
                           display="flex"
                           alignItems="center"
                           justifyContent="center"
                         >
                           {task.completed && <CheckIcon widthHeight={12} color="white" />}
                         </View>
                         <Text fontSize={13} color="color.gray.900" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                           {task.title}
                         </Text>
                         <Text fontSize={11} color="color.gray.400" marginLeft="auto">
                           {task.id}
                         </Text>
                       </Horizontal>
                     </View>
                   ))}
                 </React.Fragment>
               ))}
             </View>
             {/* Spacer for scrollbar alignment if needed */}
             <View height={20} />
          </View>
        </View>

        {/* Right Panel: Timeline */}
        <View {...rightPanelStyles}>
          {/* Timeline Header */}
          <View {...timelineHeaderStyles} ref={timelineHeaderRef} flexDirection="column" height={40}>
             {/* Month row */}
             <View height={20} position="relative" width={range.totalDays * PIXELS_PER_DAY[viewMode]}>
                {monthHeaders}
             </View>
             {/* Day row */}
             <View height={20} position="relative" width={range.totalDays * PIXELS_PER_DAY[viewMode]}>
                {headerContent}
             </View>
          </View>

          {/* Timeline Body */}
          <View
            {...timelineBodyStyles}
            ref={timelineBodyRef}
            onScroll={handleBodyScroll}
          >
            <View
              position="relative"
              width={range.totalDays * PIXELS_PER_DAY[viewMode]}
              minHeight="100%"
            >
              {/* Grid background */}
              <View position="absolute" top={0} left={0} bottom={0} right={0} display="flex">
                 {gridLines}
              </View>

              {/* Today line */}
              {todayX >= 0 && <View {...todayLineStyles} left={todayX} />}

              {/* Task Bars */}
              <View display="flex" flexDirection="column">
                 {groupedTasks.map((group, i) => (
                   <React.Fragment key={group.milestone?.id || 'orphan'}>
                     {group.milestone && (
                       <View height={32} width="100%" /> // Spacer for milestone header
                     )}
                     {group.tasks.map(task => {
                       const startX = getDateXPosition(parseDate(task.start), range.start, viewMode);
                       const duration = differenceInDays(parseDate(task.end), parseDate(task.start));
                       const width = Math.max(duration * PIXELS_PER_DAY[viewMode], PIXELS_PER_DAY[viewMode]); // Minimum 1 day width
                       const color = task.completed ? 'color.green.500' : 'color.blue.500';

                       return (
                         <View key={task.id} height={40} width="100%" position="relative">
                           <View
                             {...taskBarStyles}
                             left={startX}
                             width={width}
                             top={8} // (40 - 24) / 2
                             backgroundColor={color}
                             onClick={() => onTaskClick?.(task.id)}
                           >
                             {task.progress !== undefined && (
                               <View
                                 position="absolute"
                                 left={0}
                                 top={0}
                                 bottom={0}
                                 width={`${task.progress}%`}
                                 backgroundColor="rgba(255,255,255,0.2)"
                               />
                             )}
                             <Text style={{ zIndex: 1 }}>{task.title}</Text>
                           </View>
                         </View>
                       );
                     })}
                   </React.Fragment>
                 ))}
              </View>

               {/* Spacer for scrollbar alignment */}
               <View height={20} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
