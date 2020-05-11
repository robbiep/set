import React from "react";
import { SocketContext } from './Socket/SocketContext';
import { startTurn } from "../sockets/emit";
import { Button } from 'react-bootstrap';

export class StartTurnButton extends React.Component {
    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        startTurn(123);
        event.preventDefault();
    }
  
    render() { 
        return (
            <Button variant="secondary" disabled={this.context.isActiveTurn} onClick={this.handleSubmit}>
                Set!
            </Button>
        );
    }
}