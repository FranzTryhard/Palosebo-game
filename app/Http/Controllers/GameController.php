<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Player;

class GameController extends Controller
{
    // Get all players
    public function getPlayers()
    {
        return response()->json(Player::all());
    }

    // Update player progress/score
    public function updateProgress(Request $request, $id)
    {
        $player = Player::findOrFail($id);
        $player->score += $request->input('points', 1); // default +1
        $player->save();

        return response()->json($player);
    }

    // Check winner (example: score >= 100 means reached the top)
    public function checkWinner()
    {
        $winner = Player::where('score', '>=', 100)->first();

        if ($winner) {
            return response()->json(['winner' => $winner->name]);
        }

        return response()->json(['winner' => null]);
    }
}
