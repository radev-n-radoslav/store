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

    /**
     * Return product images
     */
    public function images()
    {
        return $this->hasMany('App/Models/CatalogProductImage', 'product_id');
    }

    /**
     * Return pivot rows for the categories, to which product belongs to
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function categoriesRaw()
    {
        return $this->hasMany('App\Models\CatalogProductCategory', 'product_id');
    }

    /**
     * Return the categories, to which the product belongs to
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function categories()
    {
        return $this->belongsToMany(
            'App\Models\CatalogCategory', 
            'catalog_product_categories', 
            'product_id', 
            'category_id'
        );
    }
}
