import { Drawer as CustomDrawer, type DrawerProps } from "@mui/material";
import classNames from "classnames";
import "./drawer.scss";

interface IDrawerProps extends DrawerProps {
    customClass?: string;
}

function Drawer({ customClass, children, ...props }: IDrawerProps) {
    const classes = classNames("common-drawer", customClass);
    return (
        <CustomDrawer className={classes} {...props}>
            {children}
        </CustomDrawer>
    );
}

export default Drawer;
