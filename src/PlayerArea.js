import React from 'react';
import TextResources from './TextResources';
import './PlayerArea.scss';

class PlayerArea extends React.Component {
    constructor(props) {
        super(props);

        const defaultName = "Player" + props.playerNo;

        this.state = {
            id: "player-area-" + props.playerNo,
            playerName: props.customName || defaultName,
            playerActive: props.playerActive,
        };
    }

    render() {
        const text = TextResources();

        return (
            <div id={this.state.id} className="player-container" data-active={this.state.playerActive}>
                <div className="player-name">{this.state.playerName}</div>
                <div className="cards-container">
                    <ul>Cards List</ul>
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
