<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\Categories\DeleteRequest;
use App\Http\Requests\Admin\Catalog\Categories\DetailsRequest;
use App\Http\Requests\Admin\Catalog\Categories\IndexRequest;
use App\Http\Requests\Admin\Catalog\Categories\StoreRequest;
use App\Http\Requests\Admin\Catalog\Categories\UpdateRequest;
use App\Models\CatalogCategory;

class CategoriesController extends Controller
{
    /**
     * Get all categories
     */
    public function index(IndexRequest $request)
    {
        $categories = CatalogCategory::orderBy('created_at', 'DESC')
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
        $category = CatalogCategory::findOrFail($id);

        return response([
            'data' => $category
        ], 200);
    }

    /**
     * Store a category
     */
    public function store(StoreRequest $request)
    {
        $category = CatalogCategory::create($request->toArray());

        return response([
            'data' => $category
        ], 200);
    }
    
    /**
     * Update a category
     */
    public function update($id, UpdateRequest $request)
    {
        $category = CatalogCategory::findOrFail($id);

        $category->update($request->toArray());

        return response([
            
        ], 200);
    }

    /**
     * Delete a category
     */
    public function delete($id, DeleteRequest $request)
    {
        $category = CatalogCategory::findOrFail($id);

        $category->productsRaw()->delete();
        $category->delete();

        return response([
            
        ], 200);
    }
}
