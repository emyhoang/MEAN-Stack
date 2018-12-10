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

}

const ninja1 = new Ninja("Emily");
ninja1.sayName();
ninja1.showStats();
ninja1.drinkSake();

const ninja2 = new Ninja("Louis");
ninja2.sayName();


