import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCategory, TCategoryDetailResponse, TCategoryProduct } from "../../utils/utils";

interface ICategoryState {
    categories: TCategory[];
    categoryDetails: TCategoryDetailResponse | null;
}

const initialState: ICategoryState = {
    categories: [],
    categoryDetails: null,
};

const category = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<TCategory[]>) => {
            state.categories = action.payload;
        },
        setCategoryDetails: (state, action: PayloadAction<TCategoryDetailResponse>) => {
            state.categoryDetails = action.payload;
        },
        clearCategoryDetails: (state) => {
            state.categoryDetails = null;
        },
        appendCategoryProducts: (
            state,
            action: PayloadAction<{
                data: TCategoryProduct[];
                has_more: boolean;
                ending_before: number | null;
            }>,
        ) => {
            if (!state.categoryDetails) return;
            state.categoryDetails.details_products.data = [
                ...state.categoryDetails.details_products.data,
                ...action.payload.data,
            ];
            state.categoryDetails.details_products.has_more = action.payload.has_more;
            state.categoryDetails.details_products.ending_before = action.payload.ending_before;
        },
        categoryAdded: (state, action: PayloadAction<TCategory>) => {
            state.categories.push(action.payload);
        },
        categoryUpdated: (state, action: PayloadAction<TCategory>) => {
            const index = state.categories.findIndex((c) => c.id === action.payload.id);
            if (index !== -1) state.categories[index] = action.payload;
        },
        categoryRemoved: (state, action: PayloadAction<{ id: string }>) => {
            state.categories = state.categories.filter((c) => c.id !== action.payload.id);
            if (state.categoryDetails?.id === action.payload.id) {
                state.categoryDetails = null;
            }
        },
    },
});

export const {
    setCategories,
    setCategoryDetails,
    clearCategoryDetails,
    appendCategoryProducts,
    categoryAdded,
    categoryUpdated,
    categoryRemoved,
} = category.actions;

const CategoryReducer = category.reducer;
export default CategoryReducer;
