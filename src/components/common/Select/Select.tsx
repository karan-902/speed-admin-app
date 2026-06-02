import classNames from "classnames";
import {
  Alert,
  Select as CustomSelect,
  type BaseSelectProps,
} from "@mui/material";
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
}: selectPropsType) {
  const classes = classNames(`common-select-wrapper ${customClass}`);

  return (
    <>
      <CustomSelect
        error={error}
        displayEmpty
        renderValue={(value) => {
          if (!value) {
            return <span style={{ color: "#848b9e" }}>{placeholder}</span>;
          }
          const selectedItem = Children.toArray(children).find(
            (child: any) => child.props.value === value,
          ) as any;

          return selectedItem?.props.children;
        }}
        value={value ?? ""}
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
