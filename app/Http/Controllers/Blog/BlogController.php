<?php

namespace App\Http\Controllers\Blog;

use App\Http\Controllers\Controller;

use App\Http\Requests\Blog\ArticleRequest;
use App\Http\Requests\Blog\CategoriesRequest;
use App\Http\Requests\Blog\CategoryRequest;
use App\Models\BlogArticle;
use App\Models\BlogCategory;

class BlogController extends Controller
{
    /**
     * Get all categories in blog
     */
    public function categories(CategoriesRequest $request)
    {
        $categories = BlogCategory::all();

        return response([
            'data' => $categories
        ], 200);
    }

    /**
     * Get a certain category and its articles
     */
    public function category($id, CategoryRequest $request)
    {
        $category = BlogCategory::where('id', $id)
            ->with('articles')
            ->firstOrFail();

        return response([
            'data' => $category
        ], 200);
    }

    /**
     * Get a certain article
     */
    public function article($id, ArticleRequest $request)
    {
        $article = BlogArticle::findOrFail($id);
        
        $article->views += 1;
        $article->save();

        return response([
            'data' => $article
        ], 200);
    }
}
