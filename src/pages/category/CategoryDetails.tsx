import { useCallback, useState, type MouseEvent } from "react";
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

import CategorySummery from "./CategorySummery";
import CategoryProductList from "./CategoryProducts";
import CategoryForm from "./CategoryForm";
import Modal from "../../components/common/Modal/Modal";
import Text from "../../components/common/Text/Text";
import { deleteDialogDescription } from "../../components/messages";
import { buttonIcons } from "../../components/images";
import PopoverMenu from "../../components/common/PopoverMenu";
import DetailPage from "../../components/common/DetailPage";
import { useDetailFetch } from "../../hooks/useDetailFetch";
import { ANCHOR_ORIGIN, TRANSFORM_ORIGIN } from "../../utils/popoverConstants";

const LIMIT = 20;

function CategoryDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const details = useReduxSelector((state) => state.category.categoryDetails);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const [loadingMore, setLoadingMore] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const { loading } = useDetailFetch<TCategoryDetailResponse>({
        id,
        path: `/categories/${id}`,
        onClear: () => dispatch(clearCategoryDetails()),
        onSuccess: (data) => dispatch(setCategoryDetails(data)),
    });

    const openMenu = (e: MouseEvent<HTMLElement>) =>
        setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const onEdit = () => {
        closeMenu();
        setIsEditOpen(true);
    };
    const onDelete = () => {
        closeMenu();
        setIsDeleteOpen(true);
    };

    const fetchCategoryWithCursor = useCallback(
        async (cursor: number): Promise<TCategoryDetailResponse | null> => {
            if (!id) return null;
            return callAPIInterface<void, TCategoryDetailResponse>(
                "GET",
                `/categories/${id}?limit=${LIMIT}&ending_before=${cursor}`,
            );
        },
        [id],
    );

    const loadMore = async () => {
        if (!details?.details_products.has_more || loadingMore) return;
        setLoadingMore(true);
        try {
            const res = await fetchCategoryWithCursor(
                Number(details?.details_products?.ending_before),
            );
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

    const categoryMenu = [
        { key: "edit", icon: buttonIcons.edit, label: "Edit" },
        { key: "delete", icon: buttonIcons.delete, label: "Delete" },
    ];

    const onMenuAction = (key: string) => {
        if (key === "edit") onEdit();
        else if (key === "delete") onDelete();
    };

    return (
        <DetailPage
            loading={loading}
            breadcrumb={{ label: "Categories", to: "categories" }}
            title={details?.name}
            menuButton={
                <Box customClass="flex items-center" onClick={openMenu}>
                    {buttonIcons.horizontalThreeDots}
                </Box>
            }
        >
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

            <Modal
                title="Delete Category"
                customClass="category-delete-dialog"
                buttonLabel="Delete"
                open={isDeleteOpen}
                disabled={isDeleting}
                onSubmit={handleDelete}
                onClose={() => setIsDeleteOpen(false)}
            >
                <Box>
                    <Text>{deleteDialogDescription}</Text>
                </Box>
            </Modal>

            <PopoverMenu
                customClass="headers-popover"
                onClose={closeMenu}
                onAction={onMenuAction}
                anchorEl={menuAnchorEl}
                data={categoryMenu}
                anchorOrigin={ANCHOR_ORIGIN}
                transformOrigin={TRANSFORM_ORIGIN}
            />
        </DetailPage>
    );
}

export default CategoryDetails;
