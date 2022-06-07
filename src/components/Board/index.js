import { View, Dimensions } from "react-native";
import Background from "../Background";
import { useRef, useState, useEffect, useCallback, useContext } from "react";
import { Chess } from 'chess.js'
import Piece from "../Piece";
import { SIZE } from "../Piece";
import { ChessGameContext } from "../Context/ChessGameContext";

const { width } = Dimensions.get("window");

const Board = () => {
    const {chess, state, setState, onTurn, boardView} = useContext(ChessGameContext);
    const [view, setView] = useState(boardView)
  
    useEffect(() => {
        setView(boardView)
        console.log(boardView)
    },[boardView])

    return ( 
        <View style={{width:width, height: width}}>
            <Background boardView={view} />

            {(view=='w') ?
            state.board.map((row, index) => row.map((square, squareIndex) => {
                    if(!square) return

                    return <Piece key={index + squareIndex} id={`${square.color}${square.type}`} position={{x: squareIndex * SIZE, y: index * SIZE}} chess={chess.current} onTurn={onTurn} enabled={state.player === square.color} />

                })) :
            state.board.reverse().map((row, index) => row.reverse().map((square, squareIndex) => {
                if(!square) return

                return <Piece key={index + squareIndex} id={`${square.color}${square.type}`} position={{x: squareIndex * SIZE, y: index * SIZE}} chess={chess.current} onTurn={onTurn} enabled={state.player === square.color} />

            }))
            }
        </View> 
    );
}
 
export default Board;