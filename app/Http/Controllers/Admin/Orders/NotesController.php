<?php

namespace App\Http\Controllers\Admin\Orders;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Orders\Notes\DeleteRequest;
use App\Http\Requests\Admin\Orders\Notes\StoreRequest;
use App\Http\Requests\Admin\Orders\Notes\UpdateRequest;
use App\Models\Order;
use App\Models\OrderNote;

class NotesController extends Controller
{
    /**
     * Store an order note
     * 
     * @param $id
     * @param $request
     * 
     * @return App\Models\OrderNote
     */
    public function store($id, StoreRequest $request)
    {
        Order::findOrFail($id);

        $requestData = $request->toArray();
        $requestData['order_id'] = $id;

        $note = OrderNote::store($requestData);

        return response([
            'data' => $note,
        ], 200);
    }

    /**
     * Update an order note
     * 
     * @param $id
     * @param $request
     * 
     * @return App\Models\OrderNote
     */
    public function update($id, UpdateRequest $request)
    {
        $note = OrderNote::findOrFail($id);

        $note->update($request->toArray());

        return response([
            'data' => $note
        ], 200);
    }

    /**
     * Delete an order note
     * 
     * @param $id
     * @param $request
     * 
     * @return \Illuminate\Http\Response|\Illuminate\Contracts\Routing\ResponseFactory
     */
    public function delete($id, DeleteRequest $request)
    {
        OrderNote::findOrFail($id);

        OrderNote::destroy($id);

        return response([

        ], 200);
    }
}
