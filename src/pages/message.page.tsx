import React from 'react';
import { View } from '../components/Layout/View/View';
import {
  ActionDemo,
  DefaultDemo,
  IsClosableDemo,
  ShowIconDemo,
  StylesDemo,
  SubtitleDemo,
  TimeoutDemo,
  TitleDemo,
  VariantDemo,
} from '../components/Message/examples';
import { MessageLayout } from '../components/Message/Message/Message.layout';

const MessagePage = () => {
  return (
    <View>
      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Action</td>
            <td>
              <ActionDemo />
            </td>
          </tr>
          <tr>
            <td>Default</td>
            <td>
              <DefaultDemo />
            </td>
          </tr>

          <tr>
            <td>IsClosable</td>
            <td>
              <IsClosableDemo />
            </td>
          </tr>

          <tr>
            <td>ShowIcon</td>
            <td>
              <ShowIconDemo />
            </td>
          </tr>

          <tr>
            <td>Styles</td>
            <td>
              <StylesDemo />
            </td>
          </tr>

          <tr>
            <td>Subtitle</td>
            <td>
              <SubtitleDemo />
            </td>
          </tr>

          <tr>
            <td>Timeout</td>
            <td>
              <TimeoutDemo />
            </td>
          </tr>

          <tr>
            <td>Title</td>
            <td>
              <TitleDemo />
            </td>
          </tr>

          <tr>
            <td>Variant</td>
            <td>
              <VariantDemo />
            </td>
          </tr>
        </tbody>
      </table>
      <MessageLayout />
    </View>
  );
};

export default MessagePage;
