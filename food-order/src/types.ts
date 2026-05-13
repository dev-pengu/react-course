export type Meal = {
    id: string;
    name: string;
    price: string;
    description: string;
    image: string;
}

export type CartItem = {
    meal: Meal;
    quantity: number;
}

export type Customer = {
    name: string;
    email: string;
    street: string;
    'postal-code': string;
    city: string;
}

export type Order = {
    id: string;
    items: CartItem[];
    customer: Customer;
    status: 'pending' | 'confirmed' | 'delivered';
}

export type NewOrder = Omit<Order, 'id' | 'status'>;