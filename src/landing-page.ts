import { PokerCards } from "./poker-cards";

let playingDeck = new PokerCards();
let infoDIV = document.querySelector<HTMLDivElement>("#info");
let cardCountSpan = document.querySelector<HTMLSpanElement>("#card-count");
let analyticsDIV = document.querySelector<HTMLDivElement>("#analytics");

function initPage() {
  console.log("Initialising Page");
  document
    .getElementById("draw-card")!
    .addEventListener("click", () => drawCard());
  document
    .getElementById("reset-deck")!
    .addEventListener("click", () => resetDeck());
  buildTable();
}

function drawCard() {
  infoDIV!.innerHTML = `<h2>${playingDeck.drawCard()}</h2>`;
  cardCountSpan!.innerText = playingDeck.getDrawnCards().length.toString();

  updateAnalytics();
}

function resetDeck() {
  playingDeck.resetDeck();
  infoDIV!.innerHTML = `<h2>Deck has been reshuffled</h2>`;
  cardCountSpan!.innerText = playingDeck.getDrawnCards().length.toString();
  buildTable();
}

function buildTable() {
  let cols = [...Array(13)].map((_, i) => `<td id="col-${i}"></td>`).join("");
  analyticsDIV!.innerHTML = `
  <table>
    <tr></tr>
    <tr id='row-0'>${cols}</tr>
    <tr id='row-1'>${cols}</tr>
    <tr id='row-2'>${cols}</tr>
    <tr id='row-3'>${cols}</tr>
  </table>`;
}

function updateAnalytics() {
  const cardCount = 52 - playingDeck.getRemainingCardsCount() - 1;
  console.log(cardCount);
  const row = Math.floor(cardCount / 13);
  const column = cardCount % 13;
  let cardSlot = document.querySelector(`#row-${row} #col-${column}`);
  cardSlot!.innerHTML = playingDeck.getLastDrawnCard();

  if (playingDeck.getLastDrawnCard().match(RegExp("(\u2666|\u2665)"))) {
    cardSlot!.classList.add("red");
  } else {
    cardSlot!.classList.add("black");
  }
}
initPage();
