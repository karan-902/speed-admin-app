import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type Method } from "axios";
import type {
    TFilterPayload,
    TGenerateTokenPayload,
    TLoginPayload,
    TProductDeletePayload,
    TProductPayload,
    TRegisterForm,
    TRegisterPayload,
} from "../types";
import { callAPIInterface } from "../utils";
import type {
    TCategoriesResponse,
    TGenerateTokenResponse,
    TLoginResponse,
    TProductDetail,
    TProductsResponse,
    TRegisterResponse,
} from "../utils/utils";
import { clearSession, setSession } from "./persisted/auth/auth.slice";
import sessionService, {
    serializePayload,
} from "./persisted/auth/sessionService";
import { setCategories } from "./category/category.slice";
import {
    addProduct,
    setProduct,
    setProducts,
    updateProduct,
} from "./product/product.slice";
import { hideLoader, showLoader } from "./loader/loader.slice";
import type { RootState } from "./store";
import type { TProductForm } from "../utils/components";
import { toProductPayload, toRegisterPayload } from "../utils/mapper";

export const logIn = createAsyncThunk(
    "auth/login",
    async (values: TLoginPayload, { dispatch, rejectWithValue }) => {
        try {
            const data = await callAPIInterface<TLoginPayload, TLoginResponse>(
                "POST",
                "/login",
                values,
            );
            dispatch(setSession(data));
            return data;
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const signUp = createAsyncThunk(
    "auth/register",
    async (values: TRegisterForm, { rejectWithValue }) => {
        try {
            const payload = toRegisterPayload(values);
            const data = await callAPIInterface<
                TRegisterPayload,
                TRegisterResponse
            >("POST", "/register", payload);
            return data;
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const logOut = createAsyncThunk(
    "auth/logOut",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const session = await sessionService.loadSession();
            await callAPIInterface("POST", "/logout", {
                refresh_token: session.refresh_token,
            });
            dispatch(clearSession());
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const generateToken = createAsyncThunk(
    "auth/generate-token",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const session = await sessionService.loadSession();
            const token: TGenerateTokenPayload = {
                refresh_token: session.refresh_token as string,
            };
            const response = await axios.post<TGenerateTokenResponse>(
                `${import.meta.env.VITE_API_BASE_URL}/generate-token`,
                token,
            );
            const data = response.data;
            dispatch(setSession({ ...session, ...data }));
            return data;
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const getCategories = createAsyncThunk(
    "get/categories",
    async (
        status: "availabel" | "archive" | undefined,
        { dispatch, rejectWithValue },
    ) => {
        try {
            const path = status
                ? `/categories?status=${status}`
                : "/categories";
            const response = await callAPIInterface<
                TFilterPayload,
                TCategoriesResponse
            >("GET", path);
            dispatch(setCategories(response.data));
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const getProducts = createAsyncThunk(
    "get/products",
    async (
        status: TFilterPayload | undefined,
        { dispatch, rejectWithValue },
    ) => {
        try {
            const path = !status ? "/products" : `/products?status=${status}`;
            const response = await callAPIInterface<
                undefined,
                TProductsResponse
            >("GET", path);
            dispatch(setProducts(response.data));
            return response;
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const getProductById = createAsyncThunk(
    "get/productById",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            const data = await callAPIInterface<undefined, TProductDetail>(
                "GET",
                `/product?id=${id}`,
            );
            dispatch(setProduct(data));
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);

export const saveProduct = createAsyncThunk(
    "save/product",
    async (
        { values, id }: { values: TProductForm; id?: string },
        { dispatch, rejectWithValue },
    ) => {
        dispatch(showLoader({}));
        try {
            const method: Method = !id ? "POST" : "PATCH";
            const path = !id ? "/products" : `/products/${id}`;
            const payload = toProductPayload(values);
            const data = await callAPIInterface<
                TProductPayload,
                TProductDetail
            >(method, path, payload);
            if (id) {
                dispatch(updateProduct(data));
            } else {
                dispatch(addProduct({ ...data }));
            }
            return data;
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        } finally {
            dispatch(hideLoader());
        }
    },
);

export const deleteProduct = createAsyncThunk(
    "delete/product",
    async (
        payload: TProductDeletePayload,
        { dispatch, getState, rejectWithValue },
    ) => {
        try {
            const state = getState() as RootState;
            const product = state.product.selectedProduct;

            await callAPIInterface("DELETE", `/products/${payload.id}`);
            dispatch(deleteProduct({ id: payload.id }));

            if (product?.images?.length) {
                await Promise.all(
                    product.images.map((image) =>
                        callAPIInterface(
                            "DELETE",
                            `/delete/image?public_id=${image.public_id}`,
                        ),
                    ),
                );
            }
            if (product?.thumbnail_id) {
                await callAPIInterface(
                    "DELETE",
                    `/delete/image?public_id=${product.thumbnail_id}`,
                );
            }
        } catch (error) {
            return rejectWithValue(serializePayload(error));
        }
    },
);
