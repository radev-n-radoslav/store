<?php

use Illuminate\Support\Facades\Route;

Route::get('/page-statics', 'HomeController@pageStatics');

Route::get('/', 'HomeController@spa')
    ->name('home');

Route::get('/{any}', 'HomeController@spa')
    ->where('any', '.*');
