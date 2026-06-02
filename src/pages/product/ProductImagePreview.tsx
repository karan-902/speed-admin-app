import Box from "../../components/common/Box/Box";
import IconButton from "../../components/common/IconButton/IconButton";
import { buttonIcons } from "../../components/images";

export default function ProductImagePreview({
  images,
  onRemove,
}: {
  images:
    | { public_id: string; url: string }[]
    | { public_id: string; url: string }
    | null;
  onRemove?: (index: number) => void;
}) {
  const normalizedImages = Array.isArray(images)
    ? images
    : images
      ? [images]
      : [];

  if (normalizedImages.length === 0) return null;

  return (
    <Box my={2} customClass="product-img-box flex">
      {normalizedImages.map((img, index) => (
        <Box
          key={img.public_id || index}
          customClass="flex"
          mx={1.5}
          position="relative"
          width={80}
        >
          <img width={80} height={80} src={img.url} alt="img" />

          <IconButton
            onClick={() => onRemove?.(index)}
            customClass="product-remove-button"
          >
            {buttonIcons.close}
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}
