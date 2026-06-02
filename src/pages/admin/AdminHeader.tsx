import Box from "../../components/common/Box/Box";
import Text from "../../components/common/Text/Text";
import { logo } from "../../components/images";
import { logoNameForAdmin } from "../../components/messages";

function AdminHeader() {
    return (
        <Box customClass="flex items-center admin-header-logo" gap={1}>
            <img src={logo} alt="logo" height={28} width={28} />
            <Text font="semiBold" customClass="font14">
                {logoNameForAdmin}
            </Text>
        </Box>
    );
}

export default AdminHeader;
