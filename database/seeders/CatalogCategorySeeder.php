<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CatalogCategory;

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

        CatalogCategory::factory()
            ->count(10)
            ->create();
    }
}
