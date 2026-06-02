import { Tooltip as CustomTooltip, type TooltipProps } from "@mui/material";
import classNames from "classnames";
import Box from "../Box/Box";
import type { ReactNode } from "react";
import Text from "../Text/Text";
import "./tooltip.scss";
interface ICustomTooltip extends Omit<TooltipProps, "title"> {
  customClass?: string;
  icon?: ReactNode;
  label?: string;
}
export default function Tooltip({
  customClass,
  icon,
  label,
  children,
  ...props
}: ICustomTooltip) {
  const classess = classNames("common-tooltip", customClass);
  const tooltipContent = (
    <Box display="flex" alignItems="center" gap={0.5}>
      {icon && icon}
      <Text customClass="font14 copy-text">{label}</Text>
    </Box>
  );
  return (
    <CustomTooltip
      title={tooltipContent}
      classes={{ popper: classess }}
      {...props}
    >
      {children}
    </CustomTooltip>
  );
}
