import { useState, type MouseEvent } from "react";
import { type PopoverOrigin } from "@mui/material";

import { logoNameForAdmin, logoutText, profileText } from "./messages";
import { useNavigate } from "react-router-dom";
import { useReduxDispatch } from "../redux/hooks";
import { buttonIcons, logo } from "./images";
import { logOut } from "../redux/thunks";
import Container from "./common/Container/Container";
import Box from "./common/Box/Box";
import AppBar from "./common/AppBar/AppBar";
import Text from "./common/Text/Text";
import IconButton from "./common/IconButton/IconButton";
import Avatar from "./common/Avatar/Avatar";
import PopoverMenu from "./common/PopoverMenu";

const ANCHOR_ORIGIN: PopoverOrigin = {
    vertical: "bottom",
    horizontal: "right",
};
const TRANSFORM_ORIGIN: PopoverOrigin = {
    vertical: "top",
    horizontal: "right",
};
export default function Header() {
    const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const dispatch = useReduxDispatch();
    const openMenu = (e: MouseEvent<HTMLElement>) =>
        setMenuAnchorEl(e.currentTarget);
    const closeMenu = () => setMenuAnchorEl(null);
    const ADMIN_MENU_ITEMS = [
        {
            key: "profile",
            icon: buttonIcons.profile,
            label: profileText,
        },
        {
            key: "logout",
            icon: buttonIcons.logoutPower,
            label: logoutText,
        },
    ];
    const MenuActions = (key: string) => {
        switch (key) {
            case "logout":
                dispatch(logOut());
                break;
            case "profile":
                navigate("/profile");
                break;
            default:
                break;
        }
    };
    return (
        <Box customClass="header Mui-fixed">
            <Container maxWidth="xl">
                <AppBar toolbarClass="header-content" component={"header"}>
                    <Box customClass="flex items-center">
                        <img src={logo} alt="ecommerce-logo" />
                        <Text font="semiBold" ml={1} customClass="font14">
                            {logoNameForAdmin}
                        </Text>
                    </Box>
                    <Box customClass="flex items-center">
                        <IconButton customClass="setting" icon="settings" />
                        <IconButton
                            width={36}
                            height={36}
                            onClick={openMenu}
                            className="default-user"
                        >
                            <Avatar size={34} src={buttonIcons.profileIcon} />
                        </IconButton>
                        <PopoverMenu
                            anchorOrigin={ANCHOR_ORIGIN}
                            transformOrigin={TRANSFORM_ORIGIN}
                            customClass="header-popover"
                            data={ADMIN_MENU_ITEMS}
                            anchorEl={menuAnchorEl}
                            onClose={closeMenu}
                            onAction={MenuActions}
                        />
                    </Box>
                </AppBar>
            </Container>
        </Box>
    );
}
