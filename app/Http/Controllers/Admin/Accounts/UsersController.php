<?php

namespace App\Http\Controllers\Admin\Accounts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Accounts\Users\DeleteRequest;
use App\Http\Requests\Admin\Accounts\Users\DetailsRequest;
use App\Http\Requests\Admin\Accounts\Users\IndexRequest;
use App\Http\Requests\Admin\Accounts\Users\ResetPasswordRequest;
use App\Http\Requests\Admin\Accounts\Users\StoreRequest;
use App\Http\Requests\Admin\Accounts\Users\UpdateRequest;
use App\Models\User;

class UsersController extends Controller
{
    /**
     * Get all user accounts
     */
    public function index(IndexRequest $request)
    {
        $users = User::paginate(1);

        return response([
            'data' => $users
        ], 200);
    }

    /**
     * Get user details
     */
    public function details($id, DetailsRequest $request)
    {
        $user = User::findOrFail($id);

        return response([
            'data' => $user
        ], 200);
    }

    /**
     * Get user actions
     */
    public function orders($id, DetailsRequest $request)
    {
        $user = User::where('id', $id)
            ->firstOrFail();

        return response([
            'data' => $user
        ], 200);
    }

    /**
     * Store an user account
     */
    public function store(StoreRequest $request)
    {
        $user = User::create($request->toArray());

        return response([
            'data' => $user
        ], 200);
    }

    /**
     * Update an user account
     */
    public function update($id, UpdateRequest $request)
    {
        $user = User::findOrFail($id);

        $user->update($request->toArray());

        return response([
            'data' => $user
        ], 200);
    }

    /**
     * Reset an users password
     */
    public function resetPassword($id, ResetPasswordRequest $request)
    {
        
    }

    /**
     * Delete an user
     */
    public function delete($id, DeleteRequest $request)
    {
        $user = User::findOrFail($id);

        $user->delete();

        return response([
            
        ], 200);
    }
}
