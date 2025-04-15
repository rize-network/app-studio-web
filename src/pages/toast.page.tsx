import React from 'react';
import { View } from 'app-studio';
import {
  DefaultToast,
  DesignSystemToast,
  ToastVariants,
  ToastPositions,
  ToastDurations,
  ToastActions,
  CustomizedToast,
  HookUsageDemo,
} from 'src/components/Toast/examples';
import { Toast } from 'src/components/Toast/Toast';

const ToastPage = () => {
  return (
    <View>
      {/* Toast container that will display all toasts */}
      <Toast.Container position="top-right" />

      <table className="table" cellSpacing={0}>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Design System</td>
            <td>
              <DesignSystemToast />
            </td>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultToast />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <ToastVariants />
            </td>
          </tr>

          <tr>
            <td>Positions</td>
            <td>
              <ToastPositions />
            </td>
          </tr>

          <tr>
            <td>Durations</td>
            <td>
              <ToastDurations />
            </td>
          </tr>

          <tr>
            <td>Actions</td>
            <td>
              <ToastActions />
            </td>
          </tr>

          <tr>
            <td>Customization</td>
            <td>
              <CustomizedToast />
            </td>
          </tr>

          <tr>
            <td>Hook API & Advanced Features</td>
            <td>
              <HookUsageDemo />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default ToastPage;
