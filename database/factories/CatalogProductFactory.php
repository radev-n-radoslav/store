<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CatalogProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->words(rand(3, 6), true),
            'description' => $this->faker->paragraphs(rand(3, 5), true),
            'sku' => $this->faker->word(),
            'quantity' => rand(0, 1000),
            'gross_price' => rand(100, 1000000) / 100
        ];
    }
}
