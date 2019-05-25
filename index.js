let canvas;
let ctx;
let timer;

let cellSize = 5;
let copy = [{ x: 150, y: 150 }, { x: 155, y: 150 }, { x: 160, y: 150 }, { x: 165, y: 150 }, { x: 170, y: 150 }];
let snakeArray = [{x: 150, y: 150}, {x: 155, y: 150}, {x: 160, y: 150}, {x: 165, y: 150}, {x: 170, y: 150}];
let dir = "right";

Array.prototype.last = function() {
  return this[this.length - 1];
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(snakeArray) {
  for(i = 0; i < snakeArray.length; i++) {
    let startX = snakeArray[i].x;
    let startY = snakeArray[i].y;
    ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.fillRect(startX, startY, cellSize, cellSize);
  }
}

function moveSnake() {
  ctx.save();
  clearCanvas();
  let lastX = snakeArray.last().x;
  let lastY = snakeArray.last().y;
  switch(dir) {
    case "left": 
      snakeArray.shift();
      lastX -= 6;
      snakeArray.push({ x: lastX, y: lastY });
      drawSnake(snakeArray);
      break;
    case "right": 
      snakeArray.shift();
      lastX += 6;
      snakeArray.push({ x: lastX, y: lastY });
      drawSnake(snakeArray);
      break;
    case "up":
      snakeArray.shift();
      lastY -= 6;
      snakeArray.push({ x: lastX, y: lastY });
      drawSnake(snakeArray);
      break;
    case "down":
      snakeArray.shift();
      lastY += 6;
      snakeArray.push({ x: lastX, y: lastY });
      drawSnake(snakeArray);
      break;
    default: 
      snakeArray.shift();
      lastX += 6;
      snakeArray.push({ x: lastX, y: lastY });
      drawSnake(snakeArray);
      break;
  }
  checkCollision();
}

function changeDirection(key) {
  switch (key.code) {
    case "ArrowUp":
      dir !== "down" ? dir = "up" : dir = "down";
      break;
    case "ArrowDown":
      dir !== "up" ? dir = "down" : dir = "up";
      break;
    case "ArrowRight":
      dir !== "left" ? dir = "right" : dir = "left";
      break;
    case "ArrowLeft":
      dir !== "right" ? dir = "left" : dir = "right";
      break;
  }
}

function startGame() {
  drawSnake(snakeArray);
  timer = setInterval(moveSnake, 100);
}

function restartGame() {
  clearCanvas();
  snakeArray = copy.map((c) => c);
  clearInterval(timer);
  dir = "right";
  startGame();
}

function checkCollision() {
  let last = snakeArray.last();
  let collision = [last.x >= canvas.width, last.x <= 0, last.y >= canvas.height, last.y <= 0];
  if(collision.includes(true)) {
    restartGame();
  }
}

window.onload = function() {
  canvas = document.getElementById('game');
  ctx = canvas.getContext('2d')
  startGame();
  document.addEventListener("keydown", changeDirection, false);
  window.requestAnimationFrame(moveSnake);
}