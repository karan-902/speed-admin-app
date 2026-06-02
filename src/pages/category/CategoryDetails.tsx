import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableBody } from "@mui/material";
import Box from "../../components/common/Box/Box";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { callAPIInterface } from "../../utils";
import type { TCategoryDetailResponse } from "../../utils/utils";
import type { TCategorySummeryObj } from "../../utils/components";
import {
    appendCategoryProducts,
    categoryRemoved,
    clearCategoryDetails,
    setCategoryDetails,
} from "../../redux/category/category.slice";
import { categoryAllSatsColumns } from "../../components/columns";
import CategoryDetailsHeader from "./CategoryDetailsHeader";
import CategorySummery from "./CategorySummery";
import CategoryProductList from "./CategoryProductList";
import CategoryForm from "./CategoryForm";
import ProductAction from "../product/Header/ProductAction";

const LIMIT = 20;

function CategoryDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const details = useReduxSelector((state) => state.category.categoryDetails);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isFetching = useRef(false);

    const fetchCategory = useCallback(
        async (cursor?: number | null): Promise<TCategoryDetailResponse | null> => {
            if (!id) return null;
            const cursorParam = cursor ? `?limit=${LIMIT}&ending_before=${cursor}` : "";
            return callAPIInterface<void, TCategoryDetailResponse>(
                "GET",
                `/categories/${id}${cursorParam}`,
            );
        },
        [id],
    );

    useEffect(() => {
        if (!id || isFetching.current) return;
        isFetching.current = true;
        dispatch(clearCategoryDetails());
        setLoading(true);
        fetchCategory()
            .then((data) => { if (data) dispatch(setCategoryDetails(data)); })
            .catch(console.error)
            .finally(() => { setLoading(false); isFetching.current = false; });
    }, [id]);

    const loadMore = async () => {
        if (!details?.details_products.has_more || loadingMore) return;
        setLoadingMore(true);
        try {
            const res = await fetchCategory(details.details_products.ending_before);
            if (res) {
                dispatch(
                    appendCategoryProducts({
                        data: res.details_products.data,
                        has_more: res.details_products.has_more,
                        ending_before: res.details_products.ending_before,
                    }),
                );
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMore(false);
        }
    };

    const handleDelete = async () => {
        if (!id) return;
        setIsDeleting(true);
        try {
            await callAPIInterface("DELETE", `/categories/${id}`);
            dispatch(categoryRemoved({ id }));
            navigate("/categories");
        } catch (e) {
            console.error(e);
        } finally {
            setIsDeleting(false);
        }
    };

    const summaryData: TCategorySummeryObj = {
        total_products: details?.total_products ?? 0,
        total_stock: details?.total_stock ?? 0,
        average_price: details?.average_price ?? 0,
        active_products: details?.active_products ?? 0,
        spotlighted_products: details?.spotlighted_products ?? 0,
    };

    return (
        <Box customClass="category-detail-wrapper">
            <CategoryDetailsHeader
                previousNavlink="categories"
                data={details}
                loading={loading}
                onEdit={() => setIsEditOpen(true)}
                onDelete={() => setIsDeleteOpen(true)}
            />

            <Box customClass="details-content">
                <Table>
                    <TableBody>
                        <CategorySummery
                            data={summaryData}
                            config={categoryAllSatsColumns[0].summery}
                        />
                    </TableBody>
                </Table>

                <CategoryProductList
                    data={details?.details_products.data ?? []}
                    hasMore={details?.details_products.has_more}
                    loadingMore={loadingMore}
                    onLoadMore={loadMore}
                />
            </Box>

            <CategoryForm
                open={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                editMode
                categoryId={id}
                initialName={details?.name ?? ""}
            />

            <ProductAction
                title="Delete Category"
                customClass="category-delete-dialog"
                buttonLabel="Delete"
                content="Deleting will permanently remove this category and cannot be undone."
                open={isDeleteOpen}
                disabled={isDeleting}
                onSubmit={handleDelete}
                onClose={() => setIsDeleteOpen(false)}
            />
        </Box>
    );
}

export default CategoryDetails;
