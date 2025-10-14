import React from 'react';
import { View } from 'app-studio';
import {
  DefaultCalendar,
  CalendarWithEvents,
  DayViewCalendar,
  WeekViewCalendar,
  MonthViewCalendar,
  CalendarViewSwitcher,
  CustomRenderCalendar,
  WeekStartsOnSunday,
  WeekStartsOnMonday,
  CustomStyledCalendar,
  FixedHeightCalendar,
  AllViewsCustomization,
} from 'src/components/Calendar/examples';

const CalendarPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultCalendar />
            </td>
          </tr>

          <tr>
            <td>With Events</td>
            <td>
              <CalendarWithEvents />
            </td>
          </tr>

          <tr>
            <td>Day View</td>
            <td>
              <DayViewCalendar />
            </td>
          </tr>

          <tr>
            <td>Week View</td>
            <td>
              <WeekViewCalendar />
            </td>
          </tr>

          <tr>
            <td>Month View</td>
            <td>
              <MonthViewCalendar />
            </td>
          </tr>

          <tr>
            <td>View Switcher</td>
            <td>
              <CalendarViewSwitcher />
            </td>
          </tr>

          <tr>
            <td>Custom Event Render</td>
            <td>
              <CustomRenderCalendar />
            </td>
          </tr>

          <tr>
            <td>Week Starts on Sunday</td>
            <td>
              <WeekStartsOnSunday />
            </td>
          </tr>

          <tr>
            <td>Week Starts on Monday</td>
            <td>
              <WeekStartsOnMonday />
            </td>
          </tr>

          <tr>
            <td>Custom Styles</td>
            <td>
              <CustomStyledCalendar />
            </td>
          </tr>

          <tr>
            <td>Fixed Height with Scrolling</td>
            <td>
              <FixedHeightCalendar />
            </td>
          </tr>

          <tr>
            <td>All Views Customization</td>
            <td>
              <AllViewsCustomization />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CalendarPage;
