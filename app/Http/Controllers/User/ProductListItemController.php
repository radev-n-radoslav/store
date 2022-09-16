<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\ProductList\Item\StoreRequest;
use App\Models\UserProductList;
use App\Models\UserProductListItem;
use Illuminate\Support\Facades\Auth;

class ProductListItemController extends Controller
{
    public function store($id = null, StoreRequest $request)
    {
        if (!$id) {
            $list = UserProductList::where('user_id', Auth::id())
                ->where('is_primary', 1)
                ->firstOrFail();
        }else{
            $list = UserProductList::where('user_id', Auth::id())
                ->where('id', $id)
                ->firstOrFail();
        }
        
        $item = UserProductListItem::create([
            'list_id' => $list->id,
            'product_id' => $request->product_id
        ]);

        return response([
            'data' => $item
        ], 200);
    }
}
