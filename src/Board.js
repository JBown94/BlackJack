import React from 'react';
import PlayerArea, { PlayerAreaData } from './PlayerArea';
import Card, { CardData } from './Card';
import TextResources from './TextResources';

class Board extends React.Component {
  static MAX_PLAYERS = 4;

  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      players: [],
      deck: [],
      cardInPlay: null,
      activePlayer: null,
      text: TextResources()
    };
  }

  //TODO: Finish implementing the custom initialisation of the players
  startGame() {
    let cardDeck = this.shuffleDeck();
    let initialCard = cardDeck.shift();

    let playerAreas = [];
    let activePlayer = 1; 

    for(var i = 1; i <= Board.MAX_PLAYERS; i++) {
      let playerActive = true;
      let playerName = null;
      let isCurrentTurn = i === activePlayer;
      let playerCards = playerActive ? cardDeck.splice(0, 7) : [];

      playerAreas.push(new PlayerAreaData(i, playerName, playerActive, playerCards, isCurrentTurn));
    }

    this.setState({
      gameStarted: true,
      players: playerAreas,
      deck: cardDeck,
      cardInPlay: initialCard,
      activePlayer: activePlayer
    });
  }
  showRules() {
    alert("Not Implemented: Show Game Rules");
  }

  handleClick(actionName) {
    switch(actionName) {
      case "PLAY": this.onPlayerTurnGo(); break;
      case "PASS": this.onPlayerTurnPass(); break;
      default: console.log("Action Not Found");
    }
  }

  onPlayerTurnGo() {
    console.log("Play Selected Cards");
    console.log(this.state);

    this.toNextPlayer();
    
    //TODO: Get a list of the selected cards for the current player, then;
    //  - Check if the selected cards are valid, if true, then;
    //    - Move the last card from the player selection to the 'cardInPlay' prop
    //    - Move the other cards (if applicable) to the end of the 'deck' array
    //    - Move onto the next players go
    //  - If not, then notify user to select different cards
  }
  onPlayerTurnPass() {
    console.log("Pass Go / Pick Up Cards");
    console.log(this.state);

    this.toNextPlayer();

    //TODO: Check the 'cardInPlay' for either a 2 or a BlackJack (or a stack of them)
    //  - To determine the stack (if any), check the 'deck' array, starting from the end of the array
    //  - If no 2's or BlackJack's, then the pickup value is 1
    //  - Once the pickup value is determined;
    //    - Move that number of cards from the top of the deck to that players hand
    //  - Move onto the next players go
  }

  toNextPlayer() {
    let players = this.state.players;
    let lastPlayer = this.state.activePlayer;
    let nextPlayer = lastPlayer;

    do {
      nextPlayer++;

      if (nextPlayer > Board.MAX_PLAYERS) {
        nextPlayer = 1;
      }
    }
    while (!players[nextPlayer - 1].playerActive)

    players[lastPlayer - 1].isCurrentTurn = false;
    players[nextPlayer - 1].isCurrentTurn = true;

    this.setState({
      players: players,
      activePlayer: nextPlayer
    });
  }

  generateDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["S", "C", "H", "D"];

    let cardDeck = [];

    for(var s = 0; s < suits.length;s++) {
      for(var v = 0; v < values.length; v++) {
        cardDeck.push(new CardData(values[v], suits[s]));
      }
    }

    return cardDeck;
  }
  shuffleDeck() {
    let cardDeck = this.generateDeck();
    let shuffles = 100000;

    for(var i = 0; i < shuffles; i++) {
      for (var j = cardDeck.length-1; j > 0; j--) {
        const shuffleIdx = Math.floor(Math.random() * cardDeck.length);

        let cardToShuffle = cardDeck[j];

        cardDeck[j] = cardDeck[shuffleIdx]; 
        cardDeck[shuffleIdx] = cardToShuffle; 
      }
    }

    return cardDeck;
  }

  renderBoardActions() {
    let text = this.state.text;
    let boardActions = [];

    if (!this.state.gameStarted) {
      boardActions.push(
        <button key="start" className="start-game" onClick={() => this.startGame()}>{text.START_GAME}</button>
      );
      boardActions.push(
        <button key="rules" className="show-rules" onClick={() => this.showRules()}>{text.SHOW_RULES}</button>
      );
    }

    return (
      <div className="board-actions">
          {boardActions}
      </div>
    );
  }
  renderGamePlayers() {
    const players = this.state.players;
    let playerAreas = [];

    for(var i = 0; i < players.length; i++) {
      const playerNo = i + 1;
      const playerData = players[i];

      playerAreas.push(
        <PlayerArea key={playerNo} playerNo={playerNo} playerActive={playerData.playerActive}
          customName={playerData.playerName} isCurrentTurn={playerData.isCurrentTurn}
          cards={playerData.playerCards} onClick={e => this.handleClick(e)} />
      );
    }

    return playerAreas;
  }
  renderPlayArea() {
    if (this.state.players.length > 0) {
      const data = this.state.cardInPlay;
      const card = <Card key={data.key} value={data.value} suit={data.suit} hidden="false" playable="false" />;

      return (
        <div className="main-deck-area">
          <div className="card-pile">
            <Card key="deck" value="" suit="" playable="false" hidden="true" />
          </div>
          <div className="card-pile">
            {card}
          </div>
        </div>
      );
    }
  }
  
  render() {
    return (
      <div className="board-container">
          {this.renderBoardActions()}
          {this.renderGamePlayers()}
          {this.renderPlayArea()}
      </div>
    );
  }
}

export default Board;
