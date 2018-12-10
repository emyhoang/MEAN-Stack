class Cards {
  constructor(suit, stringValue, numValue) {
    this.suit = suit;
    this.stringValue = stringValue;
    this.numValue = numValue;

  }
  showCard() {
    console.log(`Card is, suit: ${this.suit}, string value: ${this.stringValue}, numberical value : ${this.numValue}!`);
  }

}


const card1 = new Cards("Heart", "Ace", 1)
console.log(card1)
card1.showCard();


child class of 4 different suits and call 





