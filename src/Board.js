import React from 'react';
import TextResources from './TextResources';
import PlayerArea from './PlayerArea';
import Card from './Card';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      deck: [],
      cardsInPlay: []
    };
  }

  startGame() {
    let playerAreas = [];

    for(var i = 1; i <= 4; i++) {
      playerAreas.push(this.renderPlayerArea(i, true, null));
    }

    this.setState({
      players: playerAreas
    });

    //this.shuffleDeck();
  }

  //TODO: create a shuffle method, to randomise the list of 52 cards
  shuffleDeck() {
    const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["S", "C", "H", "D"];

    let state = this.state;
    let cardDeck = [];

    for(var s = 0; s < suits.length;s++) {
      for(var v = 0; v < values.length; v++) {
        let suit = suits[s];
        let value = values[v];
        let key = value + "_" + suit;

        cardDeck.push(<Card key={key} value={value} suit={suit} playable="false" />);
      }
    }

    this.setState({
      deck: cardDeck
    });
  }

    renderPlayerArea(playerNo, isActive, customName) {
      return (
        <PlayerArea
          key={playerNo}
          playerNo={playerNo}
          playerActive={isActive}
          customName={customName} />
      );
    }

    renderPlayArea() {
      if (this.state.players.length > 0) {
        return (
          <div className="main-deck-area">
            <div className="card-pile">
              {this.state.deck}
            </div>
            <div className="card-pile">
              {/* <Card value="A" suit="S" playable="false" /> */}
            </div>
          </div>
        );
      }
    }

    render() {
      let playerAreas = [];

      //TODO: Finish implementing the custom initialisation of the players
      //  - I.e. Display the players & enter custom names, which persists across sessions
      for(var i = 1; i <=4; i++) {
        playerAreas.push(this.renderPlayerArea(i, true, null));
      }

      return (
        <div className="board-container">
          <div className="board-actions">
            <button onClick={() => this.startGame()}>Start Game</button>
            <button onClick={() => this.shuffleDeck()}>Shuffle Deck</button>
          </div>
            {this.state.players}
            {this.renderPlayArea()}
        </div>
      );
    }
}

export default Board;
