import React from 'react';
import TextResources from './TextResources';
import Card from './Card';
import './PlayerArea.scss';
import './Cards.scss';

export class PlayerAreaData {
    constructor(playerNo, playerName, playerActive, playerCards) {
        this.playerNo = playerNo;
        this.playerName = playerName;
        this.playerActive = playerActive;
        this.playerCards = playerCards || [];
    }
}

class PlayerArea extends React.Component {
    constructor(props) {
        super(props);

        const text = TextResources();
        const defaultName = text.PLAYER + props.playerNo;

        this.state = {
            id: "player-area-" + props.playerNo,
            playerName: props.customName || defaultName,
            playerActive: props.playerActive,
            playerCards: props.cards || []
        };
    }

    renderPlayerCards() {
        const cards = this.state.playerCards;
        let playerHand = [];

        for (var i = 0; i < cards.length; i++) {
            playerHand.push(this.renderCard(i, cards[i]));
        }

        return playerHand;
    }
    renderCard(index, data) {
        return (
            <Card key={index} value={data.value} suit={data.suit} playable="true" />
        );
    }

    render() {
        const text = TextResources();

        return (
            <div id={this.state.id} className="player-container" data-active={this.state.playerActive}>
                <div className="player-info">{this.state.playerName}</div>
                <div className="cards-container">
                    {this.renderPlayerCards()}
                </div>
                <div className="player-actions">
                    <button className="action-button">{text.PLAY}</button>
                    <button className="action-button">{text.PASS}</button>
                </div>
            </div>
        );
    }
}

export default PlayerArea;
