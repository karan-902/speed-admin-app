import CategoryReducer from "./category/category.slice";
import { ToastReducer } from "./error/error.slice";
import { LoaderReducer } from "./loader/loader.slice";
import { productReducer } from "./product/product.slice";
import { ordersReducer } from "./orders/orders.slice";
import { usersReducer } from "./users/users.slice";

export const commonReducers = {
  category: CategoryReducer,
  toast: ToastReducer,
  loader: LoaderReducer,
  product: productReducer,
  orders: ordersReducer,
  users: usersReducer,
};
