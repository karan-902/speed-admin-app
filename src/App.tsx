import { RouterProvider } from "react-router-dom";

import { router } from "./routes/router";
export default function App() {
    console.log("APP");
    return <RouterProvider router={router} />;
}
