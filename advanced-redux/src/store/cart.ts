import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '../types';
import { addCartItem, removeCartItem, fetchCartData } from './cart-actions'; 

export type CartState = {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
    } satisfies CartState as CartState,
    reducers: {
        replaceCart(state, action: PayloadAction<CartState>) {
            state.items = action.payload.items;
            state.totalQuantity = action.payload.totalQuantity;
            state.totalAmount = action.payload.totalAmount;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addCartItem.fulfilled, (state, {payload}) => {
            state.items = payload.cart.items;
            state.totalQuantity = payload.cart.totalQuantity;
            state.totalAmount = payload.cart.totalAmount;
        });
        builder.addCase(removeCartItem.fulfilled, (state, {payload}) => {
            state.items = payload.cart.items;
            state.totalQuantity = payload.cart.totalQuantity;
            state.totalAmount = payload.cart.totalAmount;
        });
        builder.addCase(fetchCartData.fulfilled, (state, {payload}) => {
            state.items = payload.cart.items;
            state.totalQuantity = payload.cart.totalQuantity;
            state.totalAmount = payload.cart.totalAmount;
        });
    }
});

export { addCartItem, removeCartItem, fetchCartData };

export default cartSlice.reducer;