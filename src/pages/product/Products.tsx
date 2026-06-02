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
import type { TProductsResponse } from "../../utils/utils";
import type { TProductColumns, Field } from "../../utils/components";
import { Trash2, X } from "lucide-react";
import EntityList from "../../components/common/EntityList";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import BulkDeleteModal from "../../components/common/BulkDeleteModal/BulkDeleteModal";
import ProductForm from "./ProductForm";

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
            <TableCell key={String(col.key)} component="th">
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
    const limit = 20;
    const hasMore = useRef(true);
    const endingBefore = useRef<number | null>(null);
    const isFetching = useRef(false);
    const tabValueRef = useRef(tabValue);
    tabValueRef.current = tabValue;

    const products = useReduxSelector((state) => state.product.list);
    const dispatch = useReduxDispatch();

    const productsRef = useRef(products);
    productsRef.current = products;

    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

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

    const getProducts = useCallback(async (isfirstLoad = false) => {
        if (!hasMore.current || isFetching.current) return;
        isFetching.current = true;
        setLoading(true);
        const tab = tabValueRef.current;
        const cursor = endingBefore.current
            ? `&ending_before=${endingBefore.current}`
            : "";
        const path =
            tab !== "all"
                ? `/products?status=${tab}&limit=${limit}${cursor}`
                : `/products?limit=${limit}${cursor}`;
        try {
            const response = await callAPIInterface<void, TProductsResponse>(
                "GET",
                path,
            );
            if (isfirstLoad) {
                dispatch(setProducts(response.data));
            } else {
                dispatch(appendProducts(response.data));
            }
            hasMore.current = response.has_more;
            endingBefore.current = response.ending_before;
        } catch (error) {
            console.error(error);
        } finally {
            isFetching.current = false;
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        dispatch(setProducts([]));
        setSelectedIds(new Set());
        hasMore.current = true;
        endingBefore.current = null;
        isFetching.current = false;
        getProducts(true);
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
                        <TableCell key={String(col.key)} component="th">
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
                    hasMore={hasMore.current}
                    loadMore={getProducts}
                    loading={loading}
                    tabValue={tabValue}
                    onChange={onTabChange}
                    columns={hasProducts ? columnsWithSelect : productColumns}
                    header={tableHeader}
                    list={products}
                />
            </EntityListPage>

            <ProductForm
                open={isCreateOpen}
                edit={false}
                onClose={closeCreate}
            />

            <BulkDeleteModal
                open={isDeleteOpen}
                count={selectedIds.size}
                isDeleting={isDeleting}
                onConfirm={handleBulkDelete}
                onClose={() => setIsDeleteOpen(false)}
            />
        </ProductSelectionContext.Provider>
    );
}

export default Products;
