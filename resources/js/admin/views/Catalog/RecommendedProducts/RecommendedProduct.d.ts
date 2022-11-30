import { Product } from "../Products/Product";

export interface RecommendedProduct {
    id: number,
    product_id: number,
    product?: Product,
    created_at: string,
    updated_at: string,
}