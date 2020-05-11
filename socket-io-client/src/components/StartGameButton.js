import React from "react";
import { startGame } from "../sockets/emit";
import { Button } from 'react-bootstrap';

export class StartGameButton extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        startGame();
        event.preventDefault();
    }
  
    render() {
        return (
            <Button variant="primary" onClick={this.onClick} >
                Start New Game
            </Button>
        );
    }
}