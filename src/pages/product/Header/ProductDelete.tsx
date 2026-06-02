import Modal from "../../../components/common/Modal/Modal";
import Box from "../../../components/common/Box/Box";
import Text from "../../../components/common/Text/Text";
import { dialogText } from "../../../components/messages";
interface IProductDelete {
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
  disabled?: boolean;
}
export default function ProductDelete({
  open,
  onSubmit,
  onClose,
  disabled,
}: IProductDelete) {
  return (
    <Modal
      isForm={false}
      className="product-delete-dialog"
      title="Delete Product"
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      disabled={disabled}
      actionButtonLabel="Delete Product"
    >
      <Box>
        <Text customClass="default-text" fontSize={18}>
          {dialogText.delete}
        </Text>
      </Box>
    </Modal>
  );
}
