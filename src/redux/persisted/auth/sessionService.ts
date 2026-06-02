import type { TLoginResponse } from "../../../utils/utils";
import { store, persistor } from "../../store";
import { setSession, clearSession } from "./auth.slice";
export const serializePayload = (error: any) => {
  if (typeof error === "object" && error !== null) {
    return { ...error, message: error.message || "Unknown error" };
  }
  return { message: String(error) };
};
const sessionService = {
  loadSession: async (): Promise<TLoginResponse> => {
    const state = store.getState();
    return state.auth.session;
  },
  saveSession: async (payload: TLoginResponse) => {
    store.dispatch(setSession(payload));
    await persistor.flush();
    return true;
  },
  deleteSession: async () => {
    await persistor.purge();
    persistor.persist();
    store.dispatch(clearSession());
    return true;
  },
  purgeAll: async () => {
    store.dispatch(clearSession());
    persistor.purge();
    return true;
  },
};
export default sessionService;
