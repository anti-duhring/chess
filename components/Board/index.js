import { View, Dimensions } from "react-native";
import Background from "../Background";
import { useRef, useState, useEffect, useCallback } from "react";
import { Chess } from 'chess.js'
import Piece from "../Piece";
import { SIZE } from "../Piece";

const { width } = Dimensions.get("window");

const Board = () => {
    const chess = useRef(new Chess);
    const [state, setState] = useState({
        player: 'w',
        board: chess.current.board(),
    })

    const onTurn = useCallback(
      () => {
        setState({player: state.player == 'w' ? 'b' : 'w',
    board: chess.current.board()})
      },
      [chess.current, state.player],
    )
    

    useEffect(() => {
        console.log(chess.current.pgn())
    },[])
    
    return ( 
        <View style={{width:width, height: width}}>
            <Background />
            {
                state.board.map((row, index) => row.map((square, squareIndex) => {
                    if(!square) return

                    return <Piece key={index + squareIndex} id={`${square.color}${square.type}`} position={{x: squareIndex * SIZE, y: index * SIZE}} chess={chess.current} onTurn={onTurn} enabled={state.player === square.color} />

                }))
            }
        </View> 
    );
}
 
export default Board;