<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogProduct extends Model
{
    use HasFactory, SoftDeletes, SerializeDate;

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
        return $this->hasMany(CatalogProductImage::class, 'product_id');
    }

    /**
     * Return product thumbnail
     */
    public function thumbnail()
    {
        return $this->hasOne(CatalogProductImage::class, 'product_id')
            ->where('is_thumbnail', 1);
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
