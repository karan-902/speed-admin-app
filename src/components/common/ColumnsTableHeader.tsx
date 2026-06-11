import { TableCell, TableRow } from "@mui/material";

interface Column {
    label?: string;
    width?: number | string;
}

interface ColumnsTableHeaderProps {
    columns: Column[];
}

function ColumnsTableHeader({ columns }: ColumnsTableHeaderProps) {
    return (
        <TableRow>
            {columns.map((col, i) => (
                <TableCell
                    key={col.label ?? i}
                    component="th"
                    style={col.width ? { width: col.width } : undefined}
                >
                    {col.label}
                </TableCell>
            ))}
        </TableRow>
    );
}

export default ColumnsTableHeader;
