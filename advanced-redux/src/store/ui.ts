import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Notification {
    status: 'pending' | 'success' | 'error';
    title: string;
    message: string;
}

interface UIState {
    cartIsVisible: boolean;
    notification: Notification | null;

}

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        cartIsVisible: false,
        notification: null,
    } satisfies UIState as UIState,
    reducers: {
        toggle(state) {
            state.cartIsVisible = !state.cartIsVisible;
        },
        showNotification(state, action: PayloadAction<Notification>) {
            state.notification = action.payload;
        },
        clearNotification(state) {
            state.notification = null;
        }
    }
});

export const { toggle, showNotification, clearNotification } = uiSlice.actions;

export default uiSlice.reducer;