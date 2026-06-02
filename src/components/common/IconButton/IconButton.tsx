import {
  IconButton as CustomIconButton,
  type IconButtonProps,
} from "@mui/material";
import "./icon-button.scss";
import classNames from "classnames";
interface IButtonIconProps extends IconButtonProps {
  customClass?: string;
}
function IconButton({ customClass, ...props }: IButtonIconProps) {
  const classess = classNames("icon-button", customClass);
  return (
    <CustomIconButton className={classess} {...props}>
      {props.children}
    </CustomIconButton>
  );
}

export default IconButton;
