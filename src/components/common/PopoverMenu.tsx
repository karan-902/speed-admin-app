import React from "react";
import Popover from "./Popover/Popover";
import { List, type PopoverOrigin } from "@mui/material";
import MenuItem from "./MenuItem/MenuItem";
import Box from "./Box/Box";
import Text from "./Text/Text";
interface MenuItem {
    key: string;
    icon: React.ReactNode;
    label: string;
}
interface IMenuProps {
    customClass?: string;
    anchorEl: HTMLElement | null;
    anchorOrigin: PopoverOrigin;
    transformOrigin: PopoverOrigin;
    onClose: () => void;
    data: MenuItem[];
    onAction: (key: string) => void;
}
export default function PopoverMenu({
    anchorEl,
    data,
    onAction,
    onClose,
    customClass,
    anchorOrigin,
    transformOrigin,
}: IMenuProps) {
    return (
        <Popover
            customClass={customClass}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
        >
            <List>
                {data.map((item) => (
                    <MenuItem
                        onClick={() => {
                            onAction(item.key);
                            onClose();
                        }}
                    >
                        <Box gap={1} customClass="flex items-center">
                            {item.icon && item.icon}
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
