import React from 'react';
import { View, Animation, fadeInOnView } from 'app-studio';
import {
  DefaultDemo,
  StyleDemo,
  CircularDemo,
  AnimatedDemo,
} from 'src/components/ProgressBar/examples';

const ProgressBarPage = () => {
  return (
    <View padding={40} gap={40}>
      <View
        as="h1"
        fontSize={32}
        fontWeight="bold"
        animate={Animation.fadeInDown()}
      >
        Progress Bar
      </View>

      <View
        backgroundColor="theme-surface"
        borderRadius={12}
        padding={24}
        shadow="md"
        animate={fadeInOnView({ delay: '0.2s' })}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 16px',
          }}
        >
          <thead>
            <tr>
              <View
                as="th"
                textAlign="left"
                paddingBottom={8}
                color="theme-muted"
              >
                Property
              </View>
              <View
                as="th"
                textAlign="left"
                paddingBottom={8}
                color="theme-muted"
              >
                Example
              </View>
            </tr>
          </thead>
          <tbody>
            <tr style={{ verticalAlign: 'middle' }}>
              <td style={{ fontWeight: '500', width: 150 }}>Default</td>
              <td>
                <DefaultDemo />
              </td>
            </tr>
            <tr style={{ verticalAlign: 'middle' }}>
              <td style={{ fontWeight: '500' }}>Custom Styles</td>
              <td>
                <StyleDemo />
              </td>
            </tr>
            <tr style={{ verticalAlign: 'middle' }}>
              <td style={{ fontWeight: '500' }}>Circular</td>
              <td>
                <CircularDemo />
              </td>
            </tr>
            <tr style={{ verticalAlign: 'middle' }}>
              <td style={{ fontWeight: '500' }}>Interactive</td>
              <td>
                <AnimatedDemo />
              </td>
            </tr>
          </tbody>
        </table>
      </View>
    </View>
  );
};

export default ProgressBarPage;
