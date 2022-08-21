<?php

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait GenerateSlug {
	
    /**
     * Generate unique slug for Create event.
     * 
     * @return void
     */
    public function generateSlug($field = 'name')
    {
        if (array_key_exists($field, $this->getOriginal())) {
            if ($this->getOriginal()[$field] == $this->attributes[$field]) {
                return;
            }
        }

        $slug = Str::slug($this->attributes[$field]);
        $isUnique = false;

        while (!$isUnique) {
            $iteration = $this->where('slug', $slug)
                ->first();

            if ($iteration === null) {
                $isUnique = true;
            }else{
                $slug .= '-'.rand(0, 1000);
            }
        }

        $this->attributes['slug'] = $slug;
    }
}