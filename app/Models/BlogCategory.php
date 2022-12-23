<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BlogCategory extends Model
{
    use HasFactory, SoftDeletes, SerializeDate;

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

    /**
     * Return child articles
     */
    public function articles()
    {
        return $this->hasMany('App/Models/BlogArticle', 'category_id');
    }
}
