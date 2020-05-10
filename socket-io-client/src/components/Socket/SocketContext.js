import { createContext } from "react";

const SocketContext = createContext({  
    board: [],
    cardSelection: [],
    setFound: undefined,
    isActiveTurn: false
});

export default SocketContext;