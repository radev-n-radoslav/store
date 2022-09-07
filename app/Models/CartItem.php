<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CartItem extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'cart_items';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'user_id',
        'product_id',
        'quantity'
    ];

    /**
     * Get user, to which cart belongs to.
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    /**
     * Get product
     */
    public function product()
    {
        return $this->belongsTo('App\Models\CatalogProduct', 'product_id');
    }
}
