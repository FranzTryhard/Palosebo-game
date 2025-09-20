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
    Schema::create('games', function (Blueprint $table) {
        $table->id();
        $table->enum('status', ['waiting', 'in-progress', 'finished'])->default('waiting');
        $table->unsignedBigInteger('winner_id')->nullable();
        $table->foreign('winner_id')->references('id')->on('players')->onDelete('set null');
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
