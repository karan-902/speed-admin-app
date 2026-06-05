import "../../styles/sidebar.scss";
import "../../components/common/Card/card.scss";
import Box from "../../components/common/Box/Box";
import {
    CardContent,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import classNames from "classnames";
import { useLocation, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    LayoutGrid,
    Package,
    ShoppingBag,
    Users as UsersIcon,
} from "lucide-react";
import { DashboardIcon } from "../../components/constants";

const ICON_MUTED = "#848b9e";

type NavItem = { text: string; icon: React.ReactNode; path: string };

const MAIN_NAV: NavItem[] = [
    {
        text: "Dashboard",
        icon: DashboardIcon(),
        path: "/",
    },
    {
        text: "Categories",
        icon: <LayoutGrid size={18} color={ICON_MUTED} />,
        path: "/categories",
    },
    {
        text: "Products",
        icon: <Package size={18} color={ICON_MUTED} />,
        path: "/products",
    },
    {
        text: "Orders",
        icon: <ShoppingBag size={18} color={ICON_MUTED} />,
        path: "/orders",
    },
    {
        text: "Users",
        icon: <UsersIcon size={18} color={ICON_MUTED} />,
        path: "/users",
    },
];

interface ISidebarProps {
    customClass: string;
}

function Sidebar({ customClass }: ISidebarProps) {
    const classes = classNames("sidebar-wrapper", customClass);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path: string) =>
        path === "/"
            ? location.pathname === "/"
            : location.pathname === path ||
              location.pathname.startsWith(`${path}/`);

    return (
        <Box component={"nav"} width={250}>
            <Drawer variant="permanent" className={classes}>
                <CardContent className="main-menu-item">
                    <List>
                        {MAIN_NAV.map((item) => (
                            <ListItem key={item.path} disablePadding>
                                <ListItemButton
                                    className={
                                        isActive(item.path) ? "active" : ""
                                    }
                                    onClick={() => navigate(item.path)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Drawer>
        </Box>
    );
}

export default Sidebar;
