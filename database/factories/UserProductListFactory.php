<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class UserProductListFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(rand(3, 5), true),
            'is_primary' => 0
        ];
    }

    public function withUser($userId)
    {
        return $this->state([
            'user_id' => $userId
        ]);
    }
}
