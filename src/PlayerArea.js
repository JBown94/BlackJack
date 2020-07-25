import React from 'react';
import './PlayerArea.css';

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
                <span className="player-name">{this.state.playerName}</span>
                <div className="card-container">
                    <p>Cards List</p>
                    <ul></ul>
                </div>
            </div>
        );
    }
}

export default PlayerArea;
