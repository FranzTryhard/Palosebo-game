/* public/js/game.js — Advanced Palosebo frontend */
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const p1El = document.getElementById("player1");
  const p2El = document.getElementById("player2");
  const bamboo1 = document.getElementById("bamboo1");
  const bamboo2 = document.getElementById("bamboo2");
  const startBtn = document.getElementById("startBtn");
  const restartBtn = document.getElementById("restartBtn");
  const countdownEl = document.getElementById("countdown");
  const overlay = document.getElementById("overlay");
  const winnerPopup = document.getElementById("winnerPopup");
  const winnerText = document.getElementById("winnerText");
  const closeWinner = document.getElementById("closeWinner");
  const confettiCanvas = document.getElementById("confettiCanvas");
  const p1BarFill = document.querySelector("#p1Bar .progress-fill");
  const p2BarFill = document.querySelector("#p2Bar .progress-fill");
  const timerEl = document.getElementById("timer");
  const mobileP1 = document.getElementById("mobileP1");
  const mobileP2 = document.getElementById("mobileP2");
  const gameRoot = document.getElementById("game-root");

  // config
  let pos1 = 0, pos2 = 0;
  const step = 30; // climb per press (px)
  const bambooHeight = Math.max(bamboo1.clientHeight, bamboo2.clientHeight);
  const finishLine = bambooHeight - 80; // px from bottom
  let gameActive = false;
  let startTime = 0, timerInterval = null;

  // confetti engine
  const confetti = initConfetti(confettiCanvas);

  // Optional sound hooks (place wav/mp3 in public/sounds/)
  const soundClimb = null; // new Audio('/sounds/climb.mp3');
  const soundSlip = null; // new Audio('/sounds/slip.mp3');
  const soundWin  = null; // new Audio('/sounds/win.mp3');

  // Reset state
  function resetGame() {
    pos1 = 0; pos2 = 0;
    setBottom(p1El, 0);
    setBottom(p2El, 0);
    updateProgressBars();
    stopTimer();
    gameActive = false;
    restartBtn.style.display = "none";
    overlay.style.display = "none";
  }

  // Set bottom style
  function setBottom(el, px) {
    el.style.bottom = px + "px";
  }

  // Start countdown then unlock controls
  function startCountdown() {
    overlay.style.display = "flex";
    countdownEl.style.display = "block";
    let timeLeft = 3;
    countdownEl.textContent = timeLeft;
    startBtn.disabled = true;

    const id = setInterval(() => {
      timeLeft--;
      if (timeLeft > 0) {
        countdownEl.textContent = timeLeft;
      } else {
        clearInterval(id);
        countdownEl.textContent = "GO!";
        // small scale pop
        countdownEl.style.transform = "scale(1.06)";
        setTimeout(() => {
          overlay.style.display = "none";
          countdownEl.style.transform = "scale(1)";
          countdownEl.style.display = "none";
        }, 650);
        gameActive = true;
        startTimer();
        startBtn.disabled = false;
        restartBtn.style.display = "inline-block";
      }
    }, 1000);
  }

  // Timer
  function startTimer() {
    startTime = performance.now();
    timerInterval = setInterval(() => {
      const t = performance.now() - startTime;
      timerEl.textContent = formatTime(t);
    }, 30);
  }
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
  function formatTime(ms) {
    const s = Math.floor(ms / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}.${String(cs).padStart(2, "0")}`;
  }

  // Progress bars (percent)
  function updateProgressBars() {
    const pct1 = Math.min(100, Math.round((pos1 / finishLine) * 100));
    const pct2 = Math.min(100, Math.round((pos2 / finishLine) * 100));
    p1BarFill.style.width = pct1 + "%";
    p2BarFill.style.width = pct2 + "%";
  }

  // Climb function with slip mechanics
  function climbWithSlip(playerEl, currentPos) {
    // quick climb feeling
    playerEl.classList.add("climb");
    setTimeout(() => playerEl.classList.remove("climb"), 160);

    // play climb sound
    if (soundClimb) { soundClimb.currentTime = 0; soundClimb.play(); }

    let pos = currentPos + step;
    const progressPct = (pos / finishLine) * 100;

    // mid slips (small)
    if (progressPct > 40 && progressPct < 80 && Math.random() < 0.20) {
      triggerSmallSlip(playerEl);
      pos = Math.max(0, pos - 40);
      if (soundSlip) { soundSlip.currentTime = 0; soundSlip.play(); }
    }

    // big slip near finish: fall to ground (random)
    if (progressPct >= 80 && Math.random() < 0.35) {
      triggerBigSlip(playerEl);
      pos = 0;
      // screen shake
      gameRoot.classList.add("shake");
      setTimeout(() => gameRoot.classList.remove("shake"), 600);
      if (soundSlip) { soundSlip.currentTime = 0; soundSlip.play(); }
    }

    return Math.max(0, pos);
  }

  function triggerSmallSlip(el) {
    el.classList.add("slip");
    setTimeout(() => el.classList.remove("slip"), 340);
  }

  function triggerBigSlip(el) {
    // store current pos as CSS var for proper fall animation
    const cur = parseInt(getComputedStyle(el).bottom || "0", 10) || 0;
    el.style.setProperty("--pos", cur + "px");
    el.classList.add("big-slip");
    setTimeout(() => {
      el.classList.remove("big-slip");
      setBottom(el, 0); // ensure bottom 0 after animation
    }, 980);
  }

  // Winner handling
  function declareWinner(name) {
    gameActive = false;
    stopTimer();
    winnerText.innerHTML = `<strong>${name}</strong> wins! 🏆<br>Time: ${timerEl.textContent}`;
    winnerPopup.style.display = "block";
    overlay.style.display = "flex";
    confetti.explode(); // confetti
    if (soundWin) { soundWin.play(); }
  }

  closeWinner.addEventListener("click", () => {
    winnerPopup.style.display = "none";
    overlay.style.display = "none";
  });

  // Input handlers
  document.addEventListener("keydown", (ev) => {
    if (!gameActive) return;
    if (ev.key.toLowerCase() === "a") {
      pos1 = climbWithSlip(p1El, pos1);
      setBottom(p1El, pos1);
      updateProgressBars();
      if (pos1 >= finishLine) declareWinner("Player 1");
    } else if (ev.key.toLowerCase() === "l") {
      pos2 = climbWithSlip(p2El, pos2);
      setBottom(p2El, pos2);
      updateProgressBars();
      if (pos2 >= finishLine) declareWinner("Player 2");
    }
  });

  // Mobile taps
  mobileP1.addEventListener("touchstart", (e) => { e.preventDefault(); if (!gameActive) return; pos1 = climbWithSlip(p1El, pos1); setBottom(p1El,pos1); updateProgressBars(); if (pos1 >= finishLine) declareWinner("Player 1"); });
  mobileP2.addEventListener("touchstart", (e) => { e.preventDefault(); if (!gameActive) return; pos2 = climbWithSlip(p2El, pos2); setBottom(p2El,pos2); updateProgressBars(); if (pos2 >= finishLine) declareWinner("Player 2"); });

  // Buttons
  startBtn.addEventListener("click", () => { resetGame(); startCountdown(); });
  restartBtn.addEventListener("click", () => { resetGame(); startCountdown(); });

  // Init
  resetGame();

  // Confetti implementation (minimal particle engine)
  function initConfetti(canvas) {
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    let particles = [];
    function rand(min,max){ return Math.random()*(max-min)+min; }

    function spawn(n=80) {
      const colors = ["#ff5252","#ffb74d","#ffd54f","#66bb6a","#4fc3f7","#9575cd"];
      for (let i=0;i<n;i++){
        particles.push({
          x: rand(0,canvas.width), y: rand(-20,canvas.height/2),
          vx: rand(-2,2), vy: rand(2,6),
          size: rand(6,12), color: colors[Math.floor(rand(0,colors.length))],
          rot: rand(0,360), vr: rand(-6,6), life: rand(80,160)
        });
      }
      if (!animLoop) animate();
    }

    function explode(){ spawn(120); }

    let animLoop = null;
    function animate(){
      animLoop = requestAnimationFrame(animate);
      ctx.clearRect(0,0,canvas.width,canvas.height);
      for (let i=particles.length-1;i>=0;i--){
        const p = particles[i];
        p.x += p.vx; p.y += p.vy; p.vy += 0.12; p.rot += p.vr; p.life--;
        ctx.save();
        ctx.translate(p.x,p.y);
        ctx.rotate(p.rot * Math.PI/180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size*0.6);
        ctx.restore();
        if (p.y > canvas.height + 50 || p.life <= 0) particles.splice(i,1);
      }
      if (particles.length === 0) { cancelAnimationFrame(animLoop); animLoop=null; }
    }

    // adjust size when window resizes
    window.addEventListener("resize", () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; });

    return {
      explode
    };
  }
});

const phrases = [
  "Haha you're weak!",
  "This game is ez 😎",
  "Catch me if you can!",
  "Too slow!",
  "I was born for this!",
  "Better luck next time!"
];

function showTrashTalk(playerId) {
  const bubble = document.getElementById("bubble" + playerId);
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  bubble.textContent = randomPhrase;
  bubble.classList.add("show");

  // Hide after 2 seconds
  setTimeout(() => {
    bubble.classList.remove("show");
  }, 2000);
}

// Example triggers:
// Player 1 talks every 5–8 seconds randomly
setInterval(() => showTrashTalk(1), Math.random() * 3000 + 5000);
// Player 2 talks every 5–8 seconds randomly
setInterval(() => showTrashTalk(2), Math.random() * 3000 + 5000);
