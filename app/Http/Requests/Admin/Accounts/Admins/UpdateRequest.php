<?php

namespace App\Http\Requests\Admin\Accounts\Admins;

use App\Models\Admin;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the admin is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $admin = Admin::withTrashed()
            ->findOrFail(request()->route('id'));

        return [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:admins,email,'.$admin->email.',email|max:255',
        ];
    }
}
