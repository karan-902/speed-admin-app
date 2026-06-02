import type { GridProps } from "@mui/material";
import classNames from "classnames";
import { Grid as CustomGrid } from "@mui/material";
import "./grid.scss";
interface CustomGridTypes extends GridProps {
    customClass?: string;
}
export default function Grid({
    customClass,
    children,
    ...props
}: CustomGridTypes) {
    const classess = classNames("grid", customClass);
    return (
        <CustomGrid className={classess} {...props}>
            {children}
        </CustomGrid>
    );
}
