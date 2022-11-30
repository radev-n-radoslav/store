import { Category } from "../Categories/Category"

export interface ProductImages {
    id: number,
    url: string,
    is_thumbnail: boolean,
    order_place: number,
    product_id: number,
    created_at: string,
    updated_at: string
}

export interface Product {
    id: number,
    name: string,
    description: string,
    sku: string,
    quantity: number,
    gross_price: number,
    images: ProductImages[],
    thumbnail: ProductImages,
    categories: Category[],
    created_at: string,
    updated_at: string,
    deleted_at: string,
}