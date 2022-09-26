<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\Articles\DeleteRequest;
use App\Http\Requests\Admin\Blog\Articles\DetailsRequest;
use App\Http\Requests\Admin\Blog\Articles\IndexRequest;
use App\Http\Requests\Admin\Blog\Articles\StoreRequest;
use App\Http\Requests\Admin\Blog\Articles\UpdateRequest;
use App\Models\BlogArticle;
use App\Services\FileStorage\FileStorage;

class ArticlesController extends Controller
{
    /**
     * Get all articles
     */
    public function index(IndexRequest $request)
    {
        $articles = BlogArticle::with([
            'category' => function ($q)
            {
                $q->select(['id', 'name']);
            }
        ])
            ->orderBy('id', $request->sort ?? 'desc')
            ->paginate(10);
        
        return response([
            'data' => $articles
        ], 200);
    }

    /**
     * Get details about an article
     */
    public function details($id, DetailsRequest $request)
    {
        $article = BlogArticle::with([
            'category' => function ($q)
            {
                $q->select(['id', 'name']);
            }
        ])
            ->findOrFail($id);

        return response([
            'data' => $article
        ], 200);
    }

    /**
     * Store an article
     */
    public function store(StoreRequest $request)
    {
        $requestData = $request->toArray();
        
        if ($request->thumbnail) {
            $files = FileStorage::storeFiles($request);
            $requestData['thumbnail_url'] = asset('files/'.$files[0]->path);
        }

        $article = BlogArticle::create($requestData);

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
