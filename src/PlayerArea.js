import React from 'react';
import './PlayerArea.scss';

class PlayerArea extends React.Component {
    constructor(props) {
        super(props);

        const defaultName = "Player" + props.playerNo;
        const customName = null;

        this.state = {
            id: "player-area-" + props.playerNo,
            playerName: customName || defaultName,
            playerActive: false
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
                    Player Actions
                </div>
            </div>
        );
    }
}

export default PlayerArea;
