import { Address } from './address.model';
import { CartItem } from './cartItem.modal';

export interface Cart {
    shippingAddress?: Address;
    totalPrice: number;
    contactEmail?: string;
    items: CartItem[];
}
