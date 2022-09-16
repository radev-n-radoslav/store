<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BlogArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraph(),
            'thumbnail_url' => $this->faker->imageUrl(1920, 1080, 'doctor', true),
            'views' => rand(0, 999999)
        ];
    }

    public function withCategory($id)
    {
        return $this->state([
            'category_id' => $id
        ]);
    }
}
