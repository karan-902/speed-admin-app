import { X } from "lucide-react";
import Drawer from "./Drawer/Drawer";
import Box from "./Box/Box";
import Text from "./Text/Text";
import Button from "./Button/Button";

interface FilterDrawerProps {
    open: boolean;
    title?: string;
    onClose: () => void;
    onApply: () => void;
    onClear: () => void;
    children: React.ReactNode;
}

function FilterDrawer({
    open,
    title = "Filters",
    onClose,
    onApply,
    onClear,
    children,
}: FilterDrawerProps) {
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            customClass="filter-drawer"
        >
            <Box customClass="filter-drawer-head">
                <Text font="semiBold" size={16}>
                    {title}
                </Text>
                <button className="filter-drawer-close" onClick={onClose}>
                    <X size={18} />
                </button>
            </Box>

            <Box customClass="filter-drawer-body">{children}</Box>

            <Box customClass="filter-drawer-foot">
                <Button
                    customClass="button-create filter-clear-btn"
                    variant="outlined"
                    size="medium"
                    label="Clear"
                    onClick={onClear}
                />
                <Button
                    customClass="button-create-submit filter-apply-btn"
                    size="medium"
                    label="Apply"
                    onClick={onApply}
                />
            </Box>
        </Drawer>
    );
}

export default FilterDrawer;
