/* Space Aliens — browser homage of the 1980 one-player game.
   Original pixel art. Solo only. The march, shot, hits, and command
   ship are synthesized in the manner of that console, not sampled. */
(function () {
  "use strict";

  const W = 160;
  const H = 192;
  const COLS = 6;
  const ROWS = 6;
  const CELL_X = 16;
  const CELL_Y = 11;
  const ALIEN_W = 8;
  const ALIEN_H = 8;
  const STEP = 2;
  const DROP = 8;
  const FORM_Y0 = 30;
  const FORM_Y_MAX = 83;
  const LEFT_EDGE = 4;
  const RIGHT_EDGE = 156;
  const CANNON_W = 9;
  const CANNON_H = 8;
  const CANNON_Y = 168;
  const CANNON_MIN = 1;
  const CANNON_MAX = 150;
  const EARTH_Y = 180;
  const SHIELD_Y = 148;
  const SAUCER_Y = 16;
  const SAUCER_W = 16;
  const SAUCER_H = 7;
  const PLAYER_SPEED = 80;
  const SHOT_SPEED = 175;
  const POINTS = [30, 25, 20, 15, 10, 5];
  const ROW_COLOR = ["#F4F4F4", "#7AD4F0", "#F0E040", "#46C832", "#F09830", "#E84848"];
  const GREEN = "#46C832";
  const WHITE = "#F4F4F4";
  const YELLOW = "#F0E040";

  const SPRITES = [
    [
      ["..#..#..", ".######.", "##.##.##", ".######.", "..#..#..", ".#....#.", "#......#", ".#....#."],
      ["..#..#..", ".######.", "##.##.##", ".######.", "..#..#..", "#.#..#.#", ".#....#.", "#......#"],
    ],
    [
      [".#....#.", ".######.", "##.##.##", "########", ".######.", "..#..#..", ".#.#.#.#", "#......#"],
      [".#....#.", ".######.", "##.##.##", "########", ".######.", "..#..#..", "#.#..#.#", ".#....#."],
    ],
    [
      ["...##...", "..####..", ".######.", "##.##.##", "########", ".#.##.#.", "#.#..#.#", ".#....#."],
      ["...##...", "..####..", ".######.", "##.##.##", "########", ".#.##.#.", ".#.#.#.#", "#......#"],
    ],
    [
      [".##..##.", "########", "#.####.#", "########", ".##..##.", "#.#..#.#", "#.#..#.#", ".#....#."],
      [".##..##.", "########", "#.####.#", "########", ".##..##.", ".#.#.#.#", ".#.#.#.#", "#......#"],
    ],
    [
      ["..####..", ".######.", "###..###", "########", "#.####.#", ".#.##.#.", "#.#..#.#", ".#....#."],
      ["..####..", ".######.", "###..###", "########", "#.####.#", ".#.##.#.", ".#.#.#.#", "#......#"],
    ],
    [
      [".######.", "##.##.##", "########", "#.#..#.#", "########", ".##..##.", "#.#..#.#", ".#....#."],
      [".######.", "##.##.##", "########", "#.#..#.#", "########", ".##..##.", ".#.#.#.#", "#......#"],
    ],
  ];

  const SAUCER = [
    "......####......",
    "....########....",
    "..############..",
    ".##############.",
    "###..######..###",
    "..############..",
    "....########....",
  ];

  const CANNON = [
    "....#....",
    "....#....",
    "...###...",
    "..#####..",
    ".#######.",
    "#########",
    "#########",
    "#########",
  ];

  const BOMB = [
    [".#.", "#.#", ".#.", "#.#", ".#."],
    ["#.#", ".#.", "#.#", ".#.", "#.#"],
  ];

  const BUNKER = [
    "......####################......",
    "....########################....",
    "..############################..",
    "################################",
    "################################",
    "################################",
    "################################",
    "############........############",
    "############........############",
    "############........############",
    "############........############",
    "############........############",
  ];

  const FONT = {
    A: ["010", "101", "111", "101", "101"],
    B: ["110", "101", "110", "101", "110"],
    C: ["111", "100", "100", "100", "111"],
    D: ["110", "101", "101", "101", "110"],
    E: ["111", "100", "110", "100", "111"],
    F: ["111", "100", "110", "100", "100"],
    G: ["111", "100", "101", "101", "111"],
    H: ["101", "101", "111", "101", "101"],
    I: ["111", "010", "010", "010", "111"],
    J: ["001", "001", "001", "101", "010"],
    K: ["101", "110", "100", "110", "101"],
    L: ["100", "100", "100", "100", "111"],
    M: ["101", "111", "101", "101", "101"],
    N: ["101", "111", "111", "101", "101"],
    O: ["111", "101", "101", "101", "111"],
    P: ["111", "101", "111", "100", "100"],
    Q: ["111", "101", "101", "111", "001"],
    R: ["110", "101", "110", "101", "101"],
    S: ["111", "100", "111", "001", "111"],
    T: ["111", "010", "010", "010", "010"],
    U: ["101", "101", "101", "101", "111"],
    V: ["101", "101", "101", "101", "010"],
    W: ["101", "101", "101", "111", "101"],
    X: ["101", "101", "010", "101", "101"],
    Y: ["101", "101", "010", "010", "010"],
    Z: ["111", "001", "010", "100", "111"],
    "0": ["111", "101", "101", "101", "111"],
    "1": ["010", "110", "010", "010", "111"],
    "2": ["111", "001", "111", "100", "111"],
    "3": ["111", "001", "111", "001", "111"],
    "4": ["101", "101", "111", "001", "001"],
    "5": ["111", "100", "111", "001", "111"],
    "6": ["111", "100", "111", "101", "111"],
    "7": ["111", "001", "001", "001", "001"],
    "8": ["111", "101", "111", "101", "111"],
    "9": ["111", "101", "111", "001", "111"],
    " ": ["000", "000", "000", "000", "000"],
    "-": ["000", "000", "111", "000", "000"],
  };

  const canvas = document.getElementById("c");
  const ctx = canvas.getContext("2d", { alpha: false });
  ctx.imageSmoothingEnabled = false;

  const down = new Set();
  const touch = { left: false, right: false, fire: false };
  let padLeft = false;
  let padRight = false;
  let padFire = false;
  let padStart = false;
  let wasStart = false;
  let wasKeyFire = false;
  let pointerStart = false;
  let pointerFire = false;
  let pointerOn = false;
  let pointerX = 80;
  let anim = 0;

  const sfx = createSfx();

  let mode = "title";
  let score = 0;
  let best = Number(storageGet("spacealiens-best", "0")) || 0;
  let muted = storageGet("spacealiens-muted") === "1";
  let lives = 3;
  let wave = 0;
  let grid = [];
  let form = { x: 10, y: FORM_Y0, dir: 1, frame: 0, note: 0, stepT: 0.4 };
  let player = { x: 75, y: CANNON_Y, w: CANNON_W, h: CANNON_H };
  let shot = null;
  let bombs = [];
  let bombT = 1.2;
  let saucer = null;
  let saucerT = 8;
  let saucerSide = -1;
  let shields = [];
  let shieldsOn = true;
  let explosions = [];
  let pop = null;
  let invuln = 0;
  let deathT = 0;
  let toast = "";
  let toastT = 0;
  let demoX = 16;
  let demoDir = 1;
  let demoT = 0.3;
  let demoFrame = 0;

  function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }

  function storageGet(key, fallback) {
    try {
      const v = localStorage.getItem(key);
      return v == null ? fallback : v;
    } catch (e) {
      return fallback;
    }
  }

  function storageSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }

  function remember() {
    if (score > best) {
      best = score;
      storageSet("spacealiens-best", String(best));
    }
  }

  function showToast(text, seconds) {
    toast = text;
    toastT = seconds;
  }

  function fillGrid() {
    grid = [];
    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) row.push(1);
      grid.push(row);
    }
  }

  function eachAlive(fn) {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c]) fn(c, r);
      }
    }
  }

  function aliveCount() {
    let n = 0;
    eachAlive(() => { n += 1; });
    return n;
  }

  function cellPos(c, r) {
    return { x: form.x + c * CELL_X, y: form.y + r * CELL_Y };
  }

  function aliveBounds() {
    let minX = Infinity;
    let maxX = -Infinity;
    eachAlive((c, r) => {
      const p = cellPos(c, r);
      if (p.x < minX) minX = p.x;
      if (p.x + ALIEN_W > maxX) maxX = p.x + ALIEN_W;
    });
    if (minX === Infinity) return null;
    return { minX: minX, maxX: maxX };
  }

  function lowestBottom() {
    let y = -1;
    eachAlive((c, r) => {
      const b = form.y + r * CELL_Y + ALIEN_H;
      if (b > y) y = b;
    });
    return y;
  }

  function makeShield(sx, sy) {
    const h = BUNKER.length;
    const w = BUNKER[0].length;
    const bits = new Uint8Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        if (BUNKER[y][x] === "#") bits[y * w + x] = 1;
      }
    }
    return { x: sx, y: sy, w: w, h: h, bits: bits };
  }

  function makeShields() {
    return [makeShield(16, SHIELD_Y), makeShield(64, SHIELD_Y), makeShield(112, SHIELD_Y)];
  }

  function shieldSolid(wx, wy) {
    if (!shieldsOn) return null;
    const x = Math.round(wx);
    const y = Math.round(wy);
    for (let i = 0; i < shields.length; i++) {
      const s = shields[i];
      const lx = x - s.x;
      const ly = y - s.y;
      if (lx < 0 || ly < 0 || lx >= s.w || ly >= s.h) continue;
      if (s.bits[ly * s.w + lx]) return { shield: s, x: lx, y: ly };
    }
    return null;
  }

  function erode(hit) {
    const s = hit.shield;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const x = hit.x + dx;
        const y = hit.y + dy;
        if (x < 0 || y < 0 || x >= s.w || y >= s.h) continue;
        s.bits[y * s.w + x] = 0;
      }
    }
  }

  function overlaps(ax, ay, aw, ah, bx, by, bw, bh) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
  }

  function stepInterval() {
    const n = aliveCount();
    let base;
    if (n >= 33) base = 0.7;
    else if (n >= 28) base = 0.56;
    else if (n >= 22) base = 0.44;
    else if (n >= 16) base = 0.32;
    else if (n >= 11) base = 0.22;
    else if (n >= 7) base = 0.15;
    else if (n >= 4) base = 0.1;
    else if (n >= 2) base = 0.07;
    else base = 0.045;
    return Math.max(0.04, base * (1 - Math.min(0.32, wave * 0.04)));
  }

  function bombSpeed() {
    return Math.min(96, 32 + wave * 8 + (36 - aliveCount()) * 0.55);
  }

  function maxBombs() {
    return aliveCount() > 18 ? 1 : 2;
  }

  function boom(x, y, kind) {
    explosions.push({ x: x, y: y, t: 0, life: kind === "player" ? 0.7 : 0.28, kind: kind });
  }

  function startGame() {
    score = 0;
    lives = 3;
    wave = 0;
    fillGrid();
    form = { x: 10, y: FORM_Y0, dir: 1, frame: 0, note: 0, stepT: 0.35 };
    player = { x: 75, y: CANNON_Y, w: CANNON_W, h: CANNON_H };
    shot = null;
    bombs = [];
    bombT = 1.3;
    saucer = null;
    saucerT = 9;
    saucerSide = -1;
    shields = makeShields();
    shieldsOn = true;
    explosions = [];
    pop = null;
    invuln = 0;
    deathT = 0;
    mode = "playing";
    sfx.unlock();
  }

  function nextWave() {
    wave += 1;
    fillGrid();
    form.x = 10;
    form.y = Math.min(FORM_Y_MAX, FORM_Y0 + wave * 8);
    form.dir = 1;
    form.frame = 0;
    form.stepT = 0.55;
    shot = null;
    bombs = [];
    bombT = 1;
    if (form.y + (ROWS - 1) * CELL_Y + ALIEN_H >= SHIELD_Y - 2) shieldsOn = false;
  }

  function endGame() {
    mode = "over";
    shot = null;
    bombs = [];
    saucer = null;
    remember();
    sfx.over();
  }

  function killPlayer(landed) {
    if (mode !== "playing") return;
    if (landed) lives = 0;
    else lives -= 1;
    mode = "dying";
    deathT = 1.05;
    shot = null;
    bombs = [];
    boom(player.x + 6, player.y + 4, "player");
    sfx.playerDie();
  }

  function killInvader(c, r) {
    const p = cellPos(c, r);
    grid[r][c] = 0;
    score += POINTS[r];
    remember();
    boom(p.x + 4, p.y + 4, "alien");
    sfx.invaderHit();
    shot = null;
    if (aliveCount() === 0) nextWave();
  }

  function killSaucer() {
    const x = saucer.x + 8;
    const y = saucer.y + 3;
    score += 200;
    remember();
    pop = { x: x - 6, y: y, t: 0.9 };
    boom(x, y, "alien");
    saucer = null;
    shot = null;
    sfx.ufoHit();
  }

  function leftHeld() {
    return down.has("ArrowLeft") || down.has("KeyA") || touch.left || padLeft;
  }

  function rightHeld() {
    return down.has("ArrowRight") || down.has("KeyD") || touch.right || padRight;
  }

  function keyFire() {
    return down.has("Space") || down.has("ArrowUp") || down.has("KeyZ") || down.has("KeyX") || padFire;
  }

  function movePlayer(dt) {
    if (pointerOn) player.x = pointerX - player.w / 2;
    else {
      let dir = 0;
      if (leftHeld()) dir -= 1;
      if (rightHeld()) dir += 1;
      player.x += dir * PLAYER_SPEED * dt;
    }
    player.x = clamp(player.x, CANNON_MIN, CANNON_MAX);
  }

  function tryFire() {
    const key = keyFire();
    const edge = (key && !wasKeyFire) || pointerFire;
    wasKeyFire = key;
    pointerFire = false;
    if (shot) return;
    if (edge || touch.fire) {
      shot = { x: Math.round(player.x + player.w / 2), y: player.y - 4 };
      sfx.shot();
    }
  }

  function updateShot(dt) {
    if (!shot) return;
    const dist = SHOT_SPEED * dt;
    const steps = Math.max(1, Math.ceil(dist));
    for (let i = 0; i < steps; i++) {
      if (!shot) return;
      shot.y -= dist / steps;
      if (shot.y < 1) { shot = null; return; }
      for (let b = bombs.length - 1; b >= 0; b--) {
        const bomb = bombs[b];
        if (overlaps(shot.x, shot.y, 1, 4, bomb.x, bomb.y, 3, 5)) {
          bombs.splice(b, 1);
          shot = null;
          return;
        }
      }
      const chip = shieldSolid(shot.x, shot.y);
      if (chip) {
        erode(chip);
        shot = null;
        sfx.chip();
        return;
      }
      let hit = null;
      eachAlive((c, r) => {
        if (hit) return;
        const p = cellPos(c, r);
        if (overlaps(shot.x, shot.y, 1, 4, p.x, p.y, ALIEN_W, ALIEN_H)) hit = { c: c, r: r };
      });
      if (hit) { killInvader(hit.c, hit.r); return; }
      if (saucer && overlaps(shot.x, shot.y, 1, 4, saucer.x, saucer.y, SAUCER_W, SAUCER_H)) {
        killSaucer();
        return;
      }
    }
  }

  function updateBombs(dt) {
    const next = [];
    for (let i = 0; i < bombs.length; i++) {
      const b = bombs[i];
      const dist = b.vy * dt;
      const steps = Math.max(1, Math.ceil(dist));
      let dead = false;
      for (let s = 0; s < steps; s++) {
        b.y += dist / steps;
        if (shot && overlaps(shot.x, shot.y, 1, 4, b.x, b.y, 3, 5)) {
          shot = null;
          dead = true;
          break;
        }
        const chip = shieldSolid(b.x + 1, b.y + 4);
        if (chip) {
          erode(chip);
          sfx.chip();
          dead = true;
          break;
        }
        if (invuln <= 0 && overlaps(b.x, b.y, 3, 5, player.x, player.y, player.w, player.h)) {
          killPlayer(false);
          return;
        }
        if (b.y > 188) { dead = true; break; }
      }
      if (!dead) next.push(b);
    }
    bombs = next;
  }

  function maybeSpawnBomb(dt) {
    bombT -= dt;
    if (bombT > 0 || bombs.length >= maxBombs()) return;
    const cols = [];
    for (let c = 0; c < COLS; c++) {
      for (let r = ROWS - 1; r >= 0; r--) {
        if (grid[r][c]) { cols.push({ c: c, r: r }); break; }
      }
    }
    if (!cols.length) return;
    const pick = cols[Math.floor(Math.random() * cols.length)];
    const p = cellPos(pick.c, pick.r);
    bombs.push({ x: p.x + 3, y: p.y + ALIEN_H, vy: bombSpeed() });
    const n = aliveCount();
    bombT = Math.max(0.32, 0.55 + (n / 36) * 1.05 - wave * 0.04);
  }

  function updateSaucer(dt) {
    saucerT -= dt;
    if (!saucer && saucerT <= 0) {
      saucerSide *= -1;
      saucer = {
        x: saucerSide > 0 ? -SAUCER_W : W,
        y: SAUCER_Y,
        dir: saucerSide,
        v: 46,
      };
      saucerT = 15 + Math.random() * 8;
    }
    if (!saucer) return;
    saucer.x += saucer.dir * saucer.v * dt;
    if (saucer.dir > 0 && saucer.x > W) saucer = null;
    else if (saucer.dir < 0 && saucer.x < -SAUCER_W) saucer = null;
  }

  function stepInvaders(dt) {
    form.stepT -= dt;
    let guard = 0;
    while (form.stepT <= 0 && guard++ < 2) {
      const bounds = aliveBounds();
      if (!bounds) return;
      const dx = form.dir * STEP;
      if (bounds.minX + dx < LEFT_EDGE || bounds.maxX + dx > RIGHT_EDGE) {
        form.y += DROP;
        form.dir *= -1;
      } else {
        form.x += dx;
      }
      form.frame ^= 1;
      sfx.march(form.note);
      form.note = (form.note + 1) & 3;
      form.stepT += stepInterval();
      if (shieldsOn && lowestBottom() >= SHIELD_Y - 2) shieldsOn = false;
      if (lowestBottom() >= EARTH_Y) {
        killPlayer(true);
        return;
      }
    }
  }

  function stepFx(dt) {
    for (let i = 0; i < explosions.length; i++) explosions[i].t += dt;
    explosions = explosions.filter((e) => e.t < e.life);
    if (pop) {
      pop.t -= dt;
      pop.y -= 10 * dt;
      if (pop.t <= 0) pop = null;
    }
  }

  function updatePlay(dt) {
    if (invuln > 0) invuln -= dt;
    movePlayer(dt);
    tryFire();
    updateShot(dt);
    if (mode !== "playing") return;
    updateSaucer(dt);
    updateBombs(dt);
    if (mode !== "playing") return;
    maybeSpawnBomb(dt);
    stepInvaders(dt);
  }

  function updateDying(dt) {
    deathT -= dt;
    if (deathT > 0) return;
    if (lives <= 0) endGame();
    else {
      player.x = 75;
      invuln = 1.25;
      mode = "playing";
    }
  }

  function updateDemo(dt) {
    demoT -= dt;
    if (demoT > 0) return;
    demoT = 0.42;
    demoFrame ^= 1;
    const next = demoX + demoDir * 2;
    if (next < 8 || next + 5 * 14 + 8 > 152) demoDir *= -1;
    else demoX = next;
  }

  function scoreText() {
    return String(score).padStart(4, "0");
  }

  function blit(rows, x, y, color) {
    ctx.fillStyle = color;
    const ox = Math.round(x);
    const oy = Math.round(y);
    for (let yy = 0; yy < rows.length; yy++) {
      const row = rows[yy];
      for (let xx = 0; xx < row.length; xx++) {
        if (row[xx] === "#") ctx.fillRect(ox + xx, oy + yy, 1, 1);
      }
    }
  }

  function drawText(str, x, y, scale, color) {
    ctx.fillStyle = color;
    let cx = x;
    const s = String(str).toUpperCase();
    for (let i = 0; i < s.length; i++) {
      const glyph = FONT[s[i]] || FONT[" "];
      for (let yy = 0; yy < glyph.length; yy++) {
        for (let xx = 0; xx < glyph[yy].length; xx++) {
          if (glyph[yy][xx] === "1") ctx.fillRect(cx + xx * scale, y + yy * scale, scale, scale);
        }
      }
      cx += 4 * scale;
    }
  }

  function textWidth(str, scale) {
    return String(str).length * 4 * scale - scale;
  }

  function drawTextOutlined(str, x, y, scale, color) {
    drawText(str, x + 1, y, scale, "#000000");
    drawText(str, x - 1, y, scale, "#000000");
    drawText(str, x, y + 1, scale, "#000000");
    drawText(str, x, y - 1, scale, "#000000");
    drawText(str, x, y, scale, color);
  }

  function drawCentered(str, y, scale, color, outline) {
    const x = Math.round((W - textWidth(str, scale)) / 2);
    if (outline) drawTextOutlined(str, x, y, scale, color);
    else drawText(str, x, y, scale, color);
  }

  function drawMiniCannon(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x + 2, y, 1, 2);
    ctx.fillRect(x + 1, y + 2, 3, 1);
    ctx.fillRect(x, y + 3, 5, 2);
  }

  function drawShields() {
    if (!shieldsOn) return;
    ctx.fillStyle = GREEN;
    for (let i = 0; i < shields.length; i++) {
      const s = shields[i];
      for (let y = 0; y < s.h; y++) {
        for (let x = 0; x < s.w; x++) {
          if (s.bits[y * s.w + x]) ctx.fillRect(s.x + x, s.y + y, 1, 1);
        }
      }
    }
  }

  function drawWorld() {
    ctx.fillStyle = GREEN;
    ctx.fillRect(0, 186, W, 1);
    ctx.fillRect(0, 176, 2, 10);
    ctx.fillRect(158, 176, 2, 10);
    drawShields();
    const bombFrame = Math.floor(anim * 12) % 2;
    for (let i = 0; i < bombs.length; i++) {
      blit(BOMB[bombFrame], bombs[i].x, bombs[i].y, WHITE);
    }
    eachAlive((c, r) => {
      const p = cellPos(c, r);
      blit(SPRITES[r][form.frame], p.x, p.y, ROW_COLOR[r]);
    });
    if (saucer) blit(SAUCER, saucer.x, saucer.y, "#E040C8");
    if (shot) {
      ctx.fillStyle = WHITE;
      ctx.fillRect(shot.x, Math.round(shot.y), 1, 4);
    }
    const blink = invuln > 0 && Math.floor(invuln * 14) % 2 === 0;
    if (mode !== "dying" && !blink) blit(CANNON, player.x, player.y, GREEN);
    for (let i = 0; i < explosions.length; i++) drawBoom(explosions[i]);
    if (pop) drawTextOutlined("200", Math.round(pop.x), Math.round(pop.y), 1, YELLOW);
  }

  function drawBoom(e) {
    const k = e.t / e.life;
    const rad = 1 + Math.floor(k * (e.kind === "player" ? 8 : 4));
    ctx.fillStyle = k < 0.35 ? WHITE : (k < 0.7 ? YELLOW : "#E84848");
    const x = Math.round(e.x);
    const y = Math.round(e.y);
    ctx.fillRect(x - rad, y, rad * 2 + 1, 1);
    ctx.fillRect(x, y - rad, 1, rad * 2 + 1);
    if (e.kind === "player") {
      ctx.fillRect(x - rad, y - rad, 2, 2);
      ctx.fillRect(x + rad - 1, y - rad, 2, 2);
      ctx.fillRect(x - rad, y + rad - 1, 2, 2);
      ctx.fillRect(x + rad - 1, y + rad - 1, 2, 2);
    }
  }

  function drawHud() {
    if (!saucer) drawTextOutlined(scoreText(), 4, 3, 2, WHITE);
    for (let i = 0; i < lives; i++) drawMiniCannon(136 + i * 8, 3, GREEN);
    if (muted) drawText("MUTE", 96, 5, 1, "#6A7A58");
  }

  function drawTitle() {
    drawCentered("SPACE", 28, 2, WHITE, true);
    drawCentered("ALIENS", 48, 2, YELLOW, true);
    for (let i = 0; i < 6; i++) {
      blit(SPRITES[i][demoFrame], demoX + i * 14, 78, ROW_COLOR[i]);
    }
    if (Math.floor(anim * 2) % 2 === 0) drawCentered("PRESS ENTER", 108, 1, WHITE, true);
    if (best > 0) drawCentered("BEST " + String(best).padStart(4, "0"), 126, 1, WHITE, false);
    drawCentered("3 HITS", 150, 1, GREEN, false);
    for (let i = 0; i < 3; i++) drawMiniCannon(62 + i * 12, 166, GREEN);
    if (muted) drawText("MUTE", 4, 174, 1, "#6A7A58");
  }

  function drawPaused() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(18, 70, 124, 36);
    drawCentered("PAUSED", 76, 2, YELLOW, true);
    drawCentered("ENTER", 96, 1, WHITE, false);
  }

  function drawOver() {
    ctx.fillStyle = "#000000";
    ctx.fillRect(8, 44, 144, 96);
    drawCentered("GAME OVER", 50, 2, YELLOW, true);
    drawCentered(scoreText(), 72, 2, WHITE, true);
    drawCentered("BEST " + String(best).padStart(4, "0"), 94, 1, WHITE, false);
    if (Math.floor(anim * 2) % 2 === 0) drawCentered("PRESS ENTER", 112, 1, WHITE, false);
  }

  function drawDying() {
    if (lives <= 0) return;
    drawCentered(lives + " LEFT", 96, 1, YELLOW, true);
  }

  function render() {
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, W, H);
    if (mode === "title") drawTitle();
    else {
      drawWorld();
      drawHud();
      if (mode === "dying") drawDying();
      if (mode === "paused") drawPaused();
      if (mode === "over") drawOver();
    }
    if (toastT > 0 && mode !== "title") drawCentered(toast, 120, 1, YELLOW, true);
  }

  function createSfx() {
    let actx = null;
    let master = null;
    let ufoOsc = null;
    let ufoGain = null;
    let audioFailed = false;

    function unlock() {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      if (!actx) {
        actx = new AC();
        master = actx.createGain();
        master.gain.value = muted ? 0 : 0.22;
        master.connect(actx.destination);
      }
      if (actx.state === "suspended") actx.resume();
      master.gain.value = muted ? 0 : 0.22;
      ensure();
    }

    function ensure() {
      if (audioFailed || ufoOsc || !actx) return;
      try {
        ufoOsc = actx.createOscillator();
        ufoOsc.type = "square";
        ufoOsc.frequency.value = 640;
        const lfo = actx.createOscillator();
        lfo.type = "sine";
        lfo.frequency.value = 7.5;
        const lfoAmt = actx.createGain();
        lfoAmt.gain.value = 110;
        lfo.connect(lfoAmt);
        lfoAmt.connect(ufoOsc.frequency);
        ufoGain = actx.createGain();
        ufoGain.gain.value = 0;
        ufoOsc.connect(ufoGain);
        ufoGain.connect(master);
        ufoOsc.start();
        lfo.start();
      } catch (err) {
        audioFailed = true;
        ufoOsc = null;
      }
    }

    function blip(freq, dur, gain, delay) {
      if (!actx || muted || audioFailed) return;
      const t0 = actx.currentTime + (delay || 0);
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(Math.max(30, freq), t0);
      g.gain.setValueAtTime(gain, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g);
      g.connect(master);
      o.start(t0);
      o.stop(t0 + dur + 0.02);
    }

    function noise(dur, gain, cutoff) {
      if (!actx || muted || audioFailed) return;
      const n = Math.max(1, Math.floor(actx.sampleRate * dur));
      const buf = actx.createBuffer(1, n, actx.sampleRate);
      const data = buf.getChannelData(0);
      let reg = 0x5a;
      for (let i = 0; i < n; i++) {
        const bit = ((reg >> 0) ^ (reg >> 2) ^ (reg >> 3) ^ (reg >> 5)) & 1;
        reg = ((reg >> 1) | (bit << 14)) & 0x7fff;
        data[i] = (reg & 1 ? 1 : -1) * (1 - i / n);
      }
      const src = actx.createBufferSource();
      const filter = actx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = cutoff || 1600;
      const g = actx.createGain();
      src.buffer = buf;
      g.gain.value = gain;
      src.connect(filter);
      filter.connect(g);
      g.connect(master);
      src.start();
    }

    function sweep(from, to, dur, gain) {
      if (!actx || muted || audioFailed) return;
      const t0 = actx.currentTime;
      const o = actx.createOscillator();
      const g = actx.createGain();
      o.type = "square";
      o.frequency.setValueAtTime(from, t0);
      o.frequency.exponentialRampToValueAtTime(Math.max(30, to), t0 + dur);
      g.gain.setValueAtTime(gain, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g);
      g.connect(master);
      o.start(t0);
      o.stop(t0 + dur + 0.02);
    }

    return {
      unlock: unlock,
      march(i) {
        const f = [156, 138, 116, 92][i & 3];
        blip(f, 0.07, 0.13);
        blip(f * 0.5, 0.07, 0.07);
        noise(0.025, 0.05, 520);
      },
      shot() {
        sweep(1480, 180, 0.11, 0.09);
        noise(0.04, 0.05, 2400);
      },
      invaderHit() {
        noise(0.13, 0.22, 2200);
        blip(460, 0.05, 0.07);
        blip(170, 0.08, 0.05, 0.04);
      },
      playerDie() {
        noise(0.55, 0.36, 900);
        sweep(280, 42, 0.4, 0.1);
      },
      chip() { noise(0.03, 0.06, 700); },
      ufoHit() {
        noise(0.24, 0.26, 1500);
        sweep(760, 90, 0.22, 0.08);
      },
      over() {
        blip(196, 0.12, 0.1);
        blip(146, 0.14, 0.1, 0.13);
        blip(98, 0.22, 0.1, 0.28);
      },
      ufo(on) {
        if (!actx || audioFailed) return;
        ensure();
        if (!ufoGain) return;
        ufoGain.gain.setTargetAtTime(on && !muted ? 0.07 : 0, actx.currentTime, 0.03);
      },
      setMuted(v) {
        muted = v;
        if (master) master.gain.value = v ? 0 : 0.22;
        if (ufoGain && !v && !(mode === "playing" && saucer)) ufoGain.gain.value = 0;
      },
    };
  }

  function pollPad() {
    padLeft = false;
    padRight = false;
    padFire = false;
    padStart = false;
    let pads = [];
    try { pads = navigator.getGamepads ? navigator.getGamepads() : []; }
    catch (e) { return; }
    if (!pads) return;
    for (let p = 0; p < pads.length; p++) {
      const pad = pads[p];
      if (!pad) continue;
      const ax = pad.axes[0] || 0;
      if (ax < -0.35) padLeft = true;
      if (ax > 0.35) padRight = true;
      if (pad.buttons[14] && pad.buttons[14].pressed) padLeft = true;
      if (pad.buttons[15] && pad.buttons[15].pressed) padRight = true;
      for (let i = 0; i <= 5; i++) {
        if (pad.buttons[i] && pad.buttons[i].pressed) padFire = true;
      }
      if (pad.buttons[8] && pad.buttons[8].pressed) padStart = true;
      if (pad.buttons[9] && pad.buttons[9].pressed) padStart = true;
    }
  }

  window.addEventListener("keydown", (e) => {
    const controls = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space", "KeyW", "KeyA", "KeyS", "KeyD", "KeyZ", "KeyX", "Enter", "Backspace"];
    if (controls.includes(e.code)) e.preventDefault();
    down.add(e.code);
    sfx.unlock();
    if (e.code === "KeyP" && !e.repeat) {
      if (mode === "playing") mode = "paused";
      else if (mode === "paused") mode = "playing";
    }
    if (e.code === "KeyM" && !e.repeat) {
      muted = !muted;
      storageSet("spacealiens-muted", muted ? "1" : "0");
      sfx.setMuted(muted);
      showToast(muted ? "MUTED" : "SOUND", 1);
    }
  });

  window.addEventListener("keyup", (e) => down.delete(e.code));
  window.addEventListener("blur", () => down.clear());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && mode === "playing") mode = "paused";
  });

  function eventX(e) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width) return pointerX;
    return (e.clientX - rect.left) / rect.width * W;
  }

  canvas.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    sfx.unlock();
    if (mode === "title" || mode === "over") {
      pointerStart = true;
      return;
    }
    if (mode !== "playing") return;
    pointerOn = true;
    pointerX = eventX(e);
    pointerFire = true;
    canvas.setPointerCapture(e.pointerId);
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!pointerOn || mode !== "playing") return;
    pointerX = eventX(e);
  });

  function releasePointer() {
    pointerOn = false;
  }

  canvas.addEventListener("pointerup", releasePointer);
  canvas.addEventListener("pointercancel", releasePointer);

  for (const button of document.querySelectorAll(".pad button")) {
    const hold = button.dataset.hold;
    const press = (ev) => {
      ev.preventDefault();
      sfx.unlock();
      touch[hold] = true;
      if ((mode === "title" || mode === "over") && hold === "fire") pointerStart = true;
    };
    const release = () => { touch[hold] = false; };
    button.addEventListener("pointerdown", press);
    button.addEventListener("pointerup", release);
    button.addEventListener("pointerleave", release);
    button.addEventListener("pointercancel", release);
  }

  function update(dt) {
    anim += dt;
    pollPad();
    const startNow = down.has("Enter") || down.has("Backspace") || padStart;
    if (mode === "paused" && startNow && !wasStart) mode = "playing";
    if ((mode === "title" || mode === "over") && ((startNow && !wasStart) || pointerStart)) startGame();
    wasStart = startNow;
    pointerStart = false;
    if (toastT > 0) toastT -= dt;

    if (mode === "title") updateDemo(dt);
    else if (mode === "playing") updatePlay(dt);
    else if (mode === "dying") updateDying(dt);
    if (mode !== "paused") stepFx(dt);

    sfx.ufo(mode === "playing" && !!saucer);
  }

  let last = 0;
  function loop(now) {
    const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016);
    last = now;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
