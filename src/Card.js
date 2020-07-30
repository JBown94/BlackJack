import React from 'react';

export class CardData {
    constructor(value, suit) {
        this.key = value + "_" + suit;
        this.value = value;
        this.suit = suit;
    }

    isBlackSuit() {
        return this.suit === "S" || this.suit === "C";
    }
    isRedSuit() {
        return this.suit === "H" || this.suit === "D";
    }
}

class Card extends React.Component {
    constructor(props) {
        super(props);

        let draggable = props.playable;

        if (draggable === undefined) {
            draggable = true;
        } 

        this.state = {
            draggable: draggable,
            selected: false,
        };
    }

    render() {
      return (
        <div className="card" data-value={this.props.value} data-suit={this.props.suit}
            data-selected={this.state.selected} data-hidden={this.props.hidden}
            draggable={this.state.draggable}
            
            onDragStart={e => this.props.handleDrag("START", this, e)}
            onDragEnd={e => this.props.handleDrag("END", this, e)}
            onClick={e => this.props.toggleCardSelection(this, e)}>
            
            <div className="card-val">{this.props.value}</div>
            <div className="suit-img"></div>
            <div className="card-val-reverse">{this.props.value}</div>
        </div>   
      );
    }
}

export default Card;
