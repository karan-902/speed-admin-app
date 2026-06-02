import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import sessionService from "./persisted/auth/sessionService";
import type { TLoginResponse } from "../utils/utils";

export const useReduxSelector = useSelector.withTypes<RootState>();
export const useReduxDispatch = useDispatch.withTypes<AppDispatch>();
export const useAuth = async (): Promise<TLoginResponse | null> => {
  const session = await sessionService.loadSession();
  return session;
};
