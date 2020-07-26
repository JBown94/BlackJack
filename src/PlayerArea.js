import React from 'react';
import './PlayerArea.scss';

class PlayerArea extends React.Component {
    constructor(props) {
        super(props);

        const defaultName = "Player" + props.playerNo;
        const customName = null;

        const textResource = {
            PLAY: "Play",
            PASS: "Pass",
        };

        this.state = {
            id: "player-area-" + props.playerNo,
            playerName: customName || defaultName,
            playerActive: false,
            text: textResource
        };
    }

    render() {
        return (
            <div id={this.state.id} className="player-container">
                <div className="player-name">{this.state.playerName}</div>
                <div className="cards-container">
                    <ul>Cards List</ul>
                </div>
                <div className="player-actions">
                    <button>{this.state.text['PLAY']}</button>
                    <button>{this.state.text['PASS']}</button>
                </div>
            </div>
        );
    }
}

export default PlayerArea;
