import React from 'react';
import PlayerArea, { PlayerAreaData } from './PlayerArea';
import Card, { CardData } from './Card';
import TextResources from './TextResources';

class Board extends React.Component {
  static MAX_PLAYERS = 4;

  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,       //
      initialGo: true,          //TODO: Maybe place these flags in a their own object
      forfeitFulfilled: false,  //  - To separate it out a bit & not just have a big long list of props
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
  handleDrag(dragAction, card, data) {
    console.group("Handle Drag: '" + dragAction + "'");
    console.log(card);
    console.log(data);
    console.groupEnd();

    switch (dragAction) {
      case "START": {
        break;
       }
      case "END": {
        break;
      }
      default: console.log("Drag Action Not Found");
    }

  }

  toggleCardSelection(card, evt) {
    console.log("Toggle Card Select");
    console.log(card);
    console.log(evt);

    // let state = this.state;

    // if (JSON.parse(state.draggable)) {
    //     state.selected = !state.selected;

    //     this.setState(state);
    // }

    // this.props.toggleCardSelection(this);
  }

  onPlayerTurnGo() {
    console.log("Play Selected Cards");
    console.log(this.state);

    const players = this.state.players;
    const deck = this.state.deck;
    
    //TODO: Get a list of the selected cards for the current player, then;
    //  - Check if the selected cards are valid, if true, then;
    //    - Move the last card from the player selection to the 'cardInPlay' prop
    //    - Move the other cards (if applicable) to the end of the 'deck' array
    //    - Move onto the next players go
    //  - If not, then notify user to select different cards

    this.toNextPlayer(players, deck, false);
  }
  onPlayerTurnPass() {
    const players = this.state.players;
    const deck = this.state.deck;
    
    const playerId = this.state.activePlayer - 1;
    const lastCard = this.state.cardInPlay;

    if (deck.length > 0) {
      let playerHand = players[playerId].playerCards;
      let newPlayerHand = [];
      let pickupCount = 1;

      if (!this.state.forfeitFulfilled) {
        if (lastCard.value === "2") {
          pickupCount = 2;
        } else if (lastCard.value === "J" && lastCard.isBlackSuit()) {
          pickupCount = 7;
        }

        if (pickupCount !== 1 && !this.state.initialGo) {
          let pickupMultiplier = 1;

          for (var d = deck.length - 1; d >= 0; d--) {
            let correctValue = deck[d].value === lastCard.value;
            let correctSuit = true;
            
            if (pickupCount === 7) {
              correctSuit = deck[d].isBlackSuit();
            }

            if (correctValue && correctSuit) {
              pickupMultiplier++;
            } else {
              break;
            }
          }

          pickupCount *= pickupMultiplier;
        }
      }

      newPlayerHand = deck.splice(0, pickupCount);

      for (var i = 0; i < newPlayerHand.length; i++) {
        playerHand.push(newPlayerHand[i]);
      }

      players[playerId].playerCards = playerHand;

      this.toNextPlayer(players, deck, true);
    } else {
      alert("Deck Empty: No Cards Available");
    }
  }

  toNextPlayer(players, deck, forfeitFulfilled) {
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
      initialGo: false,
      forfeitFulfilled: forfeitFulfilled,
      players: players,
      activePlayer: nextPlayer,
      deck: deck
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
          cards={playerData.playerCards}
          toggleCardSelection={(card, e) => this.toggleCardSelection(card, e)}
          handleDrag={(dragAction, card, e) => this.handleDrag(dragAction, card, e)}
          onClick={e => this.handleClick(e)} />
      );
    }

    return playerAreas;
  }
  renderPlayArea() {
    if (this.state.players.length > 0) {
      const data = this.state.cardInPlay;
      const card = <Card key={data.key} value={data.value} suit={data.suit} hidden="false" playable="false" />;

      let deckCard = null;

      if (this.state.deck.length > 0) {
        deckCard = <Card key="deck" value="" suit="" playable="false" hidden="true" />
      }

      return (
        <div className="main-deck-area">
          <div className="card-pile">
            {deckCard}
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
