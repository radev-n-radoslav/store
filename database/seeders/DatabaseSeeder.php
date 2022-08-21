<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Seeders called only for development
        if (app()->isLocal()) {
            $this->call(AdminSeeder::class);
            $this->call(UserSeeder::class);
        }
    }
}
