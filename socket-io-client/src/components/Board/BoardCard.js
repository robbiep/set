import React from "react";

export class BoardCard extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
            card: this.props.card,
            index: this.props.index,
            onClick: this.props.onClick,
        }
    }

    render() {
        return (
            <td key={index} onClick={this.state.onClick}>
                {this.card}
            </td>
        );
    }
}