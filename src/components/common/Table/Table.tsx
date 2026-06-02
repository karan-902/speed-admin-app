import { Table as CustomTable, type TableProps } from "@mui/material";
import classNames from "classnames";
import "./table.scss";

export interface ITable extends TableProps {
    customClass?: string;
}
function Table({ customClass, ...props }: ITable) {
    const clasess = classNames("table", customClass);
    return (
        <CustomTable className={clasess} {...props}>
            {props.children}
        </CustomTable>
    );
}

export default Table;
