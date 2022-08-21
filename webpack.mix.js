const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/admin/app.js', 'public/js/admin.js')
    .vue()
    .postCss('resources/css/admin/app.css', 'public/css/admin.css', [
        require('tailwindcss'),
    ]);

mix.js('resources/js/ui/app.js', 'public/js/ui.js')
    .vue()
    .postCss('resources/css/ui/app.css', 'public/css/ui.css', [
        require('tailwindcss'),
    ]);
