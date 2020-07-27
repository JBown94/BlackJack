import React from 'react';

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
            selected: false
        };
    }

    toggleSelection() {
        let state = this.state;

        if (JSON.parse(state.draggable)) {
            state.selected = !state.selected;

            this.setState(state);
        }
    }

    render() {
      return (
        <div className="card" data-value={this.state.value} data-suit={this.state.suit}
            data-selected={this.state.selected}
            draggable={this.state.draggable}
            onClick={() => this.toggleSelection()}>
            <div className="card-val">{this.state.value}</div>
            <div className="suit-img">{this.state.suit}</div>
            <div className="card-val-reverse">{this.state.value}</div>
        </div>   
      );
    }
}

export default Card;
