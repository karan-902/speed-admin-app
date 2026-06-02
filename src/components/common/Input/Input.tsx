import { forwardRef, useState, type FC } from "react";
import classNames from "classnames";
import Box from "../Box/Box";
import { InputBase, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import type { InputProps } from "../../../utils/components";
import "./input.scss";
import AlertMessage from "../AlertMessage/AlertMessage";
import Label from "../Label/Label";

const Input: FC<InputProps> = forwardRef(
    (
        {
            isFileInput,
            showLabel,
            fullWidth,
            label,
            type = "text",
            isError,
            isPasswordVisible,
            helperText,
            error,
            value,
            customClass,
            elementClass,
            ...props
        },
        ref,
    ) => {
        const [inputType, setInputType] = useState("password");

        const toggleShowPassword = () => {
            if (inputType === "password") {
                setInputType("text");
            } else {
                setInputType("password");
            }
        };
        const clasess = classNames(`common-input ${customClass}`);
        const elementClasess = classNames(`input-element ${elementClass}`);
        const isPasswordField = type === "password";

        return (
            <Box className={elementClasess}>
                {showLabel && <Label label={label} />}
                <InputBase
                    className={clasess}
                    error={isError}
                    value={value}
                    type={isPasswordField ? inputType : type}
                    fullWidth={fullWidth}
                    {...props}
                    inputRef={ref}
                    endAdornment={
                        props?.endAdornment
                            ? props.endAdornment
                            : isPasswordVisible && (
                                  <InputAdornment
                                      className="password-visibility-icon"
                                      position="end"
                                  >
                                      {inputType === "text" ? (
                                          <VisibilityOffIcon
                                              onClick={toggleShowPassword}
                                          />
                                      ) : (
                                          <VisibilityIcon
                                              onClick={toggleShowPassword}
                                          />
                                      )}
                                  </InputAdornment>
                              )
                    }
                />
                {helperText && (
                    <AlertMessage
                        severity={"error"}
                        message={helperText as string}
                    />
                )}
            </Box>
        );
    },
);

export default Input;
