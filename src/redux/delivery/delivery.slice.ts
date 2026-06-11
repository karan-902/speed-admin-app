import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TDelivery, TDeliveryDetail } from "../../utils/utils";

interface DeliveryState {
    list: TDelivery[];
    detail: TDeliveryDetail | null;
}

const initialState: DeliveryState = { list: [], detail: null };

const deliverySlice = createSlice({
    name: "delivery",
    initialState,
    reducers: {
        setDeliveries: (state, action: PayloadAction<TDelivery[]>) => {
            state.list = action.payload;
        },
        appendDeliveries: (state, action: PayloadAction<TDelivery[]>) => {
            state.list = [...state.list, ...action.payload];
        },
        setDeliveryDetail: (state, action: PayloadAction<TDeliveryDetail>) => {
            state.detail = action.payload;
        },
        clearDeliveryDetail: (state) => {
            state.detail = null;
        },
    },
});

export const {
    setDeliveries,
    appendDeliveries,
    setDeliveryDetail,
    clearDeliveryDetail,
} = deliverySlice.actions;
export const deliveryReducer = deliverySlice.reducer;
