<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogCategoryFilter extends Model
{
    use HasFactory, SoftDeletes;

    // Table name
    protected $table = 'catalog_category_filters';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'is_inclusive',
        'has_multiple',
        'category_id'
    ];
}
