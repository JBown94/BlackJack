import React from 'react';
import PlayerArea from './PlayerArea';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }
  
    renderPlayerArea(i) {
        return (
          <PlayerArea playerNo={i} />
        );
      }

    render() {
        return (
          <div className="board-container">
              {this.renderPlayerArea(1)}
              {this.renderPlayerArea(2)}
              {this.renderPlayerArea(3)}
              {this.renderPlayerArea(4)}
              <div className="main-deck-area">
                <div className="card-pile">Deck Pile</div>
                <div className="card-pile">Playing Pile</div>
              </div>
          </div>
        );
    }
}

export default Board;
