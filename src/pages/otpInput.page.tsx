import React from 'react';
import { View } from '../components/Layout/View/View';
import {
  DefaultOTPInput,
  CustomizedOTPInput,
  OTPInputWithLabel,
  PasswordOTPInput,
  OnCompleteDemo,
  StepValuesOTPInput,
} from '../components/OTPInput/examples';
import {
  FormikOTPInputExample,
  FormikCustomOTPInputExample,
  FormikPasswordOTPExample,
  FormikStepValuesOTPExample,
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
          <tr>
            <td>Password Type</td>
            <td>
              <PasswordOTPInput />
            </td>
          </tr>
          <tr>
            <td>onComplete Callback</td>
            <td>
              <OnCompleteDemo />
            </td>
          </tr>
          <tr>
            <td>Formik Password</td>
            <td>
              <FormikPasswordOTPExample />
            </td>
          </tr>
          <tr>
            <td>Step Values</td>
            <td>
              <StepValuesOTPInput />
            </td>
          </tr>
          <tr>
            <td>Formik Step Values</td>
            <td>
              <FormikStepValuesOTPExample />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default OTPInputPage;
