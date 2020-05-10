import React from "react";
import SocketContext from './Socket/SocketContext';
import { submitSet } from "../sockets/emit";

export class SetForm extends React.Component {
    static contextType = SocketContext;

    constructor(props) {
        super(props);
  
        this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
        event.preventDefault();

        const setSubmission = this.context.cardSelection.filter(() => { return true });
        submitSet(setSubmission);
    }
  
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Submit" />``
            </form>
        );
    }
}