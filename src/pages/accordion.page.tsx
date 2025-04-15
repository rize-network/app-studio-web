import React from 'react';
import { View } from 'app-studio';
import {
  DefaultAccordion,
  AccordionVariants,
  MultipleAccordion,
  DisabledAccordion,
  CollapsibleAccordion,
} from 'src/components/Accordion/examples';

const AccordionPage = () => {
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
              <DefaultAccordion />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <AccordionVariants />
            </td>
          </tr>

          <tr>
            <td>Multiple</td>
            <td>
              <MultipleAccordion />
            </td>
          </tr>

          <tr>
            <td>Disabled</td>
            <td>
              <DisabledAccordion />
            </td>
          </tr>

          <tr>
            <td>Collapsible</td>
            <td>
              <CollapsibleAccordion />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default AccordionPage;
