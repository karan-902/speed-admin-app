import { noDataFoundImage } from "../images";
import Caption from "./Caption/Caption";
import Text from "./Text/Text";
import Box from "./Box/Box";

interface EmptyDataProps {
  title?: string;
  description?: string;
}

function EmptyData({ title, description }: EmptyDataProps) {
  return (
    <Caption customClass="not-found table-caption">
      <Box customClass="flex items-center flex-col" width="100%">
        <img src={noDataFoundImage} alt="no-data-found" />
        <Text variant="h5" align="center" font="semiBold" size={18}>
          {title}
        </Text>
        <Text variant="h5" font="medium" align="center" size={14}>
          {description}
        </Text>
      </Box>
    </Caption>
  );
}

export default EmptyData;
