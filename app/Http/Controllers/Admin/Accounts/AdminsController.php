<?php

namespace App\Http\Controllers\Admin\Accounts;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Accounts\Admins\DeleteRequest;
use App\Http\Requests\Admin\Accounts\Admins\DetailsRequest;
use App\Http\Requests\Admin\Accounts\Admins\IndexRequest;
use App\Http\Requests\Admin\Accounts\Admins\ResetPasswordRequest;
use App\Http\Requests\Admin\Accounts\Admins\RestoreRequest;
use App\Http\Requests\Admin\Accounts\Admins\StoreRequest;
use App\Http\Requests\Admin\Accounts\Admins\UpdateRequest;
use App\Models\Admin;

class AdminsController extends Controller
{
    /**
     * Get all admin accounts
     */
    public function index(IndexRequest $request)
    {
        $admins = Admin::withTrashed()
            ->orderBy('id', $request->sort ?? 'desc')
            ->paginate(10);

        return response($admins, 200);
    }

    /**
     * Get admin details
     */
    public function details($id, DetailsRequest $request)
    {
        $admin = Admin::withTrashed()
            ->findOrFail($id);

        return response($admin, 200);
    }

    /**
     * Get admin actions
     */
    public function actions($id, DetailsRequest $request)
    {
        $admin = Admin::where('id', $id)
            ->firstOrFail();

        return response([
            'data' => $admin
        ], 200);
    }

    /**
     * Store an admin account
     */
    public function store(StoreRequest $request)
    {
        $admin = Admin::create($request->toArray());

        return response($admin, 200);
    }

    /**
     * Update an admin account
     */
    public function update($id, UpdateRequest $request)
    {
        $admin = Admin::withTrashed()
            ->findOrFail($id);

        $admin->update($request->toArray());

        return response([
            'data' => $admin
        ], 200);
    }

    /**
     * Reset an admins password
     */
    public function resetPassword($id, ResetPasswordRequest $request)
    {
        
    }

    /**
     * Delete an admin
     */
    public function delete($id, DeleteRequest $request)
    {
        $admin = Admin::findOrFail($id);

        $admin->delete();

        return response([
            
        ], 200);
    }

    /**
     * Restore an admin
     */
    public function restore($id, RestoreRequest $request)
    {
        $admin = Admin::withTrashed()
            ->findOrFail($id);

        $admin->restore();

        return response([
            
        ], 200);
    }
}
