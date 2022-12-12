import React from 'react';
import {
  DataTable,
  DataTableSkeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "carbon-components-react";
import { dataTableHeaders, dataTableRows } from "./DataTableData";
import { useGetIssuesQuery } from '../api/apiSlice';

function Issues() {
  // const boardId = 880;

  const {
    data: issues,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetIssuesQuery();

  return (
    <div className="issues">
      { isLoading && (
        <DataTableSkeleton
          showHeader={false}
          showToolbar={false}
          headers={dataTableHeaders}
          rowCount={5}
          columnCount={8}
          className="issues__skeleton-table"
        />
      )}
      {!isLoading && !isError && isSuccess && issues.issues.length && (
        <DataTable
          isSortable
          rows={dataTableRows(issues.issues)}
          headers={dataTableHeaders}
        >
          {({rows, headers, getTableProps, getHeaderProps, getRowProps}) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({header})}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({row})}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      )}
      { !isLoading && !isSuccess && isError && <div>Something went wrong - {error}</div> }
    </div>
  )
}

export default Issues;
