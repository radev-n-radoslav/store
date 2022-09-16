<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProductListItem extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'user_product_list_items';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'list_id',
        'product_id'
    ];

    /**
     * Return product
     */
    public function product()
    {
        return $this->belongsTo('App\Models\CatalogProduct', 'product_id');
    }

    /**
     * Return product list
     */
    public function list()
    {
        return $this->belongsTo('App\Models\UserProductList', 'list_id');
    }
}
