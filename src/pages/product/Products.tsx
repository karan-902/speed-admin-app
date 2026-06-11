import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Trash2, X, ArrowUp, ArrowDown } from "lucide-react";
import EntityListPage from "../../components/common/EntityListPage";
import EntityList from "../../components/common/EntityList";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { productColumns } from "../../components/columns";
import {
    productsActionButtonLabel,
    productsPageDescription,
    productsPageTitle,
    deleteDialogDescription,
    loadingDelete,
    archiveDialogDescription,
} from "../../components/messages";
import { callAPIInterface } from "../../utils";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import {
    appendProducts,
    deleteMultipleProducts,
    setProducts,
} from "../../redux/product/product.slice";
import { useEntityList } from "../../hooks/useEntityList";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import type { TProduct, TProductFilters } from "../../utils/utils";
import type { TProductColumns, Field } from "../../utils/components";
import ProductForm from "./ProductForm";

import ProductFilter, { type ProductFilters } from "./ProductFilter";

import Modal from "../../components/common/Modal/Modal";
import ComponentLoader from "../../components/common/Loader/ComponentLoader";
import { setFilters } from "../../redux/common/common.slice";
import Button from "../../components/common/Button/Button";

const PAGE_SIZE = 20;

type SortOrder = "asc" | "desc";

const SORTABLE_FIELDS: Record<string, string> = {
    price: "price",
    stock: "stock",
    created_at: "created_at",
};

type SelectionState = {
    selectedIds: Set<string>;
    toggle: (id: string) => void;
};

const SelectionContext = createContext<SelectionState>({
    selectedIds: new Set(),
    toggle: () => {},
});

const RowCheckbox = ({ id }: { id: string }) => {
    const { selectedIds, toggle } = useContext(SelectionContext);
    return (
        <Box
            customClass="product-row-checkbox"
            onClick={(e) => e.stopPropagation()}
        >
            <Checkbox
                size="small"
                color="primary"
                checked={selectedIds.has(id)}
                onChange={() => toggle(id)}
            />
        </Box>
    );
};

const selectableColumns: Field<TProductColumns>[] = [
    { label: "", render: (row) => <RowCheckbox id={row.id} /> },
    ...productColumns,
];

const HeaderSort = ({
    active,
    order,
}: {
    active: boolean;
    order: SortOrder;
}) => {
    if (!active) return null;
    const Icon = order === "asc" ? ArrowUp : ArrowDown;
    return <Icon size={15} className="header-sort" />;
};

type TableHeadProps = {
    selectable: boolean;
    selectedCount: number;
    totalCount: number;
    onToggleAll: () => void;
    sortField: string;
    sortOrder: SortOrder;
    onSort: (field: string, order: SortOrder) => void;
};

const TableHead = ({
    selectable,
    selectedCount,
    totalCount,
    onToggleAll,
    sortField,
    sortOrder,
    onSort,
}: TableHeadProps) => (
    <TableRow>
        {selectable && (
            <TableCell component="th" className="product-checkbox-col">
                <Box customClass="product-row-checkbox">
                    <Checkbox
                        size="small"
                        color="primary"
                        checked={totalCount > 0 && selectedCount === totalCount}
                        indeterminate={
                            selectedCount > 0 && selectedCount < totalCount
                        }
                        onChange={onToggleAll}
                    />
                </Box>
            </TableCell>
        )}
        {productColumns.map((col) => {
            const field = SORTABLE_FIELDS[String(col.key)];
            return (
                <TableCell
                    key={String(col.key)}
                    component="th"
                    style={col.width ? { width: col.width } : undefined}
                >
                    {field ? (
                        <Box
                            onClick={() => {
                                const isActive = sortField === field;
                                const next: SortOrder =
                                    isActive && sortOrder === "asc"
                                        ? "desc"
                                        : "asc";
                                onSort(field, next);
                            }}
                            customClass="flex items-center"
                            gap={1}
                        >
                            {col.label}
                            <HeaderSort
                                active={sortField === field}
                                order={sortOrder}
                            />
                        </Box>
                    ) : (
                        col.label
                    )}
                </TableCell>
            );
        })}
    </TableRow>
);

