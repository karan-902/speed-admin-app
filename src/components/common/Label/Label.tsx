import { InputLabel, type InputLabelProps } from "@mui/material";
import type { ReactNode } from "react";
import Box from "../Box/Box";
import Text from "../Text/Text";
import classNames from "classnames";
import "./label.scss";
import { optionalText } from "../../messages";
interface ILabelProps extends InputLabelProps {
  customClass?: string;
  icon?: ReactNode;
  label?: string;
  optional?: boolean;
}

export default function Label({
  customClass,
  icon,
  label,
  optional,
}: ILabelProps) {
  const classess = classNames(`label ${customClass}`);
  return (
    <InputLabel className={classess}>
      <Box customClass="flex items-center label-row">
        {icon && icon}
        <Text component={"span"}>{label}</Text>
        {optional && (
          <Text component={"span"} customClass="label-optional">
            {optionalText}
          </Text>
        )}
      </Box>
    </InputLabel>
  );
}
