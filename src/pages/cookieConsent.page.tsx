import React from 'react';
import { View } from 'app-studio';
import {
  DefaultCookieConsent,
  CookieConsentVariants,
  CookieConsentPositions,
  CustomCookieConsent,
} from 'src/components/CookieConsent/examples';

/**
 * CookieConsent component showcase page
 */
const CookieConsentPage = () => {
  return (
    <View padding={32}>
      <table>
        <tbody>
          <tr>
            <th>Property</th>
            <th>App-Studio</th>
          </tr>

          <tr>
            <td>Default</td>
            <td>
              <DefaultCookieConsent />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <CookieConsentVariants />
            </td>
          </tr>

          <tr>
            <td>Positions</td>
            <td>
              <CookieConsentPositions />
            </td>
          </tr>

          <tr>
            <td>Custom Styling</td>
            <td>
              <CustomCookieConsent />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default CookieConsentPage;
