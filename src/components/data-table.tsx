import * as React from "react";
import { Fragment, useEffect, useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import type {
  ColumnDef,
  Row,
  Table as ReactTable,
  PaginationState,
} from "@tanstack/react-table";
import { cn } from "@lib/utils";
import { Button } from "./ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  renderSubComponent?: (props: { row: Row<T> }) => React.ReactElement;
  pageIndex?: number;
  pageSize?: number;
  pageCount?: number;
  onPaginationChange?: (pagination: PaginationState) => void;
  className?: string;
}

function Table<T extends object>({
  data,
  columns,
  renderSubComponent,
  pageIndex,
  pageSize,
  pageCount,
  onPaginationChange,
  className,
}: ReactTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: pageIndex ?? 0,
    pageSize: pageSize ?? 15,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange(pagination);
    }
  }, [pagination, onPaginationChange]);

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full py-1">
          <div className="overflow-hidden p-1">
            <table className={cn(`Table min-w-full`, className)}>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>

              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <Fragment key={row.id}>
                    <tr
                      className={cn({
                        "bg-gray-50 transition-colors dark:bg-black-300":
                          row.getIsExpanded(),
                      })}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          style={{
                            width: cell.column.getSize(),
                          }}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>

                    {renderSubComponent ? (
                      <tr key={row.id + "-expanded"}>
                        <td colSpan={columns.length}>
                          {renderSubComponent({ row })}
                        </td>
                      </tr>
                    ) : null}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination table={table} />
        </div>
      </div>
    </div>
  );
}

function Pagination<T>({
  table,
}: React.PropsWithChildren<{
  table: ReactTable<T>;
}>) {
  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronsLeftIcon className={"h-5"} />
      </Button>

      <Button
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <ChevronLeftIcon className={"h-5"} />
      </Button>

      <Button
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <ChevronRightIcon className={"h-5"} />
      </Button>

      <Button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <ChevronsRightIcon className={"h-5"} />
      </Button>

      <span className="flex items-center gap-1 text-sm">
        <div>Page</div>

        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
    </div>
  );
}

export default Table;
