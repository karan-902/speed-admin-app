import Box from "../../../components/common/Box/Box";
import Popper from "../../../components/common/Popper/Popper";
import { MenuItem } from "@mui/material";
import Text from "../../../components/common/Text/Text";

interface HeaderMenuProps {
  anchorEl: HTMLElement | null;
  onArchive: () => void;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function HeaderMenu({
  onArchive,
  onEdit,
  onDelete,
  onClose,
  anchorEl,
}: HeaderMenuProps) {
  const menu = [
    { label: "Archive", onClick: onArchive },
    { label: "Edit", onClick: onEdit },
    { label: "Delete", onClick: onDelete },
  ];

  return (
    <Popper
      arrow
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      placement="bottom-end"
    >
      <Box>
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              item.onClick();
              onClose();
            }}
          >
            <Text customClass="font-Medium grey-text font14">{item.label}</Text>
          </MenuItem>
        ))}
      </Box>
    </Popper>
  );
}
