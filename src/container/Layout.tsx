import { Outlet } from "react-router-dom";
import Notification from "../components/common/Notification";
import BackdropLoader from "../components/common/Loader/BackdropLoader";

function Layout() {
    return (
        <>
            <Outlet />
            <BackdropLoader />
            <Notification />
        </>
    );
}

export default Layout;
