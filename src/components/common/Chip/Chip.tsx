import { Chip as CustomChip, type ChipProps } from "@mui/material";
import classNames from "classnames";
import "./chip.scss";
interface CustomChipTypes extends ChipProps {
    customClass: string;
}
function Chip({ label, customClass, ...props }: CustomChipTypes) {
    const classess = classNames(customClass, "common-chip");
    return <CustomChip className={classess} label={label} {...props} />;
}

export default Chip;
