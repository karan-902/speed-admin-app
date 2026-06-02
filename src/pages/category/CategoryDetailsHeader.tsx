import { useState, type MouseEvent } from "react";
import Breadcrumbs from "../../components/common/Breadcrumb/Breadcrumb";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import Link from "../../components/common/Link/Link";
import RenderWithFallBack from "../../components/common/RenderWithFallBack";
import CustomSkeleton from "../../components/common/Skeleton/Skeleton";
import Popover from "../../components/common/Popover/Popover";
import { List, MenuItem } from "@mui/material";
import { buttonIcons } from "../../components/images";
import type { TCategoryDetailResponse } from "../../utils/utils";

interface CategoryHeaderProps {
    previousNavlink: string;
    data: TCategoryDetailResponse | null;
    loading: boolean;
    onEdit: () => void;
    onDelete: () => void;
}

function CategoryDetailsHeader({
    previousNavlink,
    data,
    loading,
    onEdit,
    onDelete,
}: CategoryHeaderProps) {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (e: MouseEvent<HTMLElement>) => setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);

    const handleEdit = () => { closeMenu(); onEdit(); };
    const handleDelete = () => { closeMenu(); onDelete(); };

    return (
        <>
            <Box component={"nav"}>
                <RenderWithFallBack
                    loading={loading}
                    skeleton={<CustomSkeleton customClass="product-nav-wrapper" variant="text" width="40%" />}
                >
                    <Breadcrumbs component={"ol"} separator="›">
                        <Link customClass="breadcrumb-link" to={`/${previousNavlink}`}>
                            {previousNavlink[0]?.toUpperCase() + previousNavlink.slice(1)}
                        </Link>
                        <Text customClass="grey-text font14">Details</Text>
                    </Breadcrumbs>
                </RenderWithFallBack>
            </Box>

            <Box className="header-content">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <RenderWithFallBack
                        loading={loading}
                        skeleton={<CustomSkeleton customClass="product-title-wrapper" variant="text" />}
                    >
                        <Text customClass="font28 font-SemiBold">{data?.name}</Text>
                    </RenderWithFallBack>

                    <RenderWithFallBack
                        loading={loading}
                        skeleton={<CustomSkeleton customClass="product-status-wrapper" variant="rectangular" />}
                    >
                        <Box customClass="flex items-center" onClick={openMenu}>
                            {buttonIcons.horizontalThreeDots}
                        </Box>
                    </RenderWithFallBack>
                </Box>
            </Box>

            <Popover
                customClass="header-popover"
                open={Boolean(menuAnchorEl)}
                anchorEl={menuAnchorEl}
                onClose={closeMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
                <List>
                    <MenuItem onClick={handleEdit}>
                        <Box gap={1} customClass="flex items-center">
                            {buttonIcons.edit}
                            <Text font="semiBold" size={14}>Edit</Text>
                        </Box>
                    </MenuItem>
                    <MenuItem onClick={handleDelete}>
                        <Box gap={1} customClass="flex items-center">
                            {buttonIcons.delete}
                            <Text font="semiBold" size={14}>Delete</Text>
                        </Box>
                    </MenuItem>
                </List>
            </Popover>
        </>
    );
}

export default CategoryDetailsHeader;
