import React from 'react';
import { View } from 'app-studio';
import {
  DefaultPagination,
  PaginationVariants,
  PaginationSizes,
  PaginationShapes,
  AdvancedPagination,
  TableWithPagination,
} from 'src/components/Pagination/examples';

const PaginationPage = () => {
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
              <DefaultPagination />
            </td>
          </tr>

          <tr>
            <td>Variants</td>
            <td>
              <PaginationVariants />
            </td>
          </tr>

          <tr>
            <td>Sizes</td>
            <td>
              <PaginationSizes />
            </td>
          </tr>

          <tr>
            <td>Shapes</td>
            <td>
              <PaginationShapes />
            </td>
          </tr>

          <tr>
            <td>Advanced</td>
            <td>
              <AdvancedPagination />
            </td>
          </tr>

          <tr>
            <td>Table Integration</td>
            <td>
              <TableWithPagination />
            </td>
          </tr>
        </tbody>
      </table>
    </View>
  );
};

export default PaginationPage;
