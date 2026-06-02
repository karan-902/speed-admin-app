import {
  Breadcrumbs as CustomBreadCrumbs,
  type BreadcrumbsProps,
} from "@mui/material";
import classNames from "classnames";
import "./breadcrumb.scss";
interface IBreadCrumbs extends BreadcrumbsProps {
  customClass?: string;
}
export default function Breadcrumbs({ customClass, ...props }: IBreadCrumbs) {
  const classess = classNames(`breadcrumb ${customClass}`);
  return (
    <CustomBreadCrumbs aria-label="bread-crumb" className={classess} {...props}>
      {props.children}
    </CustomBreadCrumbs>
  );
}
