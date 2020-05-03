import React, { useState, useEffect } from "react";
import SocketContext from "./SocketContext";
import { initSockets } from "../../sockets";

const SocketProvider = (props) => {
    const [value, setValue] = useState({
        board: undefined,
        setFound: undefined,
    });

    useEffect(() => initSockets({ setValue }), [initSockets]);
    // Note, we are passing setValue ^ to initSockets

    return(
        <SocketContext.Provider value={ value }>
            { props.children }
        </SocketContext.Provider>
    )
};

export default SocketProvider;