import { InputLabel, type InputLabelProps } from "@mui/material";
import type { ReactNode } from "react";
import Box from "../Box/Box";
import Text from "../Text/Text";
import classNames from "classnames";
import "./label.scss";
interface ILabelProps extends InputLabelProps {
  customClass?: string;
  icon?: ReactNode;
  label?: string;
}

export default function Label({ customClass, icon, label }: ILabelProps) {
  const classess = classNames(`label ${customClass}`);
  return (
    <InputLabel className={classess}>
      {icon && (
        <Box customClass="flex items-center">
          {icon}
          <Text component={"span"}>{label}</Text>
        </Box>
      )}
      <Text component={"span"}>{label}</Text>
    </InputLabel>
  );
}
