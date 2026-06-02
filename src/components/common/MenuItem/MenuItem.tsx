import { MenuItem as CustomMenuItem, type MenuItemProps } from "@mui/material";
import classNames from "classnames";
import "./menu-item.scss";
interface IMenuProps extends MenuItemProps {
  customClass?: string;
}
export default function MenuItem({ customClass, ...props }: IMenuProps) {
  const classess = classNames("menu-item", customClass);
  return (
    <CustomMenuItem className={classess} {...props}>
      {props.children}
    </CustomMenuItem>
  );
}
