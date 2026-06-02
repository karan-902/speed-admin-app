import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TLoginResponse } from "../../../utils/utils";

type TInitialState = {
  isLoggedIn: boolean;
  session: TLoginResponse | null;
};
const initialState: TInitialState = {
  isLoggedIn: false,
  session: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<TLoginResponse>) => {
      state.session = action.payload;
      state.isLoggedIn =
        Boolean(state.session.access_token) &&
        Boolean(state.session.refresh_token);
    },
    clearSession: () => initialState,
  },
});

export const { setSession, clearSession } = authSlice.actions;
const AuthReducer = authSlice.reducer;
export default AuthReducer;
