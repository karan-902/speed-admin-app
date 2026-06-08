import { Avatar as CustomAvatar, type AvatarProps } from "@mui/material";
import classNames from "classnames";

interface IAvatarProps extends AvatarProps {
    customClass?: string;
    size?: number;
}
function Avatar({ size, customClass, ...props }: IAvatarProps) {
    const classes = classNames("avatar", customClass);
    return (
        <CustomAvatar
            className={classes}
            sx={{ width: size, height: size }}
            {...props}
        />
    );
}

export default Avatar;
