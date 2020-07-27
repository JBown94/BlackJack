import React from 'react';
import PlayerArea from './PlayerArea';
import TextResources from './TextResources';
import Card from './Card';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      players: [],
      deck: [],
      cardsInPlay: [],
      text: TextResources()
    };
  }

  //TODO: Finish implementing the custom initialisation of the players
  startGame() {
    let cardDeck = this.shuffleDeck();
    let initialCard = cardDeck.shift();

    let playerAreas = [];

    for(var i = 1; i <= 4; i++) {
      let playerActive = true;
      let playerName = null;
      let playerCards = playerActive ? cardDeck.splice(0, 7) : [];

      playerAreas.push(this.renderGamePlayer(i, playerActive, playerName, playerCards));
    }

    this.setState({
      gameStarted: true,
      players: playerAreas,
      deck: cardDeck,
      cardsInPlay: [initialCard]
    });
  }

  generateDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["S", "C", "H", "D"];

    let cardDeck = [];

    for(var s = 0; s < suits.length;s++) {
      for(var v = 0; v < values.length; v++) {
        let suit = suits[s];
        let value = values[v];
        let key = value + "_" + suit;

        cardDeck.push(<Card key={key} value={value} suit={suit} hidden="false" playable="true" />);
      }
    }

    return cardDeck;
  }
  shuffleDeck() {
    let cardDeck = this.generateDeck();
    let shuffles = 1000000;

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

  renderGamePlayer(playerNo, isActive, customName, hand) {
    return (
      <PlayerArea
        key={playerNo}
        playerNo={playerNo}
        playerActive={isActive}
        customName={customName}
        cards={hand} />
    );
  }
  renderPlayArea() {
    if (this.state.players.length > 0) {
      const cards = this.state.cardsInPlay;
      const currentCard = (cards.length > 0) ? cards[0]: null;

      return (
        <div className="main-deck-area">
          <div className="card-pile">
            <Card value="" suit="" playable="false" hidden="true" />
            <div className="deck-pile">
              {this.state.deck}
            </div>
          </div>
          <div className="card-pile">
            {currentCard}
          </div>
        </div>
      );
    }
  }
  renderBoardActions() {
    let text = this.state.text;
    let boardActions = [];

    if (!this.state.gameStarted) {
      boardActions.push(
        <button key="start" className="start-game" onClick={() => this.startGame()}>{text.START_GAME}</button>
      );
    }

    return (
      <div className="board-actions">
          {boardActions}
      </div>
    );
  }
  
  render() {
    return (
      <div className="board-container">
          {this.renderBoardActions()}
          {this.state.players}
          {this.renderPlayArea()}
      </div>
    );
  }
}

export default Board;
