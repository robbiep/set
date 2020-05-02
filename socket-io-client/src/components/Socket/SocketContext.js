import { createContext } from "react";

const SocketContext = createContext({  
    board: [],
    setFound: undefined,
});

export default SocketContext;