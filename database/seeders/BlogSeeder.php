<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogArticle;
use App\Models\BlogCategory;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BlogCategory::truncate();
        BlogArticle::truncate();

        BlogCategory::factory()
            ->count(20)
            ->create();
        
        $blogCategories = BlogCategory::all();

        foreach ($blogCategories as $category) {
            BlogArticle::factory()
                ->withCategory($category->id)
                ->count(10)
                ->create();
        }
    }
}
