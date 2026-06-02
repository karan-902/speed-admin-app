import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IToastState {
    open: boolean;
    message: string;
    severity: "error" | "warning" | "info" | "success";
    title?: string;
}
interface IToastPayload {
    message: string;
    severity: IToastState["severity"];
    title?: string;
}

const initialState: IToastState = {
    open: false,
    message: "",
    severity: "info",
    title: "",
};

const toastSlice = createSlice({
    name: "toast",
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<IToastPayload>) => {
            state.open = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
            state.title = action.payload.title;
        },
        hideToast: (state) => {
            state.open = false;
        },
    },
});

export const ToastReducer = toastSlice.reducer;
export const { showToast, hideToast } = toastSlice.actions;
