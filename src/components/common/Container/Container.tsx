import { Container as CustomContainer } from "@mui/material";
import "./container.scss";
import type { ContainerProps } from "@mui/material";
import classNames from "classnames";
interface IContainer extends ContainerProps {
  customClass?: string;
}
function Container({ customClass, ...props }: IContainer) {
  const classess = classNames("container", customClass);
  return (
    <CustomContainer {...props} className={classess}>
      {props.children}
    </CustomContainer>
  );
}

export default Container;
