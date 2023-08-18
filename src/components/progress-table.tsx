import * as React from "react";
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
  const columns = [
    {
      id: "name",
      header: "Name",
      accessorKey: "title",
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: "status",
      header: "Status",
      accessorKey: "projectStatus",
      cell: (ctx) => ctx.getValue(),
    },
    {
      id: "region",
      header: "Region",
      accessorKey: "region",
      cell: (ctx) => ctx.getValue(),
      //   cell: (ctx) => {
      //     const { email } = ctx.row.original;

      //     return <span className="font-bold">{email}</span>;
      //   },
    },
    {
      id: "type",
      header: "Type",
      accessorKey: "projectType",
      cell: (ctx) => ctx.getValue(),
    },
  ];

  return <Table data={data} columns={columns} />;
}
