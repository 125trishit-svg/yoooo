function go(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  const screen = document.getElementById(id);
  screen.classList.add("active");
  typeScreen(screen);
}

function typeScreen(screen) {
  const texts = screen.querySelectorAll(".type");
  let i = 0;

  function next() {
    if (i >= texts.length) return;
    type(texts[i++], next);
  }
  next();
}

function type(el, done) {
  const text = el.dataset.text;
  el.innerHTML = "";
  let i = 0;

  const timer = setInterval(() => {
    el.innerHTML += text[i++];
    if (i >= text.length) {
      clearInterval(timer);
      if (done) done();
    }
  }, 40);
}

function acceptVal() {
  playMusic();
  launchConfetti();
  setTimeout(() => go("giftPage"), 2500);
}

function playMusic() {
  const m = document.getElementById("bgMusic");
  m.volume = 0.4;
  m.play().catch(() => {});
}

window.onload = () => {
  typeScreen(document.getElementById("loading"));
  setTimeout(() => go("surpriseAsk"), 2000);
};

/* CONFETTI */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let pieces = [];

function launchConfetti() {
  pieces = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    r: Math.random() * 6 + 4,
    d: Math.random() * 6 + 3,
    c: `hsl(${Math.random() * 360},100%,70%)`
  }));
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pieces.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.c;
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y += p.d;
  });

  pieces = pieces.filter(p => p.y < canvas.height);
  if (pieces.length) requestAnimationFrame(animate);
}
