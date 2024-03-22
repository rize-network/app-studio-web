import React from 'react';
import { Element } from 'app-studio';
import { TableViewProps } from './Table.props';
import { useTableStyles } from './Table.context';

export const TableContainer: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return (
    <Element
      as="table"
      borderCollapse="collapse"
      {...styles.table}
      {...props}
    />
  );
};

export const TableHead: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return (
    <Element
      as="thead"
      borderBottom="0.5px solid #ddd"
      textAlign="left"
      color="color.gray.400"
      {...styles.thead}
      {...props}
    />
  );
};

export const TableHeadCell: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return (
    <Element
      as="th"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight="500"
      {...styles.th}
      {...props}
    />
  );
};

export const TableRow: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return <Element as="tr" {...styles.tr} {...props} />;
};

export const TableCell: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return (
    <Element
      as="td"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight={props.isFirstColumn ? '400' : '300'}
      {...styles.td}
      {...props}
    />
  );
};

export const TableBody: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return <Element as="tbody" {...styles.tbody} {...props} />;
};

export const TableFooter: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return <Element as="tfoot" {...styles.tfoot} {...props} />;
};

export const TableCaption: React.FC<any> = (props) => {
  const styles = useTableStyles();
  return (
    <Element
      as="caption"
      margin={'10px 0'}
      color="color.gray.400"
      {...styles.caption}
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
