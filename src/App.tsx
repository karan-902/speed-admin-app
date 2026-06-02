import { BrowserRouter } from "react-router-dom";
import EcommerceRouter from "./routes/router";
import BackdropLoader from "./components/common/Loader/BackdropLoader";
import Notification from "./components/common/Notification";
export default function App() {
  return (
    <BrowserRouter>
      <EcommerceRouter />
      <Notification />
      <BackdropLoader />
    </BrowserRouter>
  );
}
