<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'order_statuses';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name'
    ];
}
