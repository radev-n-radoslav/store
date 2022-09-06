<?php

namespace App\Http\Controllers;

use App\Http\Requests\Catalog\CategoriesRequest;
use App\Http\Requests\Catalog\CategoryRequest;
use App\Http\Requests\Catalog\ProductRequest;
use App\Models\CatalogCategory;
use App\Models\CatalogProduct;

class CatalogController extends Controller
{
    /**
     * Return all categories
     */
    public function categories(CategoriesRequest $request)
    {
        $categories = CatalogCategory::all();

        return response([
            'data' => $categories
        ], 200);
    }

    /**
     * Return a category with all its products
     */
    public function category($id, CategoryRequest $request)
    {
        $category = CatalogCategory::where('id', $id)
            ->with([
                'products'
            ])
            ->firstOrFail();

        return response([
            'data' => $category
        ], 200);
    }

    /**
     * Return a products data
     */
    public function product($id, ProductRequest $request)
    {
        $product = CatalogProduct::where('id', $id)
            ->with([
                'images',
            ])
            ->firstOrFail();
        
        return response([
            'data' => $product
        ], 200);
    }
}
