import { Routes, Route } from "react-router-dom";
import PublicRoute from "../pages/PublicRoute";
import Login from "../pages/login";
import Register from "../pages/register";
import ProtectRoute from "../pages/ProtectRoute";
import Products from "../pages/product/Products";
import ProductDetails from "../pages/product/ProductDetails";
import CategoryDetails from "../pages/category/CategoryDetails";
import Categories from "../pages/category/Categories";
import Orders from "../pages/orders/Orders";
import Users from "../pages/users";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";

function EcommerceRouter() {
    return (
        <Routes>
            <Route element={<PublicRoute />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectRoute />}>
                <Route path="/" element={<Dashboard />} />

                <Route path="/products">
                    <Route index element={<Products />} />
                    <Route path=":id" element={<ProductDetails />} />
                </Route>

                <Route path="/categories">
                    <Route index element={<Categories />} />
                    <Route path=":id" element={<CategoryDetails />} />
                </Route>

                <Route path="/orders" element={<Orders />} />
                <Route path="/users" element={<Users />} />
                <Route path="/profile" element={<Profile />} />
            </Route>

            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}

export default EcommerceRouter;
