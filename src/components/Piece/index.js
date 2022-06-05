import { Image, StyleSheet, Dimensions, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, runOnJS, withTiming } from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler';
import {useCallback, useContext} from 'react'
import { toPosition, toTranslation } from "../Notation";
import { ChessGameContext } from "../Context/ChessGameContext";

const { width } = Dimensions.get('window');
export const SIZE = width / 8;

export const PIECES= {
    br: require('../../../assets/br.png'),
    bb: require('../../../assets/bb.png'),
    bk: require('../../../assets/bk.png'),
    bn: require('../../../assets/bn.png'),
    bp: require('../../../assets/bp.png'),
    bq: require('../../../assets/bq.png'),
    wb: require('../../../assets/wb.png'),
    wk: require('../../../assets/wk.png'),
    wn: require('../../../assets/wn.png'),
    wp: require('../../../assets/wp.png'),
    wq: require('../../../assets/wq.png'),
    wr: require('../../../assets/wr.png')
}
const Piece = ({id, position, chess, onTurn, enabled}) => {
    const { soundMove } = useContext(ChessGameContext)
    const isGestureActive = useSharedValue(false);
    const offsetX = useSharedValue(0);
    const offsetY = useSharedValue(0);
    const translateX = useSharedValue(position.x);
    const translateY = useSharedValue(position.y);

    const movePiece = useCallback(
      (from, to) => {
        const move = chess.moves({verbose: true}).find((m) => m.from === from && m.to === to);
        const {x, y} = toTranslation(move ? to : from);
        translateX.value = withTiming(x);
        translateY.value = withTiming(y, {}, () => {
            isGestureActive.value = false;
        });
        if(move) {
            let sound = 0;
            if(move.captured) {
                sound = 1;
            }
            soundMove(sound);
            chess.move(move);
            onTurn();
        }
      },
      [chess, isGestureActive, offsetX, offsetY, translateX, translateY, onTurn],
    )
    
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: () => {
            isGestureActive.value = true;
            offsetX.value = translateX.value;
            offsetY.value = translateY.value;
        },
        onActive: ({translationX, translationY}) => {
            translateX.value  = translationX + offsetX.value;
            translateY.value = translationY + offsetY.value;
        },
        onEnd: () => {
            const from = toPosition({x: offsetX.value, y: offsetY.value});
            const to = toPosition({x: translateX.value, y: translateY.value});
            runOnJS(movePiece)(from, to);
    
        }
    })
    const piece = useAnimatedStyle(() => {
        return {
            position:'absolute',
            zIndex: isGestureActive.value ? 100 : 0, 
            width: SIZE, 
            height: SIZE, 
            transform: [{translateX: translateX.value},{translateY: translateY.value}]
        }
    })

    const to = useAnimatedStyle(() => {
        const tr = toTranslation(toPosition({x: translateX.value, y: translateY.value}));
        return {
            backgroundColor: isGestureActive.value ? 'rgba(255, 255, 0, 0.5)' : 'transparent',
            position:'absolute',
            zIndex: 0, 
            width: SIZE, 
            height: SIZE, 
            transform: [{translateX: tr.x},{translateY: tr.y}]
        }

    })

    const from = useAnimatedStyle(() => ({
        backgroundColor: isGestureActive.value ? 'rgba(255, 255, 0, 0.5)' : 'transparent',
        position:'absolute',
        zIndex: 0, 
        width: SIZE, 
        height: SIZE, 
        transform: [{translateX: offsetX.value},{translateY: offsetY.value}]
    }))

    return (
        <>
        <Animated.View style={from} />
        <Animated.View style={to} />
        <PanGestureHandler onGestureEvent={onGestureEvent} enabled={enabled}>
            <Animated.View style={piece}>
                <Image source={PIECES[id]} style={styles.piece} />
            </Animated.View>
        </PanGestureHandler>
        </>
     );
}
 
export default Piece;

const styles = StyleSheet.create({
    piece: {
        width: SIZE,
        height: SIZE,
    },
})