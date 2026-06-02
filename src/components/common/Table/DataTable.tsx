import { TableBody, TableHead } from "@mui/material";
import "./table.scss";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import Table from "./Table";
import TableContainer from "./TableContainer";

interface DataTableProps {
    children: ReactNode;
    tableHeader: () => ReactNode;
    loading?: boolean;
    hasMore?: boolean;
    loadMore?: () => void;
    isEmpty?: boolean;
    hasData?: boolean;
}

export default function DataTable({
    children,
    tableHeader,
    hasMore,
    loadMore,
    loading,
    isEmpty,
    hasData,
}: DataTableProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const tableRef = useRef<HTMLTableSectionElement | null>(null);

    const handleScroll = useCallback(() => {
        const refElement = document.documentElement;
        const { scrollHeight, scrollTop, clientHeight } = refElement;
        if (
            scrollHeight - scrollTop < clientHeight + 5 &&
            !loading &&
            hasMore &&
            loadMore
        ) {
            loadMore();
        }
    }, [hasMore, loadMore, loading]);

    useEffect(() => {
        const handleResize = () => {
            const contentHeight = tableRef.current?.clientHeight ?? 0;
            const containerHeight = containerRef.current?.clientHeight ?? 0;
            if (
                contentHeight < containerHeight &&
                hasMore &&
                loadMore &&
                !loading
            ) {
                loadMore();
            }
        };
        document.addEventListener("resize", handleResize);
        return () => document.removeEventListener("resize", handleResize);
    }, []);
    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <TableContainer customClass="data-table-container" ref={containerRef}>
            <Table customClass={hasData ? "data-table has-data" : "data-table"}>
                <TableHead className="table-header">{tableHeader()}</TableHead>
                {!isEmpty && <TableBody ref={tableRef}>{children}</TableBody>}
            </Table>
            {isEmpty && <>{children}</>}
        </TableContainer>
    );
}
