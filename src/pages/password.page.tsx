import React from 'react';
import { DefaultPassword } from 'src/components/Form/Password/example/Default';
import { DisabledPassword } from 'src/components/Form/Password/example/DisabledInput';
import { ErrorPassword } from 'src/components/Form/Password/example/ErrorInput';
import { HelperTextPassword } from 'src/components/Form/Password/example/HelperText';
import { CloseEyeSvg, OpenEyeSvg } from 'src/components/Svg';

export const PasswordPage = () => {
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);
  return (
    <table className="table" cellSpacing={0}>
      <tr>
        <th>Property</th>
        <th>App-Studio</th>
      </tr>
      <tbody>
        <tr>
          <td>Default</td>
          <td>
            <DefaultPassword />
          </td>
        </tr>
        <tr>
          <td>Disabled</td>
          <td>
            <DisabledPassword />
          </td>
        </tr>
        <tr>
          <td>Error</td>
          
          
          <td>
            <ErrorPassword />
          </td>
        </tr>
        <tr>
          <td>HelperText</td>       
          <td>
            <HelperTextPassword />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PasswordPage;
