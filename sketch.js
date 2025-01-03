let hero;
let goodFoods = [];
let badFoods = [];
let score = 0;

function setup() {
  createCanvas(800, 400);
  hero = new Hero();

  // Generate good foods
  for (let i = 0; i < 5; i++) {
    goodFoods.push(new Food(random(width), random(height), "good"));
  }

  // Generate bad foods
  for (let i = 0; i < 3; i++) {
    badFoods.push(new Food(random(width), random(height), "bad"));
  }
}

function draw() {
  background(220);

  // Display score
  textSize(20);
  fill(0);
  text(`Score: ${score}`, 10, 30);

  // Display hero
  hero.display();
  hero.move();

  // Display foods
  for (let food of goodFoods) {
    food.display();
    if (hero.collect(food)) {
      score += 10;
      food.reset();
      alert("Fun Fact: Probiotics like yogurt improve your gut microbiome!");
    }
  }

  for (let food of badFoods) {
    food.display();
    if (hero.collect(food)) {
      score -= 5;
      food.reset();
      alert("Oops! Junk food harms your gut bacteria. Try again!");
    }
  }
}

class Hero {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 40;
  }

  display() {
    fill(0, 100, 255);
    ellipse(this.x, this.y, this.size);
  }

  move() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) this.x -= 5;
    if (keyIsDown(RIGHT_ARROW) && this.x < width) this.x += 5;
    if (keyIsDown(UP_ARROW) && this.y > 0) this.y -= 5;
    if (keyIsDown(DOWN_ARROW) && this.y < height) this.y += 5;
  }

  collect(food) {
    let d = dist(this.x, this.y, food.x, food.y);
    return d < (this.size + food.size) / 2;
  }
}

class Food {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.size = 30;
  }

  display() {
    if (this.type === "good") {
      fill(0, 255, 0);
    } else {
      fill(255, 0, 0);
    }
    ellipse(this.x, this.y, this.size);
  }

  reset() {
    this.x = random(width);
    this.y = random(height);
  }
}
