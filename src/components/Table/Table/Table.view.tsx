import React from 'react';
import { Element } from 'app-studio';
import { TableViewProps } from './Table.props';

const TableView: React.FC<TableViewProps> = ({
  data,
  columns,
  footer,
  caption,
  styles,
}) => {
  const Table = (props: any) => (
    <Element
      as="table"
      borderCollapse="collapse"
      {...styles?.table}
      {...props}
    />
  );

  const TableHead = (props: any) => (
    <Element
      as="thead"
      borderBottom="0.5px solid #ddd"
      textAlign="left"
      color="color.gray.400"
      {...styles?.thead}
      {...props}
    />
  );

  const TableHeadCell = (props: any) => (
    <Element
      as="th"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight="500"
      {...styles?.th}
      {...props}
    />
  );

  const TableRow = (props: any) => (
    <Element as="tr" {...styles?.tr} {...props} />
  );

  const TableCell = (props: any) => (
    <Element
      as="td"
      padding="14px"
      whiteSpace="nowrap"
      fontWeight={props.isFirstColumn ? '400' : '300'}
      {...styles?.td}
      {...props}
    />
  );

  const TableFooter = (props: any) => (
    <Element as="tfoot" {...styles?.tfoot} {...props} />
  );

  const TableBody = (props: any) => (
    <Element as="tbody" {...styles?.tbody} {...props} />
  );

  const TableCaption = (props: any) => (
    <Element
      as="caption"
      margin={'10px 0'}
      color="color.gray.400"
      {...styles?.caption}
      {...props}
    />
  );

  const totalColumns = columns.length; // Total number of columns in the table
  const cellsBeforeLast = (footer && footer?.length - 1) ?? 0; // Number of cells before the last one
  const colspanForLast = totalColumns - cellsBeforeLast; // Remaining columns for the last cell

  return (
    <Table>
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
              <TableCell
                key={column.field}
                isFirstColumn={columnIndex === 0}
                borderBottom={
                  index === row.length - 1
                    ? '0.5px solid transparent'
                    : '0.5px solid #ddd'
                }
              >
                {row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
      {footer && footer.length > 0 && (
        <TableFooter>
          <TableRow>
            {footer.map((footerItem, index) => {
              const isLastItem = index === footer.length - 1;
              return (
                <TableCell
                  key={index}
                  colSpan={isLastItem ? colspanForLast : 1}
                >
                  {footerItem.value}
                </TableCell>
              );
            })}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default TableView;
