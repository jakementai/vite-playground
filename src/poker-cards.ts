export class PokerCards {
  readonly totalCards: number = 52;
  private drawnCards: number[];
  private readonly cardSymbolOrder: Symbol[];
  private readonly cardValueOrder: string[];

  constructor() {
    this.drawnCards = [];
    this.cardSymbolOrder = [
      Symbol.Diamonds,
      Symbol.Clubs,
      Symbol.Hearts,
      Symbol.Spades,
    ];
    this.cardValueOrder = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
  }

  drawCard(): string {
    if (this.drawnCards.length >= this.totalCards) {
      return "There are no more cards to be drawn";
    }

    return this.toHumaneCard(this.drawUniqueCard());
  }

  getRemainingCardsCount() {
    return this.totalCards - this.drawnCards.length;
  }

  getDrawnCards() {
    return this.drawnCards;
  }

  resetDeck() {
    this.drawnCards = [];
  }

  toHumaneCard(cardOrder: number): string {
    const symbol = Math.floor(cardOrder / 13);
    const value = cardOrder % 13;
    return this.cardSymbolOrder[symbol] + this.cardValueOrder[value];
  }

  getLastDrawnCard() {
    return this.toHumaneCard(this.drawnCards.slice(-1)[0]);
  }
  private drawUniqueCard(): number {
    let card = Math.floor(Math.random() * 52);

    while (this.drawnCards.includes(card)) {
      card = Math.floor(Math.random() * 52);
    }

    this.drawnCards.push(card);
    return card;
  }
}

export interface Card {
  value: string;
}

export enum Symbol {
  Spades = "\u2660",
  Hearts = "\u2665",
  Clubs = "\u2663",
  Diamonds = "\u2666",
}
