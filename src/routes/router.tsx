import { Routes, Route, createBrowserRouter } from "react-router-dom";
import PublicRoute from "../pages/PublicRoute";
import Login from "../pages/login";

import Products from "../pages/product/Products";
import ProductDetails from "../pages/product/ProductDetails";
import CategoryDetails from "../pages/category/CategoryDetails";
import Categories from "../pages/category/Categories";
import Orders from "../pages/orders/Orders";
import OrderDetails from "../pages/orders/OrderDetails";
import Deliveries from "../pages/deliveries/Deliveries";
import DeliveryDetails from "../pages/deliveries/DeliveryDetails";
import Users from "../pages/users";
import Profile from "../pages/profile/Profile";
import Dashboard from "../pages/dashboard/Dashboard";
import PrivateRoute from "../pages/PrivateRoute";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";
import Layout from "../container/Layout";

// function EcommerceRouter() {
//     return (
//         <Routes>
//             <Route element={<PublicRoute />}>
//                 <Route path="/login" element={<Login />} />
//             </Route>

//             <Route element={<PrivateRoute />}>
//                 <Route path="/" element={<Dashboard />} />
//                 <Route path="/products">
//                     <Route index element={<Products />} />
//                     <Route path=":id" element={<ProductDetails />} />
//                 </Route>
//                 <Route path="/categories">
//                     <Route index element={<Categories />} />
//                     <Route path=":id" element={<CategoryDetails />} />
//                 </Route>
//                 <Route path="/orders" element={<Orders />} />
//                 <Route path="/users" element={<Users />} />
//                 <Route path="/profile" element={<Profile />} />
//             </Route>

//             <Route path="/unauthorized" element={<Unauthorized />} />
//             <Route path="*" element={<NotFound />} />
//         </Routes>
//     );
// }

// export default EcommerceRouter;

export const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                element: <PublicRoute />,
                children: [{ path: "/login", element: <Login /> }],
            },
            {
                element: <PrivateRoute />,
                children: [
                    {
                        path: "/",
                        element: <Dashboard />,
                    },
                    {
                        path: "/products",
                        children: [
                            { index: true, element: <Products /> },
                            { path: ":id", element: <ProductDetails /> },
                        ],
                    },
                    {
                        path: "/categories",
                        children: [
                            { index: true, element: <Categories /> },
                            { path: ":id", element: <CategoryDetails /> },
                        ],
                    },
                    {
                        path: "/orders",
                        children: [
                            { index: true, element: <Orders /> },
                            { path: ":id", element: <OrderDetails /> },
                        ],
                    },
                    { path: "/users", element: <Users /> },
                    {
                        path: "/deliveries",
                        children: [
                            { index: true, element: <Deliveries /> },
                            { path: ":deliveryId", element: <DeliveryDetails /> },
                        ],
                    },
                    { path: "/profile", element: <Profile /> },
                ],
            },
            { path: "/unauthorized", element: <Unauthorized /> },
            { path: "*", element: <NotFound /> },
        ],
    },
]);
