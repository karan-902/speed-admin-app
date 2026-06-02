import axios, {
  AxiosHeaders,
  type AxiosRequestConfig,
  type Method,
} from "axios";
import sessionService from "../redux/persisted/auth/sessionService";
import { store } from "../redux/store";
import { showToast } from "../redux/error/error.slice";
import { generateToken, logOut } from "../redux/thunks";
import type { TGenerateTokenResponse } from "./utils";
const OPEN_API_ENDPOINTS = ["/register", "/login", "/generate-token"];
const serverErrorStatusCodes = [500, 502, 503, 504];
const errorStatusCodes = [400, 401, 403, 404, 409, 422, 429];

let refreshPromise: Promise<TGenerateTokenResponse> | null = null;

export const getHeaders = async <TPayload = undefined>(
  method: Method,
  path: string,
  data?: TPayload,
): Promise<AxiosRequestConfig> => {
  const session = await sessionService.loadSession();
  const isOpenApiEndpoint = OPEN_API_ENDPOINTS.some((endpoint) =>
    path.startsWith(endpoint),
  );

  const headers = new AxiosHeaders();
  if (method !== "GET") {
    headers.set("Content-Type", "application/json");
  }
  if (!isOpenApiEndpoint && session) {
    headers.set("Authorization", session.access_token);
  }
  return {
    baseURL: import.meta.env.VITE_API_BASE_URL,
    method,
    url: path,
    headers,
    data,
  };
};

export const callAPIInterface = async <
  TPayload = undefined,
  TResponse = unknown,
>(
  method: Method,
  path: string,
  data?: TPayload,
): Promise<TResponse> => {
  return new Promise(async (resolve, reject) => {
    const jwtOptions = await getHeaders(method, path, data);
    if (Object.keys(jwtOptions).length) {
      const config = {
        ...jwtOptions,
      };
      const apiCall = axios(config);
      try {
        const res = await apiCall;
        resolve(res.data);
      } catch (err: any) {
        const errorData = err.response?.data;
        const errorType = errorData?.type;
        const errorStatus = err.response?.status;
        console.error("API Error Response:", err.response || err);
        const errors =
          (errorStatusCodes.includes(errorStatus) ||
            serverErrorStatusCodes.includes(errorStatus)) &&
          errorType !== "token_expired";

        // Token Generation
        if (errorType === "token_expired") {
          try {
            if (!refreshPromise) {
              refreshPromise = store.dispatch(generateToken()).unwrap();
              refreshPromise.finally(() => {
                refreshPromise = null;
              });
            }

            const resToken = await refreshPromise;
            const retryConfig = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: resToken.access_token,
              },
            };
            const retryResponse = await axios(retryConfig);
            return retryResponse.data;
          } catch (tokenError: any) {
            store.dispatch(logOut());
            throw tokenError;
          }
        }

        if (errors) {
          store.dispatch(
            showToast({
              message: errorData?.message || err.message,
              severity: "error",
              title: "Error",
            }),
          );
        }

        throw err;
      }
    } else {
      reject({});
    }
  });
};
