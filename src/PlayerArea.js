import React from 'react';
import TextResources from './TextResources';
import Card from './Card';
import './PlayerArea.scss';
import './Cards.scss';

class PlayerArea extends React.Component {
    constructor(props) {
        super(props);

        const text = TextResources();
        const defaultName = text['PLAYER'] + props.playerNo;

        this.state = {
            id: "player-area-" + props.playerNo,
            playerName: props.customName || defaultName,
            playerActive: props.playerActive,
        };
    }

    renderCard(index, value, suit) {
        return (
            <Card key={index} value={value} suit={suit} playable="true" />
        );
    }

    generatePlayerCards() {
        const values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const suits = ["S", "C", "H", "D"];

        let playerCards = [];

        //TODO: Properly implement the generation of cards
        //  - The parent object needs to know what cards other players have, otherwise it's possible
        //    to give out duplicates
        //  - Preferably generate the entire list of 52 cards, then shuffle them & use the next
        //    card in the array

        // for (var i = 0; i < 7; i++) {
        //     let cardValue = values[Math.floor(Math.random() * values.length)];
        //     let cardSuit = suits[Math.floor(Math.random() * suits.length)];

        //     playerCards.push(this.renderCard(i, cardValue, cardSuit));
        // }

        return playerCards;
    }

    render() {
        const text = TextResources();
        const playerCards = this.generatePlayerCards();

        return (
            <div id={this.state.id} className="player-container" data-active={this.state.playerActive}>
                <div className="player-info">{this.state.playerName}</div>
                <div className="cards-container">
                    {playerCards}
                </div>
                <div className="player-actions">
                    <button>{text['PLAY']}</button>
                    <button>{text['PASS']}</button>
                </div>
            </div>
        );
    }
}

export default PlayerArea;
