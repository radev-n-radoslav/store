<?php

namespace Database\Seeders;

use App\Models\CatalogProduct;
use Illuminate\Database\Seeder;

class CatalogProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CatalogProduct::truncate();
        
        CatalogProduct::factory()
            ->count(50)
            ->create();
    }
}
