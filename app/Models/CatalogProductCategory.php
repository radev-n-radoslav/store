<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogProductCategory extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'catalog_product_categories';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'product_id',
        'category_id'
    ];
}
