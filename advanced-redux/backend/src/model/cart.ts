import mongoose, { Schema } from 'mongoose';

export type CartItemDocument = {
	id: string;
	title: string;
	price: number;
	description: string;
	quantity: number;
	totalPrice: number;
};

export type CartDocument = {
	userId: string;
	items: CartItemDocument[];
	totalQuantity: number;
	totalAmount: number;
};

const cartItemSchema = new Schema<CartItemDocument>(
	{
		id: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
		},
		description: {
			type: String,
			required: true,
		},
		quantity: {
			type: Number,
			required: true,
			min: 0,
		},
		totalPrice: {
			type: Number,
			required: true,
			min: 0,
		},
	},
	{
		_id: false,
	}
);

const cartSchema = new Schema<CartDocument>(
	{
		userId: {
			type: String,
			required: true,
			unique: true,
			index: true,
			trim: true,
		},
		items: {
			type: [cartItemSchema],
			default: [],
		},
		totalQuantity: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
		totalAmount: {
			type: Number,
			required: true,
			default: 0,
			min: 0,
		},
	},
	{
		timestamps: true,
	}
);

const CartModel = mongoose.model<CartDocument>('Cart', cartSchema);

export default CartModel;