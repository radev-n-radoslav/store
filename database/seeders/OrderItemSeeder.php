<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CatalogProduct;
use App\Models\Order;
use App\Models\OrderItem;

class OrderItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderItem::truncate();

        $orders = Order::count();
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

        for ($i=1; $i <= $orders; $i++) {
            $usedProductIds = [];
            for ($j=0; $j < rand(1, 10); $j++) { 
                OrderItem::create([
                    'order_id' => $i,
                    'product_id' => $getProduct($usedProductIds, $products)
                ]);
            }
        }
    }
}
