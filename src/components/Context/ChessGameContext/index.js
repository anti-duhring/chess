import { createContext, useRef, useState, useCallback } from "react";
import { Chess } from "chess.js";

export const ChessGameContext = createContext();

export const ChessGameContextProvider = ({children}) => {
    const chess = useRef(new Chess);
    const [state, setState] = useState({
        player: 'w',
        board: chess.current.board(),
    })

    const onTurn = useCallback(() => {
        setState({player: state.player == 'w' ? 'b' : 'w',
        board: chess.current.board()})
    },[chess.current, state.player])

    return(
        <ChessGameContext.Provider value={{chess, state, setState, onTurn}}>
            {children}
        </ChessGameContext.Provider>
    )
}