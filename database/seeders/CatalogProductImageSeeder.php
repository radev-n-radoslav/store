<?php

namespace Database\Seeders;

use App\Models\CatalogProduct;
use App\Models\CatalogProductImage;
use Illuminate\Database\Seeder;

class CatalogProductImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CatalogProductImage::truncate();

        $products = CatalogProduct::all();
        
        foreach ($products as $product) {
            CatalogProductImage::factory()
                ->withProduct($product->id)
                ->count(7)
                ->create();
        }

        foreach ($products as $product) {
            $image = CatalogProductImage::where('product_id', $product->id)
                ->inRandomOrder()
                ->first();
            $image->is_thumbnail = 1;
            $image->save();    
        }
    }
}