type SelectionBarProps = {
    count: number;
    onDelete: () => void;
    onClear: () => void;
    onArchive: () => void;
};

const SelectionBar = ({
    count,
    onDelete,
    onArchive,
    onClear,
}: SelectionBarProps) => {
    if (count === 0) return null;
    return (
        <Box customClass="flex items-center bulk-action-bar">
            <Box customClass="flex items-center" gap={1}>
                <span className="selection-count-badge">{count}</span>
                <Text customClass="font13 grey-text">selected</Text>
            </Box>
            <Box customClass="flex items-center" gap={1}>
                <Button
                    customClass="bulk-bar-archive-btn"
                    title="Delete selected"
                    onClick={onArchive}
                >
                    <Trash2 size={15} />
                </Button>
                <button
                    className="bulk-bar-delete-btn"
                    title="Delete selected"
                    onClick={onDelete}
                >
                    <Trash2 size={15} />
                </button>
                <button
                    className="bulk-bar-deselect-btn"
                    title="Deselect all"
                    onClick={onClear}
                >
                    <X size={15} />
                </button>
            </Box>
        </Box>
    );
};

function Products() {
    const {
        tabValue,
        loading,
        setLoading,
        onTabChange,
        isCreateOpen,
        openCreate,
        closeCreate,
    } = useEntityList();
    const navigate = useNavigate();

    const dispatch = useReduxDispatch();
    const products = useReduxSelector((state) => state.product.list);

    const hasProducts = products.length > 0;

    const filters = useReduxSelector((state) => state.common?.filters);

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const productsRef = useRef(products);
    productsRef.current = products;

    const tabRef = useRef(tabValue);
    tabRef.current = tabValue;

    const filtersRef = useRef(filters);
    filtersRef.current = filters;

    const openArchive = () => setIsArchiveOpen(true);

    const closeArchive = () => setIsArchiveOpen(false);

    const openDelete = () => setIsDeleteOpen(true);

    const closeDelete = () => setIsDeleteOpen(false);

    const closeFilter = () => {
        setIsFilterOpen(false);
        dispatch(setFilters({}));
        filtersRef.current = {};
        refreshList();
    };

    const toggle = useCallback((id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        const all = productsRef.current;
        setSelectedIds((prev) =>
            prev.size >= all.length ? new Set() : new Set(all.map((p) => p.id)),
        );
    }, []);

    const clearSelection = useCallback(() => setSelectedIds(new Set()), []);
    const selection = useMemo(
        () => ({ selectedIds, toggle }),
        [selectedIds, toggle],
    );

    const deleteProduct = async () => {
        setIsLoading(true);
        try {
            await callAPIInterface("DELETE", "/products", {
                ids: [...selectedIds],
            });
            dispatch(deleteMultipleProducts([...selectedIds]));
            clearSelection();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const { load, reset, hasMoreRef } = usePaginatedList<
        TProduct,
        TProductFilters
    >({
        method: "POST",
        buildPath: (cursor) => {
            const status = tabRef.current;
            const params = new URLSearchParams({ limit: String(PAGE_SIZE) });
            if (status !== "all") params.set("status", status);
            return `/products/filter?${params.toString()}${cursor}`;
        },
        buildBody: () => {
            const {
                categoryIds,
                maxPrice,
                maxStock,
                minPrice,
                minStock,
                sortField,
                sortOrder,
            } = filtersRef.current;
            return {
                categoryIds,
                minPrice: minPrice ? Number(minPrice) : 0,
                maxPrice: maxPrice ? Number(maxPrice) : 0,
                maxStock: maxStock ? Number(maxStock) : 0,
                minStock: minStock ? Number(minStock) : 0,
                ...(sortField && { field: sortField, order: sortOrder }),
            };
        },
        onFirstLoad: (data) => dispatch(setProducts(data)),
        onAppend: (data) => dispatch(appendProducts(data)),
        setLoading,
    });
    const refreshList = useCallback(() => {
        dispatch(setProducts([]));
        reset();
        load(true);
    }, [dispatch, reset, load]);
    const applyFilters = useCallback(
        (next: ProductFilters) => {
            const merged = {
                ...filtersRef.current,
                categoryIds: next.categoryIds,
                minPrice: Number(next.minPrice),
                maxPrice: Number(next.maxPrice),
                maxStock: Number(next.maxStock),
                minStock: Number(next.minStock),
            };
            dispatch(setFilters(merged));
            filtersRef.current = merged;
            setIsFilterOpen(false);
            refreshList();
        },
        [dispatch, refreshList],
    );

    const handleSort = useCallback(
        (sortField: string, sortOrder: SortOrder) => {
            const next = { ...filtersRef.current, sortField, sortOrder };
            dispatch(setFilters(next));
            filtersRef.current = next;
            refreshList();
        },
        [dispatch, refreshList],
    );

    const renderHeader = useCallback(
        () => (
            <TableHead
                selectable={hasProducts}
                selectedCount={selectedIds.size}
                totalCount={products.length}
                onToggleAll={toggleAll}
                sortField={filters.sortField ?? ""}
                sortOrder={filters.sortOrder ?? "desc"}
                onSort={handleSort}
            />
        ),
        [
            hasProducts,
            selectedIds.size,
            products.length,
            toggleAll,
            filters.sortField,
            filters.sortOrder,
            handleSort,
        ],
    );

    useEffect(() => {
        clearSelection();
        refreshList();
    }, [tabValue]);

    useEffect(() => {
        if (!hasProducts) clearSelection();
    }, [hasProducts, clearSelection]);

    return (
        <SelectionContext.Provider value={selection}>
            <EntityListPage
                entity={productsPageTitle}
                buttonLabel={productsActionButtonLabel}
                description={productsPageDescription}
                onSubmit={openCreate}
                onFilter={() => setIsFilterOpen(true)}
            >
                <SelectionBar
                    count={selectedIds.size}
                    onDelete={openDelete}
                    onArchive={openArchive}
                    onClear={clearSelection}
                />
                <EntityList
                    list={products}
                    loading={loading}
                    hasMore={hasMoreRef.current}
                    loadMore={load}
                    tabValue={tabValue}
                    onChange={onTabChange}
                    columns={hasProducts ? selectableColumns : productColumns}
                    header={renderHeader}
                    onRowClick={(id) => navigate(`/products/${id}`)}
                />
            </EntityListPage>

            <ProductForm
                open={isCreateOpen}
                edit={false}
                onSuccess={refreshList}
                onClose={closeCreate}
            />

            <Modal
                open={isDeleteOpen}
                onClose={closeDelete}
                title="Delete"
                buttonLabel="Delete"
                className="delete-modal"
                onSubmit={deleteProduct}
            >
                {isLoading ? (
                    <ComponentLoader
                        customClass="flex flex-col items-center "
                        text={loadingDelete}
                    />
                ) : (
                    <Box>
                        <Text>{deleteDialogDescription}</Text>
                    </Box>
                )}
            </Modal>

            <ProductFilter
                open={isFilterOpen}
                onClose={closeFilter}
                onApply={applyFilters}
            />
            <Modal
                title="Archive Product"
                customClass="product-archive-dialog"
                buttonLabel="Archive Product"
                open={isArchiveOpen}
                disabled={disabled}
                onSubmit={() => {}}
                onClose={closeArchive}
            >
                <Box>
                    <Text>{archiveDialogDescription}</Text>
                </Box>
            </Modal>
        </SelectionContext.Provider>
    );
}

export default Products;
