<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::create('player_progress', function (Blueprint $table) {
        $table->id();
        $table->unsignedBigInteger('game_id');
        $table->unsignedBigInteger('player_id');
        $table->integer('progress')->default(0); // % of climb (0–100)
        $table->timestamps();

        $table->foreign('game_id')->references('id')->on('games')->onDelete('cascade');
        $table->foreign('player_id')->references('id')->on('players')->onDelete('cascade');
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('player_progress');
    }
};
