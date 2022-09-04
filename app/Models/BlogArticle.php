<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogArticle extends Model
{
    use HasFactory;

    // Table name
    protected $table = 'blog_articles';

    /**
     * Assignable fields
     */
    protected $fillable = [
        'title',
        'content',
        'thumbnail_url',
        'category_id',
        'views'
    ];
}
