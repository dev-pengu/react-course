import express from 'express';
import CartModel from '../model/cart.js';

const router = express.Router();

type CartItemPayload = {
  id: string;
  title: string;
  price: number;
  description: string;
};

const createEmptyCart = (userId: string) => ({
  userId,
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId }).lean();

    if (!cart) {
      return res.status(200).json({ cart: createEmptyCart(userId) });
    }

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching cart', error });
  }
});

router.post('/:userId/items', async (req, res) => {
  const { userId } = req.params;
  const { item, quantity = 1 } = req.body as {
    item?: CartItemPayload;
    quantity?: number;
  };

  if (!item) {
    return res.status(400).json({ message: 'Request body must include an item.' });
  }

  if (quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1.' });
  }

  try {
    const cart = await CartModel.findOne({ userId });
    const existingCart = cart ?? new CartModel(createEmptyCart(userId));
    const existingItem = existingCart.items.find((cartItem) => cartItem.id === item.id);
    const amountToAdd = item.price * quantity;

    if (!existingItem) {
      existingCart.items.push({
        ...item,
        quantity,
        totalPrice: amountToAdd,
      });
    } else {
      existingItem.quantity += quantity;
      existingItem.totalPrice += amountToAdd;
    }

    existingCart.totalQuantity += quantity;
    existingCart.totalAmount += amountToAdd;

    await existingCart.save();

    return res.status(200).json({ cart: existingCart });
  } catch (error) {
    return res.status(500).json({ message: 'Error adding item to cart', error });
  }
});

router.delete('/:userId/items/:itemId', async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const cart = await CartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const existingItemIndex = cart.items.findIndex((item) => item.id === itemId);

    if (existingItemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    const existingItem = cart.items[existingItemIndex];

    if (!existingItem) {
      return res.status(404).json({ message: 'Item not found in cart.' });
    }

    if (existingItem.quantity === 1) {
      cart.items.splice(existingItemIndex, 1);
    } else {
      existingItem.quantity -= 1;
      existingItem.totalPrice -= existingItem.price;
    }

    cart.totalQuantity -= 1;
    cart.totalAmount -= existingItem.price;

    await cart.save();

    return res.status(200).json({ cart });
  } catch (error) {
    return res.status(500).json({ message: 'Error removing item from cart', error });
  }
});

export default router;