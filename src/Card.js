import React from 'react';

export class CardData {
    constructor(value, suit) {
        this.key = value + "_" + suit;
        this.value = value;
        this.suit = suit;
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
            value: props.value,
            suit: props.suit,
            hidden: props.hidden,
            selected: false,
        };
    }

    toggleSelection() {
        let state = this.state;

        if (JSON.parse(state.draggable)) {
            state.selected = !state.selected;

            this.setState(state);
        }
    }

    dragStart(e) {
        console.log("Drag Start");
        console.log(this);
    }
    dragEnd(e) {
        console.log("Drag End");
        console.log(this);

        //TODO: Check the drop target of the dragged card then, if dropped;
        //  - In the play area, remove it from the player area & add it to the start of the cardsInPlay
        //  - In the players card area, reorder the cards list

        // this.setState({
        //     hidden: true,
        //     selected: false,
        //     draggable: false
        // });
    }

    render() {
      return (
        <div className="card" data-value={this.state.value} data-suit={this.state.suit}
            data-selected={this.state.selected} data-hidden={this.state.hidden}
            draggable={this.state.draggable}
            
            onDragStart={e => this.dragStart(e)}
            onDragEnd={e => this.dragEnd(e)}
            onClick={() => this.toggleSelection()}>
            
            <div className="card-val">{this.state.value}</div>
            <div className="suit-img"></div>
            <div className="card-val-reverse">{this.state.value}</div>
        </div>   
      );
    }
}

export default Card;
