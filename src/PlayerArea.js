import React from 'react';
import TextResources from './TextResources';
import Card from './Card';
import './PlayerArea.scss';
import './Cards.scss';

export class PlayerAreaData {
    getPlayerName() {
        const text = TextResources();

        if (this.playerName !== null) {
            return this.playerName;
        }

        return text.PLAYER + this.playerNo;
    }

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
        };
    }

    renderPlayerCards() {
        const cards = this.props.cards;
        let playerHand = [];

        for (var i = 0; i < cards.length; i++) {
            playerHand.push(this.renderCard(cards[i]));
        }

        return playerHand;
    }
    renderCard(data) {
        return (
            <Card key={data.key} value={data.value} suit={data.suit} 
                playable="true" hidden={!this.props.isCurrentTurn}
                toggleCardSelection={(card, e) => this.props.toggleCardSelection(card, e)}
                handleDrag={(dragAction, card, e) => this.props.handleDrag(dragAction, card, e)}
                onClick={(e, data) => this.props.onClick(e, data)}
                onDrag={(e, data) => this.props.onDrag(e, data)}/>
        );
    }

    render() {
        const text = TextResources();

        return (
            <div className="player-container"
                id={this.state.id}
                data-active={this.props.playerActive}
                data-is-turn={this.props.isCurrentTurn}>
                <div className="player-info">
                    <div className="player-name">{this.state.playerName}</div>
                    <div className="is-turn-indicator"></div>
                </div>
                <div className="cards-container">
                    {this.renderPlayerCards()}
                </div>
                <div className="player-actions">
                    <button className="action-button" onClick={() => this.props.onClick("PLAY")}>{text.PLAY}</button>
                    <button className="action-button" onClick={() => this.props.onClick("PASS")}>{text.PASS}</button>
                </div>
            </div>
        );
    }
}

export default PlayerArea;
