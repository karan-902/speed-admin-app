import classNames from "classnames";
import { Link as CustomLink } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import "./link.scss";
interface ILinkProps extends LinkProps {
  customClass?: string;
}
export default function Link({ to, children, customClass }: ILinkProps) {
  const classess = classNames(`link ${customClass}`);
  return (
    <CustomLink to={to} className={classess}>
      {children}
    </CustomLink>
  );
}
