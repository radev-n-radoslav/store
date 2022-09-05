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

    /**
     * Return the products assosiated with the record
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function product()
    {
        return $this->belongsTo('App\CatalogProduct', 'product_id');
    }

    /**
     * Return the categories assosiated with the record
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function category()
    {
        return $this->belongsTo('App\CatalogCategory', 'category_id');
    }
}
