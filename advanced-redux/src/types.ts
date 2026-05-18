export type Item = {
    id: string;
    title: string;
    price: number;
    description: string;
}

export type CartItem = Item & {
    quantity: number;
    totalPrice: number;
}