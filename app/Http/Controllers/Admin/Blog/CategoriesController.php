<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Blog\Categories\DeleteRequest;
use App\Http\Requests\Admin\Blog\Categories\DetailsRequest;
use App\Http\Requests\Admin\Blog\Categories\IndexRequest;
use App\Http\Requests\Admin\Blog\Categories\RestoreRequest;
use App\Http\Requests\Admin\Blog\Categories\StoreRequest;
use App\Http\Requests\Admin\Blog\Categories\UpdateRequest;
use App\Models\BlogCategory;
use App\Services\FileStorage\FileStorage;

class CategoriesController extends Controller
{
    /**
     * Get all categories
     */
    public function index(IndexRequest $request)
    {
        $categories = BlogCategory::orderBy('id', $request->sort ?? 'desc')
            ->paginate(10);
        
        return response([
            'data' => $categories
        ], 200);
    }

    /**
     * Get details about an category
     */
    public function details($id, DetailsRequest $request)
    {
        $category = BlogCategory::withTrashed()
            ->findOrFail($id);

        return response([
            'data' => $category
        ], 200);
    }

    /**
     * Store a category
     */
    public function store(StoreRequest $request)
    {
        $requestData = $request->toArray();
        
        if ($this->thumbnail) {
            $files = FileStorage::storeFiles($request);
            $requestData['thumbnail_url'] = asset('files/'.$files[0]->path);
        }

        $category = BlogCategory::create($requestData);

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

    /**
     * Restore a category
     */
    public function restore($id, RestoreRequest $request)
    {
        $category = BlogCategory::withTrashed()
            ->findOrFail($id);

        $category->restore();

        return response([
            
        ], 200);
    }
}
