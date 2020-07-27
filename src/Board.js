import React from 'react';
import TextResources from './TextResources';
import PlayerArea from './PlayerArea';
import Card from './Card';

class Board extends React.Component {
    renderPlayerArea(playerNo, isActive, customName) {
      return (
        <PlayerArea
          key={playerNo}
          playerNo={playerNo}
          playerActive={isActive}
          customName={customName} />
      );
    }

    render() {
      const text = TextResources();
      let playerAreas = [];

      //TODO: Finish implementing the custom initialisation of the players
      //  - I.e. Display the players & enter custom names, which persists across sessions
      for(var i = 1; i <=4; i++) {
        playerAreas.push(this.renderPlayerArea(i, true, null));
      }

      return (
        <div className="board-container">
            {playerAreas}
            <div className="main-deck-area">
              <div className="card-pile">{text.DECK_PILE}</div>
              <div className="card-pile">
                <Card value="A" suit="S" playable="false" />
              </div>
            </div>
        </div>
      );
    }
}

export default Board;
