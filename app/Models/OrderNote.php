<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderNote extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'order_notes';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'content',
        'order_id'
    ];

    /**
     * Return order to which note belongs to
     * 
     * @return Collection
     */
    public function order()
    {
        return $this->belongsTo('App\Models\Order', 'order_id');
    }
}
