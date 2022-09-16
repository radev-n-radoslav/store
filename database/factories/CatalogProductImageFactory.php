<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CatalogProductImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'url' => $this->faker->imageUrl(1920, 1080, 'doctor', true),
            'is_thumbnail' => 0,
            'order_place' => 0
        ];
    }

    public function withProduct($productId)
    {
        return $this->state([
            'product_id' => $productId
        ]);
    }
}
