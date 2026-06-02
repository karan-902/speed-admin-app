import { Card as CustomCard, type CardProps } from "@mui/material";
import classNames from "classnames";
import "./card.scss";
interface CustomCardTypes extends CardProps {
  customClass: string;
}
function Card({ customClass, children, ...props }: CustomCardTypes) {
  const classess = classNames(`common-card ${customClass}`);
  return (
    <CustomCard className={classess} {...props}>
      {children}
    </CustomCard>
  );
}

export default Card;
