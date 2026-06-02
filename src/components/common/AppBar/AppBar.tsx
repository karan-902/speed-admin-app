import {
  AppBar as CustomAppBar,
  type AppBarProps,
  Toolbar,
} from "@mui/material";
import classNames from "classnames";
import "./appbar.scss";
interface IAppBar extends AppBarProps {
  customClass?: string;
}
function AppBar({ customClass, ...props }: IAppBar) {
  const classess = classNames("appbar", customClass);
  return (
    <CustomAppBar className={classess} {...props}>
      <Toolbar>{props.children}</Toolbar>
    </CustomAppBar>
  );
}

export default AppBar;
