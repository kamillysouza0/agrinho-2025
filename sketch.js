function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

}
let player;
let treasures = [];
let obstacles = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  // Criando alguns tesouros e obstáculos
  for (let i = 0; i < 5; i++) {
    treasures.push(new Treasure());
    obstacles.push(new Obstacle());
  }
}

function draw() {
  background(220);

  // Atualiza e exibe o jogador
  player.update();
  player.display();

  // Atualiza e exibe os tesouros
  for (let i = treasures.length - 1; i >= 0; i--) {
    treasures[i].display();
    if (player.collects(treasures[i])) {
      treasures.splice(i, 1); // Remove o tesouro quando coletado
      score++;
      treasures.push(new Treasure()); // Cria um novo tesouro
    }
  }

  // Atualiza e exibe os obstáculos
  for (let obs of obstacles) {
    obs.display();
    if (player.collides(obs)) {
      gameOver();
    }
  }

  // Exibe a pontuação
  fill(0);
  textSize(18);
  text("Score: " + score, 10, 30);
}

// Classe do jogador
class Player {
  constructor() {
    this.size = 30;
    this.x = width / 2;
    this.y = height / 2;
    this.speed = 5;
  }

  update() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }

    // Limita o movimento do jogador para que não saia da tela
    this.x = constrain(this.x, 0, width - this.size);
    this.y = constrain(this.y, 0, height - this.size);
  }

  display() {
    fill(0, 255, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }

  // Verifica se o jogador coleta um tesouro
  collects(treasure) {
    return dist(this.x, this.y, treasure.x, treasure.y) < this.size / 2 + treasure.size / 2;
  }

  // Verifica se o jogador colide com um obstáculo
  collides(obstacle) {
    return (this.x < obstacle.x + obstacle.size &&
            this.x + this.size > obstacle.x &&
            this.y < obstacle.y + obstacle.size &&
            this.y + this.size > obstacle.y);
  }
}

// Classe do Tesouro
class Treasure {
  constructor() {
    this.size = 20;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(255, 223, 0);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }
}

// Classe do Obstáculo
class Obstacle {
  constructor() {
    this.size = 40;
    this.x = random(width);
    this.y = random(height);
  }

  display() {
    fill(255, 0, 0);
    noStroke();
    rect(this.x, this.y, this.size, this.size);
  }
}

// Função que é chamada quando o jogador colide com um obstáculo
function gameOver() {
  textSize(32);
  fill(255, 0, 0);
  text("Game Over!", width / 3, height / 2);
  noLoop(); // Para o jogo
}
