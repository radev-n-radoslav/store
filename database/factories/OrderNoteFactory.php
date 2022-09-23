<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OrderNoteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'content' => $this->faker->sentences(rand(3, 7), true)
        ];
    }

    public function withOrder($orderId)
    {
        return $this->state([
            'order_id' => $orderId
        ]);
    }
}
