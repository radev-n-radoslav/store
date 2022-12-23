<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BlogArticle extends Model
{
    use HasFactory, SerializeDate;

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

    /**
     * Get parent category
     */
    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model)
        {
            $model->views = 0;
        });
    }
}
