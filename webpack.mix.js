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

mix.ts('resources/js/admin/index.tsx', 'public/js/admin.js')
	.react()
    .postCss('resources/css/admin/app.css', 'public/css/admin.css', [
        require('tailwindcss'),
    ])
    .version();

mix.ts('resources/js/ui/index.tsx', 'public/js/ui.js')
	.react()
    .postCss('resources/css/ui/app.css', 'public/css/ui.css', [
        require('tailwindcss'),
    ])
    .version();
