import { CardContent, Stack, CardMedia, CardActionArea } from "@mui/material";
import type { TCategoryProduct } from "../../utils/utils";
import Card from "../../components/common/Card/Card";
import Text from "../../components/common/Text/Text";
import { useNavigate } from "react-router-dom";
import Chip from "../../components/common/Chip/Chip";
import { noDataFoundImage } from "../../components/images";

interface ProductCardProps {
    product: TCategoryProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const navigate = useNavigate();
    return (
        <Card
            onClick={() => navigate(`/products/${product.id}`)}
            customClass="category-product"
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.thumbnail_url ?? noDataFoundImage}
                    alt={product.name}
                />
                <CardContent>
                    <Stack spacing={1}>
                        <Text variant="h6" fontWeight={600}>
                            {product.name}
                        </Text>

                        <Text
                            variant="body2"
                            fontSize={12}
                            color="text.secondary"
                        >
                            {product.description}
                        </Text>

                        <Text variant="h6">₹{product.price}</Text>

                        <Text variant="body2">Stock: {product.stock}</Text>

                        {product.spotlight && (
                            <Chip
                                label="Spotlighted"
                                customClass="product-spotlight-chip"
                            />
                        )}
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
