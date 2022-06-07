import { createContext, useRef, useState, useCallback, useEffect } from "react";
import { Chess } from "chess.js";
import Sound from 'react-native-sound';
import move from '../../../../assets/sounds/public_sound_standard_Move.mp3'
import capture from '../../../../assets/sounds/public_sound_standard_Capture.mp3'

export const ChessGameContext = createContext();

Sound.setCategory('Playback');
var moveSound = new Sound(move, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + moveSound.getDuration() + 'number of channels: ' + moveSound.getNumberOfChannels());
  });

  var captureSound = new Sound(capture, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
    // when loaded successfully
    console.log('duration in seconds: ' + moveSound.getDuration() + 'number of channels: ' + moveSound.getNumberOfChannels());
  });

export const ChessGameContextProvider = ({children}) => {
    const chess = useRef(new Chess);
    const [state, setState] = useState({
        player: 'w',
        board: chess.current.board(),
    })
    const [boardView, setBoardView] = useState('w')

    const onTurn = useCallback(() => {
        setState({player: state.player == 'w' ? 'b' : 'w',
        board: chess.current.board()})
    },[chess.current, state.player])

    const soundMove = (_move) => {
        if(_move == 0) {
            moveSound.play();
        }
        else if(_move == 1) {
            captureSound.play();
        }
    }

    const flipBoard = useCallback(() => {
        setBoardView((boardView == 'w') ? 'b' : 'w');
    },[boardView])


    return(
        <ChessGameContext.Provider value={{chess, state, setState, onTurn, soundMove, boardView, setBoardView, flipBoard}}>
            {children}
        </ChessGameContext.Provider>
    )
}