import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TCommonFilter } from "../../utils/components";

type TCommonSlice = {
    filters: TCommonFilter;
};
const initialState: TCommonSlice = {
    filters: {
        categoryIds: [],
        stock: 0,
        price: 0,
        maxStock: 0,
        minStock: 0,
        minPrice: 0,
        maxPrice: 0,
        createdOn: 0,
        sortField: "",
        sortOrder: "desc",
    },
};
export const commonSlice = createSlice({
    initialState,
    name: "common",
    reducers: {
        setFilters: (state, action: PayloadAction<TCommonFilter>) => {
            state.filters = action.payload;
        },
    },
});

export const { setFilters } = commonSlice.actions;
export default commonSlice.reducer;
