import { useState, type MouseEvent } from "react";
import { Avatar, IconButton } from "@mui/material";
import { useReduxDispatch } from "../../redux/hooks";
import { buttonIcons, defaultUser, logo } from "../../components/images";
import {
    logoNameForAdmin,
    logoutText,
    profileText,
} from "../../components/messages";
import { logOut } from "../../redux/thunks";
import Container from "../../components/common/Container/Container";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import AdminMenu from "./AdminMenu";
import AppBar from "../../components/common/AppBar/AppBar";
import { useNavigate } from "react-router-dom";

function AdminHeader() {
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
                    {" "}
                    <Box customClass="flex items-center">
                        <img src={logo} alt="ecommerce-logo" />
                        <Box>
                            <Text font="semiBold" ml={1} customClass="font14">
                                {logoNameForAdmin}
                            </Text>
                        </Box>
                    </Box>
                    <Box customClass="flex items-center">
                        <IconButton className="setting">
                            {buttonIcons.settings}
                        </IconButton>
                        <IconButton onClick={openMenu} className="default-user">
                            <Avatar
                                sx={{ width: "34px", height: "34px" }}
                                src={defaultUser}
                                alt="default-user"
                            />
                        </IconButton>
                        <AdminMenu
                            items={ADMIN_MENU_ITEMS}
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

export default AdminHeader;
