<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\Products\DeleteRequest;
use App\Http\Requests\Admin\Catalog\Products\DetailsRequest;
use App\Http\Requests\Admin\Catalog\Products\IndexRequest;
use App\Http\Requests\Admin\Catalog\Products\RestoreRequest;
use App\Http\Requests\Admin\Catalog\Products\StoreRequest;
use App\Http\Requests\Admin\Catalog\Products\UpdateRequest;
use App\Models\CatalogCategory;
use App\Models\CatalogProduct;
use App\Models\CatalogProductCategory;

class ProductsController extends Controller
{
    /**
     * Get all products
     */
    public function index(IndexRequest $request)
    {
        $products = CatalogProduct::with([
            'thumbnail'
        ])
            ->orderBy('id', $request->sort ?? 'desc')
            ->paginate(15);
        
        return response([
            'data' => $products
        ], 200);
    }

    /**
     * Get details about an product
     */
    public function details($id, DetailsRequest $request)
    {
        $product = CatalogProduct::withTrashed()
            ->with([
                'images',
                'categories'
            ])
            ->findOrFail($id);

        return response([
            'data' => $product
        ], 200);
    }

    /**
     * Store a product
     */
    public function store(StoreRequest $request)
    {
        // Split data
        $data = $request->toArray();
        
        $categories = $data['categories'];
        unset($data['categories']);

        $images = $data['images'];
        unset($data['images']);

        $product = CatalogProduct::create($data);
        
        // Store relation between product and categories
        foreach ($categories as $category) {
            $categoryResult = CatalogCategory::where('id', $category)
                ->first();
            
            if (!$categoryResult) {
                continue;
            }

            CatalogProductCategory::create([
                'product_id' => $product->id,
                'category_id' => $category
            ]);
        }

        foreach ($images as $image) {
            // TODO: Store images
        }

        return response([
            'data' => $product
        ], 200);
    }
    
    /**
     * Update a product
     */
    public function update($id, UpdateRequest $request)
    {
        $product = CatalogProduct::findOrFail($id);

        $product->update($request->toArray());

        return response([
            
        ], 200);
    }

    /**
     * Delete a product
     */
    public function delete($id, DeleteRequest $request)
    {
        $product = CatalogProduct::findOrFail($id);
        $product->delete();

        return response([
            
        ], 200);
    }

    /**
     * Restore a product
     */
    public function restore($id, RestoreRequest $request)
    {
        $product = CatalogProduct::withTrashed()
            ->findOrFail($id);

        $product->restore();

        return response([
            
        ], 200);
    }
}
