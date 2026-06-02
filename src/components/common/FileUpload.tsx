import { buttonIcons } from "../images";
import Box from "./Box/Box";
import Text from "./Text/Text";
import IconButton from "./IconButton/IconButton";

interface FileUploadProps {
  id: string;
  title?: string;
  description?: string;
  accept?: string;
  multiple?: boolean;
  value?:
    | { public_id: string; url: string }[]
    | { public_id: string; url: string }
    | null;
  onChange?: (file: File[]) => void;
  onRemove?: (index: number) => void;
}

function FileUpload({
  id,
  title,
  description,
  accept,
  onChange,
  multiple = false,
  value,
  onRemove,
}: FileUploadProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onChange?.(files);
      // Reset the value so the same file can be selected again
      e.target.value = "";
    }
  };

  const isMultiple = Array.isArray(value);
  const hasValue = !!value && !Array.isArray(value);
  const UploadButton = (
    <label htmlFor={id}>
      <input
        multiple={multiple}
        id={id}
        type="file"
        className="input-element"
        accept={accept}
        onChange={handleChange}
      />
      <Box customClass="upload-box flex items-center justify-center">
        {buttonIcons.add}
      </Box>
    </label>
  );
  const renderUploadBody = () => {
    if (isMultiple) {
      return UploadButton;
    }

    if (hasValue) {
      const singleValue = value as { public_id: string; url: string };

      return (
        <Box customClass="flex" mx={1.5} position="relative" width={80}>
          <img width={80} height={80} src={singleValue.url} alt="img" />
          <IconButton
            onClick={() => onRemove?.(0)}
            customClass="product-remove-button"
          >
            {buttonIcons.close}
          </IconButton>
        </Box>
      );
    }

    return UploadButton;
  };
  return (
    <Box mb={2} customClass="product-img-box flex items-center">
      {renderUploadBody()}
      {(title || description) && (
        <Box ml={2} width={212}>
          {title && (
            <Text variant="h5" size={16}>
              {title}
            </Text>
          )}
          {description && (
            <Text customClass="grey-text" variant="h6" size={14}>
              {description}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
}

export default FileUpload;
