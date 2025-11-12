import React from 'react';
import { View } from 'app-studio';
import OKR from 'src/components/OKR/OKR';
import { OKRObjective } from 'src/components';

const objectives: OKRObjective[] = [
  {
    id: '1',
    title: 'Launch New Feature',
    description: 'Successfully launch the new feature to all users.',
    owner: 'John Doe',
    timeframe: 'Q4 2025',
    tags: ['new-feature', 'launch'],
    progress: 50,
    status: 'onTrack',
    keyResults: [
      {
        id: '1.1',
        title: 'Complete development',
        progress: 80,
        status: 'onTrack',
      },
      {
        id: '1.2',
        title: 'Complete QA testing',
        progress: 40,
        status: 'atRisk',
      },
      {
        id: '1.3',
        title: 'Reach 10,000 active users',
        progress: 10,
        status: 'offTrack',
      },
    ],
  },
  {
    id: '2',
    title: 'Improve Customer Satisfaction',
    description: 'Improve customer satisfaction by 20%.',
    owner: 'Jane Smith',
    timeframe: 'Q4 2025',
    tags: ['customer-satisfaction'],
    progress: 20,
    status: 'atRisk',
    keyResults: [
      {
        id: '2.1',
        title: 'Reduce support ticket response time',
        progress: 30,
        status: 'onTrack',
      },
      {
        id: '2.2',
        title: 'Increase NPS score to 50',
        progress: 10,
        status: 'offTrack',
      },
    ],
  },
];

const CalendarPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          {<OKR objectives={objectives} />}
          {/* 
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
          })} */}
        </tbody>
      </table>
    </View>
  );
};

export default CalendarPage;
