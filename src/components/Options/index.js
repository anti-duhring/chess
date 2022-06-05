import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import { ChessGameContext } from "../Context/ChessGameContext";
import { useContext, useState } from "react";
import { Feather } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const { width } = Dimensions.get('window')
const { height } = Dimensions.get('window')

const Options = () => {
    const { chess, state, setState, onTurn } = useContext(ChessGameContext);
    const [value, setValue] = useState(0);
    const [optionsDisplay, setOptionsDisplay] = useState('none')

    const reset = () => {
        chess.current.reset();
        setState({player: 'w',
        board: chess.current.board()})
        setOptionsDisplay('none')
    }

    const toggleOptions = () => {
        setOptionsDisplay(optionsDisplay == 'none' ? 'flex' : 'none');
    }

    const history = () => {
        console.log(chess.current.pgn());
    }

    return ( 
        <View style={{flexDirection:'row',padding:5,}}>
            <TouchableOpacity style={{flex:1,alignSelf:'flex-start'}} onPress={toggleOptions}>
                <Feather name="more-horizontal" size={24} color="white" />
            </TouchableOpacity>
            <View style={[styles.optionContainer,{        display:optionsDisplay,}]}>
                <View style={{flex:9,alignSelf:'flex-start',justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={styles.optionButton} onPress={reset}>
                        <MaterialCommunityIcons name="restart" size={20} color="white" />
                        <Text style={styles.optionText}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionButton} onPress={history}>
                        <MaterialCommunityIcons name="checkerboard" size={20} color="white" />
                        <Text style={styles.optionText}>Copy game</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1,marginTop:5,marginRight:10,alignSelf:'flex-start',alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={toggleOptions}>
                        <FontAwesome name="close" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                
            </View>
        </View>
     );
}
 
export default Options;

const styles = StyleSheet.create({
    optionText: {
        color: 'white',
        marginLeft:5,
    },
    optionButton: {
        padding: 10,
        height:30,
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        flexDirection:'row'
    },
    optionContainer: {
        position:'absolute',
        backgroundColor:'#161512',
        width:width -100,
        height:100,
        justifyContent:'center',
        alignItems:'center',
        top: -(width/2),
        left: 50,
        elevation:5,
        flexDirection:'row'
    }
})