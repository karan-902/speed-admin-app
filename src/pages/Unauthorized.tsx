import { useNavigate } from "react-router-dom";
import { ShieldAlert } from "lucide-react";
import Box from "../components/common/Box/Box";
import Text from "../components/common/Text/Text";
import Button from "../components/common/Button/Button";
import {
    unauthorizedCode,
    unauthorizedTitle,
    unauthorizedDescription,
    backToLogin,
} from "../components/messages";

function Unauthorized() {
    const navigate = useNavigate();
    return (
        <Box customClass="status-screen">
            <Box customClass="status-card">
                <Box customClass="status-icon icon-danger">
                    <ShieldAlert size={40} />
                </Box>
                <Text customClass="status-code code-danger">
                    {unauthorizedCode}
                </Text>
                <Text customClass="status-title">{unauthorizedTitle}</Text>
                <Text customClass="status-description">
                    {unauthorizedDescription}
                </Text>
                <Button
                    customClass="login-button status-action"
                    label={backToLogin}
                    icon="next"
                    iconPosition="end"
                    onClick={() => navigate("/login")}
                />
            </Box>
        </Box>
    );
}

export default Unauthorized;
