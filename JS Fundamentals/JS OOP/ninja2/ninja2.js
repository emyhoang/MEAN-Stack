class Ninja {
  constructor(name) {
    this.name = name;
    this.health = 100;
    this.speed = 3;
    this.strength = 3;

  }
  sayName() {
    console.log("My name is " + this.name + " !");
  }

  showStats() {
    console.log("Name: " + this.name + ", Health: " + this.health + ", Speed: " + this.speed + ", Strength: " + this.strength);
  }

  drinkSake() {
    this.health += 10;
  }
  punch(enemyNinja) {
    enemyNinja.health -= 5;
    console.log("" + enemyNinja.name + " was punched by " + this.name + " and lost 5 Health!");
  }
  kick(enemyNinja) {
    enemyNinja.health -= 15 * this.strength;
    console.log("" + enemyNinja.name + " was kicked by " + this.name + " and lost " + 15 * this.strength + " Health!");
  }

}

const blueNinja = new Ninja("Goemon");
const redNinja = new Ninja("Bill Gates");
redNinja.punch(blueNinja);
blueNinja.kick(redNinja);




