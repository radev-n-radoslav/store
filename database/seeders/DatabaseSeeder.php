<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seeders called only for development
        if (app()->isLocal()) {
            $this->call(CatalogCategorySeeder::class);
            $this->call(CatalogProductSeeder::class);
            $this->call(CatalogProductImageSeeder::class);
            $this->call(CatalogProductCategorySeeder::class);

            $this->call(AdminSeeder::class);
            $this->call(UserSeeder::class);

            $this->call(UserProductListSeeder::class);
            $this->call(UserProductListItemSeeder::class);

            $this->call(BlogSeeder::class);
        }
    }
}
