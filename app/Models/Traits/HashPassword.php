<?php

namespace App\Models\Traits;

use Illuminate\Support\Facades\Hash;

trait HashPassword {

	/**
     * Hashes the password, that comes from the lifecycle
     *
     * @return void
     */
    public function hashPassword()
    {
        // https://github.com/radev-n-radoslav/eshop/issues/53
        //TODO: Fix Bug
        /*if ($this::getOriginal()['password'] == $this->attributes['password']) {
           return;
        }*/
        $this->attributes["password"] = Hash::make($this->password);
    }
}
