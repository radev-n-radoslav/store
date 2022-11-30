import { Category } from "../../Blog/Categories/Category"

export interface Filter {
    id: number
    name: string,
    is_inclusive: boolean,
    has_multiple: boolean,
    category_id: number,
    category: Category,
    created_at: string,
    updated_at: string,
    deleted_at: string
}