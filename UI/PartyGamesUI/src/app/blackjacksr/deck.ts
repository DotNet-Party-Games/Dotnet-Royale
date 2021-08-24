export class Card {
  // initiate name, value, and suit in constructor
  constructor(
    readonly name: string,
    readonly value: number,
    readonly suit: string
  ) {}

  // display card values in string
  public toString = (): string => `${this.name} of ${this.suit}`;
}
  
// function to shuffle deck
function shuffle(array: Card[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
  
export class Deck {
  // variable for suits
  static readonly suits: string[] = ["♣", "♥", "♠", "♦"];
  // variable for card values
  static readonly cards: { [name: string]: number } = {
    ACE: 11,
    TWO: 2,
    THREE: 3,
    FOUR: 4,
    FIVE: 5,
    SIX: 6,
    SEVEN: 7,
    EIGHT: 8,
    NINE: 9,
    TEN: 10,
    JACK: 10,
    QUEEN: 10,
    KING: 10
  };

  // create deck variable
  private readonly _deck: Card[];

  // constructor gets number of decks and creates game deck
  constructor(nDecks: number) {
    this._deck = [];
    for (let i = 0; i < nDecks; i++) {
      for (const suit of Deck.suits) {
        for (const [cardName, cardValue] of Object.entries(Deck.cards)) {
          this._deck.push(new Card(cardName, cardValue, suit));
        }
      }
    }
    shuffle(this._deck);
  }

  // pop card from deck
  public dealCard = (): Card => this._deck.pop();

  // function to get initial hand
  public getInitialCards = (): [Card, Card] => [
    this._deck.pop(),
    this._deck.pop()
  ];
}
  