import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataTable, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "carbon-components-react";
import {
  getBoardIssuesAsync,
  selectBoardIssues,
  selectBoardIssuesStatus
} from './IssuesSlice';
import './Issues.css';
import { dataTableHeaders, dataTableRows } from "./DataTableData";

function Issues() {
  const [issues, setIssues] = useState([]);
  const boardId = 880;
  const fetchedIssues = useSelector(selectBoardIssues);
  const fetchedIssuesStatus = useSelector(selectBoardIssuesStatus);
  const fetched = fetchedIssuesStatus === 'success' && fetchedIssues.length;

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fetched) {
      dispatch(getBoardIssuesAsync(boardId));
    }
  }, [fetched, fetchedIssues, dispatch]);

  useEffect(() => {
    if (fetchedIssues.length) {
      setIssues(fetchedIssues);
    }
  }, [fetchedIssues]);

  return (
    <div className="issues">
      {fetched && issues.length ? (
        <DataTable
          isSortable
          rows={dataTableRows(issues)}
          headers={dataTableHeaders}
        >
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DataTable>
      )
      : null}
    </div>
  )
}

export default Issues;
