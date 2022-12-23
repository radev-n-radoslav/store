<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory, SerializeDate;

    // Table name
    protected $table = 'orders';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'address',
        'city',
        'municipality',
        'postcode',
        'country_id',
        'user_id'
    ];

    /**
     * Get user, which made the order. If null than its anonymous
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    /**
     * Return country set for delivery
     */
    public function country()
    {
        return $this->belongsTo('App\Models\Country', 'country_id');
    }
}
