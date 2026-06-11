import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntityListPage from "../../components/common/EntityListPage";
import EntityList from "../../components/common/EntityList";
import ColumnsTableHeader from "../../components/common/ColumnsTableHeader";
import { deliveryColumns } from "../../components/columns";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { useEntityList } from "../../hooks/useEntityList";
import {
    deliveriesPageTitle,
    deliveriesPageDescription,
} from "../../components/messages";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import {
    appendDeliveries,
    setDeliveries,
} from "../../redux/delivery/delivery.slice";
import type { TDelivery, TDeliveryStatus } from "../../utils/utils";
import { deliveryStatusTabs } from "../../components/config";

const LIMIT = 20;

function Deliveries() {
    const { tabValue, tabRef, loading, setLoading, onTabChange } =
        useEntityList();
    const deliveries = useReduxSelector((state) => state.delivery.list);
    const dispatch = useReduxDispatch();
    const navigate = useNavigate();

    const { load, reset, hasMoreRef } = usePaginatedList<TDelivery>({
        method: "GET",
        buildPath: (cursor) => {
            const status = tabRef.current;
            const statusParam =
                status !== "all" ? `&status=${status as TDeliveryStatus}` : "";
            return `/deliveries?limit=${LIMIT}${statusParam}${cursor}`;
        },
        onFirstLoad: (data) => dispatch(setDeliveries(data)),
        onAppend: (data) => dispatch(appendDeliveries(data)),
        setLoading,
    });

    useEffect(() => {
        dispatch(setDeliveries([]));
        reset();
        load(true);
    }, [tabValue]);

    return (
        <EntityListPage
            entity={deliveriesPageTitle}
            buttonLabel=""
            description={deliveriesPageDescription}
            onSubmit={() => {}}
        >
            <EntityList
                hasMore={hasMoreRef.current}
                loadMore={load}
                loading={loading}
                tabValue={tabValue}
                onChange={onTabChange}
                tabs={deliveryStatusTabs}
                columns={deliveryColumns}
                header={() => <ColumnsTableHeader columns={deliveryColumns} />}
                list={deliveries}
                onRowClick={(id) => navigate(`/deliveries/${id}`)}
            />
        </EntityListPage>
    );
}

export default Deliveries;
