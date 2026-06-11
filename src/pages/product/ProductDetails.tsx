import {
    Fragment,
    useCallback,
    useEffect,
    useState,
    type MouseEvent,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { productAllDetailColumns } from "../../components/columns";
import type { TProductDetailsObj } from "../../utils/components";
import type { TImage } from "../../utils/components";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";
import { callAPIInterface } from "../../utils";
import { setProduct, updateProduct } from "../../redux/product/product.slice";
import type { TProductDetail } from "../../utils/utils";
import Button from "../../components/common/Button/Button";
import Breadcrumbs from "../../components/common/Breadcrumb/Breadcrumb";

import { buttonIcons } from "../../components/images";
import Switch from "../../components/common/Switch/Switch";
import type { TProductArchivePayload } from "../../types";
import Copy from "../../components/common/Copy/Copy";
import Popper from "../../components/common/Popper/Popper";
import MenuItem from "../../components/common/MenuItem/MenuItem";
import Modal from "../../components/common/Modal/Modal";
import ProductForm from "./ProductForm";
import { archiveDialogDescription } from "../../components/messages";
import { productMenu } from "../../components/config";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const product = useReduxSelector((state) => state.product.selectedProduct);
    const [isLoading, setIsLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);
    const closeArchive = () => setIsArchiveOpen(false);
    const closeEdit = () => setIsEditOpen(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const closeMenu = () => setMenuAnchorEl(null);
    const openArchive = () => {
        closeMenu();
        setIsArchiveOpen(true);
    };
    const openEdit = () => {
        closeMenu();
        setIsEditOpen(true);
    };
    const openMenu = (e: MouseEvent<HTMLElement>) =>
        setMenuAnchorEl((prev) => (prev ? null : e.currentTarget));

    const section = productAllDetailColumns[0];

    const detailsObj: TProductDetailsObj = {
        id: product?.id ?? "",
        name: product?.name ?? "",
        visibility: product?.visibility ?? false,
        spotlight: product?.spotlight ?? false,
        price: product?.price ?? 0,
        stock: product?.stock ?? 0,
        description: product?.description ?? "",
        created_at: product?.created_at ?? 0,
        updated_at: product?.updated_at ?? 0,
        category_name: product?.category_name ?? "",
    };

    const thumbnailImg: TImage = {
        public_id: product?.thumbnail_id ?? "",
        url: product?.thumbnail_url ?? "",
    };

    const imagesArr: TImage[] = product?.images ?? [];
    const onSpotlight = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await callAPIInterface<
                { spotlight: boolean },
                TProductDetail
            >("PATCH", `/products/${product?.id}/spotlight`, {
                spotlight: !product?.spotlight,
            });
            dispatch(updateProduct(response));
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [product?.spotlight]);
    const onArchive = useCallback(async () => {
        if (!detailsObj || disabled) return;
        setDisabled(true);
        setIsLoading(true);
        closeMenu();
        try {
            const res = await callAPIInterface<
                TProductArchivePayload,
                TProductDetail
            >("PATCH", `/products/${product?.id}/archive`, {
                visibility: product?.visibility,
            });
            console.log(res);
            dispatch(updateProduct(res));
        } catch (error) {
            console.error("Archive/Unarchive action failed:", error);
        } finally {
            setDisabled(false);
            setIsLoading(false);
            closeArchive();
        }
    }, [product?.visibility]);
    useEffect(() => {
        if (!id) return;
        setIsLoading(true);
        callAPIInterface<void, TProductDetail>("GET", `/products/${id}`)
            .then((res) => dispatch(setProduct(res)))
            .catch((err) => console.log(err))
            .finally(() => setIsLoading(false));
    }, [id]);
    return (
        <Box customClass="product-detail-wrapper">
            <>
                <Box component={"nav"}>
                    {isLoading ? (
                        <CustomSkeleton
                            customClass="product-nav-wrapper"
                            variant="text"
                            width={"40%"}
                        />
                    ) : (
                        <>
                            <Breadcrumbs component={"ol"} separator="›">
                                <Box
                                    customClass="breadcrumb-link"
                                    onClick={() => navigate(-1)}
                                >
                                    Products
                                </Box>
                                <Text customClass="grey-text font14">
                                    Details
                                </Text>
                            </Breadcrumbs>
                        </>
                    )}
                </Box>
                <Box className="header-content">
                    <Box customClass="flex justify-between">
                        {isLoading ? (
                            <CustomSkeleton
                                customClass="product-title-wrapper"
                                variant="text"
                            />
                        ) : (
                            <>
                                <Text customClass="font28 font-SemiBold">
                                    {detailsObj?.name}
                                </Text>
                            </>
                        )}

                        <Box customClass="flex flex-col items-end">
                            {isLoading ? (
                                <CustomSkeleton
                                    customClass="product-status-wrapper"
                                    variant="rectangular"
                                />
                            ) : (
                                <>
                                    {detailsObj && detailsObj.visibility ? (
                                        <Box
                                            gap={1}
                                            customClass="flex items-center"
                                        >
                                            <Box
                                                gap={1}
                                                customClass="flex items-center spotlight-control"
                                            >
                                                <Text
                                                    fontSize={14}
                                                    font="semiBold"
                                                    customClass="grey-text"
                                                >
                                                    Spotlight
                                                </Text>
                                                <Switch
                                                    checked={
                                                        detailsObj.spotlight
                                                    }
                                                    onChange={onSpotlight}
                                                    disabled={disabled}
                                                    customClass="product-spotlight-switch"
                                                />
                                            </Box>
                                            <Box
                                                customClass="flex items-center header-menu-btn"
                                                onClick={openMenu}
                                            >
                                                {
                                                    buttonIcons.horizontalThreeDots
                                                }
                                            </Box>
                                        </Box>
                                    ) : (
                                        <>
                                            <Box mb={1}>
                                                <Button
                                                    customClass="button-create-unarchive"
                                                    variant="outlined"
                                                    size="medium"
                                                    label={"Unarchive"}
                                                    disabled={disabled}
                                                    icon="unarchive"
                                                    onClick={onArchive}
                                                ></Button>
                                            </Box>
                                        </>
                                    )}
                                </>
                            )}
                            {isLoading ? (
                                <CustomSkeleton
                                    customClass="copy-text-wrapper"
                                    variant="rounded"
                                />
                            ) : (
                                <Box
                                    mt={1}
                                    gap={1}
                                    customClass="flex items-center id-cell"
                                >
                                    <Text customClass="detail-id font-regular">
                                        {detailsObj?.id}
                                    </Text>
                                    <Copy value={String(detailsObj?.id)} />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </Box>
                <Box width={1000} mt={2}>
                    {isLoading ? (
                        <CustomSkeleton
                            customClass="product-description-wrapper"
                            variant="text"
                            sx={{ marginBlock: "12px" }}
                        />
                    ) : (
                        <Text customClass="font14 grey-text">
                            {detailsObj?.description}
                        </Text>
                    )}
                </Box>
                <Popper
                    arrow
                    open={Boolean(menuAnchorEl)}
                    anchorEl={menuAnchorEl}
                    placement="bottom-end"
                >
                    <Box>
                        {productMenu(openArchive, openEdit).map(
                            (item, index) => (
                                <MenuItem
                                    key={index}
                                    onClick={() => {
                                        item.onClick();
                                        closeMenu();
                                    }}
                                >
                                    <Text customClass="font-Medium grey-text font14">
                                        {item.label}
                                    </Text>
                                </MenuItem>
                            ),
                        )}
                    </Box>
                </Popper>
            </>
            <Box customClass="details-content">
                <Box customClass="detail-main">
                    <Box customClass="detail-section-block">
                        {isLoading ? (
                            <CustomSkeleton
                                variant="rectangular"
                                width={400}
                                height={120}
                            />
                        ) : (
                            <>
                                <Text customClass="section-title">
                                    {section.details.title}
                                </Text>
                                <Box customClass="detail-fields-grid">
                                    {section.details.fields.map((field) => (
                                        <Fragment key={field.label}>
                                            <Text customClass="profile-label">
                                                {field.label}
                                            </Text>
                                            <Text
                                                component={"div"}
                                                customClass="profile-value"
                                            >
                                                {field.render
                                                    ? (field.render(
                                                          detailsObj,
                                                      ) as React.ReactNode)
                                                    : null}
                                            </Text>
                                        </Fragment>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                </Box>

                <Box customClass="detail-side">
                    <Box customClass="detail-section-block">
                        {isLoading ? (
                            <>
                                <CustomSkeleton
                                    variant="rectangular"
                                    width={170}
                                    height={170}
                                />
                            </>
                        ) : (
                            <>
                                <Text customClass="section-title">
                                    {section.thumbnail.title}
                                </Text>
                                {section.thumbnail.fields.map((field) => (
                                    <Box key={field.label}>
                                        {field.render
                                            ? (field.render(
                                                  thumbnailImg,
                                              ) as React.ReactNode)
                                            : null}
                                    </Box>
                                ))}
                            </>
                        )}
                    </Box>

                    {imagesArr.length > 0 && (
                        <Box customClass="detail-section-block">
                            <Text customClass="section-title">
                                {section.images.title}
                            </Text>
                            {section.images.fields.map((field) => (
                                <Box key={field.label}>
                                    {field.render
                                        ? (field.render(
                                              imagesArr,
                                          ) as React.ReactNode)
                                        : null}
                                </Box>
                            ))}
                        </Box>
                    )}
                    <ProductForm
                        open={isEditOpen}
                        onClose={closeEdit}
                        edit={true}
                    />
                    <Modal
                        title="Archive Product"
                        customClass="product-archive-dialog"
                        buttonLabel="Archive Product"
                        open={isArchiveOpen}
                        disabled={disabled}
                        onSubmit={onArchive}
                        onClose={closeArchive}
                    >
                        <Box>
                            <Text>{archiveDialogDescription}</Text>
                        </Box>
                    </Modal>
                </Box>
            </Box>
        </Box>
    );
}

export default ProductDetails;
