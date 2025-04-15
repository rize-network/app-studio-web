import React from 'react';
import { SimpleDragAndDrop } from 'src/components/DragAndDrop/examples/Simple';
import { View } from 'app-studio';

export const DragAndDropPage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <SimpleDragAndDrop />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default DragAndDropPage;
