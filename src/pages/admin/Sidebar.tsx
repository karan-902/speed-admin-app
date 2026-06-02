import "../../styles/sidebar.scss";
import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { Drawer } from "@mui/material";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import { logo } from "../../components/images";
import SidebarNavItem from "../../components/common/Item/SidebarNavItem";
import {
    LayoutDashboard,
    LayoutGrid,
    Package,
    ShoppingBag,
    Users as UsersIcon,
    User,
    Settings,
} from "lucide-react";

const ICON_MUTED = "#848b9e";

type NavItem = { text: string; icon: React.ReactNode; path: string };

const MAIN_NAV: NavItem[] = [
    { text: "Dashboard",  icon: <LayoutDashboard size={18} color={ICON_MUTED} />, path: "/" },
    { text: "Categories", icon: <LayoutGrid      size={18} color={ICON_MUTED} />, path: "/categories" },
    { text: "Products",   icon: <Package         size={18} color={ICON_MUTED} />, path: "/products" },
    { text: "Orders",     icon: <ShoppingBag     size={18} color={ICON_MUTED} />, path: "/orders" },
    { text: "Users",      icon: <UsersIcon       size={18} color={ICON_MUTED} />, path: "/users" },
];

const BOTTOM_NAV: NavItem[] = [
    { text: "Profile",  icon: <User     size={18} color={ICON_MUTED} />, path: "/profile" },
    { text: "Settings", icon: <Settings size={18} color={ICON_MUTED} />, path: "/settings" },
];

interface ISidebarProps {
    customClass: string;
}

function Sidebar({ customClass }: ISidebarProps) {
    const classes = classNames("sidebar-wrapper", customClass);
    const location = useLocation();

    const isActive = (path: string) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname === path ||
              location.pathname.startsWith(`${path}/`);

    return (
        <Box className="sidebar-container" component={"nav"} width={250}>
            <Drawer variant="permanent" className={classes}>
                {/* Logo */}
                <Box customClass="sidebar-logo-area flex items-center" gap={1.5}>
                    <img src={logo} alt="logo" height={32} width={32} />
                    <Text customClass="sidebar-logo-name">Speed Admin</Text>
                </Box>

                {/* Main nav */}
                <Box customClass="sidebar-content">
                    {MAIN_NAV.map((item) => (
                        <SidebarNavItem
                            key={item.path}
                            item={item}
                            active={isActive(item.path)}
                        />
                    ))}
                </Box>

                {/* Bottom nav */}
                <Box customClass="sidebar-bottom">
                    {BOTTOM_NAV.map((item) => (
                        <SidebarNavItem
                            key={item.path}
                            item={item}
                            active={isActive(item.path)}
                        />
                    ))}
                </Box>
            </Drawer>
        </Box>
    );
}

export default Sidebar;
