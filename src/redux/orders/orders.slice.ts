import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TOrder } from "../../utils/utils";

interface OrdersState {
    list: TOrder[];
}

const initialState: OrdersState = { list: [] };

const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders: (state, action: PayloadAction<TOrder[]>) => {
            state.list = action.payload;
        },
        appendOrders: (state, action: PayloadAction<TOrder[]>) => {
            state.list = [...state.list, ...action.payload];
        },
    },
});

export const { setOrders, appendOrders } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
