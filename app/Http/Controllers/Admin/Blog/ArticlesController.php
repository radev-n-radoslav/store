<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\Articles\DeleteRequest;
use App\Http\Requests\Admin\Blog\Articles\DetailsRequest;
use App\Http\Requests\Admin\Blog\Articles\IndexRequest;
use App\Http\Requests\Admin\Blog\Articles\StoreRequest;
use App\Http\Requests\Admin\Blog\Articles\UpdateRequest;
use App\Models\BlogArticle;

class ArticlesController extends Controller
{
    /**
     * Get all articles
     */
    public function index(IndexRequest $request)
    {
        $articles = BlogArticle::orderBy('created_at', 'DESC')
            ->get();
        
        return response([
            'data' => $articles
        ], 200);
    }

    /**
     * Get details about an article
     */
    public function details($id, DetailsRequest $request)
    {
        $article = BlogArticle::findOrFail($id);

        return response([
            'data' => $article
        ], 200);
    }

    /**
     * Store an article
     */
    public function store($id, StoreRequest $request)
    {
        $data = $request->toArray();
        $data['category_id'] = $id;

        $article = BlogArticle::create($data);

        return response([
            'data' => $article
        ], 200);
    }
    
    /**
     * Update an article
     */
    public function update($id, UpdateRequest $request)
    {
        $article = BlogArticle::findOrFail($id);

        $article->update($request->toArray());

        return response([
            
        ], 200);
    }

    /**
     * Delete an article
     */
    public function delete($id, DeleteRequest $request)
    {
        $article = BlogArticle::findOrFail($id);

        $article->delete();

        return response([
            
        ], 200);
    }
}
