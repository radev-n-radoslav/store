<?php

namespace Database\Seeders;

use App\Models\Order;
use App\Models\OrderNote;
use Illuminate\Database\Seeder;

class OrderNoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderNote::truncate();

        $orders = Order::count();

        for ($i=1; $i <= $orders; $i++) { 
            OrderNote::factory()
                ->withOrder($i)
                ->count(5)
                ->create();
        }
    }
}
