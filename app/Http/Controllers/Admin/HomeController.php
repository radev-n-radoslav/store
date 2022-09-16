<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class HomeController extends Controller
{
    /**
     * Return SPA application
     */
    public function spa()
    {
        return view('admin');
    }

    /**
     * Get Application static data
     */
    public function pageStatics()
    {
        $data = Storage::disk('local')->get('admin/pageStatics.json');

        return response($data, 200);
    }
}
