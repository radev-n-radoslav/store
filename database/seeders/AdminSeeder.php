<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Admin;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::truncate();

        Admin::create([
            'name' => 'Radoslav',
            'email' => 'radev.n.radoslav@gmail.com',
            'password' => '12345678'
        ]);

        Admin::factory()
            ->count(10)
            ->create();
    }
}
