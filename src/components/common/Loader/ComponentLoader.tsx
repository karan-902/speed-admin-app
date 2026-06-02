import "./component-loader.scss";
import Box from "../Box/Box";
import Text from "../Text/Text";
import { speedPreloader } from "../../images";
import classNames from "classnames";
interface ComponentLoaderProps {
  customClass?: string;
  text?: string;
}
function ComponentLoader({ customClass, text }: ComponentLoaderProps) {
  const classes = classNames("component-loader", customClass);

  return (
    <Box customClass={classes}>
      <img src={speedPreloader} alt={speedPreloader} />
      <Text customClass="grey-text" size={13}>
        {text}
      </Text>
    </Box>
  );
}

export default ComponentLoader;
