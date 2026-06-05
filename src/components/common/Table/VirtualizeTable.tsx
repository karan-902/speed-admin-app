import { useCallback, useMemo, useRef, type ReactNode } from "react";
import type { Field } from "../../../utils/components";
import { TableVirtuoso, type TableComponents } from "react-virtuoso";
import type { ITableContainerProps } from "./TableContainer";
import TableContainer from "./TableContainer";
import {
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    type TableBodyProps,
    type TableHeadProps,
    type TableRowProps,
} from "@mui/material";
import type { ITable } from "./Table";
import Table from "./Table";
import EmptyData from "../EmptyData";
type VirtualTableProps<T extends { id: string }> = {
    columns: Field<T>[];
    data: T[];
    loader: (height?: number) => ReactNode;
    header: () => ReactNode;
    isLoading?: boolean;
    hasMore?: boolean;
    onRowClick?: (id: string) => void;
    loadMore?: () => void;
};

const SCROLL_SEEK_CONFIG = {
    enter: (velocity: number) => Math.abs(velocity) > 500,
    exit: (velocity: number) => Math.abs(velocity) < 100,
};
const tableComponents = {
    Scroller: (props: ITableContainerProps) => (
        <TableContainer customClass="data-table-container" {...props} />
    ),
    Table: (props: ITable) => (
        <Table customClass="data-table has-data" {...props} />
    ),
    TableBody: (props: TableBodyProps) => <TableBody {...props} />,
    TableRow: (props: TableRowProps) => <TableRow {...props} />,
    TableHead: (props: TableHeadProps) => (
        <TableHead className="table-header" {...props} />
    ),
};

function VirtualizeTable<T extends { id: string }>({
    data,
    isLoading,
    header,
    loader,
    loadMore,
    hasMore,
    columns,
    onRowClick,
}: VirtualTableProps<T>) {
    const loaderRef = useRef(loader);
    loaderRef.current = loader;
    const loadingRef = useRef(isLoading);
    const isPaginateRef = useRef(false);
    loadingRef.current = isLoading;
    isPaginateRef.current = (loadingRef.current ?? false) && data.length > 0;
    const columnsRef = useRef(columns);
    columnsRef.current = columns;
    const hasMoreRef = useRef(hasMore);
    hasMoreRef.current = hasMore;
    const loadMoreRef = useRef(loadMore);
    loadMoreRef.current = loadMore;
    const dataRef = useRef(data);
    dataRef.current = data;
    const onRowClickRef = useRef(onRowClick);
    onRowClickRef.current = onRowClick;
    const components: TableComponents<T, any> = useMemo(
        () => ({
            ...tableComponents,
            TableRow: (props: TableRowProps) => {
                const index = (props as { "data-index"?: number })[
                    "data-index"
                ];
                const onClick = () => {
                    const item =
                        index !== undefined
                            ? dataRef.current[index]
                            : undefined;
                    if (item) onRowClickRef.current?.(item.id);
                };
                return (
                    <TableRow
                        {...props}
                        onClick={onRowClickRef.current ? onClick : undefined}
                    />
                );
            },
            ScrollSeekPlaceholder: ({ height }) => (
                <>{loaderRef.current(height)}</>
            ),
            EmptyPlaceholder: () => {
                return (
                    <TableBody>
                        {loadingRef.current ? (
                            <>{loaderRef.current()}</>
                        ) : (
                            <>
                                <TableRow className="empty-row">
                                    <TableCell
                                        colSpan={columnsRef.current.length}
                                    >
                                        <EmptyData />
                                    </TableCell>
                                </TableRow>
                            </>
                        )}
                    </TableBody>
                );
            },
        }),

        [],
    );
    const itemContent = useCallback((_: number, item: T) => {
        return (
            <>
                {columnsRef.current.map((col) => (
                    <TableCell
                        key={String(col.key)}
                        style={col.width ? { width: col.width } : undefined}
                    >
                        {col.render && col.render(item)}
                    </TableCell>
                ))}
            </>
        );
    }, []);
    const fixedFooterContent = useCallback(
        () => (isPaginateRef.current ? <>{loaderRef.current()}</> : null),
        [],
    );
    const onEndReached = useCallback(() => {
        if (!loadingRef.current && hasMoreRef.current && loadMoreRef.current)
            loadMoreRef.current();
    }, []);
    return (
        <div className="virtual-table-wrapper">
            <TableVirtuoso
                style={{ height: "calc(100vh - 200px)" }}
                fixedHeaderContent={header}
                data={data}
                endReached={onEndReached}
                itemContent={itemContent}
                scrollSeekConfiguration={SCROLL_SEEK_CONFIG}
                computeItemKey={(_: number, item: T) => item.id}
                components={components}
                fixedFooterContent={fixedFooterContent}
            />
        </div>
    );
}

export default VirtualizeTable;
