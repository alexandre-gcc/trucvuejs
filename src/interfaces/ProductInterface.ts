export default interface ProductInterface {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    cartView: boolean;
    quantity?: number;
}
