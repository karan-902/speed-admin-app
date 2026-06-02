import { ListItemIcon, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";
import NavItem from "../NavItem/NavItem";

interface SidebarNavItemProps {
    item: { text: string; icon: React.ReactNode; path: string };
    active: boolean;
}

export default function SidebarNavItem({ item, active }: SidebarNavItemProps) {
    const navigate = useNavigate();
    return (
        <NavItem
            customClass={classNames("sidebar-nav-item", {
                "sidebar-nav-active": active,
            })}
            onClick={() => navigate(item.path)}
        >
            <ListItemIcon className="sidebar-nav-icon">
                {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
        </NavItem>
    );
}
