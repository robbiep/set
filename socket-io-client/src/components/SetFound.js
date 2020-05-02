import React from "react";
import SocketContext from './Socket/SocketContext';

export class SetFound extends React.Component {
    static contextType = SocketContext;

    render() {
        const { setFound } = this.context

        return (
            <p>
                {setFound}
            </p>
        );
    }
}