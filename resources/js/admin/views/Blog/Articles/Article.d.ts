export interface ArticleCategory {
    id: number,
    name: string
}

export interface Article {
    id: number,
    title: string,
    content: string,
    thumbnail_url: string,
    category_id: number,
    category: ArticleCategory,
    views: number,
    created_at: string,
    updated_at: string,
}