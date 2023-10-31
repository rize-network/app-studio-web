import React from 'react';
import { DefaultLink } from 'src/components/Link/examples/Default';
import { ExternalLink } from 'src/components/Link/examples/IsExternal';
import { UnderlineLink } from 'src/components/Link/examples/Underline';


export const LinkPage = () => {
  return (
    <table className="table" cellSpacing={0}>
      <tr>
        <th>Property</th>
        <th>NextUI</th>
        <th>NativeBase</th>
        <th>App-Studio</th>
      </tr>
      <tbody>
        <tr>
          <td>Default</td>
          <td>
            <DefaultLink />
          </td>
        </tr>
        <tr>
          <td>External</td>
          <td>
            <ExternalLink />
          </td>
        </tr>
        <tr>
          <td>Underline</td>
          <td>
            <UnderlineLink />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default LinkPage;
