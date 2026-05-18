import { createAsyncThunk } from '@reduxjs/toolkit';
import type { Item } from '../types';
import { showNotification } from './ui';

const fetchCartData = createAsyncThunk('cart/fetchCartData', async (_, { dispatch }) => {
    try {
        const response = await fetch('http://localhost:3000/cart/test-user');
        if (!response.ok) {
            throw new Error('Failed to fetch cart data!');
        }
        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        dispatch(
            showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Failed to fetch cart data!',
            })
        );    
    }
});

const addCartItem = createAsyncThunk('cart/addCartItem', async (item: Item, { dispatch }) => {
    dispatch(
        showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        })
    );
    try {
        const response = await fetch ('http://localhost:3000/cart/test-user/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ item, quantity: 1 }),
        });
        if (!response.ok) {
            throw new Error('Failed to send cart data!');
        }
        dispatch(
            showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!',
            })
        );
        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        dispatch(
            showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Failed to send cart data!',
            })
        );    
    }
});

const removeCartItem = createAsyncThunk('cart/removeCartItem', async (itemId: string, { dispatch }) => {
    dispatch(
        showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!',
        })
    );
    try {
        const response = await fetch (`http://localhost:3000/cart/test-user/items/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to remove from cart!');
        }
        dispatch(
            showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Removed from cart successfully!',
            })
        );
        return await response.json();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
        dispatch(
            showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Failed to remove from cart!',
            })
        );    
    }
    
});

export { addCartItem, removeCartItem, fetchCartData };