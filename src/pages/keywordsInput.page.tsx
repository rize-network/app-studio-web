import React from 'react';
import { View, Vertical, Text } from 'app-studio';
import {
  DefaultKeywordsInput,
  CustomSeparatorsKeywordsInput,
  LimitedKeywordsInput,
  ValidatedKeywordsInput,
  DisabledKeywordsInput,
  StyledKeywordsInput,
} from '../components/Form/KeywordsInput/examples';
import { FormikKeywordsInputExample } from '../components/Formik/examples/FormikKeywordsInput';

export const KeywordsInputPage = () => {
  return (
    <View padding="24px" maxWidth="800px" margin="0 auto">
      <Vertical gap={32}>
        <Text fontSize="32px" fontWeight="bold" color="color.gray.900">
          KeywordsInput Component
        </Text>

        <Text fontSize="16px" color="color.gray.600" lineHeight="1.6">
          A form input component for managing keywords and tags. Users can add
          keywords by typing and pressing Enter or comma, and remove them by
          clicking the X button or using backspace.
        </Text>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e5e7eb',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Variant
              </th>
              <th
                style={{
                  textAlign: 'left',
                  padding: '12px',
                  borderBottom: '2px solid #e5e7eb',
                  fontWeight: 'bold',
                  color: '#374151',
                }}
              >
                Example
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Default
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <DefaultKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Custom Separators
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <CustomSeparatorsKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Limited Keywords
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <LimitedKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                With Validation
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <ValidatedKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Disabled States
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <DisabledKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Custom Styled
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  borderBottom: '1px solid #e5e7eb',
                  verticalAlign: 'top',
                }}
              >
                <StyledKeywordsInput />
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: '16px 12px',
                  verticalAlign: 'top',
                  fontWeight: '500',
                }}
              >
                Formik Integration
              </td>
              <td
                style={{
                  padding: '16px 12px',
                  verticalAlign: 'top',
                }}
              >
                <FormikKeywordsInputExample />
              </td>
            </tr>
          </tbody>
        </table>
      </Vertical>
    </View>
  );
};

export default KeywordsInputPage;
