<?php

namespace App\Http\Controllers\Admin\Catalog;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Catalog\Filters\DeleteRequest;
use App\Http\Requests\Admin\Catalog\Filters\DetailsRequest;
use App\Http\Requests\Admin\Catalog\Filters\IndexRequest;
use App\Http\Requests\Admin\Catalog\Filters\StoreRequest;
use App\Http\Requests\Admin\Catalog\Filters\UpdateRequest;
use App\Models\CatalogCategoryFilter;

class FiltersController extends Controller
{
    /**
     * Get all Category filters
     */
    public function index($id, IndexRequest $request)
    {
        $filters = CatalogCategoryFilter::where('category_id', $id)
            ->orderBy('created_at', 'DESC')
            ->get();
        
        return response([
            'data' => $filters
        ], 200);
    }

    /**
     * Get details about a filter
     */
    public function details($id, DetailsRequest $request)
    {
        $filter = CatalogCategoryFilter::findOrFail($id);

        return response([
            'data' => $filter
        ], 200);
    }

    /**
     * Store a filter
     */
    public function store($id, StoreRequest $request)
    {
        $filter = CatalogCategoryFilter::create($request->toArray());

        return response([
            'data' => $filter
        ], 200);
    }

    /**
     * Update a filter
     */
    public function update($id, UpdateRequest $request)
    {
        $filter = CatalogCategoryFilter::findOrFail($id);

        $filter->update($request->toArray());

        return response([

        ], 200);
    }

    /**
     * Delete a filter
     */
    public function delete($id, DeleteRequest $request)
    {
        $filter = CatalogCategoryFilter::findOrFail($id);

        $filter->delete();

        return response([

        ], 200);
    }
}
