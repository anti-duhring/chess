import { createContext, useRef, useState, useCallback, useEffect } from "react";
import { Chess } from "chess.js";
import TrackPlayer, { RepeatMode } from 'react-native-track-player';


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

    const loadSound = async() => {
        const move = {
            url: require('../../../../assets/sounds/public_sound_standard_Move.mp3'),
            title: 'Move',
            duration: 1,
        }
        const capture = {
            url: require('../../../../assets/sounds/public_sound_standard_Capture.mp3'),
            title: 'Capture',
            duration: 1,
        }

        try {
            await TrackPlayer.setupPlayer()
            await TrackPlayer.add([move, capture]);
            await TrackPlayer.setRepeatMode(1);
            //TrackPlayer.setRepeatMode('Track');
            //await sound.current.loadAsync(require('../../../../assets/sounds/public_sound_standard_Move.mp3'));
            // Don't forget to unload the sound from memory
            // when you are done using the Sound object
        } catch (error) {
            // An error occurred!
            console.log('Error:',error)
        } finally {
            console.log('Loaded')
        }
    }

    const soundMove = async(_type) => {
        await TrackPlayer.skip(_type);
        TrackPlayer.play();
        setTimeout(() => {TrackPlayer.pause()},250)
        
        // Your sound is playing!
    }

    useEffect(() => {
        loadSound();
    },[])


    return(
        <ChessGameContext.Provider value={{chess, state, setState, onTurn, soundMove}}>
            {children}
        </ChessGameContext.Provider>
    )
}