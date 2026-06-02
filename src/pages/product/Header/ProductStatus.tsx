import Box from "../../../components/common/Box/Box";
import Text from "../../../components/common/Text/Text";
import Switch from "../../../components/common/Switch/Switch";
import type { TProductDetail } from "../../../utils/utils";
import { buttonIcons } from "../../../components/images";
import Button from "../../../components/common/Button/Button";
interface IProductStatus {
  product: TProductDetail | null;
  onToggleSpotlight: () => void;
  onOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  onUnarchive: () => void;
  disabled?: boolean;
}
export default function ProductStatus({
  product,
  onToggleSpotlight,
  onOpenMenu,
  onUnarchive,
  disabled,
}: IProductStatus) {
  if (product?.visibility) {
    return (
      <Box customClass="flex items-center">
        {" "}
        <Box gap={1} customClass="flex items-center">
          <Text fontSize={14} color="primary" font="semiBold">
            {product.spotlight ? "In Spotlight" : "Not In Spotlight"}
          </Text>
          <Switch
            checked={product.spotlight}
            onChange={onToggleSpotlight}
            disabled={disabled}
            customClass="product-spotlight-switch"
          />
        </Box>
        <Box width={24} height={24} customClass="flex" onClick={onOpenMenu}>
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
