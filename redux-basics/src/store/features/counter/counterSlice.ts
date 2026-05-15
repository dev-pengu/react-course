import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CounterState = {   
    value: number;
    showCounter: boolean;
}


export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
        showCounter: true,
    } satisfies CounterState as CounterState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
        toggleShowCounter: (state) => {
            state.showCounter = !state.showCounter;
        }
    },
});

export const { increment, decrement, incrementByAmount, toggleShowCounter } = counterSlice.actions;

export default counterSlice.reducer;