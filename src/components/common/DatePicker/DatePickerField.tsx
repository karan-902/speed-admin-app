import { type FC } from "react";
import classNames from "classnames";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import type { Dayjs } from "dayjs";
import Box from "../Box/Box";
import Label from "../Label/Label";
import AlertMessage from "../AlertMessage/AlertMessage";
import "./datepicker.scss";

export interface DatePickerFieldProps {
    customClass?: string;
    showLabel?: boolean;
    label?: string;
    optional?: boolean;
    isError?: boolean;
    helperText?: string;
    value?: Dayjs | null;
    onChange?: (value: Dayjs | null) => void;
    onBlur?: React.FocusEventHandler;
    disabled?: boolean;
    minDate?: Dayjs;
    maxDate?: Dayjs;
    disablePast?: boolean;
}

const DatePickerField: FC<DatePickerFieldProps> = ({
    customClass,
    showLabel,
    label,
    optional,
    isError,
    helperText,
    value,
    onChange,
    onBlur,
    ...props
}) => {
    return (
        <Box className="input-element">
            {showLabel && <Label label={label} optional={optional} />}
            <DatePicker
                value={value ?? null}
                onChange={onChange}
                slotProps={{
                    textField: {
                        className: classNames(
                            "custom-date-picker-textfield",
                            customClass,
                        ),
                        error: isError,
                        onBlur,
                    },
                    desktopPaper: {
                        className: "custom-date-picker",
                    },
                    openPickerButton: { size: "small" },
                }}
                {...props}
            />
            {helperText && (
                <AlertMessage severity="error" message={helperText} />
            )}
        </Box>
    );
};

export default DatePickerField;
