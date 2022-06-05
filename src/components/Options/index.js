import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";
import { ChessGameContext } from "../Context/ChessGameContext";
import { useContext, useState } from "react";
import { Feather } from '@expo/vector-icons'; 

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
        console.log(chess.current.history());
    }

    return ( 
        <View style={{flexDirection:'row',padding:5,}}>
            <TouchableOpacity style={{flex:1,alignSelf:'flex-start'}} onPress={toggleOptions}>
                <Feather name="more-horizontal" size={24} color="white" />
            </TouchableOpacity>
            <View style={{display:optionsDisplay,position:'absolute',backgroundColor:'#161512',width:width -50,height:50,justifyContent:'center',alignItems:'center',top: -(width/2),left: 25,elevation:5}}>
                <TouchableOpacity onPress={reset}>
                    <Text style={styles.optionText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={history}>
                    <Text style={styles.optionText}>History</Text>
                </TouchableOpacity>
            </View>
        </View>
     );
}
 
export default Options;

const styles = StyleSheet.create({
    optionText: {
        color: 'white',
        padding: 5,
    }
})