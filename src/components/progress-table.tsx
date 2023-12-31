import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import Table from "./data-table";

interface ProgressData {
  title: string;
  projectStatus: string;
  region: string;
  projectType: string;
}

interface Props {
  data: ProgressData[];
}

export function ProgressTable({ data }: Props) {
  const columns = React.useMemo<ColumnDef<ProgressData>[]>(
    () => [
      {
        id: "name",
        header: "Name",
        accessorKey: "title",
        cell: (ctx) => {
          return (
            <span className="font-medium text-gray-900 whitespace-nowrap">
              {ctx.getValue() as React.ReactNode}
            </span>
          );
        },
      },
      {
        id: "region",
        header: "Region",
        accessorKey: "region",
        cell: (ctx) => {
          return (
            <span className="capitalize">
              {ctx.getValue() as React.ReactNode}
            </span>
          );
        },
      },
      {
        id: "type",
        header: "Type",
        accessorKey: "projectType",
        cell: (ctx) => {
          return (
            <span className="capitalize">
              {ctx.getValue() as React.ReactNode}
            </span>
          );
        },
      },
      {
        id: "status",
        header: "Status",
        accessorKey: "projectStatus",
        cell: (ctx) => ctx.getValue(),
      },
    ],
    []
  );

  return <Table data={data} columns={columns} />;
}
