<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'order_items';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'gross_price'
    ];

}
