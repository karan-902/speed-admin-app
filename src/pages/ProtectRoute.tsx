import { Outlet, Navigate } from "react-router-dom";
import Box from "../components/common/Box/Box";
import Sidebar from "./admin/Sidebar";
import AdminHeader from "./admin/AdminHeader";
import { useReduxSelector } from "../redux/hooks";

function ProtectRoute() {
    const session = useReduxSelector((state) => state.auth.session);
    if (!session?.access_token) return <Navigate to="/login" replace />;
    return (
        <Box customClass="app-root">
            <AdminHeader />
            <Box customClass="app-root-container" sx={{ width: "100%" }}>
                <Sidebar customClass="sidebar-closure" />
                <Box
                    sx={{ width: `calc(100% - 250px)`, flex: 1, flexGrow: 1 }}
                    component={"main"}
                    customClass="section-container"
                >
                    <Outlet />
                </Box>
            </Box>
        </Box>
    );
}

export default ProtectRoute;
