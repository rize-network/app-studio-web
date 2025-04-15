import React from 'react';
import { View } from 'app-studio';
import {
  DefaultLoader,
  PositionLoader,
  SizeLoader,
  SpeedLoader,
  StyleLoader,
  TextLoader,
  TypeLoader,
} from 'src/components/Loader/examples';

export const LoaderPage = () => {
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
              <DefaultLoader />
            </td>
          </tr>
          <tr>
            <td>Type</td>
            <td>
              <TypeLoader />
            </td>
          </tr>
          <tr>
            <td>Size</td>
            <td>
              <SizeLoader />
            </td>
          </tr>
          <tr>
            <td>Style</td>
            <td>
              <StyleLoader />
            </td>
          </tr>
          <tr>
            <td>Speed</td>
            <td>
              <SpeedLoader />
            </td>
          </tr>
          <tr>
            <td>Text</td>
            <td>
              <TextLoader />
            </td>
          </tr>
          <tr>
            <td>TextPosition</td>
            <td>
              <PositionLoader />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default LoaderPage;
