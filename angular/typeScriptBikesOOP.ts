class Bike {
  miles: number;
  constructor(
    public price: number,
    public max_speed: string) {
    this.miles = 0;
  }
  displayInfo = () => console.log(`Bike price: ${this.price}, Maximum speed:${this.max_speed}, total miles: ${this.miles} `)
  ride = () => {
    console.log('riding')
    this.miles += 10
    return this
  }
  reverse = () => {
    console.log('reversing')
    if (this.miles <= 0) {
      console.log("You Lose")
    } else {
      this.miles -= 5
      return this
    }
  }
}
const bike1 = new Bike(200, '15mph');
bike1.ride().ride().ride().reverse().displayInfo()
bike1.ride().ride().reverse().reverse().displayInfo()
bike1.reverse().reverse().reverse().displayInfo()