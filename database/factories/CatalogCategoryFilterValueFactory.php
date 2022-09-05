<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CatalogCategoryFilterValueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->word()
        ];
    }

    public function withParent($filterId)
    {
        return $this->state([
            'filter_id' => $filterId
        ]);
    }
}
