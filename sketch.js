let farmer;
let foods = [];
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  farmer = new Farmer();
  for (let i = 0; i < 5; i++) {
    foods.push(new Food());
    obstacles.push(new Obstacle());
  }
}

function draw() {
  background(180, 230, 180); // Fundo verde do campo

  // Atualiza e exibe o jogador
  farmer.update();
  farmer.display();

  // Alimentos do campo
  for (let i = foods.length - 1; i >= 0; i--) {
    foods[i].display();
    if (farmer.collects(foods[i])) {
      foods.splice(i, 1);
      score++;
      foods.push(new Food());
    }
  }

  // Obstáculos (problemas no campo)
  for (let obs of obstacles) {
    obs.display();
    if (farmer.collides(obs)) {
      gameOver();
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(18);
  text("Alimentos entregues: " + score, 10, 30);
}

// Classe do Agricultor
class Farmer {
  constructor() {
    this.size = 30;
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
    fill(139, 69, 19); // Marrom, representa um agricultor
    noStroke();
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

// Alimentos do campo
class Food {
  constructor() {
    this.size = 20;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(255, 215, 0); // Amarelo (milho)
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Problemas do campo
class Obstacle {
  constructor() {
    this.size = 40;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(120); // Cinza (problemas, como pedras ou pragas)
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
}

function gameOver() {
  textSize(32);
  fill(255, 0, 0);
  text("Fim de jogo!", width / 3, height / 2);
  noLoop();
}
