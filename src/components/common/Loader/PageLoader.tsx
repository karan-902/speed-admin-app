import { Backdrop, Card, CardContent, CardMedia } from "@mui/material";
import classNames from "classnames";
import "./loader.scss";
import Text from "../Text/Text";
import { speedPreloader } from "../../images";

interface PageLoaderProps {
  customClass?: string;
  loading: boolean;
  text?: string;
}
function PageLoader({ customClass, loading, text }: PageLoaderProps) {
  const classess = classNames(`backdrop-loader ${customClass}`);
  return (
    <Backdrop open={loading} className={classess}>
      <Card>
        <CardMedia component="img" image={speedPreloader} />
        <CardContent>
          <Text variant="h4" fontSize={14} align="center" className="grey-text">
            {text}
          </Text>
        </CardContent>
      </Card>
    </Backdrop>
  );
}

export default PageLoader;
