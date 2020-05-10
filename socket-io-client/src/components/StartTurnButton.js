import React from "react";
import SocketContext from './Socket/SocketContext';
import { startTurn } from "../sockets/emit";

export class StartTurnButton extends React.Component {
    static contextType = SocketContext;

    constructor(props) {
        super(props);
        this.state = {
            buttonName: "Set!",
        };
  
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        startTurn(123);
        event.preventDefault();
    }
  
    render() { 
        return (
            <form  onSubmit={this.handleSubmit}>
                <input disabled={this.context.isActiveTurn} ref="button" type="submit" value={this.state.buttonName} />
            </form>
        );
    }
}