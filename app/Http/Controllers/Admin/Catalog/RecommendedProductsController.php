<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\RecommendedProducts\DeleteRequest;
use App\Http\Requests\Admin\Catalog\RecommendedProducts\IndexRequest;
use App\Http\Requests\Admin\Catalog\RecommendedProducts\StoreRequest;
use App\Models\CatalogProduct;
use App\Models\CatalogRecommendedProduct;

class RecommendedProductsController extends Controller
{
    /**
     * Get all recommended products
     */
    public function index(IndexRequest $request)
    {
        $recommendations = CatalogRecommendedProduct::with([
            'product.thumbnail'
        ])
            ->orderBy('id', $request->sort ?? 'desc')
            ->paginate(10);

        return response([
            'data' => $recommendations
        ], 200);
    }

    /**
     * Add a product to recommended
     */
    public function store(StoreRequest $request)
    {
        $product = CatalogProduct::findOrFail($request->product_id);

        $recommendation = CatalogRecommendedProduct::store([
            'product_id' => $product->id
        ]);

        return response([
            'data' => $recommendation
        ], 200);
    }

    /**
     * Remove a product from recommended
     */
    public function delete($id, DeleteRequest $request)
    {
        $recommendation = CatalogRecommendedProduct::findOrFail($id);

        $recommendation->delete();

        return response([

        ], 200);
    }
}
