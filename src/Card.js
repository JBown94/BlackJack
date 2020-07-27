import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.value,
            suit: props.suit
        };
    }

    render() {
      return (
        <div className="card" data-value={this.props.value} data-suit={this.props.suit}>
            <div className="card-val">{this.props.value}</div>
            <div className="suit-img">{this.props.suit}</div>
            <div className="card-val-reverse">{this.props.value}</div>
        </div>   
      );
    }
}

export default Card;
