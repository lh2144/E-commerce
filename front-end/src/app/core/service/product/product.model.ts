import { Comment } from 'service';
export interface Product {
    id: string;
    productName: string;
    description: string;
    imgUrl: string;
    price: number;
    inventory: number;
    // variants?: any;
    overview?: string;
    preview?: string;
    reviews?: Comment[];
}
