import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            draggable: props.playable,
            value: props.value,
            suit: props.suit
        };
    }

    render() {
      return (
        <div draggable={this.state.draggable} className="card" data-value={this.state.value} data-suit={this.state.suit}>
            <div className="card-val">{this.state.value}</div>
            <div className="suit-img">{this.state.suit}</div>
            <div className="card-val-reverse">{this.state.value}</div>
        </div>   
      );
    }
}

export default Card;
