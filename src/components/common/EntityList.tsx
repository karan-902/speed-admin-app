import { type ReactNode } from "react";
import Tab from "./Tab/Tab";
import { tabsConfig } from "./config";
import type { Field, Ttabs } from "../../utils/components";
import LoadingRow from "./Table/LoadingRow";
import VirtualizeTable from "./Table/VirtualizeTable";

type EntityListProps<T extends { id: string }> = {
    header: () => ReactNode;
    hasMore?: boolean;
    loadMore?: () => void;
    loading?: boolean;
    tabValue: Ttabs | string;
    onChange: (event: React.SyntheticEvent, value: any) => void;
    list: T[];
    columns: Field<T>[];
    onRowClick?: (id: string) => void;
    tabs?: { label: string; value: string }[];
};

function EntityList<T extends { id: string }>({
    loading,
    header,
    list,
    columns,
    tabValue,
    onChange,
    hasMore,
    loadMore,
    onRowClick,
    tabs = tabsConfig,
}: EntityListProps<T>) {
    return (
        <Tab tabs={tabs} value={tabValue} onChange={onChange}>
            <VirtualizeTable
                onRowClick={onRowClick}
                columns={columns}
                data={list}
                header={header}
                loader={(height) => (
                    <LoadingRow columns={columns} height={height} />
                )}
                hasMore={hasMore}
                isLoading={loading}
                loadMore={loadMore}
            />
        </Tab>
    );
}

export default EntityList;
