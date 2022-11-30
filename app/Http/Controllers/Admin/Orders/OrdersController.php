<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Orders\DeleteRequest;
use App\Http\Requests\Admin\Orders\IndexRequest;
use App\Http\Requests\Admin\Orders\StoreRequest;
use App\Http\Requests\Admin\Orders\UpdateRequest;
use App\Models\Order;

class OrdersController extends Controller
{
    /**
     * Get all orders
     */
    public function index($id, IndexRequest $request)
    {
        $order = Order::where('id', $id)
            ->orderBy('id', $request->sort ?? 'desc')
            ->with([

            ])
            ->pagiante(20);

        return response([
            'data' => $order
        ], 200);
        
    }

    /**
     * Get order details
     */
    public function details($id, IndexRequest $request)
    {
        $order = Order::where('id', $id)
            ->with([

            ])
            ->firstOrFail();

        return response([
            'data' => $order
        ], 200);
    }

    /**
     * Store an order
     */
    public function store(StoreRequest $request)
    {
        $order = Order::create($request->toArray());

        return response([
            'data' => $order
        ], 200);
    }

    /**
     * Update an order
     */
    public function update($id, UpdateRequest $request)
    {
        $order = Order::findOrFail($id);
        
        $order->update($request->toArray());

        return response([
            'data' => $order
        ], 200);
    }

    /**
     * Delete an order
     */
    public function delete($id, DeleteRequest $request)
    {
        Order::findOrFail($id);

        Order::destroy($id);
        
        return response([

        ], 200);
    }
}
