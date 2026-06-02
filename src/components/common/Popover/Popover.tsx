import { Popover as CustomPopover, type PopoverProps } from "@mui/material";
import Box from "../Box/Box";
import "./popover.scss";
import classNames from "classnames";
interface IPopoverProps extends PopoverProps {
  customClass?: string;
}
export default function Popover({
  customClass,
  open,
  children,
  ...props
}: IPopoverProps) {
  const classes = classNames(`common-popover ${customClass}`);
  return (
    <CustomPopover className={classes} open={open} {...props}>
      <Box>{children}</Box>
    </CustomPopover>
  );
}
