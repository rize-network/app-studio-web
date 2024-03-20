import React from 'react';
import { Center } from 'src/components';

export const CenterPage = () => (
  <table className="table" cellSpacing={0}>
    <tbody>
      <tr>
        <th>Property</th>
        <th>App-Studio</th>
      </tr>
      <tr>
        <td>Default</td>
        <td>
          <Center minHeight="100px" minWidth="150px">
            This is the Center
          </Center>
        </td>
      </tr>
    </tbody>
  </table>
);

export default CenterPage;
