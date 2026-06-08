import {
    useCallback,
    useEffect,
    useRef,
    useState,
    type MouseEvent,
} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, TableBody, type PopoverOrigin } from "@mui/material";
import Box from "../../components/common/Box/Box";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { callAPIInterface } from "../../utils";
import type { TCategoryDetailResponse } from "../../utils/utils";
import type { TCategorySummeryObj } from "../../utils/components";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";

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
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import Breadcrumbs from "../../components/common/Breadcrumb/Breadcrumb";
import Link from "../../components/common/Link/Link";
import { buttonIcons } from "../../components/images";
import PopoverMenu from "../../components/common/PopoverMenu";

const LIMIT = 20;
const ANCHOR_ORIGIN: PopoverOrigin = {
    vertical: "bottom",
    horizontal: "right",
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
    vertical: "top",
    horizontal: "right",
};
function CategoryDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const details = useReduxSelector((state) => state.category.categoryDetails);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const isFetching = useRef(false);

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
    const fetchCategory = useCallback(
        async (
            cursor?: number | null,
        ): Promise<TCategoryDetailResponse | null> => {
            if (!id) return null;
            const cursorParam = cursor
                ? `?limit=${LIMIT}&ending_before=${cursor}`
                : "";
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
            .then((data) => {
                if (data) dispatch(setCategoryDetails(data));
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
                isFetching.current = false;
            });
    }, [id]);

    const loadMore = async () => {
        if (!details?.details_products.has_more || loadingMore) return;
        setLoadingMore(true);
        try {
            const res = await fetchCategory(
                details.details_products.ending_before,
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
        {
            key: "edit",
            icon: buttonIcons.edit,
            label: "Edit",
        },
        {
            key: "delete",
            icon: buttonIcons.delete,
            label: "Delete",
        },
    ];
    const menuActions = (key: string) => {
        if (key === "edit") {
            onEdit();
        } else if (key === "delete") {
            onDelete();
        }
    };

    return (
        <Box customClass="category-detail-wrapper">
            {/* <CategoryDetailsHeader
                previousNavlink="categories"
                data={details}
                loading={loading}
                onEdit={() => setIsEditOpen(true)}
                onDelete={() => setIsDeleteOpen(true)}
            /> */}
            <Box component={"nav"}>
                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton
                            customClass="product-nav-wrapper"
                            variant="text"
                            width="40%"
                        />
                    }
                >
                    <Breadcrumbs component={"ol"} separator="›">
                        <Link customClass="breadcrumb-link" to={"categories"}>
                            Categories
                        </Link>
                        <Text customClass="grey-text font14">Details</Text>
                    </Breadcrumbs>
                </RenderWithFallBack>
            </Box>

            <Box className="header-content">
                <Box customClass="flex justify-between align-start">
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton
                                customClass="product-title-wrapper"
                                variant="text"
                            />
                        }
                    >
                        <Text customClass="font28 font-SemiBold">
                            {details?.name}
                        </Text>
                    </RenderWithFallBack>

                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton
                                customClass="product-status-wrapper"
                                variant="rectangular"
                            />
                        }
                    >
                        <Box customClass="flex items-center" onClick={openMenu}>
                            {buttonIcons.horizontalThreeDots}
                        </Box>
                    </RenderWithFallBack>
                </Box>
            </Box>
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
                onAction={menuActions}
                anchorEl={menuAnchorEl}
                data={categoryMenu}
                anchorOrigin={ANCHOR_ORIGIN}
                transformOrigin={TRANSFORM_ORIGIN}
            />
        </Box>
    );
}

export default CategoryDetails;
