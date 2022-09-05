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

    /**
     * Return category filters
     */
    public function filters()
    {
        return $this->hasMany('App/Models/CatalogCategoryFilter', 'category_id');
    }

    /**
     * Return the parent category.
     * This relationship refers to the same table.
     * 
     * @return App\Models\CatalogCategory | null
     */
    public function parent()
    {
        return $this->belongsTo('App\Models\CatalogCategory', 'parent_id');
    }

    /**
     * Return all children for the current model.
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function children()
    {
        return $this->hasMany('App\Models\CatalogCategory', 'parent_id', 'id')
            ->orderBy('order_place', 'DESC');
    }

    /**
     * Return all products, that belong to this category
     * 
     * @return Illuminate\Database\Eloquent\Collection
     */
    public function products($active_only = false)
    {
        if ($active_only) {
            return $this->belongsToMany(
                'App\CatalogProduct', 
                'catalog_product_categories', 
                'category_id', 
                'product_id'
            )
                ->where('is_active', 1)
                ->whereDate('active_from', '<=', Carbon::now('Europe/Sofia'))
                ->where(function ($query)
                {
                    $query->whereDate('active_to', '>=', Carbon::now('Europe/Sofia'))
                        ->orWhereNull('active_to');
                });
        }else{
            return $this->belongsToMany(
                'App\CatalogProduct', 
                'catalog_product_categories', 
                'category_id', 
                'product_id'
            );
        } 
    }

    /**
     * Return product count in current category
     * 
     * @return integer
     */
    public function productsCount($active_only = false)
    {
        return $this->products($active_only)->count();
    }

    /**
     * Resolve category arrangement in same parent category on CREATED event.
     * 
     * @return void
     */
    public function rearrangeCreated()
    {   
        $categoires = $this->where('id', '!=', $this->id)
            ->where('parent_id', $this->parent_id)
            ->where('order_place', '>=', $this->order_place)
            ->increment('order_place', 1);
    }

    /**
     * Resolve category arrangement in same parent category on UPDATING event.
     * 
     * @return void
     */
    public function rearrangeUpdating()
    {   
        // If no changes to parent or order place, do not run rearrangement algorithms.
        if ($this->getOriginal()['parent_id'] == $this->parent_id && $this->getOriginal()['order_place'] == $this->order_place) {

            return;
        }

        if ($this->getOriginal()['parent_id'] == $this->parent_id && $this->getOriginal()['order_place'] != $this->order_place) {

            $categories = $this->where('parent_id', $this->parent_id)
                ->where('id', '!=', $this->id)
                ->orderBy('order_place', 'ASC')
                ->get();
            
            foreach ($categories as $key => $category) {
                if ($key >= $this->order_place) {
                    $category->order_place = ($key + 1);
                }else{
                    $category->order_place = $key;
                }
                $category->saveQuietly();
            }

            return;
        }

        if ($this->getOriginal['parent_id'] != $this->parent_id) {
            $this->where('parent_id', $this->getOriginal()['parent_id'])
                ->where('id', '!=', $this->id)
                ->where('order_place', '>', $this->getOriginal()['order_place'])
                ->decrement('order_place', 1);

            $this->where('parent_id', $this->parent_id)
                ->where('order_place', '>', $this->order_place)
                ->increment('order_place', 1);

            return;
        }
    }

    /**
     * Resolve category arrangement in same parent category on DELETING event.
     * 
     * @return void
     */
    public function rearrangeDeletion()
    {   
        $categoires = $this->where('id', '!=', $this->id)
            ->where('parent_id', $this->parent_id)
            ->orderBy('order_place', 'ASC')
            ->get();

        foreach ($categoires as $key => $category) {
            $category-> order_place = $key;
            $category-> saveQuietly();
        }
    }

    /**
     * Delete related rows in CPC.
     * CPC -> CatalogProductCategory
     * 
     * @return void
     */
    public function deleteCPCRelations($relatedAttribute)
    {
        CatalogProductCategory::where($relatedAttribute, $this->id)
            ->delete();
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model)
        {

        });

        static::created(function ($model)
        {
            $model->rearrangeCreated();
        });

        static::updating(function ($model)
        {
            $model->rearrangeUpdating();
        });

        static::deleting(function ($model)
        {
            $model->rearrangeDeletion();
            $model->deleteCPCRelations('category_id');
        });
    }
}
