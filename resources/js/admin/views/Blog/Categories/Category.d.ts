import { Article } from "../Articles/Article"

export interface Category {
    id: number,
    name: string,
    description?: string,
    thumbnail_url: string,
    created_at: string,
    updated_at: string,
    deleted_at: string
    articles: Article[]
}