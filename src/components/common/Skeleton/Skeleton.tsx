import { Skeleton as CustomSkeleton, type SkeletonProps } from "@mui/material";
import classNames from "classnames";
import "./skeleton.scss";
interface ISkeletonProps extends SkeletonProps {
    customClass?: string;
}
export default function Skeleton({ customClass, ...props }: ISkeletonProps) {
    const classess = classNames("skeleton", customClass);
    return <CustomSkeleton className={classess} {...props} />;
}
