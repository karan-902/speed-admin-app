import { Switch as CustomSwitch, type SwitchProps } from "@mui/material";
import classNames from "classnames";
import "./switch.scss";
interface ISwitchProps extends SwitchProps {
  customClass: string;
}
export default function Switch({ customClass, ...props }: ISwitchProps) {
  const classess = classNames(`common-switch ${customClass}`);
  return <CustomSwitch {...props} className={classess} />;
}
