import { Outlet, Navigate } from "react-router-dom";
import Box from "../components/common/Box/Box";
import { useReduxDispatch, useReduxSelector } from "../redux/hooks";
import { useEffect } from "react";
import { callAPIInterface } from "../utils";
import type { TCategoriesResponse } from "../utils/utils";
import { setCategories } from "../redux/category/category.slice";
import Sidebar from "../components/common/Sidebar";
import Header from "../components/Header";

function ProtectRoute() {
    const session = useReduxSelector((state) => state.auth.session);
    const dispatch = useReduxDispatch();
    if (!session?.access_token) return <Navigate to="/login" replace />;
    useEffect(() => {
        callAPIInterface<void, TCategoriesResponse>("GET", "/categories")
            .then((res) => dispatch(setCategories(res.data)))
            .catch((err) => console.error(err));
    }, []);
    return (
        <Box customClass="app-root">
            <Header />
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
