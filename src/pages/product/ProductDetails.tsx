import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { useReduxDispatch, useReduxSelector } from "../../redux/hooks";
import { getProductById } from "../../redux/thunks";
import { productAllDetailColumns } from "../../components/columns";
import type { TProductDetailsObj } from "../../utils/components";
import type { TImage } from "../../utils/components";
import DetailsHeader from "./Header/ProductDetailsHeader";
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";

function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const dispatch = useReduxDispatch();
    const product = useReduxSelector((state) => state.product.selectedProduct);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        setLoading(true);
        dispatch(getProductById(id)).finally(() => setLoading(false));
    }, [id]);

    const section = productAllDetailColumns[0];

    const detailsObj: TProductDetailsObj = {
        visiblity: product?.visibility ?? false,
        created_at: product?.created_at ?? 0,
        updated_at: product?.updated_at ?? 0,
        category_name: product?.category_name ?? "",
    };

    const thumbnailImg: TImage = {
        public_id: product?.thumbnail_id ?? "",
        url: product?.thumbnail_url ?? "",
    };

    const imagesArr: TImage[] = product?.images ?? [];

    return (
        <Box customClass="product-detail-wrapper">
            <DetailsHeader
                previousNavlink="products"
                loading={loading}
                setLoading={setLoading}
            />
            <Box customClass="details-content">
                <Box customClass="detail-section-block">
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton variant="rectangular" width={400} height={120} />
                        }
                    >
                        <Text customClass="section-title">{section.details.title}</Text>
                        <Box customClass="detail-fields-grid">
                            {section.details.fields.map((field) => (
                                <>
                                    <Text key={`label-${field.label}`} customClass="profile-label">
                                        {field.label}
                                    </Text>
                                    <Text key={`value-${field.label}`} customClass="profile-value">
                                        {field.render ? (field.render(detailsObj) as React.ReactNode) : null}
                                    </Text>
                                </>
                            ))}
                        </Box>
                    </RenderWithFallBack>
                </Box>

                <Box customClass="detail-section-block">
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={
                            <CustomSkeleton variant="rectangular" width={170} height={170} />
                        }
                    >
                        <Text customClass="section-title">{section.thumbnail.title}</Text>
                        {section.thumbnail.fields.map((field) => (
                            <Box key={field.label}>
                                {field.render ? (field.render(thumbnailImg) as React.ReactNode) : null}
                            </Box>
                        ))}
                    </RenderWithFallBack>
                </Box>

                {imagesArr.length > 0 && (
                    <Box customClass="detail-section-block">
                        <Text customClass="section-title">{section.images.title}</Text>
                        {section.images.fields.map((field) => (
                            <Box key={field.label}>
                                {field.render ? (field.render(imagesArr) as React.ReactNode) : null}
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ProductDetails;
