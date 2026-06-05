import {
    AppBar as CustomAppBar,
    type AppBarProps,
    Toolbar,
} from "@mui/material";
import classNames from "classnames";
import "./appbar.scss";
interface IAppBar extends AppBarProps {
    customClass?: string;
    toolbarClass?: string;
}
function AppBar({ customClass, toolbarClass, ...props }: IAppBar) {
    const classess = classNames("appbar", customClass);
    const toolbarclasses = classNames("toolbar", toolbarClass);
    return (
        <CustomAppBar className={classess} {...props}>
            <Toolbar className={toolbarclasses}>{props.children}</Toolbar>
        </CustomAppBar>
    );
}

export default AppBar;
