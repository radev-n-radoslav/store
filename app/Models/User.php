<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'surname',
        'email',
        'phone',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Create the users first wish list
     */
    public function createWishList()
    {
        UserProductList::create([
            'name' => 'Wishlist',
            'user_id' => $this->id,
            'is_primary' => 1
        ]);
    }

    /**
     * Cart items
     */
    public function cart()
    {
        return $this->belongsToMany(
            CatalogProduct::class,
            'cart_items',
            'user_id',
            'product_id'
        );
    }

    /**
     * Cart items raw
     */
    public function cartRaw()
    {
        return $this->belongsTo(CartItem::class, 'user_id');
    }

    /**
     * Orders
     */
    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    /**
     * Check if user that is currently being created has a password and if not generate one
     */
    public function checkGeneratePassword()
    {
        if($this->password){
            return;
        }
        $this->password = Hash::make(Str::random(rand(8, 16)));
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model)
        {
            $model->checkGeneratePassword();
        });

        static::created(function ($model)
        {
            $model->createWishList();
        });

        static::updating(function ($model)
        {
            
        });

        static::deleting(function ($model)
        {
            
        });
    }
}
