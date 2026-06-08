import classNames from "classnames";
import {
    Alert,
    Select as CustomSelect,
    type BaseSelectProps,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./select.scss";
import { Children } from "react";
import { iconsForAlert } from "../../images";

interface selectPropsType extends BaseSelectProps {
    customClass: string;
    placeholder?: string;
    helperText?: string | boolean | undefined;
}
export default function SelectData({
    children,
    customClass,
    onChange,
    value,
    placeholder,
    error,
    helperText,
    multiple,
    disabled,
}: selectPropsType) {
    const classes = classNames(`common-select-wrapper ${customClass}`);

    const renderValue = (selected: unknown) => {
        const isEmpty =
            selected == null ||
            selected === "" ||
            (Array.isArray(selected) && selected.length === 0);
        if (isEmpty) {
            return <span style={{ color: "#848b9e" }}>{placeholder}</span>;
        }
        const items = Children.toArray(children) as any[];
        const labelOf = (val: unknown) =>
            items.find((child) => child.props.value === val)?.props.children;

        return Array.isArray(selected)
            ? selected.map(labelOf).filter(Boolean).join(", ")
            : labelOf(selected);
    };

    return (
        <>
            <CustomSelect
                error={error}
                multiple={multiple}
                disabled={disabled}
                IconComponent={KeyboardArrowDownIcon}
                displayEmpty
                renderValue={renderValue}
                value={value ?? (multiple ? [] : "")}
                className={classes}
                onChange={onChange}
            >
                {children}
            </CustomSelect>
            {helperText && (
                <Alert
                    sx={{ marginTop: "10px" }}
                    severity={"error"}
                    variant="standard"
                    icon={iconsForAlert["error"]}
                >
                    {helperText}
                </Alert>
            )}
        </>
    );
}
