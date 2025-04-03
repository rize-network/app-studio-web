import React from 'react';
import { Element } from 'app-studio';
import { TableViewProps } from './Table.props';
import { useTableContext } from './Table.context';

export const TableContainer: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return (
    <Element as="table" borderCollapse="collapse" {...views.table} {...props} />
  );
};

export const TableHead: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="thead"
      borderBottom="0.5px solid #ddd"
      textAlign="left"
      color="color.gray.400"
      {...views.thead}
      {...props}
    />
  );
};

export const TableHeadCell: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="th"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight="500"
      {...views.th}
      {...props}
    />
  );
};

export const TableRow: React.FC<any> = (props) => {
  const { views, onRowClick } = useTableContext();
  return <Element as="tr" {...views.tr} onClick={onRowClick} {...props} />;
};

export const TableCell: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="td"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight={props.isFirstColumn ? '400' : '300'}
      {...views.td}
      {...props}
    />
  );
};

export const TableBody: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return <Element as="tbody" {...views.tbody} {...props} />;
};

export const TableFooter: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return <Element as="tfoot" {...views.tfoot} {...props} />;
};

export const TableCaption: React.FC<any> = (props) => {
  const { views } = useTableContext();
  return (
    <Element
      as="caption"
      margin={'10px 0'}
      color="color.gray.400"
      {...views.caption}
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
