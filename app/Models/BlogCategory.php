<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
    use HasFactory, SoftDeletes;

    // Table name
    protected $table = 'blog_categories';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'name',
        'description',
        'thumbnail_url'
    ];
}
