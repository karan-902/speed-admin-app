import { Popper as CustomPopper, type PopperProps } from "@mui/material";
import classNames from "classnames";
import { useMemo, useRef } from "react";
import "./popper.scss";

interface ICustomPopper extends PopperProps {
  customClass?: string;
  arrow?: boolean;
}
export default function Popper({
  customClass,
  open,
  arrow = false,
  modifiers,
  children,
  ...props
}: ICustomPopper) {
  const classess = classNames("custom-popper", customClass);
  const arrowRef = useRef<HTMLDivElement | null>(null);

  const popperModifiers = useMemo(() => {
    return [
      ...(modifiers || []),
      {
        name: "offset",
        options: {
          offset: [0, 8],
        },
      },
      arrow
        ? {
            name: "arrow",
            options: {
              element: arrowRef.current,
            },
          }
        : null,
    ].filter(Boolean);
  }, [arrow, modifiers, arrowRef.current]);

  return (
    <CustomPopper
      modifiers={popperModifiers as any}
      disablePortal={false}
      {...props}
      className={classess}
      open={open}
      placement="bottom"
    >
      {(popperProps: any) => (
        <>
          {arrow && <span ref={arrowRef} className="popper-arrow" />}
          {typeof children === "function" ? children(popperProps) : children}
        </>
      )}
    </CustomPopper>
  );
}
