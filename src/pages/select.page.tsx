import { useState } from 'react';
import React from 'react';
import { ColorSelect } from 'src/components/Form/Select/examples/Color';
import { DefaultSelect } from 'src/components/Form/Select/examples/Default';
import { DisabledSelect } from 'src/components/Form/Select/examples/Disabled';
import { ErrorSelect } from 'src/components/Form/Select/examples/Error';
import { FormSelect } from 'src/components/Form/Select/examples/Form';
import { FormikSelect } from 'src/components/Form/Select/examples/Formik';
import { HelperTextSelect } from 'src/components/Form/Select/examples/HelperText';
import { MultiSelect } from 'src/components/Form/Select/examples/Multiple';
import { ReadOnlySelect } from 'src/components/Form/Select/examples/ReadOnlyInput';
import { ShadowSelect } from 'src/components/Form/Select/examples/Shadow';
import { SizeSelect } from 'src/components/Form/Select/examples/SizeInput';
import { StyledSelect } from 'src/components/Form/Select/examples/StylesInput';
import { View } from 'src/components/Layout/View/View';

export const SelectPage = () => {
  const [service, setService] = useState('');
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>
          <tr>
            <th>Default</th>

            <td>
              <DefaultSelect />
            </td>
          </tr>
          <tr>
            <th>Disabled</th>


            <td>
              <DisabledSelect />
            </td>
          </tr>
          <tr>
            <th>ReadOnly</th>


            <td>
              <ReadOnlySelect />
            </td>
          </tr>
          <tr>
            <th>Multiple</th>


            <td>
              <MultiSelect />
            </td>
          </tr>
          <tr>
            <th>Styles</th>


            <td>
              <StyledSelect />
            </td>
          </tr>
          <tr>
            <th>ColorScheme</th>


            <td>
              <ColorSelect />
            </td>
          </tr>
          <tr>
            <th>Sizes</th>


            <td>
              <SizeSelect />
            </td>
          </tr>

          <tr>
            <th>Shadow</th>

            <td>
              <ShadowSelect />
            </td>
          </tr>
          <tr>
            <th>Error</th>
            <td>
              <ErrorSelect />
            </td>
          </tr>
          <tr>
            <th>HelperText</th>

            <td>
              <HelperTextSelect />
            </td>
          </tr>
          <tr>
            <th>Formik</th>


            <td>
              <FormikSelect />
            </td>
          </tr>
          <tr>
            <th>Form</th>


            <td>
              <FormSelect />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default SelectPage;
