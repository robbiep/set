import React from "react";
import { SocketContext } from './Socket/SocketContext';

export class PlayerScore extends React.Component {
    static contextType = SocketContext;

    render() {
        const { playerScore } = this.context

        return (
            <div className='alert alert-info' style={{ width: '200px', margin: '0px auto 20px'}}>
                Score: {playerScore}
            </div>
        );
    }
}