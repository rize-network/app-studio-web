import React from 'react';
import { View } from 'app-studio';
import BasicCardBoardExample from 'src/components/CardBoard/examples/Basic';

const CardBoardPage = () => {
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
              <BasicCardBoardExample />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CardBoardPage;

