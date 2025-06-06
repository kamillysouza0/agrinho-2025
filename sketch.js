let farmer;
let foods = [];
let obstacles = [];
let score = 0;
let gameEnded = false;
let targetScore = 10; // Pontuação necessária para "chegar na cidade"

function setup() {
  createCanvas(600, 400);
  farmer = new Farmer();
  for (let i = 0; i < 5; i++) {
    foods.push(new Food());
    obstacles.push(new Obstacle());
  }
}

function draw() {
  // Muda o fundo conforme o progresso: campo (verde) → cidade (cinza claro)
  if (score < targetScore) {
    background(180, 230, 180); // Campo
  } else {
    background(200); // Cidade
  }

  if (gameEnded) {
    showVictory();
    return;
  }

  farmer.update();
  farmer.display();

  for (let i = foods.length - 1; i >= 0; i--) {
    foods[i].display();
    if (farmer.collects(foods[i])) {
      foods.splice(i, 1);
      score++;
      foods.push(new Food());
    }
  }

  for (let obs of obstacles) {
    obs.display();
    if (farmer.collides(obs)) {
      gameOver();
    }
  }

  fill(0);
  textSize(18);
  if (score < targetScore) {
    text("Alimentos entregues: " + score, 10, 30);
  } else {
    text("Você chegou à cidade!", 10, 30);
    gameEnded = true;
  }
}

class Farmer {
  constructor() {
    this.size = 40;
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) this.x -= this.speed;
    if (keyIsDown(RIGHT_ARROW)) this.x += this.speed;
    if (keyIsDown(UP_ARROW)) this.y -= this.speed;
    if (keyIsDown(DOWN_ARROW)) this.y += this.speed;

    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    fill(139, 69, 19); // Trator marrom
    rect(this.x, this.y, this.size, this.size);
  }

  collects(food) {
    return dist(this.x, this.y, food.x, food.y) < this.size / 2 + food.size / 2;
  }

  collides(obstacle) {
    return (this.x < obstacle.x + obstacle.size &&
            this.x + this.size > obstacle.x &&
            this.y < obstacle.y + obstacle.size &&
            this.y + this.size > obstacle.y);
  }
}

class Food {
  constructor() {
    this.size = 20;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(255, 215, 0); // Milho
    ellipse(this.x, this.y, this.size);
  }
}

class Obstacle {
  constructor() {
    this.size = 40;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(100); // Cinza escuro - pedras/pragas
    rect(this.x, this.y, this.size, this.size);
  }
}

function gameOver() {
  textSize(32);
  fill(255, 0, 0);
  text("Fim de jogo!", width / 3, height / 2);
  noLoop();
}

function showVictory() {
  textSize(28);
  fill(0, 100, 255);
  text("Parabéns!", width / 3 + 10, height / 2 - 20);
  textSize(20);
  text("Você levou os alimentos do campo para a cidade!", width / 6, height / 2 + 20);
  noLoop();
}
