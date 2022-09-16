<?php

namespace Database\Seeders;

use App\Models\OrderStatus;
use Illuminate\Database\Seeder;

class OrderStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderStatus::truncate();

        $statuses = [
            'recieved',
            'accepted',
            'shipped',
            'delivered'
        ];

        foreach ($statuses as $status) {
            OrderStatus::create([
                'name' => $status
            ]);
        }
    }
}
