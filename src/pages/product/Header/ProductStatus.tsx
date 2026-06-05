import Box from "../../../components/common/Box/Box";
import Text from "../../../components/common/Text/Text";
import Switch from "../../../components/common/Switch/Switch";
import type { TProductDetail } from "../../../utils/utils";
import { buttonIcons } from "../../../components/images";
import Button from "../../../components/common/Button/Button";
import { memo, useRef } from "react";
interface IProductStatus {
    product: TProductDetail | null;
    onToggleSpotlight: () => void;
    onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
    onUnarchive: () => void;
    disabled?: boolean;
}
function ProductStatus({
    product,
    onToggleSpotlight,
    onOpenMenu,
    onUnarchive,
    disabled,
}: IProductStatus) {
    const onOpenMenuRef = useRef(onOpenMenu);
    onOpenMenuRef.current = onOpenMenu;
    if (product?.visibility) {
        return (
            <Box gap={1} customClass="flex items-center">
                <Box gap={1} customClass="flex items-center spotlight-control">
                    <Text fontSize={14} font="semiBold" customClass="grey-text">
                        Spotlight
                    </Text>
                    <Switch
                        checked={product.spotlight}
                        onChange={onToggleSpotlight}
                        disabled={disabled}
                        customClass="product-spotlight-switch"
                    />
                </Box>
                <Box
                    customClass="flex items-center header-menu-btn"
                    onClick={onOpenMenuRef.current}
                >
                    {buttonIcons.horizontalThreeDots}
                </Box>
            </Box>
        );
    }
    return (
        <Box mb={1}>
            <Button
                customClass="button-create-unarchive"
                variant="outlined"
                size="medium"
                label={"Unarchive"}
                disabled={disabled}
                icon="unarchive"
                onClick={onUnarchive}
            ></Button>
        </Box>
    );
}

export default memo(ProductStatus);
