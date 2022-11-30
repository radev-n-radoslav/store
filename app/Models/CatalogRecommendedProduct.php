<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogRecommendedProduct extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'catalog_recommended_products';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'product_id'
    ];

    public function product()
    {
        return $this->belongsTo(CatalogProduct::class, 'product_id');
    }
}
