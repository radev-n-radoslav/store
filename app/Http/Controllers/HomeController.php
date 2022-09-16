<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Return SPA application
     */
    public function spa()
    {
        return view('ui');
    }

    /**
     * Get page static data. I.e footer/ header links, logo
     */
    public function pageStatics(Request $request)
    {
        $data = Storage::disk('local')->get('pageStatics.json');

        return response($data, 200);
    }
}
