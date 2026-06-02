import classNames from "classnames";
import "./caption.scss";
import type { ReactNode } from "react";
import Box from "../Box/Box";

interface ICaptionProps {
  customClass?: string;
  children: ReactNode;
}
function Caption({ customClass, children, ...props }: ICaptionProps) {
  const classes = classNames("caption", customClass);
  return (
    <Box customClass={classes} {...props}>
      {children}
    </Box>
  );
}

export default Caption;
