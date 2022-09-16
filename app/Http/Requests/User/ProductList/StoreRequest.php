<?php

namespace App\Http\Requests\User\ProductList;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
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
        return [
            'name' => 'required|string|max:255|min:1',
            'is_primary' => 'integer|nullable'
        ];
    }

    /**
     * Get the custom validation rule messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            
        ];
    }

    /**
     * Get the custom validation attribute names.
     *
     * @return array
     */
    public function attributes()
    {
        return [
            'is_primary' => 'set primary'
        ];
    }
}
