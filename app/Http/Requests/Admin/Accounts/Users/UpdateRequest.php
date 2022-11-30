<?php

namespace App\Http\Requests\Admin\Accounts\Users;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
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
        $user = User::findOrFail(request()->route('id'));

        return [
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'phone' => 'string|nullable|max:255',
            'email' => 'required|string|email|unique:users,email,'.$user->email.',email|max:255',
        ];
    }
}
