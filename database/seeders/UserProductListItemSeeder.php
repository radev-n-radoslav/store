<?php

namespace Database\Seeders;

use App\Models\CatalogProduct;
use App\Models\UserProductList;
use App\Models\UserProductListItem;
use Illuminate\Database\Seeder;

class UserProductListItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserProductListItem::truncate();

        $lists = UserProductList::count();
        $products = CatalogProduct::count();

        $usedProductIds = [];
        $getProduct = function (&$usedProductIds, $products)
        {
            $id = rand(1, $products);
            while(in_array($id, $usedProductIds)){
                $id = rand(1, $products);
            }
            $usedProductIds[] = $id;
            return $id;
        };

        for ($i=1; $i <= $lists; $i++) {
            $usedProductIds = [];
            for ($j=0; $j < 5; $j++) { 
                UserProductListItem::create([
                    'list_id' => $i,
                    'product_id' => $getProduct($usedProductIds, $products)
                ]);
            }
        }
    }
}
