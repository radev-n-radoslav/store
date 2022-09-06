<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\ProductList\DeleteRequest;
use App\Http\Requests\User\ProductList\DetailsRequest;
use App\Http\Requests\User\ProductList\IndexRequest;
use App\Http\Requests\User\ProductList\SetPrimaryRequest;
use App\Http\Requests\User\ProductList\StoreRequest;
use App\Http\Requests\User\ProductList\UpdateRequest;
use App\Models\UserProductList;


class ProductListController extends Controller
{
    /**
     * Get all lists that belong to a user
     */
    public function index(IndexRequest $request)
    {
        $lists = UserProductList::where('user_id', Auth::id())
            ->get();
        
        return response([
            'data' => $lists
        ], 200);
    }

    /**
     * Get list details and items
     */
    public function details($id, DetailsRequest $request)
    {
        $list = UserProductList::where('user_id', Auth::id())
            ->with([
                'items'
            ])
            ->where('id', $id)
            ->findOrFail();

            return response([
                'data' => $list
            ], 200);
    }

    /**
     * Store a new list
     */
    public function store(StoreRequest $request)
    {
        $data = $request->toArray();
        $data['user_id'] = Auth::id();

        $list = UserProductList::create($data);

        return response([
            'data' => $list
        ], 200);
    }

    /**
     * Update a list
     */
    public function update($id, UpdateRequest $request)
    {
        $list = UserProductList::findOrFail($id);
        $list->update($request->toAray());

        return response([
            'data' => $list
        ], 200);
    }

    /**
     * Set list as primary
     */
    public function setPrimary($id, SetPrimaryRequest $request)
    {
        $list = UserProductList::findOrFail($id);
        
        $list->is_primary = 1;
        $list->save();

        $list->setListPrimary($list);
        
        return response([
            
        ], 200);
    }

    /**
     * Delete a list
     */
    public function delete($id, DeleteRequest $request)
    {
        $list = UserProductList::findOrFail($id);
        $list->rawItems()->delete();
        $list->delete();

        return response([
            
        ], 200);
    }
}
