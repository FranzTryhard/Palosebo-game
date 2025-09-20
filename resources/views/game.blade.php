<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Palosebo — Ultimate Bamboo Race</title>
  <link rel="stylesheet" href="{{ asset('css/game.css') }}">
</head>
<body>
  <div id="game-root" class="game-root">
    <!-- HUD -->
    <header class="hud">
      <div class="player-hud">
        <div class="player-info">
          <div class="player-avatar p1">P1</div>
          <div class="player-meta">
            <div class="player-name" id="p1Name">Player 1</div>
            <div class="progress-wrap">
              <div class="progress-bar" id="p1Bar"><div class="progress-fill" style="width:0%"></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="center-hud">
        <div class="timer" id="timer">00:00.00</div>
      </div>

      <div class="player-hud">
        <div class="player-info right">
          <div class="player-meta">
            <div class="player-name" id="p2Name">Player 2</div>
            <div class="progress-wrap">
              <div class="progress-bar" id="p2Bar"><div class="progress-fill" style="width:0%"></div></div>
            </div>
          </div>
          <div class="player-avatar p2">P2</div>
        </div>
      </div>
    </header>

    <!-- Game area -->
    <main class="stage">
      <div class="bamboo-column">
        <div class="flag" aria-hidden>🏁</div>
        <div class="bamboo-trunk" id="bamboo1">
          <div id="player1" class="player player-1">
            <div class="speech-bubble" id="bubble1"></div>
            <div class="climber">
              <div class="head"></div>
              <div class="body"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bamboo-column">
        <div class="flag" aria-hidden>🏁</div>
        <div class="bamboo-trunk" id="bamboo2">
          <div id="player2" class="player player-2">
            <div class="speech-bubble" id="bubble2"></div>
            <div class="climber">
              <div class="head"></div>
              <div class="body"></div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Controls -->
    <div class="controls">
      <button id="startBtn" class="btn start">Start</button>
      <button id="restartBtn" class="btn restart" style="display:none">Restart</button>
    </div>

    <!-- Mobile taps -->
    <div class="mobile-controls">
      <button id="mobileP1" class="tap left">Tap P1</button>
      <button id="mobileP2" class="tap right">Tap P2</button>
    </div>

    <!-- Overlay countdown & winner -->
    <div id="overlay" class="overlay" style="display:none">
      <div id="countdown" class="countdown">3</div>
      <div id="winnerPopup" class="winner" style="display:none">
        <div id="winnerText"></div>
        <button id="closeWinner" class="btn">Close</button>
      </div>
    </div>

    <!-- Confetti canvas -->
    <canvas id="confettiCanvas" class="confetti-canvas"></canvas>
  </div>

  <script src="{{ asset('js/game.js') }}"></script>
</body>
</html>
