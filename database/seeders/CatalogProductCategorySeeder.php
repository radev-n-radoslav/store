<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CatalogCategory;
use App\Models\CatalogProduct;
use App\Models\CatalogProductCategory;

class CatalogProductCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CatalogProductCategory::truncate();

        $categoriesCount = CatalogCategory::count();
        $products = CatalogProduct::all();

        $categoryId = function($max) {
            return rand(1, $max);
        };
        
        foreach ($products as $product) {
            $usedCategories = [];

            for ($i=0; $i < rand(1, $categoriesCount / rand(2, 3)); $i++) {
                $id = 0;
                while (true) {
                    $id = $categoryId($categoriesCount);
                    if (in_array($id, $usedCategories)) {
                        continue;
                    }else{
                        $usedCategories[] = $id;
                        break;
                    }
                }

                CatalogProductCategory::create([
                    'product_id' => $product->id, 
                    'category_id' => $id
                ]);
            }
        }
    }
}
