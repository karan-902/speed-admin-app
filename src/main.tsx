import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import "./assets/main.scss";
import App from "./App";
import { store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { theme } from "./theme";

createRoot(document.getElementById("ecommerce")!).render(
    <StrictMode>
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <ThemeProvider theme={theme}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <App />
                    </LocalizationProvider>
                </ThemeProvider>
            </PersistGate>
        </Provider>
    </StrictMode>,
);
