import React, { useState, useEffect } from "react";
import { SocketContext, getDefaultState } from "./SocketContext";
import { initSockets } from "../../sockets";
import _ from 'lodash';

class SocketProvider extends React.Component {
    constructor(props) {
        super(props);
        
        this.updateState = this.updateState.bind(this)
        const defaultState = getDefaultState();
        this.state = {
            ...defaultState,
            update: this.updateState,
        };
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