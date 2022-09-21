<?php

use Illuminate\Support\Facades\Route;

Route::get('/page-statics', 'HomeController@pageStatics');

Route::group([
    'prefix' => '/accounts',
    'namespace' => 'Accounts'
], function ()
{
    Route::group([
        'prefix' => 'users'
    ], function ()
    {
        Route::get('/', 'UsersController@index');

        Route::get('/details/{id}', 'UsersController@details');

        Route::post('/store', 'UsersController@store');

        Route::put('/update/{id}', 'UsersController@update');
        
        Route::delete('/delete/{id}', 'UsersController@delete');

        Route::post('/restore/{id}', 'UsersController@restore');

        Route::post('/reset-password/{id}', 'UsersController@resetPassword');
    });

    Route::group([
        'prefix' => 'admins'
    ], function ()
    {
        Route::get('/', 'AdminsController@index');
    
        Route::get('/details/{id}', 'AdminsController@details');
    
        Route::post('/store', 'AdminsController@store');
    
        Route::put('/update/{id}', 'AdminsController@update');
        
        Route::delete('/delete/{id}', 'AdminsController@delete');

        Route::post('/restore/{id}', 'AdminsController@restore');
    
        Route::post('/reset-password/{id}', 'AdminsController@resetPassword');

        Route::get('/actions/{id}', 'AdminsController@actions');
    });
    
});

Route::get('/', 'HomeController@spa')
    ->name('home');

Route::get('/{any}', 'HomeController@spa')
    ->where('any', '.*');
