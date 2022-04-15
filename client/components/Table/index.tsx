import React from 'react';
import { useTable } from 'react-table';
import { TableWrapper } from './styles';

interface Props {
  data: any[];
  columns: {
    Header: string;
    accessor: string;
    Cell?: any;
  }[];
}

const Table: React.FC<Props> = ({ data, columns }) => {
  const columnsMemo = React.useMemo(() => [...columns], [columns]);
  const dataMemo = React.useMemo(() => [...data], [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: columnsMemo,
    data: dataMemo,
  });

  return (
    <TableWrapper {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} key={column.id}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={row.id}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} key={row.id}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableWrapper>
  );
};

export default Table;
