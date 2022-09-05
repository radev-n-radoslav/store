<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogCategoryFilterValue extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'catalog_category_filter_values';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'filter_id'
    ];

    /**
     * Return parent filter
     */
    public function filter()
    {
        return $this->belongsTo('App/Models/CatalogCategoryFilter', 'filter_id');
    }
}
