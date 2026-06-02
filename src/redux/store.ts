import {
  configureStore,
  isRejectedWithValue,
  type Reducer,
  type UnknownAction,
} from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { type PersistPartial } from "redux-persist/es/persistReducer";
import { persistReducer } from "redux-persist";
import AuthReducer from "./persisted/auth/auth.slice";
import { commonReducers } from "./rootReducer";
import localforage from "localforage";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { persistStore } from "redux-persist";
import { showToast } from "./error/error.slice";
import type { TLoginResponse } from "../utils/utils";

const errorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorData = action.payload as {
      message?: string;
      error?: string;
      apiErrorType?: string;
    };

    if (errorData?.apiErrorType === "token_expired") {
      return next(action);
    }

    const message =
      errorData?.message || errorData?.error || "An unexpected error occurred";

    console.error("Global Error Intercepted:", message);

    store.dispatch(showToast({ message, severity: "error" }));
  }
  return next(action);
};

const lf = localforage.createInstance({
  name: "redux-react-session",
  storeName: "keyvaluepairs",
});

const authPersistConfig = {
  key: "USER-SESSION",
  storage: lf,
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, AuthReducer) as unknown as Reducer<
      { isLoggedIn: boolean; session: TLoginResponse } & PersistPartial,
      UnknownAction
    >,
    ...commonReducers,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(errorMiddleware),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
