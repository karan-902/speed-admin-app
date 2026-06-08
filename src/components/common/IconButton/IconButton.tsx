import {
    IconButton as CustomIconButton,
    type IconButtonProps,
} from "@mui/material";
import "./icon-button.scss";
import classNames from "classnames";
import { buttonIcons } from "../../images";
import type { ReactElement } from "react";

interface IButtonIconProps extends IconButtonProps {
    icon?: keyof typeof buttonIcons;
    width?: number;
    height?: number;
    customClass?: string;
}
function IconButton({
    customClass,
    width,
    height,
    icon,
    ...props
}: IButtonIconProps) {
    const classess = classNames("icon-button", customClass);
    const renderIcon = () => {
        if (!icon) return null;
        const iconValue = buttonIcons[icon];
        if (typeof iconValue === "string") {
            return <img src={iconValue} alt={icon} />;
        }
        return iconValue as ReactElement;
    };
    return (
        <CustomIconButton
            sx={{ width: width, height: height }}
            className={classess}
            {...props}
        >
            {props.children}
            {renderIcon()}
        </CustomIconButton>
    );
}

export default IconButton;
