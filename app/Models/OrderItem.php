<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model
{
    use HasFactory, SerializeDate;

    // Table name
    protected $table = 'order_items';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'order_id',
        'product_id',
        'quantity',
        'price'
    ];

}
