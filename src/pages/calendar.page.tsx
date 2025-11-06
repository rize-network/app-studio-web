import React from 'react';
import { View } from 'app-studio';
import * as exemples from 'src/components/Calendar/examples';
import * as exemplesWeek from 'src/components/CalendarWeek/examples';

const CalendarPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          {Object.keys(exemplesWeek).map((key) => {
            const Component = exemplesWeek[key];
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <Component />
                </td>
              </tr>
            );
          })}
          {Object.keys(exemples).map((key) => {
            const Component = exemples[key];
            return (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  <Component />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </View>
  );
};

export default CalendarPage;
