<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogProduct extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'catalog_products';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'description',
        'sku',
        'quantity',
        'gross_price'
    ];
}
