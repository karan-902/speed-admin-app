import React, { useCallback, useEffect, useRef, type MouseEvent } from "react";
import Box from "../../../components/common/Box/Box";
import RenderWithFallBack from "../../../components/common/RenderWithFallBack";
import Breadcrumbs from "../../../components/common/Breadcrumb/Breadcrumb";
import CustomSkeleton from "../../../components/common/Skeleton/Skeleton";
import Link from "../../../components/common/Link/Link";
import Text from "../../../components/common/Text/Text";
import ProductStatus from "./ProductStatus";
import Copy from "../../../components/common/Copy/Copy";
import type { TProductDetail } from "../../../utils/utils";
import { callAPIInterface } from "../../../utils";
import { useReduxDispatch } from "../../../redux/hooks";
import {
    setProduct,
    updateProduct,
} from "../../../redux/product/product.slice";

interface ProductHeaderContentProps {
    loading: boolean;
    prevLink: string;
    data: TProductDetail | null;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    openMenu: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
}
function ProductHeaderContent({
    loading,
    data,
    prevLink,
    openMenu,
    disabled,
    setLoading,
}: ProductHeaderContentProps) {
    const dispatch = useReduxDispatch();
    const dataRef = useRef(data);
    dataRef.current = data;

    const onSpotlight = useCallback(async () => {
        setLoading(true);
        try {
            const response = await callAPIInterface<
                { spotlight: boolean },
                TProductDetail
            >("PATCH", `/products/${dataRef.current?.id}/spotlight`, {
                spotlight: !dataRef.current?.spotlight,
            });
            dispatch(updateProduct(response));
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);
    const onArchive = () => {};

    return (
        <>
            <Box component={"nav"}>
                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton
                            customClass="product-nav-wrapper"
                            variant="text"
                            width={"40%"}
                        />
                    }
                >
                    <Breadcrumbs component={"ol"} separator="›">
                        <Link customClass="breadcrumb-link" to={`/${prevLink}`}>
                            {prevLink[0]?.toUpperCase() + prevLink.slice(1)}
                        </Link>
                        <Text customClass="grey-text font14">Details</Text>
                    </Breadcrumbs>
                </RenderWithFallBack>
            </Box>
            <Box className="header-content">
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                            {data?.name}
                        </Text>
                    </RenderWithFallBack>

                    <Box customClass="flex flex-col items-end">
                        <RenderWithFallBack
                            loading={loading}
                            skeleton={
                                <CustomSkeleton
                                    customClass="product-status-wrapper"
                                    variant="rectangular"
                                />
                            }
                        >
                            <ProductStatus
                                product={data}
                                onOpenMenu={openMenu}
                                disabled={disabled}
                                onToggleSpotlight={onSpotlight}
                                onUnarchive={onArchive}
                            />
                        </RenderWithFallBack>

                        <RenderWithFallBack
                            loading={loading}
                            skeleton={
                                <CustomSkeleton
                                    customClass="copy-text-wrapper"
                                    variant="rounded"
                                />
                            }
                        >
                            <Box
                                mt={1}
                                gap={1}
                                customClass="flex items-center id-cell"
                            >
                                <Text customClass="detail-id font-regular">
                                    {data?.id}
                                </Text>
                                <Copy value={String(data?.id)} />
                            </Box>
                        </RenderWithFallBack>
                    </Box>
                </Box>
            </Box>
            <Box width={1000} mt={2}>
                <RenderWithFallBack
                    loading={loading}
                    skeleton={
                        <CustomSkeleton
                            customClass="product-description-wrapper"
                            variant="text"
                            sx={{ marginBlock: "12px" }}
                        />
                    }
                >
                    <Text customClass="font14 grey-text">
                        {data?.description}
                    </Text>
                </RenderWithFallBack>
            </Box>
        </>
    );
}

export default ProductHeaderContent;
