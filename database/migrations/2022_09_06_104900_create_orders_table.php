<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('surname');
            $table->string('email')
                ->index();
            $table->string('phone')
                ->nullable()
                ->index();
            $table->string('address', 512);
            $table->string('city');
            $table->string('municipality');
            $table->string('postcode', 16);
            $table->unsignedBigInteger('country_id')
                ->index();
            $table->unsignedBigInteger('user_id')
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
        Schema::dropIfExists('orders');
    }
}
