<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();

        User::create([
            'name' => 'Radoslav',
            'email' => 'radev.n.radoslav@gmail.com',
            'password' => '12345678'
        ]);

        User::factory()
            ->count(10)
            ->create();
    }
}
