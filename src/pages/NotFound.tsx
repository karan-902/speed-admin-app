import { useNavigate } from "react-router-dom";
import { Compass } from "lucide-react";
import Box from "../components/common/Box/Box";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import {
    notFoundCode,
    notFoundTitle,
    notFoundDescription,
    backToDashboard,
} from "../components/messages";

function NotFound() {
    const navigate = useNavigate();
    return (
        <Box customClass="status-screen">
            <Box customClass="status-card">
                <Box customClass="status-icon icon-info">
                    <Compass size={40} />
                </Box>
                <Text customClass="status-code">{notFoundCode}</Text>
                <Text customClass="status-title">{notFoundTitle}</Text>
                <Text customClass="status-description">
                    {notFoundDescription}
                </Text>
                <Button
                    customClass="login-button status-action"
                    label={backToDashboard}
                    icon="next"
                    iconPosition="end"
                    onClick={() => navigate("/")}
                />
            </Box>
        </Box>
    );
}

export default NotFound;
