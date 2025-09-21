<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Leaderboard;

class LeaderboardController extends Controller
{
    // Save winner
    public function store(Request $request)
    {
        $leader = Leaderboard::create([
            'player_name' => $request->player_name,
            'time' => $request->time,
        ]);

        return response()->json($leader);
    }

    // Show leaderboard (fastest first)
    public function index()
    {
        $leaders = Leaderboard::orderBy('time', 'asc')->take(10)->get();
        return response()->json($leaders);
    }
}
