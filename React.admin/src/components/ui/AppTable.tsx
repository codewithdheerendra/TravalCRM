import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableContainerProps,
  SxProps,
  Theme,
} from "@mui/material";
import React from "react";

export interface Column {
  id: string;
  label: React.ReactNode;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  isVisbible: boolean;
}

interface AppTableProps<T = any> {
  columns?: Column[];
  data: T[];
  renderRow: (item: T, index: number) => React.ReactNode;
  containerProps?: TableContainerProps;
  sx?: SxProps<Theme>;
  pagination?: React.ReactNode;
}

export default function AppTable<T>({
  columns,
  data,
  renderRow,
  containerProps,
  sx,
  pagination
}: AppTableProps<T>) {
  return (
    <TableContainer component={Paper} variant="outlined" sx={{ maxWidth: "100%", overflow: "auto", overflowInline: "auto", ...sx }} {...containerProps}>
      <Table stickyHeader>
        {columns?.length && (
          <TableHead>
            <TableRow>
              {columns.filter(item => item.isVisbible).map((col) => (
                <TableCell sx={{textWrap: "nowrap"}} key={col.id} align={col.align || "left"}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((item, index) => renderRow(item, index))}
          { pagination && (<TableRow>{pagination}</TableRow>) }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
AppTable.defaultProps = {
  columns: [],
  containerProps: {},
  sx: {},
};