<?php

namespace App\Http\Requests\Admin\Blog\Categories;

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
        $rules = [
            'name' => 'required|string|max:255',
            'description' => 'string|nullable|max:2048',
        ];

        if ($this->thumbnail_url) {
            $rules['thumbnail_url'] = 'nullable|string';
        }else{
            $rules['thumbnail'] = 'image|nullable|mimes:jpeg,png,jpg,gif|max:2048';
        }

        return $rules;
    }
}
