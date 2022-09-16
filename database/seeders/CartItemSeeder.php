<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CartItem;
use App\Models\CatalogProduct;
use App\Models\User;

class CartItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        CartItem::truncate();

        $users = User::count();
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

        for ($i=1; $i <= $users; $i++) {
            $usedProductIds = [];
            for ($j=0; $j < rand(1, 10); $j++) { 
                CartItem::create([
                    'user_id' => $i,
                    'product_id' => $getProduct($usedProductIds, $products),
                    'quantity' => rand(1, 20)
                ]);
            }
        }
    }
}
