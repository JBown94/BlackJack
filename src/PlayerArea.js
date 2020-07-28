import React from 'react';
import TextResources from './TextResources';
import Card from './Card';
import './PlayerArea.scss';
import './Cards.scss';

export class PlayerAreaData {
    constructor(playerNo, playerName, playerActive, playerCards, isCurrentTurn) {
        this.playerNo = playerNo;
        this.playerName = playerName;
        this.playerActive = playerActive;
        this.playerCards = playerCards || [];
        this.isCurrentTurn = isCurrentTurn;
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
            playerCards: props.cards || [],
            isCurrentTurn: props.isCurrentTurn,
        };
    }

    renderPlayerCards() {
        const cards = this.state.playerCards;
        let playerHand = [];

        for (var i = 0; i < cards.length; i++) {
            playerHand.push(this.renderCard(cards[i]));
        }

        return playerHand;
    }
    renderCard(data) {
        return (
            <Card key={data.key} value={data.value} suit={data.suit} playable="true" />
        );
    }

    render() {
        const text = TextResources();

        return (
            <div className="player-container"
                id={this.state.id}
                data-active={this.state.playerActive}
                data-is-turn={this.state.isCurrentTurn}>
                <div className="player-info">
                    <div className="player-name">{this.state.playerName}</div>
                    <div className="is-turn-indicator"></div>
                </div>
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
