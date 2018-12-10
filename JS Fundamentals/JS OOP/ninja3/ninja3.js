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

class Sensei extends Ninja {
  constructor(name, wisdom) {
    super(name);
    this.wisdom = 10;
    this.health = this.health * 2;
    this.speed = 10;
    this.strength = 10;

  }
  speakWisdom() {
    super.drinkSake();
    console.log('What one programmer can do in one month, two programmers can do in two months');
  }
}

const superSensei = new Sensei("Master Splinter")
console.log(superSensei)
superSensei.speakWisdom();








