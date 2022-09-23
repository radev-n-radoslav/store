export interface Category{
    id: number,
    name: string,
    description: string,
    parent_id: number,
    parent: Category,
    order_place: number,
    created_at: string,
    updated_at: string,
    deleted_at: string
}