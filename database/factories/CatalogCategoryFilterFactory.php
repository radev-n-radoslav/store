<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CatalogCategoryFilterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word(),
            'is_inclusive' => rand(0, 1),
            'has_multiple' => rand(0, 1)
        ];
    }

    public function withCategory($categoryId)
    {
        return $this->state([
            'category_id' => $categoryId
        ]);
    }
}
