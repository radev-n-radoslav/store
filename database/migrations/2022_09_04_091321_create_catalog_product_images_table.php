<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCatalogProductImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('catalog_product_images', function (Blueprint $table) {
            $table->id();
            $table->string('url', 8192);
            $table->boolean('is_thumbnail')
                ->default(0);
            $table->unsignedInteger('order_place');
            $table->unsignedBigInteger('product_id')
                ->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('catalog_product_images');
    }
}
