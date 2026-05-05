import { useReducer, type PropsWithChildren } from "react";
import { DUMMY_PRODUCTS } from "../dummy-product";
import { CartContext, type CartItem } from "./shopping-cart-context";

declare type CartState = {
  items: CartItem[];
};

declare type UpdateQuantityPayload = { id: string; qty: number };

declare type CartAction = {
  type: "ADD_ITEM" | "UPDATE_QTY";
  payload: string | UpdateQuantityPayload;
};

function shoppingCartReducer(state: CartState, action: CartAction) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === (action.payload as string),
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === (action.payload as string),
      );
      updatedItems.push({
        id: action.payload as string,
        name: product!.title,
        price: product!.price,
        quantity: 1,
      });
    }

    return {
      ...state,
      items: updatedItems,
    };
  } else if (action.type === "UPDATE_QTY") {
    const payload = action.payload as UpdateQuantityPayload;
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === payload.id,
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += payload.qty;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}

export default function CartContextProvider({ children }: PropsWithChildren) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    { items: [] },
  );

  function handleAddItemToCart(id: string) {
    shoppingCartDispatch({
      type: "ADD_ITEM",
      payload: id,
    });
  }

  function handleUpdateCartItemQuantity(productId: string, amount: number) {
    shoppingCartDispatch({
      type: "UPDATE_QTY",
      payload: { id: productId, qty: amount },
    });
  }

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return <CartContext value={ctxValue}>{children}</CartContext>;
}
