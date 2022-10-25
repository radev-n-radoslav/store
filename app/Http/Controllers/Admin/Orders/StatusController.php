<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Orders\Statuses\DeleteRequest;
use App\Http\Requests\Admin\Orders\Statuses\IndexRequest;
use App\Http\Requests\Admin\Orders\Statuses\StoreRequest;
use App\Http\Requests\Admin\Orders\Statuses\UpdateRequest;
use App\Models\OrderStatus;

class StatusController extends Controller
{
        /**
         * Get all orderStatuss
         */
        public function index($id, IndexRequest $request)
        {
            $orderStatus = OrderStatus::where('id', $id)
                ->orderBy('id', $request->sort ?? 'desc')
                ->with([
    
                ])
                ->pagiante(20);
    
            return response([
                'data' => $orderStatus
            ], 200);
            
        }
    
        /**
         * Get orderStatus details
         */
        public function details($id, IndexRequest $request)
        {
            $orderStatus = OrderStatus::where('id', $id)
                ->with([
    
                ])
                ->firstOrFail();
    
            return response([
                'data' => $orderStatus
            ], 200);
        }
    
        /**
         * Store an orderStatus
         */
        public function store(StoreRequest $request)
        {
            $orderStatus = OrderStatus::create($request->toArray());
    
            return response([
                'data' => $orderStatus
            ], 200);
        }
    
        /**
         * Update an orderStatus
         */
        public function update($id, UpdateRequest $request)
        {
            $orderStatus = OrderStatus::findOrFail($id);
            
            $orderStatus->update($request->toArray());
    
            return response([
                'data' => $orderStatus
            ], 200);
        }
    
        /**
         * Delete an orderStatus
         */
        public function delete($id, DeleteRequest $request)
        {
            OrderStatus::findOrFail($id);
    
            OrderStatus::destroy($id);
            
            return response([
    
            ], 200);
        }
}
