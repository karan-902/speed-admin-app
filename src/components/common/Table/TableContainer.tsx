import {
    TableContainer as CustomTableContainer,
    type TableContainerProps,
} from "@mui/material";
import classNames from "classnames";
import { forwardRef } from "react";
import "./container.scss";
export interface ITableContainerProps extends TableContainerProps {
    customClass?: string;
}
const TableContainer = forwardRef<HTMLDivElement, ITableContainerProps>(
    ({ customClass, ...props }, ref) => {
        const classes = classNames("table-container", customClass);
        return (
            <CustomTableContainer className={classes} ref={ref} {...props} />
        );
    },
);

export default TableContainer;
