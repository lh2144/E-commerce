export interface Product {
    id: string;
    productName: string;
    description: string;
    imagUrl: string;
    price: number;
    inventory: number;
    // variants?: any;
    overview?: string;
    preview?: string;
}
