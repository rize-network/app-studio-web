import React from 'react';
import { View } from 'app-studio';
import BasicKanbanBoardExample from 'src/components/KanbanBoard/examples/Basic';

const KanbanBoardPage = () => {
  return (
    <View>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Basic</td>
            <td>
              <BasicKanbanBoardExample />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default KanbanBoardPage;
