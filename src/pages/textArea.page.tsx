import React from 'react';
import {
  ColorArea,
  DefaultArea,
  DisabledArea,
  ErrorArea,
  FormikErrorArea,
  FormikHelperTextArea,
  HelperTextArea,
  LabelArea,
  MaxArea,
  PlaceholderArea,
  ReadOnlyArea,
  ShapesArea,
  SizeArea,
  StyledArea,
  VariantsArea,
} from 'src/components/Form/TextArea/examples';
import { View } from 'src/components/Layout/View/View';


export const TextAreaPage = () => {
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
              <DefaultArea />
            </td>
          </tr>
          <tr>
            <th>Disabled</th>
            
            <td>
              <DisabledArea />
            </td>
          </tr>
          <tr>
            <th>ReadOnly</th>
     
            <td>
              <ReadOnlyArea />
            </td>
          </tr>
          <tr>
            <th>Label</th>
            

            <td>
              <LabelArea />
            </td>
          </tr>
          <tr>
            <th>Rows/Cols</th>

            <td>
              <MaxArea />
            </td>
          </tr>
          <tr>
            <th>Placeholder</th>

            <td>
              <PlaceholderArea />
            </td>
          </tr>
          <tr>
            <th>ColorScheme</th>

            <td>
              <ColorArea />
            </td>
          </tr>
          <tr>
            <th>Sizes</th>

            <td>
              <SizeArea />
            </td>
          </tr>

          <tr>
            <th>Variants</th>
            
            <td>
              <VariantsArea />
            </td>
          </tr>
          <tr>
            <th>Shape</th>

            <td>
              <ShapesArea />
            </td>
          </tr>
          <tr>
            <th>Styles</th>

            <td>
              <StyledArea />
            </td>
          </tr>
          <tr>
            <th>Error</th>

            <td>
              <>
                <h4>With Formik</h4>
              </>
              <FormikErrorArea />
              <h4 style={{ marginTop: 10 }}> Without Formik</h4>

              <ErrorArea />
            </td>
          </tr>
          <tr>
            <th>HelperText</th>
            <td>
              <h4>With Formik</h4>
              <FormikHelperTextArea />
              <h4 style={{ marginTop: 10 }}> Without Formik</h4>
              <HelperTextArea />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default TextAreaPage;
