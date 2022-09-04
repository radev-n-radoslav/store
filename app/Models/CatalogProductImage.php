<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogProductImage extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'catalog_product_images';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'url',
        'is_thumbnail',
        'order_place',
        'product_id',
    ];
}
