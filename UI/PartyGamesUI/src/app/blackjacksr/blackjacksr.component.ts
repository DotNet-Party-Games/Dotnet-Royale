import { Component, OnInit } from '@angular/core';
import { Deck } from './deck';
import { Hand } from './hand';
import { Player } from './player';

@Component({
  selector: 'app-blackjacksr',
  templateUrl: './blackjacksr.component.html',
  styleUrls: ['./blackjacksr.component.css']
})
export class BlackjacksrComponent /*implements OnInit*/ {
  // from ngmodel 
  numberOfPlayers:string;
  moneyBet:string;
  domMessage:string = 'This is a test message';

  // import classes from within component
  deck: Deck;
  // make array empty to avoid undefined errors
  players: Player[] = [];
  dealerHand: Hand;

  // deals with ngmodel input example
  presentNumber() {
    console.log(`Number of players is ${this.numberOfPlayers}`);
    this.blackJack();
  }

  getMoneyBet() {
    console.log(`Money bet is ${this.moneyBet}`);
  }

  //constructor() { }
  /*ngOnInit(): void {
  }*/

  blackJack() {
    // instantiate number of decks based on number of players
    let nOfDecks: number = +this.numberOfPlayers;
    //console.log(nOfDecks);
  
    // add new decks and hands to variables
    this.deck = new Deck(nOfDecks);
    this.dealerHand = new Hand(this.deck);

    //console.log(this.deck);
    //console.log(this.dealerHand);
  
    this.startGame();

    while (true) {
      // TODO console.log("Game Started")
      console.log(`The first card of the dealer is ${this.dealerHand.cards[0]}`);
  
      this.players.forEach(this.playerTurn);
  
      this.dealerTurn();
      /*endGame();
      if (!nextGame()) break;*/
    }
  }

  startGame() {
    // function to start game by getting number of players
    // + converts string to int?
    const numberOfPeople: number = +this.numberOfPlayers;
    console.log(`Number of people at start of game is ${numberOfPeople}`);
    this.askAndSetPlayerAttributes(numberOfPeople);
  }

  askAndSetPlayerAttributes(numberOfPeople: number) {
    for (let i = 1; i < numberOfPeople + 1; i++) {
      // create a new player
      const name = `Player ${i}`;
      // give them 100 bucks
      const initialMoney = 100;
      // push to players array
      this.players.push(new Player(name, initialMoney, this.deck));
      console.log(`Players array is ${this.players}`);
    }
  }

 
  playerTurn(player: Player) {
    console.log(`###### ${player}'s turn ######\n`);
    console.log(`${player}, your actual money is ${player.actualMoney}`);
  
    //askPlayerBet(player);
  
    console.log("\nYour cards are: ");
    console.log(
      `${player.hands[0].cards[0]} and ${player.hands[0].cards[1]} (${player.hands[0].points} points)\n`
    );
  
    let hasSplitted = false;
    let hasDoubled = false;
    for (const [i, hand] of player.hands.entries()) {
      console.log(`(Hand #${i})`);
      console.log(`Your cards are: ${hand}`);
      // If the player has doubled, he can only hit one more time
      /*while (!playerWinOrLose(hand) && (!hasDoubled || hand.cards.length < 3)) {
        if (hasSplitted) {
          console.log(`(Hand #${i})`);
          console.log(`Your cards are: ${hand}`);
        }
        const userDecision = readLineSync
          .question(
            "\nWhat do you want to do?\nAvailable Commands: (h)it, (s)tand, (sp)lit, (d)ouble, (surr)ender\n> "
          )
          .trim()
          .toLowerCase();
  
        let breaking = false;
        switch (userDecision) {
          case "h":
          case "hit":
            player.hit(i);
            console.log(`Now, your cards are: ${hand}`);
            break;
  
          case "s":
          case "stand":
            console.log(`Player ${player} stood`);
            breaking = true;
            break;

          default:
            console.log(
              "Invalid command!\nAvailable Commands: (h)it, (s)tand, (sp)lit, (d)ouble, (surr)ender"
            );
            break;
        }
        if (breaking) break;
      }*/
    }
  }
 

  dealerLost(): boolean {
    if (this.dealerHand.points === 0) {
      console.log("The dealer busted. The game ended :)\n");
      return true;
    }
    return false;
  }
  
  dealerTurn() {
    console.log("###### Dealer's Turn ######\n");
    console.log(
      `The dealer's cards are ${this.dealerHand.cards[0]} and ${this.dealerHand.cards[1]}\n`
    );
  
    while (!this.dealerLost() && this.dealerHand.points < 17) {
      console.log("The dealer is going to hit a card\n");
      this.dealerHand.dealCard();
      console.log(`Now, the dealer's cards are: ${this.dealerHand}`);
    }
  }
  

}
