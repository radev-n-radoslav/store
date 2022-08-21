<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Return SPA application
     */
    public function spa()
    {
        return view('ui');
    }
}
