<?php

namespace App\Http\Requests\Admin\Catalog\Products;

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
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|text',
            'sku' => 'string|nullable|max:255',
            'quantity' => 'required|nullable',
            'gross_price' => 'required|regex:/^\d+(\.\d{1,2})?$/'
        ];
    }
}
