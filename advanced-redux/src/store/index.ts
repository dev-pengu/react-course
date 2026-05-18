import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import uiReducer from "./ui";
import cartReducer from "./cart";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export default store;
