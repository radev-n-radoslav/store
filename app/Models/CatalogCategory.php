<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CatalogCategory extends Model
{
    use HasFactory, SoftDeletes;

    // Table name
    protected $table = 'catalog_categories';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'description',
        'parent_id',
        'order_place'
    ];
}
