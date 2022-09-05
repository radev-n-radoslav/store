<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CatalogCategory;
use App\Models\CatalogCategoryFilter;
use App\Models\CatalogCategoryFilterValue;

class CatalogCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CatalogCategory::truncate();
        CatalogCategoryFilter::truncate();
        CatalogCategoryFilterValue::truncate();

        // Seed Categories
        CatalogCategory::factory()
            ->count(10)
            ->create();

        // Seed category filters
        $categories = CatalogCategory::all();
        
        foreach ($categories as $category) {
            CatalogCategoryFilter::factory()
                ->withCategory($category->id)
                ->count(5)
                ->create();
        }

        // Seed Category filter values
        $filters = CatalogCategoryFilter::all();

        foreach ($filters as $filter) {
            CatalogCategoryFilterValue::factory()
                ->withParent($filter->id)
                ->count(5)
                ->create();
        }
    }
}
