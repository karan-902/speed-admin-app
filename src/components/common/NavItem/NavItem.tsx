import { ListItemButton, type ListItemButtonProps } from "@mui/material";
import classNames from "classnames";
import "./nav-item.scss";

interface NavItemProps extends ListItemButtonProps {
    customClass?: string;
}

function NavItem({ customClass, children, ...props }: NavItemProps) {
    const classes = classNames("nav-item", customClass);
    return (
        <ListItemButton className={classes} {...props}>
            {children}
        </ListItemButton>
    );
}

export default NavItem;
