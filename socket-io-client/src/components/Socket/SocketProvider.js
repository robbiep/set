import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import { initSockets } from "../../sockets";

class SocketProvider extends React.Component {
    constructor(props) {
        super(props);
        this.updateState = this.updateState.bind(this)
        this.state = {
            board: undefined,
            cardSelection: [],
            setFound: undefined,
            isActiveTurn: false,
            update: this.updateState,
        }
    }

    updateState(values) {
        this.setState(values);
    }

    componentDidMount() {
        initSockets({ setValue: this.updateState });
    }

    render() {
        return (
        <SocketContext.Provider value={ this.state }>
            { this.props.children }
        </SocketContext.Provider>
        )
    }
};

export default SocketProvider;