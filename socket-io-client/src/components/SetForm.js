import React from "react";
import { submitSet } from "../sockets/emit";

export class SetForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            position1: this.props.position1,
            position2: this.props.position2,
            position3: this.props.position3,
        };
  
      this.handleSubmit = this.handleSubmit.bind(this);
      this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }
  
    handleSubmit(event) {
        submitSet([
            this.state.position1,
            this.state.position2,
            this.state.position3,
        ]);
        event.preventDefault();
    }

    componentWillReceiveProps(nextProps) {
        console.log('cwrp')
        this.setState({
            position1: nextProps.position1,
            position2: nextProps.position2,
            position3: nextProps.position3,
        });
      }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
            <input type="submit" value="Submit" />
        </form>
      );
    }
}