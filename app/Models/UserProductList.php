<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserProductList extends Model
{
    use HasFactory, SoftDeletes;

    // Table name
    protected $table = 'user_product_lists';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'user_id',
        'is_primary'
    ];

    /**
     * Return the User to which list belongs to
     */
    public function user()
    {
        return $this->belongsTo('App\Models\User', 'user_id');
    }

    /**
     * Return list items
     */
    public function items()
    {
        return $this->belongsToMany(
            'App\Models\CatalogProduct', 
            'user_product_list_items', 
            'list_id', 
            'product_id'
        );
    }

    /**
     * Set a list as primary and remove primary flag from others
     */
    public function setListPrimary($model)
    {
        UserProductList::where('user_id', $model->user_id)
            ->where('id', '!=', $model->id)
            ->update([
                'is_primary' => 0
            ]);
    }

    public static function boot()
    {
        parent::boot();

        static::created(function ($model)
        {
            if ($model->is_primary) {
                $model->setListPrimary($model);
            }
        });

        static::deleting(function ($model)
        {

        });
    }
}
