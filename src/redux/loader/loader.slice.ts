import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
interface IloaderPayload {
  open: boolean;
  text?: string;
  customClass?: string;
}

const initialState: IloaderPayload = {
  open: false,
  text: "Loading...",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    showLoader: (state, action: PayloadAction<{ text?: string }>) => {
      state.open = true;
      state.text = action.payload.text ?? "Loading...";
    },
    hideLoader: () => initialState,
  },
});
export const LoaderReducer = loaderSlice.reducer;
export const { hideLoader, showLoader } = loaderSlice.actions;
