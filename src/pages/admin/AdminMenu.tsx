import { List, MenuItem, type PopoverOrigin } from "@mui/material";
import Popover from "../../components/common/Popover/Popover";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";

interface MenuItemType {
    key: string;
    icon: React.ReactNode;
    label: string;
}

interface IMenuProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    items: MenuItemType[];
    onAction: (key: string) => void;
}
const ANCHOR_ORIGIN: PopoverOrigin = {
    vertical: "bottom",
    horizontal: "right",
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
    vertical: "top",
    horizontal: "right",
};
export default function AdminMenu({
    anchorEl,
    onClose,
    onAction,
    items,
}: IMenuProps) {
    return (
        <Popover
            customClass="header-popover"
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={ANCHOR_ORIGIN}
            transformOrigin={TRANSFORM_ORIGIN}
        >
            <List>
                {items.map((item) => (
                    <MenuItem
                        onClick={() => {
                            onAction(item.key);
                            onClose();
                        }}
                    >
                        <Box gap={1} customClass="flex items-center">
                            {item.icon}
                            <Text font="semiBold" size={14}>
                                {item.label}
                            </Text>
                        </Box>
                    </MenuItem>
                ))}
            </List>
        </Popover>
    );
}
