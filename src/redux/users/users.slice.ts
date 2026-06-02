import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TUser } from "../../utils/utils";

interface UsersState {
    list: TUser[];
}

const initialState: UsersState = { list: [] };

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<TUser[]>) => {
            state.list = action.payload;
        },
        appendUsers: (state, action: PayloadAction<TUser[]>) => {
            state.list = [...state.list, ...action.payload];
        },
    },
});

export const { setUsers, appendUsers } = usersSlice.actions;
export const usersReducer = usersSlice.reducer;
