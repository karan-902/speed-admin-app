import Box from "../../../components/common/Box/Box";
import Modal from "../../../components/common/Modal/Modal";
import Text from "../../../components/common/Text/Text";

interface IProductAction {
  title: string;
  customClass: string;
  buttonLabel: "Save" | "Add" | string;
  open: boolean;
  content: string;
  onSubmit: () => void;
  onClose: () => void;
  disabled?: boolean;
}
export default function ProductAction({
  title,
  open,
  onSubmit,
  content,
  buttonLabel,
  customClass,
  onClose,
  disabled,
}: IProductAction) {
  return (
    <Modal
      isForm={false}
      className={customClass}
      title={title}
      open={open}
      onSubmit={onSubmit}
      onClose={onClose}
      disabled={disabled}
      actionButtonLabel={buttonLabel}
    >
      <Box>
        <Text customClass="default-text" fontSize={18}>
          {content}
        </Text>
      </Box>
    </Modal>
  );
}
