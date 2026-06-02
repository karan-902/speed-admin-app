import { Button as CustomButton } from "@mui/material";
import "./button.scss";
import type { TButtonProps } from "../../../utils/components";
import classNames from "classnames";
import { buttonIcons } from "../../images";
import Text from "../Text/Text";
import Box from "../Box/Box";
function Button({
    label,
    children,
    customClass,
    icon,
    iconPosition = "start",
    ...props
}: TButtonProps) {
    const classes = classNames(`common-button ${customClass}`);
    if (icon && buttonIcons[icon]) {
        if (iconPosition === "start") {
            props.startIcon = buttonIcons[icon];
        } else {
            props.endIcon = buttonIcons[icon];
        }
    }
    return (
        <CustomButton className={classes} {...props}>
            {children && <Box>{children}</Box>}
            <Text className="common-button-text">{label}</Text>
        </CustomButton>
    );
}

export default Button;
