<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\UserProductList;
use Illuminate\Database\Seeder;

class UserProductListSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        UserProductList::truncate();

        $users = User::all();

        foreach($users as $user){
            UserProductList::factory()
                ->withUser($user->id)
                ->count(5)
                ->create();
        }
    }
}
