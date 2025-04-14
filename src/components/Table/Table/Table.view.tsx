/**
 * Table View Component
 *
 * Renders a table with various styles and states
 * according to the design guidelines.
 */

import React from 'react';
import { Element, ViewProps } from 'app-studio';
import { TableViewProps } from './Table.props';
import { useTableContext } from './Table.context';
import { DefaultTableStyles } from './Table.style';

export const TableContainer: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="table"
      borderCollapse="collapse"
      {...DefaultTableStyles.table}
      {...views?.table}
      {...props}
    />
  );
};

export const TableHead: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="thead"
      textAlign="left"
      {...DefaultTableStyles.thead}
      {...views?.thead}
      {...props}
    />
  );
};

export const TableHeadCell: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="th"
      whiteSpace="nowrap"
      {...DefaultTableStyles.th}
      {...views?.th}
      {...props}
    />
  );
};

export const TableRow: React.FC<ViewProps> = (props) => {
  const { views, onRowClick } = useTableContext();
  return (
    <Element
      as="tr"
      {...DefaultTableStyles.tr}
      {...views?.tr}
      onClick={onRowClick}
      {...props}
    />
  );
};

export const TableCell: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="td"
      whiteSpace="nowrap"
      fontWeight={props.isFirstColumn ? '500' : '400'}
      {...DefaultTableStyles.td}
      {...views?.td}
      {...props}
    />
  );
};

export const TableBody: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="tbody"
      {...DefaultTableStyles.tbody}
      {...views?.tbody}
      {...props}
    />
  );
};

export const TableFooter: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="tfoot"
      {...DefaultTableStyles.tfoot}
      {...views?.tfoot}
      {...props}
    />
  );
};

export const TableCaption: React.FC<ViewProps> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="caption"
      {...DefaultTableStyles.caption}
      {...views?.caption}
      {...props}
    />
  );
};

export const TableView: React.FC<TableViewProps> = ({
  data,
  columns,
  footer,
  caption,
}) => {
  return (
    <TableContainer role="Table">
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHead>
        <TableRow>
          {columns.map((column) => (
            <TableHeadCell key={column.field}>{column.title}</TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {columns.map((column, columnIndex) => (
              <TableCell key={column.field} isFirstColumn={columnIndex === 0}>
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && (
        <TableFooter>
          <TableRow>
            {footer.map((cell, index) => (
              <TableCell key={index} {...cell.props}>
                {cell.value}
              </TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </TableContainer>
  );
};
