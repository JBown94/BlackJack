import React from 'react';
import TextResources from './TextResources';
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
      const text = TextResources();

      

        return (
          <div className="board-container">
              {this.renderPlayerArea(1)}
              {this.renderPlayerArea(2)}
              {this.renderPlayerArea(3)}
              {this.renderPlayerArea(4)}
              <div className="main-deck-area">
                <div className="card-pile">{text.DECK_PILE}</div>
                <div className="card-pile">{text.PLAYING_PILE}</div>
              </div>
          </div>
        );
    }
}

export default Board;
