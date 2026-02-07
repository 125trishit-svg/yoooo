/* ---------- SCREEN SWITCH ---------- */
function show(id) {
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.remove("active");
  });

  const screen = document.getElementById(id);
  screen.classList.add("active");

  const texts = screen.querySelectorAll(".type");

  let index = 0;

  function typeNext() {
    if (index >= texts.length) return;
    typeWriter(texts[index], () => {
      index++;
      typeNext();
    });
  }

  typeNext();
}

/* ---------- TYPEWRITER ---------- */
function typeWriter(el, done) {
  const text = el.dataset.text;
  el.innerHTML = "";
  let i = 0;

  const interval = setInterval(() => {
    el.innerHTML += text.charAt(i);
    i++;
    if (i >= text.length) {
      clearInterval(interval);
      if (done) done();
    }
  }, 40);
}


/* ---------- START FLOW ---------- */
window.addEventListener("load", () => {
  show("loading");
  setTimeout(() => show("surpriseAsk"), 2000);
});

/* ---------- MUSIC ---------- */
function playMusic() {
  const music = document.getElementById("bgMusic");
  if (!music) return;
  music.volume = 0.4;
  music.play().catch(() => {});
}

/* ---------- BUTTON NAV ---------- */
function goMain() {
  playMusic();
  show("main");
}

function surpriseNo() {
  show("forceYes");
}

function yesClick() {
  playMusic();
  show("yesPage");
}

function noClick() {
  show("noPage");
}

function backYes() {
  show("yesPage");
}

/* ---------- SOO BUTTON ---------- */
function goValentine() {
  show("valentinePage");
}

let yesAlreadyClicked = false;

function yesClicked() {
  if (yesAlreadyClicked) return; // stop double click
  yesAlreadyClicked = true;

  const yesBtn = document.getElementById("yesBtn");
  yesBtn.disabled = true;
  yesBtn.style.opacity = "0.6";
  yesBtn.style.pointerEvents = "none";

  launchConfetti();

   setTimeout(() => {
    show("giftPage");
  }, 2500);
}

/* ---------- VALENTINE TRAP ---------- */
let yesScale = 1;

function valNo() {
  yesScale += 0.3;

  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noVal");

  if (!yesBtn || !noBtn) return;

  yesBtn.style.transform = `scale(${yesScale})`;

  if (yesScale > 2) {
    noBtn.style.display = "none";
    yesBtn.style.transform = "scale(3)";
  }
}


function valYes() {
  launchConfetti();

  // After confetti, go to gift page
  setTimeout(() => {
    show("giftPage");
  }, 2500);
}

/* ---------- CONFETTI ---------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");
let confettiPieces = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function launchConfetti() {
  confettiPieces = [];
  for (let i = 0; i < 150; i++) {
    confettiPieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      r: Math.random() * 6 + 4,
      d: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360},100%,70%)`,
      tilt: Math.random() * 10
    });
  }
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  confettiPieces.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();

    p.y += p.d * 0.3;
    p.x += Math.sin(p.tilt);
  });

  confettiPieces = confettiPieces.filter(p => p.y < canvas.height + 20);

  if (confettiPieces.length) {
    requestAnimationFrame(animateConfetti);
  }
}

function goRoseDay() {
  show("roseDay");
}
