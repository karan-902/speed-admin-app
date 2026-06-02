import { Box as CustomBox } from "@mui/material";
import type { BoxProps } from "@mui/material";
import classNames from "classnames";
import "./box.scss";
interface IBoxProps extends BoxProps {
  customClass?: string;
}
export default function Box({ customClass, ...props }: IBoxProps) {
  const classes = classNames("box ", customClass);
  return (
    <CustomBox className={classes} {...props}>
      {props.children}
    </CustomBox>
  );
}
