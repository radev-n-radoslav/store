<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CatalogProductImage extends Model
{
    use HasFactory, SerializeDate;

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

    /**
     * Return parent product
     */
    public function product()
    {
        return $this->belongsTo('App/Models/CatalogProduct', 'product_id');
    }
}
