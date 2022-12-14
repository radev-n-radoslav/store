<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\Categories\DeleteRequest;
use App\Http\Requests\Admin\Blog\Categories\DetailsRequest;
use App\Http\Requests\Admin\Blog\Categories\IndexRequest;
use App\Http\Requests\Admin\Blog\Categories\StoreRequest;
use App\Http\Requests\Admin\Blog\Categories\UpdateRequest;
use App\Models\BlogCategory;

class CategoriesController extends Controller
{
    /**
     * Get all categories
     */
    public function index(IndexRequest $request)
    {
        $categories = BlogCategory::orderBy('created_at', 'DESC')
            ->get();
        
        return response([
            'data' => $categories
        ], 200);
    }

    /**
     * Get details about an category
     */
    public function details($id, DetailsRequest $request)
    {
        $category = BlogCategory::findOrFail($id);

        return response([
            'data' => $category
        ], 200);
    }

    /**
     * Store a category
     */
    public function store(StoreRequest $request)
    {
        $category = BlogCategory::create($request->toArray());

        return response([
            'data' => $category
        ], 200);
    }
    
    /**
     * Update a category
     */
    public function update($id, UpdateRequest $request)
    {
        $category = BlogCategory::findOrFail($id);

        $category->update($request->toArray());

        return response([
            
        ], 200);
    }

    /**
     * Delete a category
     */
    public function delete($id, DeleteRequest $request)
    {
        $category = BlogCategory::findOrFail($id);

        $category->delete();

        return response([
            
        ], 200);
    }
}
