import { useEffect, useRef, useState } from "react";
import { TableCell, TableRow } from "@mui/material";
import EntityListPage from "../../components/common/EntityListPage";
import EntityList from "../../components/common/EntityList";
import { orderColumns } from "../../components/columns";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import {
    ordersActionButtonLabel,
    ordersPageDescription,
    ordersPageTitle,
} from "../../components/messages";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { appendOrders, setOrders } from "../../redux/orders/orders.slice";
import type { TOrder, TOrderStatus } from "../../utils/utils";

const LIMIT = 20;

const ORDER_STATUS_TABS: { label: string; value: string }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

const OrdersTableHeader = () => (
    <TableRow>
        {orderColumns.map((col, i) => (
            <TableCell key={col.label ?? i} component="th">
                {col.label}
            </TableCell>
        ))}
    </TableRow>
);

function Orders() {
    const [loading, setLoading] = useState(false);
    const [tabValue, setTabValue] = useState("all");
    const tabRef = useRef(tabValue);
    tabRef.current = tabValue;

    const orders = useReduxSelector((state) => state.orders.list);
    const dispatch = useReduxDispatch();

    const { load, reset, hasMoreRef } = usePaginatedList<TOrder>({
        buildPath: (cursor) => {
            const status = tabRef.current;
            const statusParam =
                status !== "all" ? `&status=${status as TOrderStatus}` : "";
            return `/orders?limit=${LIMIT}${statusParam}${cursor}`;
        },
        onFirstLoad: (data) => dispatch(setOrders(data)),
        onAppend: (data) => dispatch(appendOrders(data)),
        setLoading,
    });

    useEffect(() => {
        dispatch(setOrders([]));
        reset();
        load(true);
    }, [tabValue]);

    const onTabChange = (_: React.SyntheticEvent, value: string) =>
        setTabValue(value);

    return (
        <EntityListPage
            entity={ordersPageTitle}
            buttonLabel={ordersActionButtonLabel}
            description={ordersPageDescription}
            onSubmit={() => {}}
        >
            <EntityList
                hasMore={hasMoreRef.current}
                loadMore={load}
                loading={loading}
                tabValue={tabValue}
                onChange={onTabChange}
                tabs={ORDER_STATUS_TABS}
                columns={orderColumns}
                header={OrdersTableHeader}
                list={orders}
            />
        </EntityListPage>
    );
}

export default Orders;
