import React from 'react';
import { View } from '../components/Layout/View/View';
import {
  DefaultOTPInput,
  CustomizedOTPInput,
  OTPInputWithLabel,
} from '../components/OTPInput/examples';
import {
  FormikOTPInputExample,
  FormikCustomOTPInputExample,
} from '../components/Formik/examples/FormikOTPInput';

const OTPInputPage = () => {
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
              <DefaultOTPInput />
            </td>
          </tr>
          <tr>
            <td>Customized</td>
            <td>
              <CustomizedOTPInput />
            </td>
          </tr>
          <tr>
            <td>With Label</td>
            <td>
              <OTPInputWithLabel />
            </td>
          </tr>
          <tr>
            <td>Formik Integration</td>
            <td>
              <FormikOTPInputExample />
            </td>
          </tr>
          <tr>
            <td>Formik Custom</td>
            <td>
              <FormikCustomOTPInputExample />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default OTPInputPage;
