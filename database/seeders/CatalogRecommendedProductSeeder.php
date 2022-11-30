<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CatalogProduct;
use App\Models\CatalogRecommendedProduct;

class CatalogRecommendedProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CatalogRecommendedProduct::truncate();
        
        $products = CatalogProduct::inRandomOrder()
            ->limit(25)
            ->get();

        foreach ($products as $product) {
            CatalogRecommendedProduct::create([
                'product_id' => $product->id
            ]);
        }
    }
}
