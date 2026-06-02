import { TableCell, TableRow } from "@mui/material";
import type { Field } from "../../../types";
import Skeleton from "../Skeleton/Skeleton";
interface LoaderRowProps {
    columns: Field[];
    count?: number;
    height?: number;
}
export default function LoadingRow({
    columns,
    count = 1,
    height,
}: LoaderRowProps) {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <TableRow key={i} style={{ height: height }}>
                    {columns.map((col) => (
                        <TableCell key={String(col.key)}>
                            <Skeleton
                                component="span"
                                width={"90%"}
                                variant="text"
                                customClass="table-skeleton"
                            />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
}
