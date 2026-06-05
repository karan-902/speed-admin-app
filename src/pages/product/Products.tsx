import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { productColumns } from "../../components/columns";
import EntityListPage from "../../components/common/EntityListPage";
import { useEntityList } from "../../hooks/useEntityList";
import {
    productsActionButtonLabel,
    productsPageDescription,
    productsPageTitle,
} from "../../components/messages";
import { callAPIInterface } from "../../utils";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import {
    appendProducts,
    deleteMultipleProducts,
    setProducts,
} from "../../redux/product/product.slice";
import type { TProduct } from "../../utils/utils";
import type { TProductColumns, Field } from "../../utils/components";
import { Trash2, X } from "lucide-react";
import EntityList from "../../components/common/EntityList";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import BulkDeleteModal from "../../components/common/BulkDeleteModal/BulkDeleteModal";
import Input from "../../components/common/Input/Input";

import ProductForm from "./ProductForm";
import { usePaginatedList } from "../../hooks/usePaginatedList";
import { useNavigate } from "react-router-dom";
import FilterDrawer from "../../components/common/FilterDrawer";

type SelectionCtx = {
    selectedIds: Set<string>;
    toggle: (id: string) => void;
};

const ProductSelectionContext = createContext<SelectionCtx>({
    selectedIds: new Set(),
    toggle: () => {},
});

