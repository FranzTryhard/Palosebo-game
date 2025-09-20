<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GameController;

Route::get('/players', [GameController::class, 'getPlayers']);
Route::post('/progress/{id}', [GameController::class, 'updateProgress']);
Route::get('/winner', [GameController::class, 'checkWinner']);
Route::view('/test', 'test');
Route::get('/game', function () {
    return view('game'); // this will load resources/views/game.blade.php
});