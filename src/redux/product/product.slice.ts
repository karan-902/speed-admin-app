import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TImage } from "../../utils/components";
import type { TProduct, TProductDetail } from "../../utils/utils";

interface ProductState {
    list: TProduct[];
    selectedProduct: TProductDetail | null;
    loading: boolean;
}

const initialState: ProductState = {
    list: [],
    selectedProduct: null,
    loading: false,
};

const products = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<TProduct[]>) => {
            state.list = action.payload;
        },
        appendProducts: (state, action: PayloadAction<TProduct[]>) => {
            const existingIds = new Set(state.list.map((p) => p.id));
            const unique = action.payload.filter((p) => !existingIds.has(p.id));
            state.list = [...state.list, ...unique];
        },
        setProduct: (state, action: PayloadAction<TProductDetail>) => {
            state.selectedProduct = action.payload;
        },
        addProduct: (state, action: PayloadAction<TProduct>) => {
            state.list.push(action.payload);
        },
        updateProduct: (state, action: PayloadAction<TProductDetail>) => {
            const index = state.list.findIndex((p) => p.id === action.payload.id);
            if (index !== -1) {
                const updated = state.list[index];
                state.list[index] = {
                    ...updated,
                    name: action.payload.name,
                    description: action.payload.description,
                    price: action.payload.price,
                    stock: action.payload.stock,
                    spotlight: action.payload.spotlight,
                    visibility: action.payload.visibility,
                    updated_at: action.payload.updated_at,
                };
            }
            state.selectedProduct = action.payload;
        },
        deleteProduct: (state, action: PayloadAction<{ id: string }>) => {
            state.list = state.list.filter((p) => p.id !== action.payload.id);
            if (state.selectedProduct?.id === action.payload.id) {
                state.selectedProduct = null;
            }
        },
        removeProductImage: (
            state,
            action: PayloadAction<{ field: string; index?: number }>,
        ) => {
            if (!state.selectedProduct) return;
            const { field, index } = action.payload;
            if (field === "images" && index !== undefined) {
                state.selectedProduct.images = state.selectedProduct.images.filter(
                    (_, i) => i !== index,
                );
            } else if (field === "thumbnail") {
                state.selectedProduct.thumbnail_id = null;
                state.selectedProduct.thumbnail_url = null;
            }
        },
        addProductImage: (
            state,
            action: PayloadAction<{ field: string; data: TImage | TImage[] }>,
        ) => {
            if (!state.selectedProduct) return;
            const { field, data } = action.payload;
            if (field === "images") {
                const newImages = Array.isArray(data) ? data : [data];
                state.selectedProduct.images = [
                    ...(state.selectedProduct.images || []),
                    ...newImages,
                ];
            } else if (field === "thumbnail" && !Array.isArray(data)) {
                state.selectedProduct.thumbnail_id = data.public_id;
                state.selectedProduct.thumbnail_url = data.url;
            }
        },
        deleteMultipleProducts: (state, action: PayloadAction<string[]>) => {
            const ids = new Set(action.payload);
            state.list = state.list.filter((p) => !ids.has(p.id));
        },
    },
});

export const {
    setProducts,
    appendProducts,
    setProduct,
    updateProduct,
    addProduct,
    deleteProduct,
    removeProductImage,
    addProductImage,
    deleteMultipleProducts,
} = products.actions;
export const productReducer = products.reducer;
