<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\Traits\HashPassword;
use App\Models\Traits\SerializeDate;

class Admin extends Authenticatable
{
    use HasFactory, Notifiable, HashPassword, SoftDeletes, SerializeDate;

    protected $table = "admins";

    protected $guard = 'admin';

    /**
     * Mass asignable attributes
     * 
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * Eloquent events.
     */
    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->hashPassword();
        });
        static::updating(function ($model) {
            $model->hashPassword();
        });
    }
}
