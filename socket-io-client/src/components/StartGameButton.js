import React from "react";
import { startGame } from "../sockets/emit";

export class StartGameButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: "Start New Game",
        };
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        startGame();
        event.preventDefault();
    }
  
    render() {
      return (
        <form  onSubmit={this.handleSubmit}>
            <input ref="button" type="submit" value={this.state.buttonName} />
        </form>
      );
    }
}