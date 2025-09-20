<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Player;

class PlayerSeeder extends Seeder
{
    public function run(): void
    {
        Player::create(['name' => 'Player 1', 'score' => 0]);
        Player::create(['name' => 'Player 2', 'score' => 0]);
    }
}
