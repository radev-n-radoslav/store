<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\User\Cart\DeleteRequest;
use App\Http\Requests\User\Cart\IndexRequest;
use App\Http\Requests\User\Cart\StoreRequest;
use App\Http\Requests\User\Cart\UpdateRequest;
use App\Models\CartItem;


class CartController extends Controller
{
    public function index(IndexRequest $request)
    {
        $items = CartItem::where('user_id', Auth::id())
            ->with([
                'products'
            ])
            ->get();
        
        return response([
            'data' => $items
        ], 200);
    }

    public function store(StoreRequest $request)
    {
        $data = $request->toArray();
        $data['user_id'] = Auth::id();

        CartItem::create($data);

        return response([
            
        ], 200);
    }

    public function update($id, UpdateRequest $request)
    {
        $item = CartItem::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        if ($request->quantity == 0) {
            $item->delete();
        }else{
            $item->update([
                'quantity' => $request->quanitity
            ]);
        }

        return response([
            
        ], 200);
    }

    public function delete($id, DeleteRequest $request)
    {
        $item = CartItem::where('user_id', Auth::id())
            ->where('id', $id)
            ->firstOrFail();

        $item->delete();
        return response([
            
        ], 200);
    }
}
