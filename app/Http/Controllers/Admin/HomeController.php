<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Return SPA application
     */
    public function spa()
    {
        return view('admin');
    }
}
