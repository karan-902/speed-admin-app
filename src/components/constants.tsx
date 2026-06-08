import type { DiagonalProps } from "../utils/components";
import classNames from "classnames";
import "../styles/Diagonal.scss";
import "../styles/Input.scss";
import Box from "./common/Box/Box";
import type { Column } from "../utils/components";
import type { Ttabs } from "../utils/components";
import { ArrowDown, ArrowUp } from "lucide-react";

export const DiagonalDiv = ({
    src,
    children,
    customClass,
    ...props
}: DiagonalProps) => {
    const classes = classNames(`overlay-container ${customClass}`);
    return (
        <>
            <Box
                customClass="vector-diagonal-div"
                sx={{ backgroundImage: `url(${src})` }}
            />
            <Box customClass="vector-diagonal-sub-div" />
            <Box {...props} customClass={classes}>
                {children}
            </Box>
        </>
    );
};
export const commonTabs: { label: string; value: Ttabs }[] = [
    { label: "All", value: "all" },
    { label: "Available", value: "available" },
    { label: "Archive", value: "archive" },
];

export const renderField = <T,>(col: Column<T>, data: T) => {
    if (col.render) return col.render(data);
    return data[col.key];
};

export const headerCellStyle = {
    minWidth: "170px !important",
    paddingLeft: "38px !important",
};

export const Delta = ({ pct }: { pct: number }) => {
    const up = pct >= 0;
    return (
        <Box
            customClass={`stat-delta ${up ? "stat-delta-up" : "stat-delta-down"}`}
        >
            {up ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
            {Math.abs(pct)}%
        </Box>
    );
};