const RowCheckbox = ({ id }: { id: string }) => {
    const { selectedIds, toggle } = useContext(ProductSelectionContext);
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

const ProductsTableHeaderInner = ({
    selectedCount,
    totalCount,
    onToggleAll,
}: {
    selectedCount: number;
    totalCount: number;
    onToggleAll: () => void;
}) => (
    <TableRow>
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
        {productColumns.map((col) => (
            <TableCell
                key={String(col.key)}
                component="th"
                style={col.width ? { width: col.width } : undefined}
            >
                {col.label}
            </TableCell>
        ))}
    </TableRow>
);

const columnsWithSelect: Field<TProductColumns>[] = [
    {
        label: "",
        render: (row) => <RowCheckbox id={row.id} />,
    },
    ...productColumns,
];

const FILTER_FIELDS: {
    name: "priceMin" | "priceMax" | "stockMin" | "stockMax";
    label: string;
    placeholder: string;
}[] = [
    { name: "priceMin", label: "Min Price", placeholder: "0" },
    { name: "priceMax", label: "Max Price", placeholder: "Any" },
    { name: "stockMin", label: "Min Stock", placeholder: "0" },
    { name: "stockMax", label: "Max Stock", placeholder: "Any" },
];

function Products() {
    const {
        setLoading,
        tabValue,
        loading,
        onTabChange,
        isCreateOpen,
        openCreate,
        closeCreate,
    } = useEntityList();
    const navigate = useNavigate();
    const LIMIT = 20;

    const tabRef = useRef(tabValue);
    tabRef.current = tabValue;
    const products = useReduxSelector((state) => state.product.list);
    const dispatch = useReduxDispatch();
    const productsRef = useRef(products);
    productsRef.current = products;

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        priceMin: "",
        priceMax: "",
        stockMin: "",
        stockMax: "",
    });

    const onFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    const clearFilters = () =>
        setFilters({ priceMin: "", priceMax: "", stockMin: "", stockMax: "" });

    const toggle = useCallback((id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    }, []);

    const toggleAll = useCallback(() => {
        const current = productsRef.current;
        setSelectedIds((prev) =>
            prev.size >= current.length
                ? new Set()
                : new Set(current.map((p) => p.id)),
        );
    }, []);

    const selectionCtx = useMemo(
        () => ({ selectedIds, toggle }),
        [selectedIds, toggle],
    );

    const { load, reset, hasMoreRef } = usePaginatedList<TProduct>({
        buildPath: (cursor) => {
            const status = tabRef.current;
            const statusParam =
                tabRef.current !== "all" ? `&status=${status}` : "";
            return `/products?limit=${LIMIT}${statusParam}${cursor}`;
        },
        onAppend: (data) => dispatch(appendProducts(data)),
        onFirstLoad: (data) => dispatch(setProducts(data)),
        setLoading,
    });
    const refreshList = () => {
        dispatch(setProducts([]));
        reset();
        load(true);
    };

    useEffect(() => {
        setSelectedIds(new Set());
        dispatch(setProducts([]));
        reset();
        load(true);
    }, [tabValue]);

    const handleBulkDelete = async () => {
        setIsDeleting(true);
        try {
            await Promise.all(
                Array.from(selectedIds).map((id) =>
                    callAPIInterface("DELETE", `/products/${id}`),
                ),
            );
            dispatch(deleteMultipleProducts(Array.from(selectedIds)));
            setSelectedIds(new Set());
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
        }
    };

    const hasProducts = products.length > 0;

    useEffect(() => {
        if (!hasProducts) setSelectedIds(new Set());
    }, [hasProducts]);

    const tableHeader = useCallback(
        () =>
            hasProducts ? (
                <ProductsTableHeaderInner
                    selectedCount={selectedIds.size}
                    totalCount={products.length}
                    onToggleAll={toggleAll}
                />
            ) : (
                <TableRow>
                    {productColumns.map((col) => (
                        <TableCell
                            key={String(col.key)}
                            component="th"
                            style={col.width ? { width: col.width } : undefined}
                        >
                            {col.label}
                        </TableCell>
                    ))}
                </TableRow>
            ),
        [hasProducts, selectedIds.size, products.length, toggleAll],
    );

    return (
        <ProductSelectionContext.Provider value={selectionCtx}>
            <EntityListPage
                entity={productsPageTitle}
                buttonLabel={productsActionButtonLabel}
                description={productsPageDescription}
                onSubmit={openCreate}
                onFilter={() => setIsFilterOpen(true)}
            >
                {selectedIds.size > 0 && (
                    <Box customClass="flex items-center bulk-action-bar">
                        <Box customClass="flex items-center" gap={1}>
                            <span className="selection-count-badge">
                                {selectedIds.size}
                            </span>
                            <Text customClass="font13 grey-text">selected</Text>
                        </Box>
                        <Box customClass="flex items-center" gap={1}>
                            <button
                                className="bulk-bar-delete-btn"
                                title="Delete selected"
                                onClick={() => setIsDeleteOpen(true)}
                            >
                                <Trash2 size={15} />
                            </button>
                            <button
                                className="bulk-bar-deselect-btn"
                                title="Deselect all"
                                onClick={() => setSelectedIds(new Set())}
                            >
                                <X size={15} />
                            </button>
                        </Box>
                    </Box>
                )}
                <EntityList
                    hasMore={hasMoreRef.current}
                    loadMore={load}
                    loading={loading}
                    tabValue={tabValue}
                    onChange={onTabChange}
                    columns={hasProducts ? columnsWithSelect : productColumns}
                    header={tableHeader}
                    list={products}
                    onRowClick={(id) => navigate(`/products/${id}`)}
                />
            </EntityListPage>

            <ProductForm
                open={isCreateOpen}
                edit={false}
                onSuccess={refreshList}
                onClose={closeCreate}
            />

            <BulkDeleteModal
                open={isDeleteOpen}
                count={selectedIds.size}
                isDeleting={isDeleting}
                onConfirm={handleBulkDelete}
                onClose={() => setIsDeleteOpen(false)}
            />

            <FilterDrawer
                open={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                onClear={clearFilters}
                onApply={() => setIsFilterOpen(false)}
            >
                {FILTER_FIELDS.map((field) => (
                    <Input
                        key={field.name}
                        showLabel
                        type="number"
                        name={field.name}
                        label={field.label}
                        placeholder={field.placeholder}
                        value={filters[field.name]}
                        onChange={onFilterChange}
                    />
                ))}
            </FilterDrawer>
        </ProductSelectionContext.Provider>
    );
}

export default Products;
