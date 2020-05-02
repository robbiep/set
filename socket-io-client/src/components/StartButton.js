import React from "react";
import { startGame } from "../sockets/emit";

export class StartButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonName: "Start",
        };
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.setState({ buttonName: "Started" });
        this.refs.button.setAttribute("disabled", "disabled");
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